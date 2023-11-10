import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import NoteCard from '@components/NoteCard/NoteCard';
import { logoutRequest } from '@containers/Client/actions';
import { selectNotes } from './selectors';
import { getAllNotes } from './actions';
import classes from './style.module.scss';

const Home = ({ notes }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllNotes());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(logoutRequest());
    navigate('/login');
  };
  return (
    <div>
      <div className={classes.conHome}>
        <div className={classes.createButton}>
          <button onClick={() => navigate('/add-notes')} type="button">
            Create Note
          </button>
        </div>
        <div className={classes.conGrid}>
          {notes?.map((el) => (
            <NoteCard key={el.id} id={el.id} title={el.title} description={el.description} />
          ))}
        </div>
        <div>
          <FormattedMessage id="app_greeting" />
          <button onClick={handleLogout}>LOGOUT</button>
        </div>
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
