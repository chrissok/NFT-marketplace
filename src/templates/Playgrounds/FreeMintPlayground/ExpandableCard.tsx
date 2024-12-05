"use client";
import AvatarWithName from "@/components/Avatar/AvatarWithName";
import Image from "next/image";
import ButtonIcon from "@/components/Buttons/ButtonIcon";
import { IconEnum } from "@/constants/iconEnum";
import { useState } from "react";
import { clsx } from "clsx";
import ArrowUp from "../PlaygroundsSelector/ArrowUp";
import ArrowDown from "../PlaygroundsSelector/ArrowDown";

function ExpandableCard({
  isExpanded,
  onHover,
  onMouseLeave,
}: {
  isExpanded: boolean;
  onHover: VoidFunction;
  onMouseLeave: VoidFunction;
}) {
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);

  const handleInfoClick = () => {
    setIsInfoExpanded((prev) => !prev);
  };
  return (
    <div
      className={`relative transition-all duration-300 ${isExpanded ? "flex-[3]" : "flex-[1]"} cursor-pointer`}
      onMouseEnter={onHover}
      onMouseLeave={onMouseLeave}
    >
      {isExpanded ? (
        //How to make this appear in a fade in way???
        <div
          className={`transition-opacity duration-500 ${isExpanded ? "opacity-100" : "opacity-0"}`}
        >
          <div className="absolute right-[2%] top-[5%] p-5 bg-blur-dark-60 backdrop-blur-xl font-body font-semibold text-xl rounded-xl text-grey-lightest">
            $122 USD // 0.15 ETH
          </div>

          <div className="absolute bottom-[5%] left-[2%] flex items-end w-[95%] justify-between gap-6">
            <div className="p-5 bg-blur-dark-60 backdrop-blur-xl font-body font-semibold text-xl rounded-xl w-2/3 flex flex-col gap-5">
              <div className="flex justify-between">
                <h3 className="font-header text-3xl text-grey-lightest">
                  Air garden
                </h3>
                <ButtonIcon icon={IconEnum.ArrowRightBig} variant="MEDIUM" />
              </div>
              <AvatarWithName avatarName="Jenny Wilson" />
              <div
                onClick={handleInfoClick}
                className={clsx(
                  "bg-white-6 w-full font-body text-grey-lightest opacity-75 p-4 rounded-lg cursor-pointer transition-[max-height] duration-300 ease-in-out overflow-hidden",
                  {
                    "max-h-96": isInfoExpanded, // Adjust max-height for expanded state
                    "max-h-12": !isInfoExpanded, // Adjust max-height for collapsed state
                  }
                )}
              >
                <div className="flex items-center justify-between h-10 pb-6">
                  <p>Info</p>
                  {isInfoExpanded ? <ArrowUp /> : <ArrowDown />}
                </div>

                <div
                  className={clsx(
                    "flex flex-col gap-y-3 transition-[opacity] duration-150",
                    {
                      "opacity-100": isInfoExpanded, // Adjust max-height for expanded state
                      "opacity-0": !isInfoExpanded, // Adjust max-height for collapsed state
                    }
                  )}
                >
                  <div className="h-[1px] bg-white-10 w-[95%]"></div>
                  <div className="flex justify-between text-grey-lightest font-body">
                    <p className="opacity-75">Contract Address</p>
                    <p className="font-semibold">048xd87577c839 </p>
                  </div>
                  <div className="flex justify-between text-grey-lightest font-body">
                    <p className="opacity-75">Metadata</p>
                    <p className="font-semibold text-blue-main underline"></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black-main rounded-xl flex flex-col p-5 w-1/3 gap-6">
              <div className="flex justify-between">
                <div className="flex bg-black-light items-center px-2 py-1 rounded text-grey-lightest font-body gap-1">
                  <p className="text-lg font-semibold">176832671</p>
                  <p className="opacity-65 text-sm">Token ID</p>
                </div>
                <div className="px-2 py-1 flex bg-green-main rounded font-body text-grey-lightest items-center gap-1">
                  <p className="font-semibold text-lg">10%</p>
                  <p className="text-sm">Creator Royalties</p>
                </div>
              </div>

              <div className="bg-black-main flex justify-between">
                <div className="flex font-body text-grey-lightest gap-3 items-center">
                  <ButtonIcon icon={IconEnum.polygon} variant="MEDIUM" />
                  <div className="flex flex-col">
                    <p className="opacity-65 text-sm">Blockchain</p>
                    <p className="font-semibold text-lg">Polygon</p>
                  </div>
                </div>
                <div className="bg-[#313741] w-[1px] h-[40px]"></div>
                <div className="flex font-body text-grey-lightest gap-3 items-center">
                  <ButtonIcon icon={IconEnum.polygon} variant="MEDIUM" />
                  <div className="flex flex-col">
                    <p className="opacity-65 text-sm">Token Standard</p>
                    <p className="font-semibold text-lg">ERC1155</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ////
        <div className="absolute bottom-[5%] left-[2%] flex items-end w-full justify-between gap-6">
          <div className="p-5 bg-blur-dark-3 backdrop-blur-xl font-body font-semibold text-xl rounded-xl w-[96%] flex flex-col gap-5">
            <div className="flex justify-between">
              <h3 className="font-header text-3xl text-grey-lightest">
                Air garden
              </h3>
            </div>
            <AvatarWithName avatarName="Jenny Wilson" />
          </div>
        </div>
      )}

      <Image
        alt="playground featured"
        width={1054}
        height={663}
        src={"/playgrounds/hero2.png"}
        className="rounded-[5%] object-cover w-full h-[663px]"
      />
    </div>
  );
}

export default ExpandableCard;
