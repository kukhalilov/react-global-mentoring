import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './state/store';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import Root from './Root';
import ErrorPage from './components/errorPage/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/search" />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/search/:searchQuery?',
    element: <Root />,
  },
]);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
