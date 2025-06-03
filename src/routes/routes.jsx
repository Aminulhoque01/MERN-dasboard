/* eslint-disable no-unused-vars */
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

import ShopDetail from "../component/Main/ShopDetails/ShopeDetails";
import SignIn from "../page/Auth/SignIn/SignIn";
import SignUp from "../page/Auth/SignUp/SingUp";
import DashboardHome from "../page/DashboardHome/DashboardHome";
 

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <h1>Error</h1>,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },

      {
        path: "/shop/:shopName", // ✅ dynamic path for shop details
        element: <ShopDetail />,
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
