import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/details/:cityName',
    element: <Details />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
