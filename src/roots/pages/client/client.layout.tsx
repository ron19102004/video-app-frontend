import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth.context";

const ClientLayout: React.FC = () => {
  const { userCurrent } = useContext(AuthContext);
  return (
    <section className="min-w-screen min-h-screen bg-bg-color text-white">
      <nav className="w-full bg-color h-16"> COMING SOON </nav>
      <div className="flex min-h-screen">
        <div className="w-72 min-h-full">COMING SOON</div>
        <main className="flex-1 px-4">
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default ClientLayout;
