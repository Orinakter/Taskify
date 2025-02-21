import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayOut from './Root/MainLayOut.jsx';
import HomePage from './Pages/HomePage';
import TaskManagement from './Pages/TaskManagement.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    children:[
      {
        path:"/",
        element:<HomePage></HomePage>
      },
      {
        path:"/task-management",
        element:<TaskManagement></TaskManagement>
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/register",
        element:<Register></Register>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
   </StrictMode>,
)
