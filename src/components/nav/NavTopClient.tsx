import React, { useState } from "react";
import { MenuIcon, VideoLogo } from "../../assets";
import { SearchBar } from "../ui";
interface INavTopClientProps {
  className?: string;
  menuMobileOnClick: () => void;
}
const NavTopClient: React.FC<INavTopClientProps> = ({
  className,
  menuMobileOnClick,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <nav
      className={`flex items-center justify-around md:justify-between md:px-10 ${className}`}
    >
      <div className="hidden lg:block">
        <img src={VideoLogo} alt="logo" className="w-11 h-11 rounded-full" />
      </div>
      <button className="block lg:hidden" onClick={menuMobileOnClick}>
        <img src={MenuIcon} alt="menu-icon" className="w-7 h-7" />
      </button>
      <SearchBar
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
