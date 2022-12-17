import {
  getAllGoodsAsyncAction,
  addGoodsAsyncAction,
  removeGoodsAsyncAction,
  updateGoodsAsyncAction,
} from './actions';

import {
  fetchAllGoodsApi,
  addGoodsApi,
  removeGoodsApi,
  updateGoodsApi,
} from '../../services/goodsApi';

import { AppDispatch } from '../index';
import { ItemModel } from '../../services/goodsTypes';

export const fetchAllGoodsThunk = () => async (dispatch: AppDispatch) => {
  dispatch(getAllGoodsAsyncAction.request());
  try {
    const response = await fetchAllGoodsApi();
    if (!response.success || !response.response) {
      throw (Error('Something went wrong'));
    }
    dispatch(getAllGoodsAsyncAction.success({ goods: response.response?.goods }));
  } catch (error) {
    dispatch(getAllGoodsAsyncAction.failure({ error: new Error('Something went wrong') }));
  }
};

export const addGoodsThunk = (item: Omit<ItemModel, 'id'>) => async (dispatch: AppDispatch) => {
  dispatch(addGoodsAsyncAction.request());
  try {
    const response = await addGoodsApi({ item });
    if (!response.success || !response.response) {
      throw (Error('Something went wrong'));
    }
    dispatch(addGoodsAsyncAction.success({ item: response.response }));
  } catch (error) {
    dispatch(addGoodsAsyncAction.failure({ error: new Error('Something went wrong') }));
  }
};

export const removeGoodsThunk = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(removeGoodsAsyncAction.request({ id: id }));
  try {
    const response = await removeGoodsApi({ id });
    if (!response.success) {
      throw (Error('Something went wrong'));
    }
    dispatch(removeGoodsAsyncAction.success({ id: id }));
  } catch (error) {
    dispatch(removeGoodsAsyncAction.failure({ error: new Error('Something went wrong'), id }));
  }
};

export const updateGoodsThunk = (item: Partial<ItemModel>
  & { id: string }) => async (dispatch: AppDispatch) => {
  dispatch(updateGoodsAsyncAction.request({ id: item.id }));
  try {
    const response = await updateGoodsApi({ item });
    if (!response.success || !response.response) {
      throw (Error('Something went wrong'));
    }
    dispatch(updateGoodsAsyncAction.success({ item: response.response }));
  } catch (error) {
    dispatch(updateGoodsAsyncAction.failure({ error: new Error('Something went wrong'), id: item.id }));
  }
};
