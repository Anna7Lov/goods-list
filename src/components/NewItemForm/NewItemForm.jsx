import PropTypes from 'prop-types';
import { TextField, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LinearProgress from '@mui/material/LinearProgress';
import React from 'react';
import { connect } from 'react-redux';
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

class NewItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: initialItem,
      categoryError: false,
      titleError: false,
      descriptionError: false,
      weightError: false,
    };
  }

  onInputChange = (e) => {
    const { item } = this.state;
    this.setState({
      item: {
        ...item,
        [e.target.name]: e.target.value,
      },
    });
  };

  onAdd = () => {
    const { item } = this.state;
    if (item.category && item.title && item.description && item.weight) {
      const { dispatchAddGoodsThunk } = this.props;
      dispatchAddGoodsThunk(item);
      this.setState({
        item: (initialItem),
        categoryError: false,
        titleError: false,
        descriptionError: false,
        weightError: false,
      });
    } else {
      if (item.category === '') {
        this.setState({
          categoryError: true,
        });
      }
      if (item.title === '') {
        this.setState({
          titleError: true,
        });
      }
      if (item.description === '') {
        this.setState({
          descriptionError: true,
        });
      }
      if (item.weight === '') {
        this.setState({
          weightError: true,
        });
      }
    }
  };

  render() {
    const { isAddingLoading } = this.props;

    const {
      item,
      categoryError,
      titleError,
      descriptionError,
      weightError,
    } = this.state;

    return (
      <div className="form">
        <TextField
          required
          name="category"
          id="filled-basic"
          label="Category"
          variant="filled"
          onChange={this.onInputChange}
          value={item.category}
          error={categoryError}
        />
        <TextField
          required
          name="title"
          id="filled-basic"
          label="Title"
          variant="filled"
          onChange={this.onInputChange}
          value={item.title}
          error={titleError}
        />
        <TextField
          required
          name="description"
          id="filled-basic"
          label="Description"
          variant="filled"
          onChange={this.onInputChange}
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
          onChange={this.onInputChange}
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
              onClick={this.onAdd}
            >
              Add
            </Button>
          )}
        </div>
      </div>
    );
  }
}

NewItemForm.propTypes = {
  dispatchAddGoodsThunk: PropTypes.func,
  isAddingLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAddingLoading: selectIsAddingLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  dispatchAddGoodsThunk: (item) => dispatch(addGoodsThunk(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewItemForm);
