/* eslint-disable no-unused-vars */
"use client";

import SubmitButton from "@/components/Buttons/SubmitButton";
import Modal from "@/components/Modal/Modal";
import Selected from "@/components/Icons/standard/Checkmark/Selected";
import { useRaribleSdkContext } from "@/context/RaribleSdkContext";
import { useEffect, useState } from "react";
import Dropdown from "@/components/Dropdown";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import type { BigNumberValue } from "@rarible/utils";
import roundDownToDecimals from "../../utils/roundDownToDecimals";
import Empty from "../Icons/standard/Checkmark/Empty";
import { getAddress } from "../../constants/web3/addresses";
import { chainMap } from "@/constants/web3/chains";
import Image from "next/image";

export enum Steps {
  Default = 0,
  WalletInteraction = 1,
  Success = 2,
  Error = 3,
}

function TransactionModal({
  showModal,
  onClose,
  nft,
  chainId,
  img,
}: {
  showModal: boolean;
  onClose: VoidFunction;
  nft: NftElement;
  chainId: number;
  img: Thumbnail;
}) {
  const [currentStep, setCurrentStep] = useState<Steps>(Steps.Default);
  const [price, setPrice] = useState<number>(0);
  const [balance, setBalance] = useState<BigNumberValue>(0);
  const { address } = useWeb3ModalAccount();
  const [expirationDate, setExpirationDate] = useState("");
  const [expirationLabel, setExpirationLabel] = useState("Set Date");
  const [currency, setCurrency] = useState("WETH");
  const emergenceFee = 0.015;
  const totalPrice = price + price * emergenceFee;

  const [offerAssetAddress, setOfferAssetAddress] = useState<string>("");

  const [error, setError] = useState(false);

  const context = useRaribleSdkContext();

  useEffect(() => {
    const tokenAddress = getAddress("TOKENS", chainMap[chainId], currency);

    setOfferAssetAddress(tokenAddress);
  }, [chainId, currency]);

  if (!context) {
    return;
  }

  const handlePriceChange = (event: any) => {
    const value = parseFloat(event.target.value);
    if (isNaN(value) || value <= 0) {
      setPrice(0);
      setError(true);
    } else {
      setError(false); // Clear error when valid
      setPrice(value); // Update price state with the valid value
    }
  };
  const handleExpirationDateChange = (event: any) => {
    setExpirationDate(event.target.value);
  };

  const handleSetMax = () => {
    setPrice(
      roundDownToDecimals(Number(balance) - price * (emergenceFee + 0.002), 5)
    ); // add 0.002 to avoid over-spending on decimal round-up
  };

  const handleDateOptionClick = (days: number, label: string) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    setExpirationDate(date.toISOString().slice(0, 16)); // Format to match datetime-local input
    setExpirationLabel(label);
  };

  const handleCurrencyClick = async (currency: string) => {
    if (!address) throw new Error("Please connect your wallet");
    const tokenAddress = getAddress("TOKENS", chainMap[chainId], currency);
    setOfferAssetAddress(tokenAddress);

    setCurrency(currency);

    try {
      const balance = await context?.getBalance(
        address.toString(),
        tokenAddress
      );
      if (balance) setBalance(balance);
    } catch (error) {
      throw new Error("Balance not found");
    }
  };

  const makeBid = async () => {
    setCurrentStep(Steps.WalletInteraction);
    try {
      const value = await context?.putBid(
        nft.Address,
        nft.TokenNumber,
        price,
        1,
        offerAssetAddress
      );
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
      title: "Make a bid",
      content: (
        <div className="flex flex-col p-4 rounded-md">
          <label className="block text-white text-base font-bold mb-2">
            Bid Price
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
          <div className="text-sm text-gray-200 mb-5">
            Available {Number(balance)}{" "}
            <button onClick={() => handleSetMax()} className="text-blue-500">
              max
            </button>
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
            <div className="flex justify-between">
              <span>Your bidding balance</span>
              <span>{Number(balance)} wETH</span>
            </div>
            <div className="flex justify-between">
              <span>Emergence fee</span>
              <span>{(emergenceFee * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between border-t border-gray-300 pt-2">
              <span>Total price</span>
              <span>
                {totalPrice.toFixed(8)} {currency}
              </span>
            </div>
          </div>
          <SubmitButton onClick={makeBid} error={error} text="Place Bid" />
        </div>
      ),
    },
    {
      title: "Accept spending and sign",
      content: (
        <div className="flex flex-col items-center p-6 rounded-lg w-full h-full">
          <h2 className="text-white text-2xl font-bold mb-6">Follow steps</h2>
          {currency == "WETH" && (
            <div className="w-full mb-4">
              <div className="flex items-center mb-2">
                <div className="mr-2">
                  {context?.step < 1 ? <Empty /> : <Selected />}
                </div>
                <span className="text-white text-lg font-medium">
                  Wrap your asset
                </span>
              </div>
              <div className="text-gray-400">
                Accept the transaction to wrap your ETH into WETH
              </div>
            </div>
          )}

          <div className="w-full mb-4">
            <div className="flex items-center mb-2">
              <div className="mr-2">
                {context?.step < 2 ? <Empty /> : <Selected />}
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
                {context?.step < 3 ? <Empty /> : <Selected />}
              </div>
              <span className="text-white text-lg font-medium">Place Bid</span>
            </div>
            <div className="text-gray-400">Sign message to place the bid</div>
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
              Placed a {price} {currency} bid on{" "}
            </p>
            <p className="text-lg">{nft.NFTName}</p>
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
        disableClose={currentStep === Steps.WalletInteraction}
        wrapperStyle="bg-black-light p-5 rounded-3xl mt-16 w-fit h-fit z-50"
      >
        <div className="flex flex-col h-full">
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

export default TransactionModal;
