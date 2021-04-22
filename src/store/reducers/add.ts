import { Action } from "../../libs/FRedux/types/actions";

// import 
interface Counter {
  count: number;
}

export function addReducer(state: Counter = { count: 0 }, action: Action<string>): Counter {
  switch (action.type) {
    case 'increament': 
      return {
        count: ++state.count
      }
    case 'decreament':
      return {
        count: --state.count
      }
    default:
      return { ...state };
  }
}