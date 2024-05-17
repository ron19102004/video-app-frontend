import React, { useState } from "react";
import { SearchIcon } from "../../assets";
import { ClassValue } from "clsx";

interface ISearchBarProps {
  className?: ClassValue;
  placeholder?: string;
  value?: string;
  onSearch: (value: string) => void;
}
const SearchBar: React.FC<ISearchBarProps> = ({
  className,
  placeholder,
  onSearch,
}) => {
  const [value, setValue] = useState<string>("");
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(value);
    }
  };
  return (
    <div className={`flex ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder={placeholder}
        className={`outline-none bg-bg-color ring-1 ring-bg-container-color focus:ring-primary-content-color h-10 sm:w-80 md:w-96 px-4 rounded-s-full mr-[0.13rem]`}
        onKeyDown={handleKeyDown}
      />
      <button
        className="flex justify-center items-center h-10 w-14 md:w-16 ring-1 ring-bg-container-color bg-bg-container-color hover:bg-primary-content-color rounded-e-full"
        onClick={() => {
          onSearch(value);
        }}
      >
        <img src={SearchIcon} alt="search-icon" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchBar;
