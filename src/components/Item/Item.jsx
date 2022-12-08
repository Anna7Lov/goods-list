import PropTypes from 'prop-types';
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
import React from 'react';
import { connect } from 'react-redux';
import {
  selectIsRemoveLoading,
  selectIsUpdateLoading,
} from '../../rdx/goods/selectors';
import { removeGoodsThunk, updateGoodsThunk } from '../../rdx/goods/thunks';
import './Item.css';

const styles = {
  progress: {
    width: 150,
    m: '105.5px 62.5px 105.5px 77.5px',
  },
  wrapper: {
    width: 304,
    p: '0 15px',
  },
  updateButtonsWrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    m: '10px 0',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 280,
    p: '11px 0',
    mb: '25px',
    backgroundColor: '#2d2e32',
  },
  cardContent: {
    p: '0 10px',
  },
  category: {
    display: 'block',
    minHeight: '31px',
  },
  title: {
    pb: '5px',
    mb: '10px',
    borderBottom: '2px solid #f3c12c',
  },
  progressActions: {
    width: 200,
    m: '0 auto 15.5px',
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    p: 0,
  },
  button: {
    width: 100,
    height: 35,
  },
};

class Item extends React.Component {
  constructor(props) {
    super(props);
    const { item } = this.props;
    this.state = {
      itemNew: item,
      updatedItem: null,
      updateCategoryError: false,
      updateTitleError: false,
      updateDescriptionError: false,
      updateWeightError: false,
    };
  }

  onInputModification = (e) => {
    const { itemNew } = this.state;
    this.setState({
      itemNew: {
        ...itemNew,
        [e.target.name]: e.target.value,
      },
    });
  };

  onRemoveClick = () => {
    const { dispatchRemoveGoodsThunk, item } = this.props;
    dispatchRemoveGoodsThunk(item.id);
  };

  onEditClick = () => {
    const { updatedItem } = this.state;
    const { item } = this.props;
    this.setState({
      updatedItem: updatedItem === item.id ? null : item.id,
    });
  };

  onSave = () => {
    const { itemNew } = this.state;
    if (itemNew.category
      && itemNew.title
      && itemNew.description
      && itemNew.weight) {
      const { dispatchUpdateGoodsThunk } = this.props;
      dispatchUpdateGoodsThunk(itemNew);
      this.setState({
        updatedItem: undefined,
        updateCategoryError: false,
        updateTitleError: false,
        updateDescriptionError: false,
        updateWeightError: false,
      });
    } else {
      if (itemNew.category === '') {
        this.setState({
          updateCategoryError: true,
        });
      }
      if (itemNew.title === '') {
        this.setState({
          updateTitleError: true,
        });
      }
      if (itemNew.description === '') {
        this.setState({
          updateDescriptionError: true,
        });
      }
      if (itemNew.weight === '') {
        this.setState({
          updateWeightError: true,
        });
      }
    }
  };

  onCancel = () => {
    const { item } = this.props;
    this.setState({
      updatedItem: undefined,
      itemNew: item,
    });
  };

  render() {
    const {
      item,
      loading,
      isRemoveGoodsLoading,
      isUpdateGoodsLoading,
    } = this.props;

    const {
      updatedItem,
      itemNew,
      updateCategoryError,
      updateTitleError,
      updateDescriptionError,
      updateWeightError,
    } = this.state;

    if (loading) {
      return <LinearProgress sx={styles.progress} />;
    }

    return (
      <div>
        {item.id === updatedItem ? (
          <div className="update-form">
            <TextField
              required
              name="category"
              id="filled-basic"
              label="Category"
              variant="filled"
              onChange={this.onInputModification}
              value={itemNew.category}
              error={updateCategoryError}
            />
            <TextField
              required
              name="title"
              id="filled-basic"
              label="Title"
              variant="filled"
              onChange={this.onInputModification}
              value={itemNew.title}
              error={updateTitleError}
            />
            <TextField
              required
              name="description"
              id="filled-basic"
              label="Description"
              variant="filled"
              onChange={this.onInputModification}
              value={itemNew.description}
              error={updateDescriptionError}
            />
            <TextField
              required
              type="number"
              name="weight"
              id="filled-basic"
              label="Weight"
              variant="filled"
              onChange={this.onInputModification}
              value={itemNew.weight}
              error={updateWeightError}
            />

            <Box sx={styles.updateButtonsWrapper}>
              <Button
                sx={styles.button}
                variant="contained"
                startIcon={<CheckCircleOutlineIcon />}
                onClick={this.onSave}
              >
                Save
              </Button>
              <Button
                sx={styles.button}
                variant="contained"
                color="secondary"
                startIcon={<HighlightOffIcon />}
                onClick={this.onCancel}
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
                  {item.category}
                </Typography>
                <Typography
                  sx={styles.title}
                  variant="h5"
                  component="h2"
                  align="center"
                >
                  {item.title}
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="h6"
                  align="center"
                  gutterBottom
                >
                  {item.description}
                </Typography>
                <Typography color="text.secondary" variant="body1" align="center">
                  {item.weight}
                </Typography>
              </CardContent>
              {isRemoveGoodsLoading[item.id] || isUpdateGoodsLoading[item.id] ? (
                <LinearProgress sx={styles.progressActions} />
              ) : (
                <CardActions sx={styles.buttonsWrapper}>
                  <Button
                    sx={styles.button}
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={this.onEditClick}
                  >
                    Edit
                  </Button>
                  <Button
                    sx={styles.button}
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={this.onRemoveClick}
                  >
                    Remove
                  </Button>
                </CardActions>
              )}
            </Card>
          </Box>
        )}
      </div>
    );
  }
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    weight: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }),
  loading: PropTypes.bool,
  dispatchRemoveGoodsThunk: PropTypes.func,
  dispatchUpdateGoodsThunk: PropTypes.func,
  isRemoveGoodsLoading: PropTypes.objectOf(PropTypes.bool),
  isUpdateGoodsLoading: PropTypes.objectOf(PropTypes.bool),
};

const mapStateToProps = (state) => ({
  isRemoveGoodsLoading: selectIsRemoveLoading(state),
  isUpdateGoodsLoading: selectIsUpdateLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateGoodsThunk: (item) => dispatch(updateGoodsThunk(item)),
  dispatchRemoveGoodsThunk: (id) => dispatch(removeGoodsThunk(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);
