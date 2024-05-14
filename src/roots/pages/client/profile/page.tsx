import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../../contexts/auth.context";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const { userCurrent } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userCurrent) navigate("/auth/login");
  }, []);
  return <div>COMING SOON</div>;
};

export default ProfilePage;
