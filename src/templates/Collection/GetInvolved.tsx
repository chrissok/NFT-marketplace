import LargeButton from "@/components/Buttons/LargeButton";
import { IconEnum } from "@/constants/iconEnum";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function GetInvolved() {
  return (
    <>
      <div className="relative bg-[linear-gradient(90deg,_#161B2781.53%,_rgba(22,_27,_39,_0.00)100%)] w-full py-11 px-7 max-w-[1440px] mx-auto flex">
        <div className="bg-black-lighter-1 w-1/2 p-8 rounded-2xl noMinLg:w-full relative">
          <div className="bg-grey-lightest p-3 rounded-lg flex items-center absolute -right-[2%] xs:hidden">
            <Image
              src="/collection/coin.png"
              width={32}
              height={32}
              alt="emergence coin"
            />
            <p className="font-body">Earn Rewards</p>
          </div>
          <div className="flex flex-col w-[70%] gap-y-4 noMinLg:w-full">
            <h1 className="font-header text-grey-lightest text-3xl noMinLg:text-center">
              Get involved & earn rewards
            </h1>
            <p className="text-grey-normal font-body">
              Earn Emergence Coins (EMC) today - and get ready for the benefits
              it provides through our Marketplace and Open Meta.{" "}
            </p>
            <p className="text-grey-normal font-body pt-2">
              Get an early jump on allowlists, air drops and other rewards*.
            </p>
            <Link href={"https://www.emergence.site/quests"}>
              <LargeButton text="View Quests" icon={IconEnum.ArrowRight} />
            </Link>
            <Link
              className="text-green-bright font-body"
              href="https://www.emergence.site/doc/Emergence_Terms_Nov2024.pdf"
            >
              Like everything in life, some conditions apply!
            </Link>
          </div>
        </div>
        <Image
          src="/collection/get-involved.png"
          width={660}
          height={554}
          alt="avatar-img"
          className="absolute right-0 -bottom-[12%] rounded-3xl h-[554px] object-cover noMinLg:hidden"
        />
      </div>
    </>
  );
}

export default GetInvolved;
