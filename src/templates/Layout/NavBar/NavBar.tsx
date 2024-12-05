import Emergence from "@/components/Icons/standard/Emergence";
import NavTabs from "@/components/Tabs/NavTabs";
import { navBarTabs } from "@/constants/tabs";
import WalletButton from "./WalletButton";
import Link from "next/link";

function NavBar() {
  return (
    // nav bar has to be absolute so the homepage grid background doesn't get pushed down, we compensate these with padding on other layouts
    <div className="px-8 py-6 flex justify-between absolute w-screen z-10 xs:px-1 xs:py-1">
      <div className="flex items-center gap-10 xs:gap-2 ml-4 xs:ml-1">
        <Link href="/">
          <Emergence />
        </Link>
        <NavTabs tabs={navBarTabs} />
      </div>
      <div className="flex gap-4 xs:gap-1 items-center">
        <div className="bg-black-lighter-1 md:text-xs md:text-center rounded-md text-grey-lightest xs:px-1 px-3 py-[6px] border border-[#262B36] font-body hover:bg-black-lighter-2">
          <a href={"https://www.emergence.site/"} target="_blank">
            Open Hub
          </a>
        </div>
        <WalletButton />
      </div>
    </div>
  );
}

export default NavBar;
