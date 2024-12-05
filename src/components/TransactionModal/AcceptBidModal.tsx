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
import CancelButton from "../Buttons/CancelButton";

enum Steps {
  Default = 0,
  WalletInteraction = 1,
  Success = 2,
  Error = 3,
}

function AcceptBidModal({
  showModal,
  onClose,
  order,
  nft,
  img,
}: {
  img: Thumbnail;
  nft: NftElement;
  order: Bid;
  showModal: boolean;
  onClose: VoidFunction;
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
      const value = await context?.acceptBid(order.BidId);

      if (value) {
        setCurrentStep(Steps.Success);
      }
    } catch (error: any) {
      setCurrentStep(Steps.Error);
      throw new Error(error.message);
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
      title: "Accept Bid",
      content: (
        <div className="flex flex-col p-4 rounded-md h-full justify-between">
          <div className="text-md text-grey-lightest flex flex-col">
            <div className="flex justify-between border-t border-white-10 pt-2 font-semibold">
              <span>Total price</span>
              <span>
                {order.Price} {order.CurrencySymbol}
              </span>
            </div>
          </div>
          <div className="w-full mt-5 flex justify-between gap-5">
            <div className="w-1/2">
              <SubmitButton onClick={acceptBid} text="Accept" styles="w-full" />
            </div>
            <div className="w-1/2">
              <CancelButton onClick={onCloseModal} text="Cancel" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Accept spending and sign",
      content: (
        <div className="flex flex-col items-center p-6 rounded-lg w-full h-full">
          <h2 className="text-white text-2xl font-bold mb-6">Follow steps</h2>
          <div className="w-full mb-4">
            <div className="flex items-center mb-2">
              <div className="mr-2">
                {context?.step < 1 ? <Empty /> : <Selected />}
              </div>
              <span className="text-white text-lg font-medium">
                Accept spending
              </span>
            </div>
            <div className="text-gray-400">
              This transaction is conducted only once per asset
            </div>
          </div>
          <div className="w-full mb-6 flex-grow">
            <div className="flex items-center mb-2">
              <div className="mr-2">
                {context?.step < 2 ? <Empty /> : <Selected />}
              </div>
              <span className="text-white text-lg font-medium">
                List for Sale
              </span>
            </div>
            <div className="text-gray-400">
              Sign message to place Sale order
            </div>
          </div>
          <div className="w-full">
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
            <p className="text-gray-400 mb-4">
              {order.Price} {order.CurrencySymbol} Bid on
            </p>
            <br />
            <p className="text-lg">{nft.NFTName}</p>
            <p className="text-md">Accepted</p>
            <p className="text-md">
              Please note, it may take a few minutes for the updates to reflect
            </p>
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
        wrapperStyle="bg-black-light p-5 rounded-3xl mt-16 w-[300px] h-fit"
        disableClose={currentStep === Steps.WalletInteraction}
      >
        <div className="flex flex-col h-full">
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

export default AcceptBidModal;
