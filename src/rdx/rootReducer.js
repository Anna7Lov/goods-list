import { combineReducers } from 'redux';
import { reducer as goodsReducer } from './goods/reducer';

export const rootReducer = combineReducers({
  goods: goodsReducer,
});
