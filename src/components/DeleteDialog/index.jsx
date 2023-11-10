/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
import { PropTypes } from 'prop-types';
import { Button, Dialog } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { deleteNote } from '@pages/Detail/actions';

import classes from './style.module.scss';

const DeleteDialog = ({ open, handleClose, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToHome = () => navigate("/");

  const handleDelete = () => {
    dispatch(deleteNote(id, navigateToHome));
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className={classes.dialog}>
        <div className={classes.content}>
          <h2>Delete</h2>
          <div className={classes.message}>Are you sure you want to delete?</div>
        </div>
        <div className={classes.buttons}>
          <Button variant="contained" className={classes.cancel} onClick={handleClose}>Cancel</Button>
          <Button variant='contained' className={classes.delete} onClick={handleDelete}>Delete</Button>
        </div>
      </div>
    </Dialog>
  )
}

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default DeleteDialog;
