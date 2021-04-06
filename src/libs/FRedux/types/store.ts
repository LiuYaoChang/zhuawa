import { Action, AnyAction } from './actions';
import { Reducer } from './reducers';
import '../utils/symbol-observable';

/**
 * extend the state
 */
export type ExtendState<State, Extension> = [Extension] extends [never]
  ? State
  : State & Extension;

declare const $CombinedState: unique symbol;

export interface UnSubscribe {
  (): void;
}

export interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T, ...extraArgs: any[]): T
}

export type CombinedState<S> = { readonly [$CombinedState]?: undefined } & S;


export type PrimaryType = string | number | boolean | symbol;

export type PreloadedState<S> = Required<S> extends {
  [$CombinedState]: undefined
}
  ? S extends CombinedState<infer S1>
    ? {
      [K in keyof S1]?: S1[K] extends Object ? PreloadedState<S1[K]> : S1[K]
    }
    : never
  : {
    [K in keyof S]: S[K] extends PrimaryType
      ? S[K]
      : PreloadedState<S[K]>
  }
/**
 * a store is an object that holds the application's state tree.
 * there should only be a single store in a redux app, as the composition
 * happen on the reducer level.  
 */
export interface Store<
  S = any,
  A extends Action = AnyAction,
  StateExt = never,
  Ext = {}
> {
  dispatch: Dispatch<A>;

  getState(): S;

  subscribe(listener: () => void): UnSubscribe;

}

export interface StoreCreator {
  <S, A extends Action, Ext = {}, StateExt = never>(
    reducer: Reducer<S, A>,
    enhancer?: StoreEnhancer<Ext, StateExt>
  ): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext
    <S, A extends Action, Ext = {}, StateExt = never>(
      reducer: Reducer<S, A>,
      preloadedState?: PreloadedState<S>,
      enhancer?: StoreEnhancer<Ext>
    ): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext
}

export type StoreEnhancer<Ext = {}, StateExt = never> = (
  next: StoreEnhancerCreator<Ext, StateExt>
) => StoreEnhancerCreator<Ext, StateExt>;

export type StoreEnhancerCreator<Ext = {}, StateExt = never> = <
  S = any,
  A extends Action = AnyAction
  > (
    reducer: Reducer<S, A>,
    preloadedState: PreloadedState<S>
  ) => Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext;
