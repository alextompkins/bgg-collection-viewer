import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { NewGames } from './components/NewGames/NewGames.tsx';
import { Games } from './pages/Games/Games.tsx';
import { Home } from './pages/Home/Home.tsx';
import { ErrorPage } from './routes/error-page';
import { Root } from './routes/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/games',
        element: <Games />,
      },
      {
        path: '/new-games',
        element: <NewGames />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
