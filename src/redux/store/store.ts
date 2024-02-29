import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers/index.ts';
import { thunk } from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
