"use client";
import useWallet from "@/hooks/useWallet";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { useEffect, useState } from "react";
import { useRaribleSdkContext } from "@/context/RaribleSdkContext";
import ProfileWidget from "./ProfileWidget";
import Cookies from "js-cookie";
import Spinner from "@/components/Spinner";

function WalletButton() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { isConnected, address } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();

  const { getSigner } = useWallet();
  const sdkContext = useRaribleSdkContext();

  const handleConnectSdk = async () => {
    const signer = await getSigner();

    if (!sdkContext) return;
    signer && sdkContext.connectRaribleSdk(signer);

    Cookies.set("walletConnected", "true", { expires: 7, path: "/" }); // cookie expires in 7 days
  };

  useEffect(() => {
    if (isConnected) {
      handleConnectSdk();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return (
    <>
      {isClient ? (
        isConnected ? (
          <ProfileWidget address={address} />
        ) : (
          <button
            onClick={() => open()}
            className="flex font-body items-center py-[6px] px-3 xs:px-1 text-grey-lightest bg-black-lighter-2 border border-[#454952] rounded-md gap-2 noMinLg:text-xs hover:text-grey-lightest hover:bg-black-lighter-1"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="xs:hidden"
            >
              <path
                d="M10.7857 2.92857V5.78571H9.6579V2.92857C9.6579 2.72556 9.47744 2.62782 9.35714 2.62782C9.31955 2.62782 9.28196 2.63534 9.24436 2.65038L3.28195 4.8985C2.88346 5.04887 2.62782 5.42481 2.62782 5.85338V6.35714C1.94361 6.86842 1.5 7.68797 1.5 8.61278V5.85338C1.5 4.95865 2.04887 4.16165 2.88346 3.84586L8.85338 1.59023C9.0188 1.53008 9.19173 1.5 9.35714 1.5C10.109 1.5 10.7857 2.10902 10.7857 2.92857Z"
                fill="#F1F7FA"
              />
              <path
                d="M15.7864 10.8613V11.6132C15.7864 11.8162 15.6285 11.9816 15.418 11.9891H14.3203C13.9218 11.9891 13.5609 11.6959 13.5308 11.3049C13.5082 11.0718 13.5985 10.8538 13.7488 10.7034C13.8842 10.5605 14.0721 10.4854 14.2751 10.4854H15.4105C15.6285 10.4929 15.7864 10.6583 15.7864 10.8613Z"
                fill="#F1F7FA"
              />
              <path
                d="M14.2669 9.69591H15.0338C15.4474 9.69591 15.7857 9.35756 15.7857 8.94403V8.6132C15.7857 7.05681 14.515 5.78613 12.9586 5.78613H4.32707C3.68797 5.78613 3.1015 5.99666 2.62782 6.35756C1.94361 6.86884 1.5 7.68839 1.5 8.6132V13.6734C1.5 15.2297 2.77068 16.5004 4.32707 16.5004H12.9586C14.515 16.5004 15.7857 15.2297 15.7857 13.6734V13.5305C15.7857 13.117 15.4474 12.7786 15.0338 12.7786H14.3797C13.6579 12.7786 12.9662 12.335 12.7782 11.6358C12.6203 11.0643 12.8083 10.5155 13.1842 10.147C13.4624 9.86132 13.8459 9.69591 14.2669 9.69591ZM10.1466 9.54553H4.88346C4.57519 9.54553 4.31955 9.28989 4.31955 8.98162C4.31955 8.67335 4.57519 8.41771 4.88346 8.41771H10.1466C10.4549 8.41771 10.7105 8.67335 10.7105 8.98162C10.7105 9.28989 10.4549 9.54553 10.1466 9.54553Z"
                fill="#F1F7FA"
              />
            </svg>
            Connect wallet
          </button>
        )
      ) : (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
    </>
  );
}

export default WalletButton;
