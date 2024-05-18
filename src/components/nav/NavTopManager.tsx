import { ClassValue } from "clsx";
import React, { useContext } from "react";
import cn from "../../libs/utils/cn";
import { AuthContext } from "../../contexts/auth.context";
import { HomeIcon,  VideoIcon, VideoLogo } from "../../assets";
import { useNavigate, NavLink } from "react-router-dom";
import { Size } from "../../libs/utils/type.d";
import { Heading, Image } from "../ui";
import ForEach from "../../libs/utils/foreach";
import { Tooltip } from "@chakra-ui/react";
interface INavTopManagerRouter {
  to: string;
  title: string;
  icon: string;
}
const listNav: INavTopManagerRouter[] = [
  {
    to: "/manager/home",
    title: "Home",
    icon: HomeIcon,
  },
  {
    to: "/manager/videos",
    title: "Videos",
    icon: VideoIcon,
  },
];
interface INavTopManagerProps {
  className?: ClassValue;
}
const NavTopManager: React.FC<INavTopManagerProps> = ({ className }) => {
  const { userCurrent } = useContext(AuthContext);
  const navigation = useNavigate();
  return (
    <header className={cn("p-2 flex items-center justify-between", className)}>
      <div className=" lg:flex flex-row  items-center space-x-3">
        <img
          src={VideoLogo}
          alt="logo"
          className="w-11 h-11 rounded-full cursor-pointer"
          onClick={() => {
            navigation("/");
          }}
        />
        <Heading value={`Manager studio`} size={Size.LG} />
      </div>
      <div>
        <Heading
          value={"Hello " + userCurrent?.fullName}
          className="font-1"
          size={Size.XXL}
        />
      </div>
      <nav>
        <ul className="flex justify-center items-center gap-3">
          <ForEach
            list={listNav}
            render={(index: number, item: INavTopManagerRouter) => {
              return (
                <Tooltip label={item.title}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn("bg-bg-container-color px-2 py-1 text-lg rounded-lg", {
                        "bg-primary-content-color font-bold": isActive,
                      })
                    }
                  >
                    <Image src={item.icon} className="w-8 h-8" />
                  </NavLink>
                </Tooltip>
              );
            }}
          />
        </ul>
      </nav>
    </header>
  );
};

export default NavTopManager;
