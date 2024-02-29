import { createStore } from 'redux';
import { rootReducer } from '../reducers/index.ts';

const store = createStore(rootReducer);

export default store;
