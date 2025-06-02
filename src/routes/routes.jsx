/* eslint-disable no-unused-vars */
import { createBrowserRouter } from "react-router-dom";
import Settings from "../component/Main/Settings/Settings";
import MainLayout from "../layout/MainLayout";

import SignIn from "../page/Auth/SignIn/SignIn";
import SignUp from "../page/Auth/SignUp/SingUp";
import DashboardHome from "../page/DashboardHome/DashboardHome";
import UsersPage from "../page/Users/UsersPage";
// import AddItemPage from "../page/AddItem/AddItemPage";
// import AdminRoutes from "./AdminRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <AdminRoutes>
      // </AdminRoutes>
      <MainLayout />
    ),
    errorElement: <h1>Error</h1>,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "/personal-info",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/auth",
    children: [
      { index: true, element: <SignIn /> },
      { path: "signup", element: <SignUp /> }, // ✅ relative path
    ],
  },
]);

export default router;
