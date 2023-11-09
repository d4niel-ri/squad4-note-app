import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { ping } from '@containers/App/actions';
import { logoutRequest } from '@containers/Client/actions';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(ping());
  // }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(logoutRequest());
    navigate('/login');
  };
  return (
    <div>
      <FormattedMessage id="app_greeting" />
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
};

export default Home;
