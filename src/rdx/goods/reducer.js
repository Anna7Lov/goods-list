import {
  GET_ALL_GOODS_REQUEST,
  GET_ALL_GOODS_SUCCESS,
  GET_ALL_GOODS_FAILURE,
  ADD_GOODS_SUCCESS,
  ADD_GOODS_REQUEST,
  ADD_GOODS_FAILURE,
  REMOVE_GOODS_REQUEST,
  REMOVE_GOODS_SUCCESS,
  REMOVE_GOODS_FAILURE,
  UPDATE_GOODS_SUCCESS,
  UPDATE_GOODS_REQUEST,
  UPDATE_GOODS_FAILURE,
  FILTER_GOODS,
  SORT_GOODS,
} from './actions';

const initialState = {
  list: [],
  isLoading: false,
  error: null,
  isAddingLoading: false,
  addingError: null,
  removeError: null,
  isRemoveLoading: {},
  isUpdateLoading: {},
  filter: '',
  sort: '',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GOODS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case GET_ALL_GOODS_SUCCESS: {
      return {
        ...state,
        list: action.goods,
        isLoading: false,
        error: null,
      };
    }

    case GET_ALL_GOODS_FAILURE: {
      return {
        ...state,
        list: action.goods,
        isLoading: false,
        error: action.error,
      };
    }

    case ADD_GOODS_REQUEST: {
      return {
        ...state,
        addingError: null,
        isAddingLoading: true,
      };
    }

    case ADD_GOODS_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.item],
        addingError: null,
        isAddingLoading: false,
      };
    }

    case ADD_GOODS_FAILURE: {
      return {
        ...state,
        isAddingLoading: false,
        addingError: action.error,
      };
    }

    case REMOVE_GOODS_REQUEST: {
      return {
        ...state,
        removeError: null,
        isRemoveLoading: {
          ...state.isRemoveLoading,
          [action.id]: true,
        },
      };
    }

    case REMOVE_GOODS_SUCCESS: {
      return {
        ...state,
        list: state.list.filter((i) => i.id !== action.id),
        removeError: null,
        isRemoveLoading: {
          ...state.isRemoveLoading,
          [action.id]: false,
        },
      };
    }

    case REMOVE_GOODS_FAILURE: {
      return {
        ...state,
        removeError: action.error,
        isRemoveLoading: {
          ...state.isRemoveLoading,
          [action.id]: false,
        },
      };
    }

    case UPDATE_GOODS_REQUEST: {
      return {
        ...state,
        updateError: null,
        isUpdateLoading: {
          ...state.isUpdateLoading,
          [action.id]: true,
        },
      };
    }

    case UPDATE_GOODS_SUCCESS: {
      return {
        ...state,
        list: state.list.map((i) => (
          i.id === action.item.id ? action.item : i
        )),
        updateError: null,
        isUpdateLoading: {
          ...state.isUpdateLoading,
          [action.item.id]: false,
        },
      };
    }

    case UPDATE_GOODS_FAILURE: {
      return {
        ...state,
        updateError: action.error,
        isUpdateLoading: {
          ...state.isUpdateLoading,
          [action.id]: false,
        },
      };
    }

    case FILTER_GOODS:
      return {
        ...state,
        filter: action.filter,
      };

    case SORT_GOODS:
      return {
        ...state,
        sort: action.sort,
      };

    default: {
      return state;
    }
  }
};
