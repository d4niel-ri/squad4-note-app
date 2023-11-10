import MainLayout from '@layouts/MainLayout';
import Detail from '@pages/Detail';

import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import AddNotes from '@pages/AddNotes';
import Register from '@pages/Register';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: true,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/add-notes',
    name: 'AddNotes',
    protected: false,
    component: AddNotes,
    layout: MainLayout,
  },
  {
    path: '/detail/:ID_note',
    name: 'Detail',
    protected: false,
    component: Detail,
    layout: MainLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
  { path: '/Login', name: 'Login', protected: false, component: Login, layout: MainLayout },
  { path: '/Register', name: 'Register', protected: false, component: Register, layout: MainLayout },
];

export default routes;
