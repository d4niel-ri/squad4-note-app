import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectNotes } from './selectors';
import { getAllNotes, deleteNote } from './actions';
import classes from './style.module.scss';

const Home = ({ notes }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(deleteNote(id));
  };
  useEffect(() => {
    dispatch(getAllNotes());
  }, []);

  return (
    <div className={classes.conHome}>
      <div className={classes.createButton}>
        <button onClick={() => navigate('/add-notes')} type="button">
          Create Note
        </button>
      </div>
      <div className={classes.conGrid}>
        {notes?.map((el) => (
          <div key={el.id} className={classes.conCard}>
            <h6>{el.title}</h6>
            <div className={classes.description} dangerouslySetInnerHTML={{ __html: el?.description }} />
            <div className={classes.deleteIconContainer}>
              <DeleteIcon onClick={() => handleDelete(el.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
Home.propTypes = {
  notes: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  notes: selectNotes,
});

export default connect(mapStateToProps)(Home);
