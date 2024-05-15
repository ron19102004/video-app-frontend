import { ClassValue } from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";
import cn from "../../libs/utils/cn";

export interface IMenuLinkProps {
  className?: ClassValue;
  to: string;
  icon: string;
  title: string;
  isOpen?: boolean;
  onClick?: () => void;
  iconClassName?: ClassValue;
}

const MenuLink: React.FC<IMenuLinkProps> = ({
  className,
  to,
  title,
  icon,
  isOpen,
  onClick,
  iconClassName,
}) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "rounded-lg",
          {
            "font-extrabold text-primary-content-color": isActive,
          },
          className
        )
      }
    >
      <div
        className={cn("flex", {
          "flex-row items-center space-x-4 px-3 lg:h-12": isOpen,
          "flex-col justify-center items-center ": !isOpen,
        })}
      >
        <img src={icon} alt={icon} className={cn("w-7 h-7", iconClassName)} />
        <h1
          className={cn("text-ellipsis line-clamp-1", {
            "max-w-20": !isOpen,
          })}
        >
          {title}
        </h1>
      </div>
    </NavLink>
  );
};
export default MenuLink;
