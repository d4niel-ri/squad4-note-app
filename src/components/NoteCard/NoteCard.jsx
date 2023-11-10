/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DeleteDialog from '@components/DeleteDialog';
import classes from './style.module.scss';

const NoteCard = ({ id, title, description }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  }
  return (
    <div onClick={() => navigate(`/detail/${id}`)} className={classes.conCard}>
      <h6>{title}</h6>
      <div className={classes.description} dangerouslySetInnerHTML={{ __html: description }} />
      <div className={classes.deleteIconContainer}>
        <DeleteIcon
          onClick={(e) => {
            e.stopPropagation();
            setOpenDialog(true);
          }}
        />
      </div>
      {openDialog && (<DeleteDialog open={ openDialog } handleClose= { handleCloseDialog } id={ id } />)}
    </div>
  );
};

NoteCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default NoteCard;