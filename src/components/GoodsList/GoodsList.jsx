import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import React from 'react';
import { Item } from '../Item/Item';
import './GoodsList.css';

export const GoodsList = ({ goods, isItemCreating }) => {
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

GoodsList.propTypes = {
  goods: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      weight: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }),
  ),
  isItemCreating: PropTypes.bool.isRequired,
};
