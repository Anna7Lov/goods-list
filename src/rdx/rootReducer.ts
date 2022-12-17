import { combineReducers } from 'redux';
import { reducer as goodsReducer, GoodsState } from './goods/reducer';

export interface GlobalAppState {
  goods: GoodsState,
}

export const rootReducer = combineReducers<GlobalAppState>({
  goods: goodsReducer,
});
