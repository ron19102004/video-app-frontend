/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";
import useAuth, { IHookAuthProps, ILoginProps } from "../hooks/useAuth.hook";
import { NavigateFunction } from "react-router-dom";

export const AuthContext = createContext<IHookAuthProps>({
  isAuthenticated: false,
  isLoggingIn: false,
  isErrorLogIn: false,
  userCurrent: undefined,
  accessToken: undefined,
  login: function (
    _data: ILoginProps,
    _navigate: NavigateFunction
  ): Promise<void> {
    throw new Error("Function not implemented.");
  },
  logout: function (): void {
    throw new Error("Function not implemented.");
  },
  checkLoginStart: function (): void {
    throw new Error("Function not implemented.");
  },
});

const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={useAuth()}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
