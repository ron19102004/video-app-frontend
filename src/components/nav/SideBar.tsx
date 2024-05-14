/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from "react";
import ForEach from "../../libs/utils/foreach";
import Menu, { IMenuProps } from "./Menu";
import {
  HomeIcon,
  ManagerIcon,
  MenuIcon,
  NewIcon,
  UserIcon,
} from "../../assets";
import cn from "../../libs/utils/cn";
import Heading from "../ui/Heading";
import { AuthContext } from "../../contexts/auth.context";

const menus: IMenuProps[] = [
  {
    to: "/home",
    icon: HomeIcon,
    title: "Home",
  },
  {
    to: "/profile",
    icon: UserIcon,
    title: "Profile",
  },
  {
    to: "/videos/new",
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
  const { userCurrent } = useContext(AuthContext);
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
          render={(_index: number, item: IMenuProps) => {
            return (
              <Menu
                to={item.to}
                icon={item.icon}
                title={item.title}
                isOpen={isOpen}
                onClick={changeOpen}
              />
            );
          }}
        />
        {userCurrent?.confirmed && (
          <Menu
            to={"/manager"}
            icon={ManagerIcon}
            title={"Manager Studio"}
            isOpen={isOpen}
            onClick={changeOpen}
          />
        )}
      </ul>
      <hr className="mt-3" />
    </section>
  );
};

export default SideBar;
