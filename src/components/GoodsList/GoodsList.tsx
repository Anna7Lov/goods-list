import { Typography } from '@mui/material';
import React from 'react';
import { Item } from '../Item/Item';
import { ItemModel } from '../../services/goodsTypes';
import './GoodsList.css';

interface GoodsListProps {
  goods: ItemModel[];
  isItemCreating: boolean;
}

export const GoodsList = ({ goods, isItemCreating }:GoodsListProps) => {
  if (!goods?.length && !isItemCreating) {
    return (
      <Typography variant="h5" component="h2" color="primary" align="center">
        No goods to display
      </Typography>
    );
  }
  return (
    <div className="goods-list">
      {goods.map((item) => (
        <Item key={item.id} item={item} />
      ))}
      {isItemCreating && <Item loading />}
    </div>
  );
};
