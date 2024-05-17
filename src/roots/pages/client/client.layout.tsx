import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { NavTopClient } from "../../../components/nav";
import { SideBar } from "../../../components/nav";

const ClientLayout: React.FC = () => {
  const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(false);
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsOpenSideBar(true);
    }
  }, []);
  return (
    <section className="min-w-screen min-h-screen bg-bg-color text-white">
      <NavTopClient
        className="w-full bg-color h-16 fixed bg-bg-color z-50"
        menuMobileOnClick={() => {
          setIsOpenSideBar(!isOpenSideBar);
        }}
      />
      <div className="lg:flex min-h-screen pt-16">
        <SideBar
          className="transition-all max-h-screen overflow-auto"
          isOpen={isOpenSideBar}
          changeOpen={() => {
            setIsOpenSideBar(false);
          }}
        />
        <main className="client-layout-main flex-1 px-4 max-h-screen overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default ClientLayout;
