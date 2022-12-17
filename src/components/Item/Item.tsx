import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextField,
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LinearProgress from '@mui/material/LinearProgress';
import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsRemoveLoading,
  selectIsUpdateLoading,
} from '../../rdx/goods/selectors';
import { removeGoodsThunk, updateGoodsThunk } from '../../rdx/goods/thunks';
import { ItemModel } from '../../services/goodsTypes';
import './Item.css';

interface ItemProps {
  item?: ItemModel;
  loading?: boolean;
}

interface ItemStyles {
  progress: React.CSSProperties;
  wrapper: React.CSSProperties;
  updateButtonsWrapper: React.CSSProperties;
  card: React.CSSProperties;
  cardContent: React.CSSProperties;
  category: React.CSSProperties;
  title: React.CSSProperties;
  progressActions: React.CSSProperties;
  buttonsWrapper: React.CSSProperties;
  button: React.CSSProperties;
}

const styles: ItemStyles = {
  progress: {
    width: 150,
    margin: '105.5px 62.5px 105.5px 77.5px',
  },
  wrapper: {
    width: 304,
    padding: '0 15px',
  },
  updateButtonsWrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '10px 0',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 280,
    padding: '11px 0',
    marginBottom: '25px',
    backgroundColor: '#2d2e32',
  },
  cardContent: {
    padding: '0 10px',
  },
  category: {
    display: 'block',
    minHeight: '31px',
  },
  title: {
    paddingBottom: '5px',
    marginBottom: '10px',
    borderBottom: '2px solid #f3c12c',
  },
  progressActions: {
    width: 200,
    margin: '0 auto 15.5px',
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 0,
  },
  button: {
    width: 100,
    height: 35,
  },
};

export const Item = ({ item, loading }:ItemProps) => {
  const [itemNew, setItemNew] = useState <Partial<ItemModel> | undefined>(item);
  const [updatedItem, setUpdatedItem] = useState<string | null | undefined>(null);
  const [updateCategoryError, setUpdateCategoryError] = useState<boolean>(false);
  const [updateTitleError, setUpdateTitleError] = useState<boolean>(false);
  const [updateDescriptionError, setUpdateDescriptionError] = useState<boolean>(false);
  const [updateWeightError, setUpdateWeightError] = useState<boolean>(false);
  const isRemoveGoodsLoading = useSelector(selectIsRemoveLoading);
  const isUpdateGoodsLoading = useSelector(selectIsUpdateLoading);

  const dispatch = useDispatch();

  const onInputModification = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setItemNew({
        ...itemNew,
        [e.target.name]: e.target.value,
      });
    },
    [itemNew],
  );

  const onRemoveClick = useCallback(() => {
    if (item !== undefined) {
      dispatch(removeGoodsThunk(item.id));
    }
  }, [dispatch]);

  const onEditClick = useCallback(() => {
    setUpdatedItem(updatedItem === item?.id ? null : item?.id);
  }, [updatedItem]);

  const onSave = useCallback(() => {
    if (itemNew?.category
      && itemNew?.title
      && itemNew?.description
      && itemNew?.weight) {
      if (item !== undefined) {
        dispatch(updateGoodsThunk({ ...itemNew, id: item.id }));
        setUpdatedItem(undefined);
        setUpdateCategoryError(false);
        setUpdateTitleError(false);
        setUpdateDescriptionError(false);
        setUpdateWeightError(false);
      }
    } else {
      if (itemNew?.category === '') {
        setUpdateCategoryError(true);
      }
      if (itemNew?.title === '') {
        setUpdateTitleError(true);
      }
      if (itemNew?.description === '') {
        setUpdateDescriptionError(true);
      }
      if (itemNew?.weight === '') {
        setUpdateWeightError(true);
      }
    }
  }, [dispatch, itemNew]);

  const onCancel = useCallback(() => {
    setUpdatedItem(undefined);
    setItemNew(item);
  }, [item]);

  if (loading) {
    return <LinearProgress sx={styles.progress} />;
  }

  return (
    <div>
      {item?.id === updatedItem ? (
        <div className="update-form">
          <TextField
            required
            name="category"
            id="filled-basic"
            label="Category"
            variant="filled"
            onChange={onInputModification}
            value={itemNew?.category}
            error={updateCategoryError}
          />
          <TextField
            required
            name="title"
            id="filled-basic"
            label="Title"
            variant="filled"
            onChange={onInputModification}
            value={itemNew?.title}
            error={updateTitleError}
          />
          <TextField
            required
            name="description"
            id="filled-basic"
            label="Description"
            variant="filled"
            onChange={onInputModification}
            value={itemNew?.description}
            error={updateDescriptionError}
          />
          <TextField
            required
            type="number"
            name="weight"
            id="filled-basic"
            label="Weight"
            variant="filled"
            onChange={onInputModification}
            value={itemNew?.weight}
            error={updateWeightError}
          />

          <Box sx={styles.updateButtonsWrapper}>
            <Button
              sx={styles.button}
              variant="contained"
              startIcon={<CheckCircleOutlineIcon />}
              onClick={onSave}
            >
              Save
            </Button>
            <Button
              sx={styles.button}
              variant="contained"
              color="secondary"
              startIcon={<HighlightOffIcon />}
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Box>
        </div>
      ) : (
        <Box sx={styles.wrapper}>
          <Card sx={[styles.card, { boxShadow: 10 }]}>
            <CardContent sx={styles.cardContent}>
              <Typography
                sx={styles.category}
                color="primary"
                variant="button"
                gutterBottom
              >
                {item?.category}
              </Typography>
              <Typography
                sx={styles.title}
                variant="h5"
                component="h2"
                align="center"
              >
                {item?.title}
              </Typography>
              <Typography
                color="text.secondary"
                variant="h6"
                align="center"
                gutterBottom
              >
                {item?.description}
              </Typography>
              <Typography color="text.secondary" variant="body1" align="center">
                {item?.weight}
              </Typography>
            </CardContent>
            {item !== undefined ? isRemoveGoodsLoading[item.id] || isUpdateGoodsLoading[item.id] ? (
              <LinearProgress sx={styles.progressActions} />
            ) : (
              <CardActions sx={styles.buttonsWrapper}>
                <Button
                  sx={styles.button}
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={onEditClick}
                >
                  Edit
                </Button>
                <Button
                  sx={styles.button}
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={onRemoveClick}
                >
                  Remove
                </Button>
              </CardActions>
            ) : ''}
          </Card>
        </Box>
      )}
    </div>
  );
};
