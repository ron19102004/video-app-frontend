import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";

const AuthLayout: React.FC = () => {
  const { userCurrent } = useContext(AuthContext);
  useEffect(() => {
    if (userCurrent === undefined) {
      window.location.href = "/";
    }
  }, [userCurrent]);
  return (
    <main className="bg-bg-color min-w-screen min-h-screen md:flex md:flex-col md:justify-center md:items-center text-white ">
      <section className="md:bg-bg-container-color w-full md:w-[754px] lg:w-[840px] xl:w-[1020px] md:flex p-10 rounded-xl space-y-6 md:space-y-0">
        <Outlet />
      </section>
    </main>
  );
};

export default AuthLayout;
