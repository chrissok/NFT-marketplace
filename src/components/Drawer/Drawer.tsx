import { ReactNode } from "react";
import DrawerButton from "./DrawerButton";
import Link from "next/link";

type DrawerProps = {
  children: ReactNode;
  isOpen: boolean;
};

export default function Drawer({ children, isOpen }: DrawerProps) {
  return (
    <div
      className={
        "fixed overflow-hidden bg-black-light bg-opacity-50 inset-0 transform ease-in-out z-50" +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0 ease-out"
          : " transition-all delay-500 opacity-0 translate-x-full ")
      }
    >
      <div
        className={
          "noMinLg:w-full w-[50%] right-0 absolute bg-black-light h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <div className="relative overflow-y-scroll h-full scrollbar-none">
          {children}
        </div>

        {/* close button */}
        {isOpen && (
          <div className="absolute left-[-6%] z-30 bottom-[22%] noMax:left-[-3%] smallScreen:left-0 smallScreen:bottom-[93%] xs:top-0 xs:left-[93%] xs:h-2 cursor-pointer">
            <div className="relative group">
              <Link href="?drawer=close" className="cursor-pointer">
                <div className="absolute bg-grey-medium rounded-full p-2 z-10 left-[15%] top-[15%] noMinLg:hidden group-hover:bg-white-10 ease-in-out duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M3.32829 3.32861L8.98515 8.98547"
                      stroke="#F1F7FA"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8.9854 3.32861L3.32854 8.98547"
                      stroke="#F1F7FA"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </Link>
              <div className="-rotate-90 group noMinLg:rotate-0">
                <DrawerButton action="close" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* to do: move to a client component */}
      {/* <div
        className="w-screen h-full cursor-pointer"
        onClick={() => {
          setIsOpen(false);
        }}
      ></div> */}
    </div>
  );
}
