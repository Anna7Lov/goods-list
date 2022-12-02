import { createSelector } from 'reselect';

export const selectIsAllGoodsLoading = (state) => state.goods.isLoading;
export const selectAllGoods = (state) => state.goods.list;
export const selectIsAllGoodsFailed = (state) => state.goods.error;
export const selectIsAddingLoading = (state) => state.goods.isAddingLoading;
export const selectIsRemoveLoading = (state) => state.goods.isRemoveLoading;
export const selectIsUpdateLoading = (state) => state.goods.isUpdateLoading;
export const selectFilter = (state) => state.goods.filter;
export const selectSort = (state) => state.goods.sort;

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
            +(a[sort.split(' ')[0]].toUpperCase())
            > +(b[sort.split(' ')[0]].toUpperCase())
          ) return 1;
          if (
            +(b[sort.split(' ')[0]].toUpperCase())
            > +(a[sort.split(' ')[0]].toUpperCase())
          ) return -1;
          return 0;
        });
    } if (sort.includes('weight desc')) {
      return goods
        .filter((i) => i.title.toUpperCase().includes(filter.toUpperCase()))
        .sort((a, b) => {
          if (
            +(b[sort.split(' ')[0]].toUpperCase())
            > +(a[sort.split(' ')[0]].toUpperCase())
          ) return 1;
          if (
            +(a[sort.split(' ')[0]].toUpperCase())
            > +(b[sort.split(' ')[0]].toUpperCase())
          ) return -1;
          return 0;
        });
    } if (sort.includes('asc')) {
      return goods
        .filter((i) => i.title.toUpperCase().includes(filter.toUpperCase()))
        .sort((a, b) => {
          if (
            a[sort.split(' ')[0]].toUpperCase()
            > b[sort.split(' ')[0]].toUpperCase()
          ) return 1;
          if (
            b[sort.split(' ')[0]].toUpperCase()
            > a[sort.split(' ')[0]].toUpperCase()
          ) return -1;
          return 0;
        });
    }
    return goods
      .filter((i) => i.title.toUpperCase().includes(filter.toUpperCase()))
      .sort((a, b) => {
        if (
          b[sort.split(' ')[0]].toUpperCase()
          > a[sort.split(' ')[0]].toUpperCase()
        ) return 1;
        if (
          a[sort.split(' ')[0]].toUpperCase()
          > b[sort.split(' ')[0]].toUpperCase()
        ) return -1;
        return 0;
      });
  },
);
