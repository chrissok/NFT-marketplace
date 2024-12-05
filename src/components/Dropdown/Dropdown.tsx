"use client";

import { ReactNode, useRef, useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";

function Dropdown({
  children,
  label,
  enableCloseOnClick = false,
  componentLabel,
  styles,
}: {
  styles?: string;
  children: ReactNode;
  label?: string;
  enableCloseOnClick?: boolean;
  componentLabel?: ReactNode;
}) {
  const [dropDown, setDropDown] = useState(false);
  const ref = useRef(null);

  const handleDropDown = () => {
    setDropDown(!dropDown);
  };

  useOutsideClick(ref, () => {
    if (dropDown) setDropDown(false);
  });

  const handleClick = () => {
    enableCloseOnClick && setDropDown(false);
  };

  return (
    <div className="relative min-w-36 xs:min-w-0" ref={ref}>
      <button
        onClick={handleDropDown}
        className={`flex items-center justify-between pl-4 py-2 pr-3 xs:px-0 xs:w-fit xs:gap-1 w-full bg-white-6 rounded-lg hover:bg-white-10 ${styles}`}
      >
        {label && (
          <p className="font-body text-grey-lightest lg:text-base md:text-sm sm:text-sm">
            {label}
          </p>
        )}
        {componentLabel && componentLabel}
        <div className="">
          {dropDown ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M9.49805 7.4751L5.99805 4.9751L2.49805 7.4751V6.2501L5.99805 3.7501L9.49805 6.2501V7.4751Z"
                fill="#93A3B2"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 8"
              fill="none"
            >
              <path
                d="M0.498045 0.75L3.99805 3.25L7.49805 0.75V1.975L3.99805 4.475L0.498045 1.975V0.75Z"
                fill="#93A3B2"
              />
            </svg>
          )}
        </div>
      </button>
      {dropDown && (
        <div
          className="absolute w-full z-20 xs:w-fit xs:left-[-50%]"
          onClick={handleClick}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
