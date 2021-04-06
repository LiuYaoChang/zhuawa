

export interface Action<T = any> {
  type: T;
}

export interface AnyAction extends Action {
  [extraProps: string]: any;
}

export interface ActionCreator<A, P extends any[] = any[]> {
  (...args: P): A;
}

/**
 * Object whose values are action creator function
 */
export interface ActionCreatorMap<A = any, P extends any[] = any[]> {
  [key: string]: ActionCreator<A, P>;
}
