import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth.context";
import { NavTopClient } from "../../../components/nav";
import { SideBar } from "../../../components/nav";

const ClientLayout: React.FC = () => {
  const { userCurrent } = useContext(AuthContext);
  return (
    <section className="min-w-screen min-h-screen bg-bg-color text-white">
      <NavTopClient
        className="w-full bg-color h-16"
        menuMobileOnClick={() => {}}
      />
      <div className="lg:flex min-h-screen">
        <SideBar className="hidden lg:block w-72 min-h-full" />
        <main className="flex-1 px-4">
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default ClientLayout;
