import "./assets/css/App.css";
import Homepage from "./components/Pages/Homepage";
import SignIn from "./components/Pages/signIn";
import SignUp from "./components/Pages/signUp";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./components/utility_components/errorpage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignIn />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/signUp",
      element: <SignUp />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/home",
      element: <Homepage />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
