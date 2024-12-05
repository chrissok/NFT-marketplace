/* eslint-disable no-unused-vars */
"use client";

import SubmitButton from "@/components/Buttons/SubmitButton";
import Modal from "@/components/Modal/Modal";
import { useRaribleSdkContext } from "@/context/RaribleSdkContext";
import { useState } from "react";
import Image from "next/image";
import Spinner from "../Spinner";

export enum Steps {
  Default = 0,
  WalletInteraction = 1,
  Success = 2,
  Error = 3,
}

function BuyModal({
  showModal,
  onClose,
  nft,
  order,
  img,
}: {
  showModal: boolean;
  onClose: VoidFunction;
  nft: NftElement;
  order: SellOrder;
  img: Thumbnail;
}) {
  const [currentStep, setCurrentStep] = useState<Steps>(Steps.Default);

  const [error, setError] = useState<string | null>(null);

  const context = useRaribleSdkContext();

  if (!context) {
    setError("Context did not load correctly");
    return;
  }

  // TODO CHECK RESPONSE

  const makeBuyOrder = async () => {
    setCurrentStep(Steps.WalletInteraction);
    try {
      const value = await context?.buyOrder(1, order.OrderId);

      if (value) {
        setCurrentStep(Steps.Success);
      }
    } catch (error: any) {
      setCurrentStep(Steps.Error);
      throw new Error(error);
    }
  };

  const onCloseModal = () => {
    if (currentStep === Steps.Success || currentStep === Steps.Error) {
      setCurrentStep(Steps.Default);
    }
    onClose();
  };

  const steps = [
    {
      title: "Buy this NFT",
      content: (
        <div className="flex flex-col p-4 rounded-md">
          <div className="text-sm text-gray-200 flex flex-col gap-2 mb-10">
            <div className="flex justify-between border-t border-gray-300 pt-2">
              <span>Total price</span>
              <span>
                {order.Price} {order.CurrencySymbol}
              </span>
            </div>
            {img && (
              <Image
                src={img.url}
                alt="avatar thumbnail"
                width={img?.width || 100}
                height={img?.height || 100}
              />
            )}
          </div>
          <SubmitButton onClick={makeBuyOrder} text="Buy it" />
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
          <div className="w-full mt-10">
            <button
              onClick={onCloseModal}
              className="w-full py-2 border border-gray-500 text-gray-500 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
    },
    {
      title: "Success!",
      content: (
        <div className="flex flex-col items-center justify-between h-full">
          <div className="text-center">
            <b className="text-gray-400 mb-4">
              Bought {nft.ElementName} for {order.Price} {order.CurrencySymbol}.
              Please note, it may take a few minutes for the updates to reflect
            </b>
            <br />
            <b className="text-lg">{}</b>
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
          <div className="w-full mt-6">
            <button
              onClick={onClose}
              className="w-full py-2 border border-gray-500 text-gray-500 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      ),
    },
    {
      title: "Error",
      content: (
        <div className="flex flex-col">
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
        </div>
      ),
    },
  ];

  return (
    <div>
      <Modal
        isOpen={showModal}
        closeModal={onCloseModal}
        wrapperStyle="bg-black-light p-5 rounded-3xl mt-16 w-fit h-fit"
        disableClose={currentStep === Steps.WalletInteraction}
      >
        <div className="flex flex-col items-center h-full px-10">
          <div className="text-2xl text-grey-lightest font-header text-center">
            {steps[currentStep].title}
          </div>
          <div className="mt-4 text-grey-normal font-body">
            {steps[currentStep].content}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default BuyModal;
