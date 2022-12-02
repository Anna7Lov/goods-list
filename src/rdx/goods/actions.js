export const GET_ALL_GOODS_REQUEST = '@goods/GET_ALL_GOODS_REQUEST';
export const GET_ALL_GOODS_SUCCESS = '@goods/GET_ALL_GOODS_SUCCESS';
export const GET_ALL_GOODS_FAILURE = '@goods/GET_ALL_GOODS_FAILURE';

export const ADD_GOODS_REQUEST = '@goods/ADD_GOODS_REQUEST';
export const ADD_GOODS_SUCCESS = '@goods/ADD_GOODS_SUCCESS';
export const ADD_GOODS_FAILURE = '@goods/ADD_GOODS_FAILURE';

export const REMOVE_GOODS_REQUEST = '@goods/REMOVE_GOODS_REQUEST';
export const REMOVE_GOODS_SUCCESS = '@goods/REMOVE_GOODS_SUCCESS';
export const REMOVE_GOODS_FAILURE = '@goods/REMOVE_GOODS_FAILURE';

export const UPDATE_GOODS_REQUEST = '@goods/UPDATE_GOODS_REQUEST';
export const UPDATE_GOODS_SUCCESS = '@goods/UPDATE_GOODS_SUCCESS';
export const UPDATE_GOODS_FAILURE = '@goods/UPDATE_GOODS_FAILURE';

export const FILTER_GOODS = '@goods/FILTER_GOODS';
export const SORT_GOODS = '@goods/SORT_GOODS';

export const getAllGoodsRequest = () => ({
  type: GET_ALL_GOODS_REQUEST,
});

export const getAllGoodsSuccess = (goods) => ({
  type: GET_ALL_GOODS_SUCCESS,
  goods,
});

export const getAllGoodsFailure = (error) => ({
  type: GET_ALL_GOODS_FAILURE,
  error,
});

export const addGoodsRequest = () => ({
  type: ADD_GOODS_REQUEST,
});

export const addGoodsSuccess = (item) => ({
  type: ADD_GOODS_SUCCESS,
  item,
});

export const addGoodsFailure = (error) => ({
  type: ADD_GOODS_FAILURE,
  error,
});

export const removeGoodsRequest = (id) => ({
  type: REMOVE_GOODS_REQUEST,
  id,
});

export const removeGoodsSuccess = (id) => ({
  type: REMOVE_GOODS_SUCCESS,
  id,
});

export const removeGoodsFailure = (error, id) => ({
  type: REMOVE_GOODS_FAILURE,
  error,
  id,
});

export const updateGoodsRequest = (id) => ({
  type: UPDATE_GOODS_REQUEST,
  id,
});

export const updateGoodsSuccess = (item) => ({
  type: UPDATE_GOODS_SUCCESS,
  item,
});

export const updateGoodsFailure = (error, id) => ({
  type: UPDATE_GOODS_FAILURE,
  id,
  error,
});

export const filterGoods = (filter) => ({
  type: FILTER_GOODS,
  filter,
});

export const sortGoods = (sort) => ({
  type: SORT_GOODS,
  sort,
});
