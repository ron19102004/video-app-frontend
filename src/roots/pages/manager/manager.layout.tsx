import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth.context";
import { NavTopManager } from "../../../components/nav";

const ManagerLayout: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <section className="min-w-screen min-h-screen bg-bg-color text-white">
      <NavTopManager />
      <main className="px-5">
        <Outlet />
      </main>
    </section>
  );
};
export default ManagerLayout;
