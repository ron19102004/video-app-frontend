/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { IUser } from "./type";
import axios from "axios";
import { myApi } from "../libs/utils/api.utils";
import Cookies from "js-cookie";
import { NavigateFunction } from "react-router-dom";

export interface ILoginProps {
  username: string;
  password: string;
}
export interface IRegisterProps {
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
  fullName: string | undefined;
  phone: string | undefined;
}
export interface IHookAuthProps {
  isLoggingIn: boolean;
  isErrorLogIn: boolean;
  userCurrent: IUser | undefined;
  accessToken: string | undefined;
  login: (data: ILoginProps, navigate: NavigateFunction) => Promise<void>;
  register: (data: IRegisterProps, navigate: NavigateFunction) => Promise<void>;
  logout: () => void;
  checkLoginStart: () => void;
  fetchUserConfirmed: (
    userId: number | string | undefined
  ) => Promise<{ isSubscribing: boolean; user: IUser | null }>;
}

const useAuth = create<IHookAuthProps>((set) => ({
  isLoggingIn: false,
  isErrorLogIn: false,
  userCurrent: undefined,
  accessToken: undefined,
  login: async (data: ILoginProps, navigate: NavigateFunction) => {
    set((state) => ({ ...state, isLoggingIn: true }));
    try {
      const response = await axios.post(myApi.url("auth/login"), data);
      if (response.status === 200 && response.data.status) {
        const data_res: {
          TFA: boolean;
          token: string;
          user: IUser;
          vip: any;
        } = response.data.data;
        set((state) => ({
          ...state,
          isLoggingIn: false,
          userCurrent: data_res.user,
          accessToken: data_res.token,
          isAuthenticated: true,
          isErrorLogIn: false,
        }));
        Cookies.set("access-token", data_res.token, { expires: 4 });
        navigate("/");
      } else {
        alert(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      set((state) => ({ ...state, isErrorLogIn: true }));
    }
  },
  logout: () => {
    set((state) => ({
      ...state,
      isAuthenticated: false,
      userCurrent: undefined,
      accessToken: undefined,
      isErrorLogIn: false,
      isLoggingIn: false,
    }));
    Cookies.remove("access-token");
    window.location.href = "/";
  },
  checkLoginStart: () => {
    try {
      const accessToken = Cookies.get("access-token");
      if (accessToken) {
        axios
          .get(myApi.url("users/info"), {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            if (res.status === 200 && res.data.status) {
              const data: {
                user: IUser;
                vip: any;
              } = res.data.data;
              set((state) => ({
                ...state,
                isAuthenticated: true,
                userCurrent: data.user,
              }));
            } else Cookies.remove("access-token");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  },
  register: async (data: IRegisterProps, navigate: NavigateFunction) => {
    try {
      const response = await axios.post(myApi.url("auth/register"), data);
      if (response.status === 200) {
        alert(response.data.message);
        if (response.data.status) {
          navigate("/auth/login");
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  fetchUserConfirmed: async (userId: number | string | undefined) => {
    if (userId === undefined) return null;
    const token = Cookies.get("access-token");
    try {
      const response = await axios.get(
        myApi.url(
          token === undefined
            ? `users/info-confirmed?id=${userId}`
            : `users/loggedIn/info-confirmed?id=${userId}`
        ),
        token === undefined
          ? {}
          : {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
      );
      if (response.status === 200) {
        if (token !== undefined) {
          return response.data.data;
        }
        return {
          isSubscribing: false,
          user: response.data.data,
        };
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  },
}));
export default useAuth;
