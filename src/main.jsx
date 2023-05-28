import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import SignIn from './components/authentication/signIn';
import SignUp from './components/authentication/signUp';


import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import ErrorPage from './components/errorpage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn/>,
    errorElement: <ErrorPage />
  },
  {
    path: "/signUp",
    element: <SignUp />,
    errorElement: <ErrorPage />
  },
  {
    path: "/home",
    element: <App />,
    errorElement: <ErrorPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
