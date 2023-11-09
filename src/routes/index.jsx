import MainLayout from '@layouts/MainLayout';

import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: true,
    component: Home,
    layout: MainLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
  { path: '/Login', name: 'Login', protected: false, component: Login, layout: MainLayout },
];

export default routes;
