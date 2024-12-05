"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

function DetailsDrawerButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <>
      <div className="relative group">
        <div
          className="absolute bg-grey-medium rounded-full cursor-pointer p-2 z-10 -left-[35%] -top-[55%] group-hover:bg-white-10 ease-in-out duration-300"
          onClick={() =>
            router.push(pathname + "?" + createQueryString("drawer", "open"))
          }
        >
          <ArrowsIcon />
        </div>
        <div className="-rotate-90 group">
          <button
            className="bg-white-3 border border-white-20 py-3 px-8 h-12 group-hover:bg-white-10 backdrop-blur-2xl text-grey-light text-sm rounded-md ease-in-out duration-300"
            onClick={() =>
              router.push(pathname + "?" + createQueryString("drawer", "open"))
            }
          >
            Details
          </button>
        </div>
      </div>
    </>
  );
}

export default DetailsDrawerButton;

const ArrowsIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M5.5 8.5L3 6L5.5 3.5"
        stroke="#F1F7FA"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 8.5L6.5 6L9 3.5"
        stroke="#F1F7FA"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
