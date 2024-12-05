/* eslint-disable no-unused-vars */
"use client";

import SubmitButton from "@/components/Buttons/SubmitButton";
import Modal from "@/components/Modal/Modal";
import Selected from "@/components/Icons/standard/Checkmark/Selected";
import { useRaribleSdkContext } from "@/context/RaribleSdkContext";
import { useState } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import Empty from "../Icons/standard/Checkmark/Empty";
import Image from "next/image";
import CancelButtonWithIcon from "../Buttons/CancelButtonWithIcon";
import CancelButton from "../Buttons/CancelButton";
import Spinner from "../Spinner";

enum Steps {
  Default = 0,
  WalletInteraction = 1,
  Success = 2,
  Error = 3,
}

function CancelOrderModal({
  showModal,
  onClose,
  order,
  nft,
  img,
}: {
  showModal: boolean;
  onClose: VoidFunction;
  order: SellOrder;
  nft: NftElement;
  img: Thumbnail;
}) {
  const [currentStep, setCurrentStep] = useState<Steps>(Steps.Default);
  const { address } = useWeb3ModalAccount();

  const [error, setError] = useState<string | null>(null);

  const context = useRaribleSdkContext();

  if (!context) {
    setError("Context did not load correctly");
    return;
  }

  const acceptBid = async () => {
    setCurrentStep(Steps.WalletInteraction);
    try {
      const value = await context?.cancelOrder(order.OrderId);

      if (value) {
        setCurrentStep(Steps.Success);
      }
    } catch (error: any) {
      setCurrentStep(Steps.Error);
      throw new Error(error.message);
    }
  };

  const onCloseModal = () => {
    setCurrentStep(Steps.Default);
    onClose();
  };

  const steps = [
    {
      title: "Cancel Order",
      content: (
        <div className="flex flex-col p-4 rounded-md h-full justify-between">
          <div className="text-md text-grey-lightest flex flex-col">
            <div className="flex justify-between border-t border-white-10 pt-2 font-semibold">
              <span>Cancel order for</span>
              <span>
                {order.Price} {order.CurrencySymbol} ?
              </span>
            </div>
          </div>
          <div className="w-full mt-5 flex justify-center gap-5">
            <div className="w-1/2">
              <SubmitButton onClick={acceptBid} text="Accept" styles="w-full" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Waiting for Wallet Confirmation",
      content: (
        <div className="flex flex-col items-center p-6 rounded-lg w-96 h-full">
          <p className="text-grey-normal text-center mb-10 text-lg">
            Please review and confirm the transaction in your wallet to complete
            the sale. This may take a moment, so do not close or refresh this
            page.
          </p>
          <Spinner />
        </div>
      ),
    },
    {
      title: "Success!",
      content: (
        <div className="flex flex-col items-center justify-between h-full">
          <div className="text-center">
            <b className="text-gray-400 mb-4">
              Canceled {order.Price} {order.Price} sell order on{" "}
            </b>
            <br />
            <b className="text-lg">{nft.NFTName}</b>
          </div>
          <div className="flex-grow flex items-center justify-center my-6">
            {img && (
              <Image
                src={img?.url}
                alt="avatar thumbnail"
                width={img?.width || 100}
                height={img?.height || 100}
              />
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Error",
      content: (
        <div
          className="flex items-center p-4 mb-4 text-sm rounded-lg bg-gray-800 text-red-400"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>

          <div>The transaction was canceled</div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Modal
        isOpen={showModal}
        closeModal={onCloseModal}
        disableClose={currentStep === Steps.WalletInteraction}
        wrapperStyle="bg-black-light py-5 px-9 rounded-3xl mt-16 w-fit h-fit"
      >
        <div className="flex flex-col items-center h-full">
          <div className="text-2xl text-grey-lightest font-header text-center">
            {steps[currentStep].title}
          </div>
          <div className="mt-4 text-grey-normal font-body h-full">
            {steps[currentStep].content}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CancelOrderModal;
