"use client";
import ButtonIcon from "@/components/Buttons/ButtonIcon";
import { IconEnum } from "@/constants/iconEnum";
import { formatAddress } from "@/utils/formatString";
import { useState } from "react";

function BlockchainData({
  chainName,
  tokenStandard,
  contractAddress,
}: {
  chainName: string;
  tokenStandard: number;
  contractAddress: string;
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex gap-3 justify-between xs:flex-col xs:w-fit mx-auto">
      <div className="flex gap-3 items-center w-1/3 xs:w-full">
        <ButtonIcon variant="MEDIUM" icon={IconEnum.Cube} disableHover />
        <div className="flex flex-col justify-center text-grey-lightest font-body relative">
          <h2 className="text-lg">Contract Address</h2>
          <div
            className="text-sm opacity-60 cursor-pointer"
            onClick={copyToClipboard}
          >
            {formatAddress(contractAddress)}
          </div>

          {copied && (
            <span className="ml-2 text-xs absolute -bottom-[25%]">Copied!</span>
          )}
        </div>
      </div>
      <div className="flex gap-3 items-center w-1/3 xs:w-full">
        <ButtonIcon
          variant="MEDIUM"
          icon={IconEnum.CubeWithCircle}
          disableHover
        />
        <div className="flex flex-col justify-center text-grey-lightest font-body">
          <h2 className="text-lg">Token Standard</h2>
          <p className="text-sm opacity-60">ERC{tokenStandard}</p>
        </div>
      </div>
      <div className="flex gap-3 items-center w-1/3 xs:w-full">
        <ButtonIcon variant="MEDIUM" icon={IconEnum.Note} disableHover />
        <div className="flex flex-col justify-center text-grey-lightest font-body">
          <h2 className="text-lg">Blockchain</h2>
          <p className="text-sm opacity-60">{chainName.toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
}

export default BlockchainData;
