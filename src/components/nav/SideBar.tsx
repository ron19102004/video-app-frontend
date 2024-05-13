/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ForEach from "../../libs/utils/foreach";
import Menu, { IMenuProps } from "./Menu";
import { HomeIcon, NewIcon, UserIcon } from "../../assets";

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
    to: "/",
    icon: NewIcon,
    title: "New",
  },
];

interface ISideBarProps {
  className?: string;
}
const SideBar: React.FC<ISideBarProps> = ({ className }) => {
  return (
    <section className={` px-5 ${className} max-h-screen overflow-auto`}>
      <ul className="space-y-4">
        <ForEach
          list={menus}
          render={(_index: number, item: IMenuProps) => {
            return <Menu to={item.to} icon={item.icon} title={item.title} />;
          }}
        />
      </ul>
      <hr className="mt-3"/>
    </section>
  );
};

export default SideBar;
