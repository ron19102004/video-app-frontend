import { createBrowserRouter, Navigate } from "react-router-dom";
import Error404Page from "./errors/page404.error";
import { HomeAdminPage, ReportAdminPage, AdminLayout } from "./pages/admin";
import { ClientLayout, HomePage, VideoPlayer } from "./pages/client";
import { HomeManagerPage, ManagerLayout } from "./pages/manager";
import { LoginFormPage, RegisterFormPage, AuthLayout } from "./auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    errorElement: <Error404Page />,
    children: [
      {
        path: "",
        element: <Navigate to={"/home"} />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "video/:slug",
        element: <VideoPlayer />,
      },
    ],
  },
  {
    path: "/manager",
    element: <ManagerLayout />,
    children: [
      {
        path: "",
        element: <Navigate to={"/manager/home"} />,
      },
      {
        path: "home",
        element: <HomeManagerPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Navigate to={"/admin/home"} />,
      },
      {
        path: "home",
        element: <HomeAdminPage />,
      },
      {
        path: "reports",
        element: <ReportAdminPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "register",
        element: <RegisterFormPage />,
      },
    ],
  },
]);
export default router;
