import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../../contexts/auth.context";
const HomeManagerPage: React.FC = () => {
  const { userCurrent } = useContext(AuthContext);
  useEffect(() => {
    console.log(userCurrent);
  }, []);
  return <div>home manager</div>;
};

export default HomeManagerPage;
