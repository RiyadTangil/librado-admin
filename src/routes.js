import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import User from './pages/User';
import NotFound from './pages/Page404';
import Questions from './pages/Questions';
import CreateCompany from './pages/CreateCompany';
import Welcome from './pages/Welcome';
import GetStarted from './pages/GetStarted';
import HappinessFactor from './pages/HappinessFactor';
import Statements from './pages/Statements';
import Reports from './pages/Reports';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'questions', element: <Questions /> },
        { path: 'create-company', element: <CreateCompany /> },
        { path: 'welcome', element: <Welcome /> },
        { path: 'getting-started', element: <GetStarted /> },
        { path: 'happiness-factor', element: <HappinessFactor /> },
        { path: 'statements', element: <Statements /> },
        { path: 'reports', element: <Reports /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
