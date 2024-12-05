"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

function DrawerButton({ action }: { action: string }) {
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
      <button
        className="bg-black-light noMinLg:rounded-xl py-3 px-8 h-12 noMinLg:hidden group-hover:bg-white-10 
				noMinLg:group-hover:bg-transparent backdrop-blur-2xl text-grey-light text-sm rounded-t-md ease-in-out 
				duration-300"
        onClick={() =>
          router.push(pathname + "?" + createQueryString("drawer", action))
        }
      >
        Details
      </button>
      <div
        className="bg-black-light noMinLg:rounded-xl py-3 xs:py-1 px-8 xs:px-2 h-12 xs:h-5 noMinLg:block hidden
				 group-hover:bg-white-10 noMinLg:group-hover:bg-transparent backdrop-blur-2xl text-grey-light 
				 text-sm rounded-t-md ease-in-out duration-300"
        onClick={() =>
          router.push(pathname + "?" + createQueryString("drawer", action))
        }
      >
        X
      </div>
    </>
  );
}

export default DrawerButton;
