"use client";

import Dropdown from "@/components/Dropdown";
import Profile from "@/components/Icons/standard/Profile";
import { formatAddress } from "@/utils/formatString";
import DashboardSVG from "./DashboardSVG";
// import PlaygroundsSVG from "./PlaygroundsSVG";
import LogoutSVG from "./LogoutSVG";
import Link from "next/link";
import { useDisconnect } from "@web3modal/ethers5/react";
import Cookies from "js-cookie"; // Import js-cookie to manage cookies

type ProfileWidgetProps = {
  address: `0x${string}` | undefined;
};

function ProfileWidget({ address }: ProfileWidgetProps) {
  const { disconnect } = useDisconnect();

  const handleLogout = () => {
    // Remove the walletConnected cookie
    Cookies.remove("walletConnected");
    // Disconnect the wallet
    disconnect();
  };

  return (
    <Dropdown
      styles="!bg-black-light !border !border-[#262B36]"
      componentLabel={
        <div className="rounded-lg pl-1 pr-3 flex gap-4 xs:gap-0 xs:pr-0 xs:pl-1 items-center cursor-pointer bg-black-light">
          {" "}
          <div className="xs:hidden">
            <Profile />
          </div>
          <p className="font-body text-grey-lightest text-base xs:text-xs">
            {address && formatAddress(address)}
          </p>
        </div>
      }
    >
      <div className="bg-black-lighter-1 flex flex-col text-grey-light text-sm font-body cursor-pointer gap-y-4 rounded-xl mt-1">
        <Link
          href={`/profile/${address}`}
          className="flex items-center gap-2 hover:bg-black-lighter-2 pt-2 pb-1 px-4 rounded-xl"
        >
          <DashboardSVG />
          Dashboard
        </Link>
        {/* <Link
          href={`/my-playgrounds/${address}`}
          className="flex items-center gap-2 py-1 px-4 rounded-xl hover:bg-black-lighter-2"
        >
          <PlaygroundsSVG />
          My Playgrounds
        </Link> */}
        <div
          className="flex items-center gap-2 pb-2 pt-1 px-4 rounded-xl hover:bg-black-lighter-2"
          onClick={handleLogout}
        >
          <LogoutSVG />
          <button className="text-red-main">Log out</button>
        </div>
      </div>
    </Dropdown>
  );
}

export default ProfileWidget;
