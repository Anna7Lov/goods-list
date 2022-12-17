import { getType } from 'typesafe-actions';
import { GlobalAppActions } from '../actions';
import {
  getAllGoodsAsyncAction,
  addGoodsAsyncAction,
  removeGoodsAsyncAction,
  updateGoodsAsyncAction,
  filterGoods,
  sortGoods,
} from './actions';

import { ItemModel } from '../../services/goodsTypes';

export interface GoodsState {
  list: ItemModel[],
  isLoading: boolean,
  error: Error | null;
  isAddingLoading: boolean;
  addingError: Error | null;
  removeError: Error | null;
  updateError: Error | null;
  isRemoveLoading: {[index: string]: boolean};
  isUpdateLoading: {[index: string]: boolean};
  filter: string,
  sort: string,
}

const initialState: GoodsState = {
  list: [],
  isLoading: false,
  error: null,
  isAddingLoading: false,
  addingError: null,
  removeError: null,
  updateError: null,
  isRemoveLoading: {},
  isUpdateLoading: {},
  filter: '',
  sort: '',
};

export const reducer = (state = initialState, action: GlobalAppActions): GoodsState => {
  switch (action.type) {
    case getType(getAllGoodsAsyncAction.request): {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case getType(getAllGoodsAsyncAction.success): {
      return {
        ...state,
        list: action.payload.goods,
        isLoading: false,
        error: null,
      };
    }

    case getType(getAllGoodsAsyncAction.failure): {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    }

    case getType(addGoodsAsyncAction.request): {
      return {
        ...state,
        addingError: null,
        isAddingLoading: true,
      };
    }

    case getType(addGoodsAsyncAction.success): {
      return {
        ...state,
        list: [...state.list, action.payload.item],
        addingError: null,
        isAddingLoading: false,
      };
    }

    case getType(addGoodsAsyncAction.failure): {
      return {
        ...state,
        isAddingLoading: false,
        addingError: action.payload.error,
      };
    }

    case getType(removeGoodsAsyncAction.request): {
      return {
        ...state,
        removeError: null,
        isRemoveLoading: {
          ...state.isRemoveLoading,
          [action.payload.id]: true,
        },
      };
    }

    case getType(removeGoodsAsyncAction.success): {
      return {
        ...state,
        list: state.list.filter((i) => i.id !== action.payload.id),
        removeError: null,
        isRemoveLoading: {
          ...state.isRemoveLoading,
          [action.payload.id]: false,
        },
      };
    }

    case getType(removeGoodsAsyncAction.failure): {
      return {
        ...state,
        removeError: action.payload.error,
        isRemoveLoading: {
          ...state.isRemoveLoading,
          [action.payload.id]: false,
        },
      };
    }

    case getType(updateGoodsAsyncAction.request): {
      return {
        ...state,
        updateError: null,
        isUpdateLoading: {
          ...state.isUpdateLoading,
          [action.payload.id]: true,
        },
      };
    }

    case getType(updateGoodsAsyncAction.success): {
      return {
        ...state,
        list: state.list.map((i) => (
          i.id === action.payload.item.id ? action.payload.item : i
        )),
        updateError: null,
        isUpdateLoading: {
          ...state.isUpdateLoading,
          [action.payload.item.id]: false,
        },
      };
    }

    case getType(updateGoodsAsyncAction.failure): {
      return {
        ...state,
        updateError: action.payload.error,
        isUpdateLoading: {
          ...state.isUpdateLoading,
          [action.payload.id]: false,
        },
      };
    }

    case getType(filterGoods):
      return {
        ...state,
        filter: action.payload.filter,
      };

    case getType(sortGoods):
      return {
        ...state,
        sort: action.payload.sort,
      };

    default: {
      return state;
    }
  }
};
