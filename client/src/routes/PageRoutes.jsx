import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import { CategoriesPage } from 'pages/categories';
import Dashboard from 'layout/Dashboard';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/register')));

// ==============================|| AUTH ROUTING ||============================== //

const PageRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/categories',
      element: <CategoriesPage />
    },
    {
      path: '/register',
      element: <AuthRegister />
    }
  ]
};

export default PageRoutes;
