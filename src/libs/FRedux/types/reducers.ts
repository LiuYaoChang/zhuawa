// import { type } from 'jquery';
import { Action, AnyAction } from './actions';


/**
 * Reducer are the most important concept in redux
 * S the type of state comsume and product by this reducer
 * A the type of actions the reducer can potentially response to.
 */

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S;

/**
 * Object whose values correspond to different reducer function.
 *  @template A the type of actions the reducers can poentialy response to . 
 */
export type ReducersMapObject<S = any, A extends Action = AnyAction> = {
  [K in keyof S]: Reducer<S[K], A>;
}

export type StateFromReducersMapObject<M> = M extends ReducersMapObject
  ? {[P in keyof M]: M[P] extends Reducer<infer S, any> ? S : never }
  : never;

  export type ReducerFromReducersMapObject<M> = M extends {
    [P in keyof M]: infer R
  }
    ? R extends Reducer<any, any>
      ? R
      : never
    : never;

/**
 * infer action type from a reducer function.
 * R type of reducer.
 */
export type ActionFromReducer<R> = R extends Reducer<any, infer A> ? A : never;

export type ActionFromReducersMapObject<M> = M extends ReducersMapObject
  ? ActionFromReducer<ReducersMapObject<M>>
  : never;
