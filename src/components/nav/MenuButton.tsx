import cn from "../../libs/utils/cn";
import React from "react";
import { ClassValue } from "clsx";
interface IMenuButtonProps {
  className?: ClassValue;
  onClick: () => void;
  isOpen?: boolean;
  icon?: string;
  title: string;
  iconClassName?: ClassValue;
}
const MenuButton: React.FC<IMenuButtonProps> = ({
  className,
  title,
  icon,
  isOpen,
  onClick,
  iconClassName,
}) => {
  return (
    <button onClick={onClick} className={cn("rounded-lg", className)}>
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
    </button>
  );
};
export default MenuButton;
