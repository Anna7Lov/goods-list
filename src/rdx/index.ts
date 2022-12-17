import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer, GlobalAppState } from './rootReducer';
import type {} from 'redux-thunk/extend-redux';

export const store:
Store<GlobalAppState> = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = typeof store.dispatch;
