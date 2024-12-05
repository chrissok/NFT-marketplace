"use client";

import IconOrchestrator from "@/components/Icons/IconOrchestrator/IconOrchestrator";
import { IconEnum } from "@/constants/iconEnum";

function ShopButton({
  text,
  onClick,
}: {
  text: string;
  onClick?: VoidFunction;
}) {
  return (
    <button
      onClick={onClick && onClick}
      className="rounded-md flex items-center justify-between w-full gap-5 pl-5 p-[4px] font-body font-semibold bg-green-main transition-colors duration-300 hover:bg-green-bright text-grey-lightest"
    >
      <p>{text}</p>
      <div className="bg-white-10 p-2 backdrop-blur-md rounded-md">
        <IconOrchestrator type={IconEnum.Shop} />
      </div>
    </button>
  );
}

export default ShopButton;
