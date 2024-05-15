/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useContext, useState } from "react";
import ForEach from "../../libs/utils/foreach";
import MenuLink, { IMenuLinkProps } from "./MenuLink";
import {
  AdminIcon,
  HomeIcon,
  LogoutIcon,
  ManagerIcon,
  NewIcon,
  UserIcon,
} from "../../assets";
import cn from "../../libs/utils/cn";
import { AuthContext } from "../../contexts/auth.context";
import MenuButton from "./MenuButton";
import { ERole } from "../../hooks/type";
const menus: IMenuLinkProps[] = [
  {
    to: "/home",
    icon: HomeIcon,
    title: "Home",
  },
  {
    to: `/profile`,
    icon: UserIcon,
    title: "Profile",
  },
  {
    to: "/video/new",
    icon: NewIcon,
    title: "New",
  },
];

interface ISideBarProps {
  className?: string;
  isOpen: boolean;
  changeOpen?: () => void;
}
const SideBar: React.FC<ISideBarProps> = ({
  className,
  isOpen,
  changeOpen,
}) => {
  const { userCurrent, logout } = useContext(AuthContext);
  return (
    <section
      className={cn(
        "px-5 max-h-screen overflow-auto lg:block fixed top-0 lg:static min-h-full z-10 bg-bg-color",
        {
          "w-full lg:w-72": isOpen,
          hidden: !isOpen,
        },
        className
      )}
    >
      <ul className="flex flex-col space-y-4 transition-all pt-16 lg:pt-0">
        <ForEach
          list={menus}
          render={(_index: number, item: IMenuLinkProps) => {
            return (
              <MenuLink
                to={item.to}
                icon={item.icon}
                title={item.title}
                isOpen={isOpen}
                onClick={changeOpen}
              />
            );
          }}
        />
      </ul>
      <hr className="my-3" />
      <ul className="flex flex-col space-y-4 transition-all">
        {userCurrent !== undefined ? (
          <Fragment>
            {userCurrent?.confirmed && (
              <MenuLink
                to={"/manager"}
                icon={ManagerIcon}
                title={"Manager Studio"}
                isOpen={isOpen}
                onClick={changeOpen}
              />
            )}
            {userCurrent?.role === ERole.admin && (
              <MenuLink
                to={"/admin"}
                icon={AdminIcon}
                title={"Admin Management"}
                isOpen={isOpen}
                onClick={changeOpen}
              />
            )}
            <MenuButton
              icon={LogoutIcon}
              onClick={logout}
              title="Log out"
              isOpen={isOpen}
              iconClassName="rotate-180"
            />
          </Fragment>
        ) : (
          <Fragment>
            <MenuButton
              icon={LogoutIcon}
              onClick={() => {
                window.location.href = "/auth/login";
              }}
              title="Sign in"
              isOpen={isOpen}
            />
          </Fragment>
        )}
      </ul>
    </section>
  );
};

export default SideBar;
