import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth.context";
import { ERole } from "../../../hooks/type";
import { NavTopAdmin } from "../../../components/nav";

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const { userCurrent, isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) {
    navigate("/auth/login", { replace: true });
    return;
  }
  if (userCurrent && userCurrent?.role !== ERole.admin) {
    navigate("/", { replace: true });
    return;
  }
  return (
    <section className="min-w-screen min-h-screen bg-bg-color text-white">
      <NavTopAdmin />
      <main>
        <Outlet />
      </main>
    </section>
  );
};

export default AdminLayout;
