"use client";
import Dropdown from "@/components/Dropdown";
import PosesSVG from "./PosesSVG";
import AnimationSVG from "./AnimationSVG";
import Link from "next/link";

function AnimationDropdown() {
  return (
    <>
      <Dropdown
        enableCloseOnClick
        componentLabel={
          <div className="flex items-center gap-[6px]">
            <div className="bg-black-light p-[6px] rounded-md">
              <AnimationSVG />
            </div>
            <div className="font-body text-sm text-grey-light">Animation</div>
          </div>
        }
      >
        <div className="bg-grey-medium rounded-xl mt-2">
          <Link
            href={"?animation=dance"}
            className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-white-6"
          >
            <p className="font-body text-grey-lightest text-base">Dance</p>
          </Link>
          <Link
            href={"?animation=jump"}
            className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-white-6"
          >
            <p className="font-body text-grey-lightest text-base">Jump</p>
          </Link>
          <Link
            href={"?animation=idle"}
            className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-white-6"
          >
            <p className="font-body text-grey-lightest text-base">Idle</p>
          </Link>
        </div>
      </Dropdown>
      <Dropdown
        enableCloseOnClick
        componentLabel={
          <div className="flex items-center gap-[6px]">
            <div className="bg-black-light p-[6px] rounded-md">
              <PosesSVG />
            </div>
            <div className="font-body text-sm text-grey-light">Poses</div>
          </div>
        }
      >
        <div className="bg-grey-medium rounded-xl mt-2">
          <Link
            href={"?animation=t-pose"}
            className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-white-6"
          >
            <p className="font-body text-grey-lightest text-base">T-Pose</p>
          </Link>
          <Link
            href={"?animation=standing"}
            className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-white-6"
          >
            <p className="font-body text-grey-lightest text-base">Standing</p>
          </Link>
          <Link
            href={"?animation=punch"}
            className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-white-6"
          >
            <p className="font-body text-grey-lightest text-base">Punch</p>
          </Link>
        </div>
      </Dropdown>
    </>
  );
}

export default AnimationDropdown;
