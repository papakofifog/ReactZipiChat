import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { createContext, useContext } from "react";
import ErrorPage from "./components/utility_components/errorpage";
import "./assets/css/App.css";
import Homepage from "./components/Pages/Homepage";
import { QueryClient, QueryClientProvider } from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools';
import UserAuthentication from "./components/Pages/Authentication";


//Create a context for the query client
const QueryClientContext = createContext(null);

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
    <QueryClientContext.Provider value={queryClient}>
        <QueryClientProvider client={queryClient}>  
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} position='top-right'/>
      </QueryClientProvider>
    </QueryClientContext.Provider>
    
  );
}

// Custom hook to access the query client
function useQueryClient() {
  const context = useContext(QueryClientContext);
  if (!context) {
    throw new Error("useQueryClient must be used within a QueryClientProvider");
  }
  return context;
}


export {useQueryClient, App as default};
