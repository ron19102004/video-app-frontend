import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
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
  MyProfileInfoPage,
  MyProfileLayout,
  MyProfilePlaylistPage,
  MyProfileVideoPage,
  SearchResultPage,
  UserProfileLayout,
  UserProfilePlaylistPage,
  UserProfileVideoPage,
  VideoPlayerPage,
  VideosNewPage,
} from "./pages/client";
import {
  HomeManagerPage,
  ManagerLayout,
  VideoAdminPage,
} from "./pages/manager";
import { LoginFormPage, RegisterFormPage, AuthLayout } from "./auth";
import { useLocation } from "react-router-dom";

export const useQuery = () => new URLSearchParams(useLocation().search);
export const navigation = (url: string) => {
  window.location.href = url;
};

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
        path: "video",
        element: <Outlet />,
        children: [
          {
            path: ":uploaderId/:slug",
            element: <VideoPlayerPage />,
          },
          {
            path: "new",
            element: <VideosNewPage />,
          },
          {
            path: "search",
            element: <SearchResultPage />,
          },
        ],
      },
      {
        path: "profile",
        element: <MyProfileLayout />,
        children: [
          {
            path: "",
            element: <Navigate to={"playlists"} replace />,
          },
          {
            path: "playlists",
            element: <MyProfilePlaylistPage />,
          },
          {
            path: "videos",
            element: <MyProfileVideoPage />,
          },
          {
            path: "info",
            element: <MyProfileInfoPage />,
          },
        ],
      },
      {
        path: "user/:uid",
        element: <UserProfileLayout />,
        children: [
          {
            path: "",
            element: <Navigate to={"videos"} replace />,
          },
          {
            path: "videos",
            element: <UserProfileVideoPage />,
          },
          {
            path: "playlists",
            element: <UserProfilePlaylistPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/manager",
    element: <ManagerLayout />,
    children: [
      {
        path: "",
        element: <Navigate to={"home"} replace />,
      },
      {
        path: "home",
        element: <HomeManagerPage />,
      },
      {
        path: "videos",
        element: <VideoAdminPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Navigate to={"home"} replace />,
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
