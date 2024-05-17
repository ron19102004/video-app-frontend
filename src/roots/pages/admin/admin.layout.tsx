import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth.context";
import { ERole } from "../../../hooks/type";

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const { userCurrent , isAuthenticated} = useContext(AuthContext);
  if (!isAuthenticated) {
    navigate("/auth/login", { replace: true });
    return;
  }
  if (userCurrent && userCurrent?.role !== ERole.admin) {
    navigate("/", { replace: true });
    return;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
