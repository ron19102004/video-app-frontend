import React, { useContext, useState } from "react";
import { MenuIcon, VideoLogo } from "../../assets";
import { SearchBar } from "../ui";
import { ClassValue } from "clsx";
import { AuthContext } from "../../contexts/auth.context";
import Heading from "../ui/Heading";
import { Size } from "../../libs/utils/type.d";
import { navigation } from "../../roots/router";
interface INavTopClientProps {
  className?: ClassValue;
  menuMobileOnClick: () => void;
}
const NavTopClient: React.FC<INavTopClientProps> = ({
  className,
  menuMobileOnClick,
}) => {
  const { userCurrent } = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <nav
      className={`flex items-center justify-around md:justify-between md:px-8 ${className}`}
    >
      <div className="hidden lg:flex flex-row  items-center space-x-3">
        <button className="" onClick={menuMobileOnClick}>
          <img src={MenuIcon} alt="menu-icon" className="w-7 h-7" />
        </button>
        <img
          src={VideoLogo}
          alt="logo"
          className="w-11 h-11 rounded-full cursor-pointer"
          onClick={() => {
            navigation("/");
          }}
        />
        {userCurrent?.fullName && (
          <Heading value={`Welcome ${userCurrent?.fullName}`} size={Size.LG} />
        )}
      </div>
      <button className="block lg:hidden" onClick={menuMobileOnClick}>
        <img src={MenuIcon} alt="menu-icon" className="w-7 h-7" />
      </button>
      <SearchBar
        placeholder="Search: florida"
        onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
          setSearchValue(e.target.value);
        }}
        value={searchValue}
        onSearch={function (): void {}}
      />
    </nav>
  );
};

export default NavTopClient;
