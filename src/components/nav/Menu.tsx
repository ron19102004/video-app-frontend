import React from "react";
import { NavLink } from "react-router-dom";

export interface IMenuProps {
  className?: string;
  to: string;
  icon: string;
  title: string;
}

const Menu: React.FC<IMenuProps> = ({ className, to, title, icon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col md:flex-row items-center space-x-4 py-2 px-3  rounded-lg h-14 ${
          isActive ? ` font-bold bg-primary-content-color ` : ` `
        } ${className}`
      }
    >
      <div>
        <img src={icon} alt={icon} className="w-6 h-6" />
      </div>
      <h1 className="text-base">{title}</h1>
    </NavLink>
  );
};

export default Menu;
