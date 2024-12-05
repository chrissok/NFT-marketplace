"use client";
import LargeButton from "@/components/Buttons/LargeButton";
import { IconEnum } from "@/constants/iconEnum";
import Image from "next/image";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
        className="absolute flex justify-center bg-white-3 border border-white-10 py-40 font-header 
			text-3xl xs:text-xl xs:py-20 text-grey-lightest backdrop-blur bottom-[20%] xs:bottom-[40%] left-[21%] xs:left-[1%] 
			rounded-t-[70px] w-[60%] xs:w-[98%] text-center"
      >
        <p className="w-fit">Oops! Something went wrong</p>
      </div>
      <div
        className="absolute bg-white-3 border border-white-10 py-20 font-header text-5xl xs:py-10
			noMinLg:text-2xl text-grey-lightest backdrop-blur bottom-[48%] xs:bottom-[65%] left-[26%] xs:left-[1%]
			 rounded-[70px] xs:w-[98%] w-1/2 text-center"
      >
        Unexpected Error.
      </div>
      <div
        className="bg-black-main flex noMinLg:flex-col noMinLg:items-center noMinLg:text-center noMinLg:gap-y-3 p-14 
				absolute left-[23.5%] w-[55%] xs:w-[98%] xs:left-[1%]
			min-w-[300px] shadow-[0px_4px_46.6px_0px_rgba(173,_114,_233,_0.34)] bottom-[10%] xs:bottom-[15%] justify-between rounded-3xl"
      >
        <p className="text-grey-light text-lg font-body w-[350px]">
          Don’t worry, something went wrong on our end. We are working on fixing
          it.
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
