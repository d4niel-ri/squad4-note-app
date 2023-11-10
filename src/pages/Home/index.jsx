import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import NoteCard from '@components/NoteCard/NoteCard';
import { logoutRequest } from '@containers/Client/actions';
import { selectUser } from '@containers/Client/selectors';
import { ping } from '@containers/App/actions';
import { selectNotes } from './selectors';
import { getAllNotes } from './actions';
import classes from './style.module.scss';

const Home = ({ notes, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idUser = user.id;

  useEffect(() => {
    dispatch(getAllNotes(idUser));
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
      </div>
    </div>
  );
};
Home.propTypes = {
  notes: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  notes: selectNotes,
  user: selectUser,
});

export default connect(mapStateToProps)(Home);
