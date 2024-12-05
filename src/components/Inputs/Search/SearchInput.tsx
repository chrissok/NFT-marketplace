"use client";
import SearchSmall from "@/components/Icons/small/SearchSmall";
import { useState } from "react";

function SearchInput() {
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleClick = () => {
    setIsInputVisible(true);
  };

  const handleInputBlur = () => {
    setIsInputVisible(false);
  };

  if (isInputVisible) {
    return (
      <div className="flex items-center bg-white-3 border border-blue-40 min-w-40 h-10 px-2 rounded-lg gap-3">
        <SearchSmall />
        <input
          type="text"
          autoFocus
          onBlur={handleInputBlur}
          className="transition-all ease-in-out duration-300 focus:outline-none bg-white-3 text-grey-lightest"
          placeholder="Search..."
        />
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`w-10 h-10 text-white font-bold p-2 rounded-lg bg-button-secondary-color hover:bg-button-secondary-color-hover flex items-center justify-center ease-in-out duration-300`}
    >
      <SearchSmall />
    </button>
  );
}

export default SearchInput;
