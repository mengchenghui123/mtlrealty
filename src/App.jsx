import React from 'react'
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Rent from './pages/Rent';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/rent",
    element: <Rent />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
