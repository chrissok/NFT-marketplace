/* eslint-disable no-unused-vars */
"use client";

import SubmitButton from "@/components/Buttons/SubmitButton";
import Modal from "@/components/Modal/Modal";
import { useRaribleSdkContext } from "@/context/RaribleSdkContext";
import { useState } from "react";
import Dropdown from "@/components/Dropdown";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { getAddress } from "../../constants/web3/addresses";
import Image from "next/image";
import Spinner from "../Spinner";

export enum Steps {
  Default = 0,
  WalletInteraction = 1,
  Success = 2,
  Error = 3,
}

function SellModal({
  showModal,
  onClose,
  nft,
  img,
}: {
  showModal: boolean;
  onClose: VoidFunction;
  nft: NftElement;
  img: Thumbnail;
}) {
  const [currentStep, setCurrentStep] = useState<Steps>(Steps.Default);
  const [price, setPrice] = useState<number | "">(0);
  const [error, setError] = useState(true);
  const [orderError, setOrderError] = useState("");
  const { address } = useWeb3ModalAccount();
  const [expirationDate, setExpirationDate] = useState("");
  const [expirationLabel, setExpirationLabel] = useState("Set Date");
  const [currency, setCurrency] = useState("WETH");

  const [currencyAddress, setCurrencyAddress] = useState<string>(
    getAddress("TOKENS", nft.Chain.ChainName, "WETH")
  );

  const context = useRaribleSdkContext();

  if (!context) {
    return;
  }

  const handlePriceChange = (event: any) => {
    const value = parseFloat(event.target.value);
    if (isNaN(value) || value <= 0) {
      if (value === 0) {
        setPrice(0);
        setError(true);
      } else {
        setPrice("");
        setError(true);
      }
    } else {
      setError(false); // Clear error when valid
      setPrice(value); // Update price state with the valid value
    }
  };

  const handleExpirationDateChange = (event: any) => {
    setExpirationDate(event.target.value);
  };

  const handleDateOptionClick = (days: number, label: string) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    setExpirationDate(date.toISOString().slice(0, 16)); // Format to match datetime-local input
    setExpirationLabel(label);
  };

  const handleCurrencyClick = async (currency: string) => {
    if (!address) throw new Error("Please connect your wallet");

    const tokenAddress = getAddress("TOKENS", nft.Chain.ChainName, currency);
    setCurrencyAddress(tokenAddress);
    setCurrency(currency);
  };

  const makeSellOrder = async () => {
    setCurrentStep(Steps.WalletInteraction);
    try {
      const value = await context?.sellOrder(
        nft.Address,
        nft.TokenNumber,
        price as number,
        1,
        currencyAddress
      );

      if (value) {
        setCurrentStep(Steps.Success);
      }
    } catch (error: any) {
      setCurrentStep(Steps.Error);
      setOrderError(error.message);
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
      title: "Sell your NFT",
      content: (
        <div className="flex flex-col p-4 rounded-md">
          <label className="block text-white text-base font-bold mb-2">
            Sell Price
          </label>

          <div className="flex items-center space-x-2">
            <input
              onChange={handlePriceChange}
              value={price} // Display empty string if price is 0
              className="flex-1 bg-white-6 p-2 rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="price"
              type="number"
            />
            <Dropdown label={currency} enableCloseOnClick>
              <div className="bg-grey-medium rounded-xl mt-2">
                <div
                  onClick={() => handleCurrencyClick("WETH")}
                  className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-white-6"
                >
                  <p className="font-body text-grey-lightest text-base">WETH</p>
                </div>
                <div
                  onClick={() => handleCurrencyClick("USDC")}
                  className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-white-6"
                >
                  <p className="font-body text-grey-lightest text-base">USDC</p>
                </div>
              </div>
            </Dropdown>
          </div>

          <div className="mb-4">
            <label className="block text-white text-base font-bold">
              Bid expiration
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="datetime-local"
                value={expirationDate}
                onChange={handleExpirationDateChange}
                className="flex-1 bg-white-6 p-2 rounded-lg border border-gray-300 mt-1"
              />
              <Dropdown label={expirationLabel} enableCloseOnClick>
                <div className="bg-grey-medium rounded-xl mt-2">
                  <div
                    onClick={() => handleDateOptionClick(1, "1 day")}
                    className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-white-6"
                  >
                    <p className="font-body text-grey-lightest text-base">
                      1 day
                    </p>
                  </div>
                  <div
                    onClick={() => handleDateOptionClick(7, "7 days")}
                    className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-white-6"
                  >
                    <p className="font-body text-grey-lightest text-base">
                      7 days
                    </p>
                  </div>
                  <div
                    onClick={() => handleDateOptionClick(30, "30 days")}
                    className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-white-6"
                  >
                    <p className="font-body text-grey-lightest text-base">
                      30 days
                    </p>
                  </div>
                  <div
                    onClick={() => handleDateOptionClick(90, "3 months")}
                    className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-white-6"
                  >
                    <p className="font-body text-grey-lightest text-base">
                      3 months
                    </p>
                  </div>
                </div>
              </Dropdown>
            </div>
          </div>

          <div className="text-sm text-gray-200 flex flex-col gap-2 mb-10">
            <div className="flex justify-between border-t border-gray-300 pt-2">
              <span>Total price</span>
              <span>
                {typeof price === "number" && price.toFixed(8)} {currency}
              </span>
            </div>
          </div>
          <p
            className={`${error ? "opacity-100" : "opacity-0"} text-red-600 transition-opacity duration-600`}
          >
            Price must be greater than 0
          </p>
          <SubmitButton
            onClick={makeSellOrder}
            text="Place sell order"
            error={error}
          />
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
              Placed a {price} {currency} sell order on
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

          <div>{orderError || "The transaction was canceled"}</div>
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
        <div className="flex flex-col h-full items-center">
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

export default SellModal;
