"use client";

import ButtonIcon from "@/components/Buttons/ButtonIcon";
import Spinner from "@/components/Spinner";
import { IconEnum } from "@/constants/iconEnum";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers5/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function MyPlaygroundsWidget() {
  const { isConnected, address } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Prevent rendering until client-side rendering is ready
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  return isConnected ? (
    <div className="flex flex-col shadow-[0_0_20px_10px_rgba(236,216,246,0.1)] bg-black-light p-4 rounded-3xl self-end cursor-pointer group w-80 h-50 group noMinLg:absolute noMinLg:top-[115%] noMinLg:w-fit">
      <Link href={`/my-playgrounds/${address}`}>
        <div className="overflow-hidden rounded-xl">
          <Image
            alt="my-playgrounds-thumbnail-img"
            src="/my-playgrounds/bg.jpeg"
            height={122}
            width={280}
            className="mx-auto mb-3 object-cover h-32 noMinLg:hidden rounded-[5%] group-hover:scale-110 duration-300"
          />
        </div>
        <div className="flex text-grey-lightest items-center justify-between gap-2">
          <div className="flex items-center">
            <p className="text-base font-header noMinLg:text-xs">
              MY PLAYGROUNDS
            </p>
          </div>
          <ButtonIcon
            icon={IconEnum.ArrowRight}
            variant="MEDIUM"
            styles="group-hover:!bg-button-secondary-color-hover"
          />
        </div>
      </Link>
    </div>
  ) : (
    <div
      onClick={() => open()}
      className="shadow-[0_0_20px_10px_rgba(236,216,246,0.1)] noMinLg:absolute noMinLg:top-[125%] animate-[bounce_3s_linear_infinite] flex flex-col bg-black-light p-4 rounded-3xl self-end cursor-pointer group w-80 h-50 group"
    >
      <div className="overflow-hidden rounded-xl"></div>
      <div className="flex text-grey-lightest items-center justify-between gap-2">
        <div className="flex items-center">
          <p className="text-base font-header">
            Connect Wallet and see Playgrounds!
          </p>
        </div>
        <ButtonIcon
          icon={IconEnum.ArrowRight}
          variant="MEDIUM"
          styles="group-hover:!bg-button-secondary-color-hover flex-shrink-0"
          onClick={() => open()}
        />
      </div>
    </div>
  );
}

export default MyPlaygroundsWidget;
