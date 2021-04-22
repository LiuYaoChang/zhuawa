// import { Store } from "../../Vuex/store";
import { isPlainObject } from "jquery";
import { Action } from "./types/actions";
import { Reducer } from "./types/reducers";
import { ExtendState, Store, PreloadedState, StoreEnhancer, Dispatch } from "./types/store";
import ActionTypes from "./utils/actionTypes";

type noop  = () => void;

export default function createStore<
  S,
  A extends Action,
  Ext = {},
  StateExt = never
> (
  reducer: Reducer<S, A>,
  enhancer?: StoreEnhancer<Ext, StateExt>
): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext;

export default function createStore<
  S,
  A extends Action,
  Ext = {},
  StateExt = never
> (
  reducer: Reducer<S, A>,
  preloadedState?: PreloadedState<S>,
  enhancer?: StoreEnhancer<Ext, StateExt>
): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext;

export default function createStore<
  S,
  A extends Action,
  Ext = {},
  StateExt = never
> (
  reducer: Reducer<S, A>,
  preloadedState?: PreloadedState<S>,
  enhancer?: StoreEnhancer<Ext, StateExt>
): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext {


  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to  be a function');
    }
    return enhancer(createStore)(
      reducer,
      preloadedState as PreloadedState<S>
    ) as Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext;
  }

  if (typeof reducer !== 'function') {
    throw new Error('expected the reducer to be a function..')
  }
  let isDispatching = false;
  let currentState = preloadedState as S;
  let currentReducer = reducer;
  let currentListeners: noop[] | null = [];
  let nextListeners = currentListeners;
  function getState():S {
    if (isDispatching) {
      throw new Error(
        'You may not call store.getState() while the reducer is executing.' +
        'the reducer has already received the state as an argument.' +
        'Pass it down from the top reducer instead of reading it from the store.'
      )
    }
    return currentState as S;
  }

  function subscribe(listener: noop) {
    if (typeof listener !== 'function') {
      throw new Error('expected the listener to be a function');
    }

    let isSubscribe = true;

    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribe) return;

      const index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    }
  }

  function dispatch(action: A) {
    if (!isPlainObject(action)) {
      throw new Error(
        'actions must be plain objects.' +
        'use custom middleware for async actions.'
      )
    }

    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property' +
        'have you misspelled a constant?'
      )
    }

    if (isDispatching) {
      throw new Error('reducer may not dispatch actions')
    }
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    const listeners = (currentListeners = nextListeners);

    for (let i = 0; i < listeners.length; i++) {
      listeners[i]();
    }

    return action;
  }

  dispatch({ type: ActionTypes.INIT } as A);

  const store = ({
    dispatch: dispatch as Dispatch<A>,
    subscribe,
    getState,
  } as unknown) as Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext;

  return store;
}