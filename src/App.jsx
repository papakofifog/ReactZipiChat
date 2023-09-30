import { createBrowserRouter, RouterProvider } from "react-router-dom";


import ErrorPage from "./components/utility_components/errorpage";
import "./assets/css/App.css";
import Homepage from "./components/Pages/Homepage";
import { QueryClient, QueryClientProvider } from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools';
import UserAuthentication from "./components/Pages/Authentication";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserAuthentication />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/home",
      element: <Homepage />,
      errorElement: <ErrorPage />,
    },
  ]);

  const queryClient= new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>  
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
    </QueryClientProvider>
  );
}

export default App;
