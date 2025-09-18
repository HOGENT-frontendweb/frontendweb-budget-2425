// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import TransactionList from './pages/transactions/TransactionList';
import PlacesList from './pages/places/PlacesList';
import PlaceDetail from './pages/places/PlaceDetail.jsx';
import NotFound from './pages/NotFound';
import About, { Services, History, Location } from './pages/about/About.jsx';
import Layout from './pages/Layout';
import './index.css';
import AddOrEditTransaction from './pages/transactions/AddOrEditTransaction.jsx';
import { ThemeProvider } from './contexts/Theme.context';
import { AuthProvider } from './contexts/Auth.context';
import Login from './pages/Login.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Logout from './pages/Logout.jsx';
import Register from './pages/Register.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Navigate replace to='/transactions' />,
      },
      {
        path: '/transactions',
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <TransactionList />,
          },
          {
            path: 'add',
            element: <AddOrEditTransaction />,
          },
          {
            path: 'edit/:id',
            element: <AddOrEditTransaction />,
          },
        ],
      },
      {
        path: '/places',
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <PlacesList />,
          },
          {
            path: ':id',
            element: <PlaceDetail />,
          },
        ],
      },
      {
        path: 'about',
        element: <About />,
        children: [
          {
            path: 'services',
            element: <Services />,
          },
          {
            path: 'history',
            element: <History />,
          },
          {
            path: 'location',
            element: <Location />,
          },
        ],
      },
      {
        path: 'services',
        element: <Navigate to='/about/services' replace />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/logout',
        element: <Logout />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);
