import './index.css';

import { render } from 'preact';
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

render(<RouterProvider router={router} />, document.getElementById('root')!);
