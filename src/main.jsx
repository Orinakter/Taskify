import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayOut from "./Root/MainLayOut.jsx";
import HomePage from "./Pages/HomePage";
import TaskManagement from "./Pages/TaskManagement.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import { ToastContainer, toast } from "react-toastify";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/task-management",
        element: (
          <PrivateRoute>
            <TaskManagement></TaskManagement>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
    <ToastContainer></ToastContainer>
  </AuthProvider>
);
