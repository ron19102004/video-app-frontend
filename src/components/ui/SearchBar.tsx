import React from "react";
import { SearchIcon } from "../../assets";
import { ClassValue } from "clsx";

interface ISearchBarProps {
  className?: ClassValue;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  onSearch: () => void;
}
const SearchBar: React.FC<ISearchBarProps> = ({
  onChange,
  className,
  value,
  placeholder,
  onSearch,
}) => {
  return (
    <div className={`flex ${className}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`outline-none bg-bg-color ring-1 ring-bg-container-color focus:ring-primary-content-color h-10 sm:w-80 md:w-96 px-4 rounded-s-full mr-[0.13rem]`}
      />
      <button
        className="flex justify-center items-center h-10 w-14 md:w-16 ring-1 ring-bg-container-color bg-bg-container-color hover:bg-primary-content-color rounded-e-full"
        onClick={onSearch}
      >
        <img src={SearchIcon} alt="search-icon" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchBar;
