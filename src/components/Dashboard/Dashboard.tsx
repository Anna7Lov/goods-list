import LinearProgress from '@mui/material/LinearProgress';
import {
  Typography,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
}
  from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllGoodsThunk } from '../../rdx/goods/thunks';
import {
  selectIsAllGoodsLoading,
  selectIsAllGoodsFailed,
  selectSort,
  selectGoodsToDisplay,
  selectIsAddingLoading,
} from '../../rdx/goods/selectors';
import { filterGoods, sortGoods } from '../../rdx/goods/actions';
import { NewItemForm } from '../NewItemForm/NewItemForm';
import { GoodsList } from '../GoodsList/GoodsList';

interface DashboardStyles {
  progress: React.CSSProperties;
  filter: React.CSSProperties;
  formControl: React.CSSProperties;
  menuItem: React.CSSProperties;
}

interface DropDownItem {
  id: number;
  value: string;
  name: string;
}

const styles: DashboardStyles = {
  progress: {
    width: 300,
    margin: '120px auto 0',
  },
  filter: {
    display: 'block',
    width: 350,
    margin: '0 auto 15px',
    backgroundColor: '#2d2e32',
  },
  formControl: {
    display: 'block',
    width: 225,
    margin: '0 auto 30px',
    backgroundColor: '#2d2e32',
  },
  menuItem: {
    color: '#2d2e32',
  },
};

const dropDownList: DropDownItem[] = [
  { id: 1, value: 'title asc', name: 'Title Ascending ↑' },
  { id: 2, value: 'title desc', name: 'Title Descending ↓' },
  { id: 3, value: 'description asc', name: 'Decription Ascending ↑' },
  { id: 4, value: 'description desc', name: 'Decription Descending ↓' },
  { id: 5, value: 'category asc', name: 'Category Ascending ↑' },
  { id: 6, value: 'category desc', name: 'Category Descending ↓' },
  { id: 7, value: 'weight asc', name: 'Weight Ascending ↑' },
  { id: 8, value: 'weight desc', name: 'Weight Descending ↓' },
  { id: 9, value: '', name: 'Default' },
];

export const Dashboard = () => {
  const isLoading = useSelector(selectIsAllGoodsLoading);
  const error = useSelector(selectIsAllGoodsFailed);
  const sort = useSelector(selectSort);
  const goods = useSelector(selectGoodsToDisplay);
  const isAddingItemLoading = useSelector(selectIsAddingLoading);

  const dispatch = useDispatch();

  const fetchAllGoodsThunkCallback = useCallback(() => {
    dispatch(fetchAllGoodsThunk());
  }, [dispatch]);

  useEffect(() => {
    fetchAllGoodsThunkCallback();
  }, []);

  const onSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(filterGoods({ filter: e.target.value }));
    },
    [dispatch],
  );

  const onSort = useCallback(
    (e: SelectChangeEvent) => {
      dispatch(sortGoods({ sort: e.target.value }));
    },
    [dispatch],
  );

  return (
    <div className="dashboard">
      {isLoading ? (
        <LinearProgress sx={styles.progress} />
      ) : !isLoading && !error ? (
        <div>
          <NewItemForm />

          <TextField
            fullWidth
            sx={styles.filter}
            label="Search by Title..."
            variant="filled"
            onChange={onSearch}
          />

          <FormControl sx={styles.formControl} variant="filled">
            <InputLabel id="sort">Sort by</InputLabel>
            <Select
              labelId="sort"
              fullWidth
              onChange={onSort}
              value={sort}
            >
              {dropDownList.map((item) => (
                <MenuItem key={item.id} sx={styles.menuItem} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <GoodsList goods={goods} isItemCreating={isAddingItemLoading} />
        </div>

      ) : (

        <Typography
          variant="h5"
          component="h2"
          color="secondary"
          align="center"
        >
          {error?.message}
        </Typography>
      )}
    </div>
  );
};
