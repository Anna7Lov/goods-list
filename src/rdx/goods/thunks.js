import {
  getAllGoodsRequest,
  getAllGoodsSuccess,
  getAllGoodsFailure,
  addGoodsRequest,
  addGoodsSuccess,
  addGoodsFailure,
  removeGoodsRequest,
  removeGoodsSuccess,
  removeGoodsFailure,
  updateGoodsRequest,
  updateGoodsSuccess,
  updateGoodsFailure,
} from './actions';

import {
  fetchAllGoodsApi,
  addGoodsApi,
  removeGoodsApi,
  updateGoodsApi,
} from '../../services/goodsApi';

export const fetchAllGoodsThunk = () => async (dispatch) => {
  dispatch(getAllGoodsRequest());
  try {
    const response = await fetchAllGoodsApi();
    if (!response.success) {
      throw new Error(response.error);
    }
    dispatch(getAllGoodsSuccess(response.response.goods));
  } catch (error) {
    dispatch(getAllGoodsFailure(error));
  }
};

export const addGoodsThunk = (item) => async (dispatch) => {
  dispatch(addGoodsRequest());
  try {
    const response = await addGoodsApi({ item });
    if (!response.success) {
      throw new Error(response.error);
    }
    dispatch(addGoodsSuccess(response.response));
  } catch (error) {
    dispatch(addGoodsFailure(error));
  }
};

export const removeGoodsThunk = (id) => async (dispatch) => {
  dispatch(removeGoodsRequest(id));
  try {
    const response = await removeGoodsApi({ id });
    if (!response.success) {
      throw new Error(response.error);
    }
    dispatch(removeGoodsSuccess(id));
  } catch (error) {
    dispatch(removeGoodsFailure(error, id));
  }
};

export const updateGoodsThunk = (item) => async (dispatch) => {
  dispatch(updateGoodsRequest(item.id));
  try {
    const response = await updateGoodsApi({ item });
    if (!response.success) {
      throw new Error(response.error);
    }
    dispatch(updateGoodsSuccess(response.response));
  } catch (error) {
    dispatch(updateGoodsFailure(error, item.id));
  }
};
