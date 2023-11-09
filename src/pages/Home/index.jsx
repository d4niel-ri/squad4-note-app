import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { pingDB } from '@containers/App/actions';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(ping());
    dispatch(pingDB());
    console.log('PING');
  }, [dispatch]);

  return (
    <div>
      <FormattedMessage id="app_greeting" />
    </div>
  );
};

export default Home;
