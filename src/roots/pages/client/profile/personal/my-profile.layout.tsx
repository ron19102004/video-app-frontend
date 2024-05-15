import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../../../contexts/auth.context";
import { navigation } from "../../../../router";
import { Outlet } from "react-router-dom";

const MyProfileLayout: React.FC = () => {
  const { userCurrent } = useContext(AuthContext);
  useEffect(() => {
    if (userCurrent === undefined) {
      navigation("/auth/login");
    }
  }, []);
  return (
    <main className="min-h-screen max-h-screen ">
      <div>
        <Outlet />
      </div>
    </main>
  );
};

export default MyProfileLayout;
