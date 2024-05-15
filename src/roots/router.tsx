import { createBrowserRouter, Navigate } from "react-router-dom";
import Error404Page from "./errors/page404.error";
import {
  HomeAdminPage,
  ReportAdminPage,
  AdminLayout,
  CategoryAdminPage,
  CountryAdminPage,
} from "./pages/admin";
import {
  ClientLayout,
  HomePage,
  MyProfilePage,
  UserProfilePage,
  VideoPlayerPage,
  VideosNewPage,
} from "./pages/client";
import { HomeManagerPage, ManagerLayout } from "./pages/manager";
import { LoginFormPage, RegisterFormPage, AuthLayout } from "./auth";
import { useLocation } from "react-router-dom";

export const useQuery = () => new URLSearchParams(useLocation().search);

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
        path: "video/:uploaderId/:slug",
        element: <VideoPlayerPage />,
      },
      { path: "videos/new", element: <VideosNewPage /> },
      {
        path: "profile",
        element: <MyProfilePage />,
      },
      {
        path: "user/:userId",
        element: <UserProfilePage />,
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
      {
        path: "category",
        element: <CategoryAdminPage />,
      },
      {
        path: "country",
        element: <CountryAdminPage />,
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
