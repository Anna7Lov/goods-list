import { TextField, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LinearProgress from '@mui/material/LinearProgress';
import { React, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGoodsThunk } from '../../rdx/goods/thunks';
import { selectIsAddingLoading } from '../../rdx/goods/selectors';
import './NewItemForm.css';

const styles = {
  progress: {
    width: 150,
  },
};

const initialItem = {
  category: '',
  title: '',
  description: '',
  weight: '',
};

export const NewItemForm = () => {
  const [item, setItem] = useState(initialItem);
  const [categoryError, setCategoryError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [weightError, setWeightError] = useState(false);
  const isAddingLoading = useSelector(selectIsAddingLoading);

  const dispatch = useDispatch();

  const onInputChange = useCallback(
    (e) => {
      setItem({
        ...item,
        [e.target.name]: e.target.value,
      });
    },
    [item],
  );

  const onAdd = useCallback(() => {
    if (item.category && item.title && item.description && item.weight) {
      dispatch(addGoodsThunk(item));
      setItem(initialItem);
      setCategoryError(false);
      setTitleError(false);
      setDescriptionError(false);
      setWeightError(false);
    } else {
      if (item.category === '') {
        setCategoryError(true);
      }
      if (item.title === '') {
        setTitleError(true);
      }
      if (item.description === '') {
        setDescriptionError(true);
      }
      if (item.weight === '') {
        setWeightError(true);
      }
    }
  }, [item, dispatch]);

  return (
    <div className="form">
      <TextField
        required
        name="category"
        id="filled-basic"
        label="Category"
        variant="filled"
        onChange={onInputChange}
        value={item.category}
        error={categoryError}
      />
      <TextField
        required
        name="title"
        id="filled-basic"
        label="Title"
        variant="filled"
        onChange={onInputChange}
        value={item.title}
        error={titleError}
      />
      <TextField
        required
        name="description"
        id="filled-basic"
        label="Description"
        variant="filled"
        onChange={onInputChange}
        value={item.description}
        error={descriptionError}
      />
      <TextField
        required
        type="number"
        name="weight"
        id="filled-basic"
        label="Weight"
        variant="filled"
        onChange={onInputChange}
        value={item.weight}
        error={weightError}
      />

      <div className="buttons">
        {isAddingLoading ? (
          <LinearProgress sx={styles.progress} />
        ) : (
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={onAdd}
          >
            Add
          </Button>
        )}
      </div>
    </div>
  );
};
