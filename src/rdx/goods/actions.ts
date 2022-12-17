import { createAction, createAsyncAction } from 'typesafe-actions';
import { ItemModel } from '../../services/goodsTypes';

export enum GoodsActions {
GET_ALL_GOODS_REQUEST = '@goods/GET_ALL_GOODS_REQUEST',
GET_ALL_GOODS_SUCCESS = '@goods/GET_ALL_GOODS_SUCCESS',
GET_ALL_GOODS_FAILURE = '@goods/GET_ALL_GOODS_FAILURE',

ADD_GOODS_REQUEST = '@goods/ADD_GOODS_REQUEST',
ADD_GOODS_SUCCESS = '@goods/ADD_GOODS_SUCCESS',
ADD_GOODS_FAILURE = '@goods/ADD_GOODS_FAILURE',

REMOVE_GOODS_REQUEST = '@goods/REMOVE_GOODS_REQUEST',
REMOVE_GOODS_SUCCESS = '@goods/REMOVE_GOODS_SUCCESS',
REMOVE_GOODS_FAILURE = '@goods/REMOVE_GOODS_FAILURE',

UPDATE_GOODS_REQUEST = '@goods/UPDATE_GOODS_REQUEST',
UPDATE_GOODS_SUCCESS = '@goods/UPDATE_GOODS_SUCCESS',
UPDATE_GOODS_FAILURE = '@goods/UPDATE_GOODS_FAILURE',

FILTER_GOODS = '@goods/FILTER_GOODS',
SORT_GOODS = '@goods/SORT_GOODS',
}

export const getAllGoodsAsyncAction = createAsyncAction(
  GoodsActions.GET_ALL_GOODS_REQUEST,
  GoodsActions.GET_ALL_GOODS_SUCCESS,
  GoodsActions.GET_ALL_GOODS_FAILURE,
)<undefined, { goods: ItemModel[] }, { error: Error }>();

export const addGoodsAsyncAction = createAsyncAction(
  GoodsActions.ADD_GOODS_REQUEST,
  GoodsActions.ADD_GOODS_SUCCESS,
  GoodsActions.ADD_GOODS_FAILURE,
)<undefined, { item: ItemModel }, { error: Error }>();

export const removeGoodsAsyncAction = createAsyncAction(
  GoodsActions.REMOVE_GOODS_REQUEST,
  GoodsActions.REMOVE_GOODS_SUCCESS,
  GoodsActions.REMOVE_GOODS_FAILURE,
)<{ id: string}, { id: string }, {id: string, error: Error }>();

export const updateGoodsAsyncAction = createAsyncAction(
  GoodsActions.UPDATE_GOODS_REQUEST,
  GoodsActions.UPDATE_GOODS_SUCCESS,
  GoodsActions.UPDATE_GOODS_FAILURE,
)<{ id: string }, { item: ItemModel }, {id: string, error: Error }>();

export const filterGoods = createAction(
  GoodsActions.FILTER_GOODS,
  ({ filter }: { filter: string }) => ({
    filter,
  }),
)();

export const sortGoods = createAction(
  GoodsActions.SORT_GOODS,
  ({ sort }: { sort: string }) => ({
    sort,
  }),
)();
