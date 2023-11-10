import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteNote } from '@pages/Home/actions';
import classes from './style.module.scss';

const NoteCard = ({ id, title, description }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteNote(id));
  };
  return (
    <div onClick={() => navigate(`/detail/${id}`)} className={classes.conCard}>
      <h6>{title}</h6>
      <div className={classes.description} dangerouslySetInnerHTML={{ __html: description }} />
      <div className={classes.deleteIconContainer}>
        <DeleteIcon
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(id);
          }}
        />
      </div>
    </div>
  )
}

NoteCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default NoteCard;
