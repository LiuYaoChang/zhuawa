import { createStore } from '../libs/FRedux/index';
import { addReducer } from './reducers/add';

const store = createStore(addReducer);

export default store;
