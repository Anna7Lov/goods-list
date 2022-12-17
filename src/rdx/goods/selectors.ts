import { createSelector } from 'reselect';
import { GlobalAppState } from '../rootReducer';
import { ItemModel } from '../../services/goodsTypes';

export const selectIsAllGoodsLoading = (state: GlobalAppState) => state.goods.isLoading;
export const selectAllGoods = (state: GlobalAppState) => state.goods.list;
export const selectIsAllGoodsFailed = (state: GlobalAppState) => state.goods.error;
export const selectIsAddingLoading = (state: GlobalAppState) => state.goods.isAddingLoading;
export const selectIsRemoveLoading = (state: GlobalAppState) => state.goods.isRemoveLoading;
export const selectIsUpdateLoading = (state: GlobalAppState) => state.goods.isUpdateLoading;
export const selectFilter = (state: GlobalAppState) => state.goods.filter;
export const selectSort = (state: GlobalAppState) => state.goods.sort;

export const selectGoodsToDisplay = createSelector(
  selectAllGoods,
  selectFilter,
  selectSort,
  (goods = [], filter, sort) => {
    if (sort === '') {
      return goods.filter((i) => (
        i.title.toUpperCase().includes(filter.toUpperCase())
      ));
    } if (sort.includes('weight asc')) {
      return goods
        .filter((i) => i.title.toUpperCase().includes(filter.toUpperCase()))
        .sort((a, b) => {
          if (
            +(a[sort.split(' ')[0] as keyof ItemModel].toUpperCase())
            > +(b[sort.split(' ')[0] as keyof ItemModel].toUpperCase())
          ) return 1;
          if (
            +(b[sort.split(' ')[0] as keyof ItemModel].toUpperCase())
            > +(a[sort.split(' ')[0] as keyof ItemModel].toUpperCase())
          ) return -1;
          return 0;
        });
    } if (sort.includes('weight desc')) {
      return goods
        .filter((i) => i.title.toUpperCase().includes(filter.toUpperCase()))
        .sort((a, b) => {
          if (
            +(b[sort.split(' ')[0] as keyof ItemModel].toUpperCase())
            > +(a[sort.split(' ')[0] as keyof ItemModel].toUpperCase())
          ) return 1;
          if (
            +(a[sort.split(' ')[0] as keyof ItemModel].toUpperCase())
            > +(b[sort.split(' ')[0] as keyof ItemModel].toUpperCase())
          ) return -1;
          return 0;
        });
    } if (sort.includes('asc')) {
      return goods
        .filter((i) => i.title.toUpperCase().includes(filter.toUpperCase()))
        .sort((a, b) => {
          if (
            a[sort.split(' ')[0] as keyof ItemModel].toUpperCase()
            > b[sort.split(' ')[0] as keyof ItemModel].toUpperCase()
          ) return 1;
          if (
            b[sort.split(' ')[0] as keyof ItemModel].toUpperCase()
            > a[sort.split(' ')[0] as keyof ItemModel].toUpperCase()
          ) return -1;
          return 0;
        });
    }
    return goods
      .filter((i) => i.title.toUpperCase().includes(filter.toUpperCase()))
      .sort((a, b) => {
        if (
          b[sort.split(' ')[0] as keyof ItemModel].toUpperCase()
          > a[sort.split(' ')[0] as keyof ItemModel].toUpperCase()
        ) return 1;
        if (
          a[sort.split(' ')[0] as keyof ItemModel].toUpperCase()
          > b[sort.split(' ')[0] as keyof ItemModel].toUpperCase()
        ) return -1;
        return 0;
      });
  },
);
