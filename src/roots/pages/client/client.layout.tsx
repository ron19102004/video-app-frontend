import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth.context";

const ClientLayout: React.FC = () => {
  const { userCurrent } = useContext(AuthContext);
  return (
    <main>
      {userCurrent?.fullName} // test
      <Outlet />
    </main>
  );
};

export default ClientLayout;
