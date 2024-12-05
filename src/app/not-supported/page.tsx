"use client";
import LargeButton from "@/components/Buttons/LargeButton";
import { IconEnum } from "@/constants/iconEnum";
import Image from "next/image";
import Link from "next/link";

export default function NotSupported() {
  return (
    <div className="h-screen relative w-full">
      <Image
        src="/error/error-bg.png"
        width={1980}
        height={990}
        alt="background"
        className="absolute object-cover h-[80vh] rounded-b-[160px] w-full opacity-80"
      />
      <div
        className="absolute flex justify-center bg-white-3 border border-white-10 py-40 xs:py-20 font-header 
			text-3xl xs:text-xl text-grey-lightest backdrop-blur bottom-[20%] xs:bottom-[45%] left-[21%] xs:left-[1%] rounded-t-[70px] w-[60%] xs:w-[98%] 
			text-center"
      >
        <p className="w-fit">Collection Not Supported</p>
      </div>
      <div
        className="absolute bg-white-3 border border-white-10 py-20 xs:py-10
			font-header text-5xl xs:text-2xl noMinLg:text-2xl text-grey-lightest backdrop-blur
			bottom-[48%] left-[26%] rounded-[70px] w-1/2 text-center xs:w-[98%] xs:left-[1%] xs:bottom-[65%]"
      >
        This Collection Is Not Currently Supported by IAS.
      </div>
      <div
        className="bg-black-main flex noMinLg:flex-col noMinLg:items-center noMinLg:text-center 
			noMinLg:gap-y-3 p-14 absolute left-[23.5%] w-[55%] min-w-[300px] xs:left-[1%] xs:w-[98%] 
			shadow-[0px_4px_46.6px_0px_rgba(173,_114,_233,_0.34)] bottom-[10%] justify-between rounded-3xl"
      >
        <p className="text-grey-light text-lg font-body w-[350px]">
          Unfortunately, we don’t support this collection at the moment. Check
          back soon, as we are continually expanding our support for new
          collections.
        </p>
        <Link href={"/"}>
          <LargeButton
            text="Back to home"
            icon={IconEnum.ArrowRightBig}
            styles="!w-[190px]"
          />
        </Link>
      </div>
    </div>
  );
}
