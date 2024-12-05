"use client";
import { createContext, useContext } from "react";
import {
  toUnionAddress,
  toItemId,
  toCurrencyId,
  toOrderId,
} from "@rarible/types";
import useRaribleSdk from "@/hooks/useRaribleSdk";
import { IRaribleSdk } from "@rarible/sdk";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { useState } from "react";
import revalidateRequestByTag from "@/actions/IAS/revalidate";

const RaribleSdkContext = createContext<RaribleSdkContextType | undefined>(
  undefined
);

type RaribleSdkContextType = {
  sdk: IRaribleSdk | undefined;
  connectRaribleSdk: (signer: any) => Promise<void>; // to do: type signer
  sellOrder: (
    smartContractAddress: string,
    tokenId: string,
    price: number,
    amount: number,
    currency: string,
    expirationDate?: string
  ) => Promise<any>;
  putBid: (
    smartContractAddress: string,
    tokenId: string,
    price: number,
    amount: number,
    offerAssetAddress: string
  ) => Promise<any>;
  acceptBid: (bidId: string) => Promise<any>;
  buyOrder: (amount: number, orderId: string) => Promise<any>;
  cancelOrder: (orderId: string) => Promise<any>;
  getBalance: (owner: string, currency: string) => Promise<any>;
  step: number;
};

export const RaribleSdkProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step, setStep] = useState(0);

  const { sdk, connectRaribleSdk } = useRaribleSdk();
  const { address } = useWeb3ModalAccount();

  const sellOrder = async (
    smartContractAddress: string,
    tokenId: string,
    price: number,
    amount: number,
    currencyAddress: string,
    expirationDate?: string
  ) => {
    if (!sdk) throw new Error("Please connect your wallet");

    try {
      const order = await sdk.order.sell({
        itemId: toItemId(`ETHEREUM:${smartContractAddress}:${tokenId}`),
        amount: amount,
        currency: toCurrencyId(
          "ETHEREUM:0x0000000000000000000000000000000000000000"
        ),
        price: price,
      });

      revalidateRequestByTag("ias");
      return order;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const buyOrder = async (amount: number, orderId: string) => {
    if (!sdk) throw new Error("Please connect your wallet");

    try {
      const order = await sdk.order.buy({
        orderId: toOrderId(orderId),
        amount,
      });

      revalidateRequestByTag("ias");
      if (order) return order;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const cancelOrder = async (orderId: string) => {
    if (!sdk) throw new Error("Please connect your wallet");

    try {
      const order = await sdk.order.cancel({
        orderId: toOrderId(orderId),
      });

      revalidateRequestByTag("ias");
      if (order) return order;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const putBid = async (
    smartContractAddress: string,
    nftId: string,
    price: number,
    amount: number,
    offerAssetAddress: string
  ) => {
    try {
      if (!sdk) throw new Error("Please connect your wallet");
      if (!address) throw new Error("Please connect your wallet");

      const bidResponse = await sdk.order.bid.prepare({
        itemId: toItemId(`ETHEREUM:${smartContractAddress}:${nftId}`),
      });

      const executeObject = await bidResponse.submit.start({
        amount,
        price, // price for each NFT
        currency: toCurrencyId(`ETHEREUM:${offerAssetAddress}`),
      });

      try {
        await executeObject.run(0);
        setStep(1);
      } catch (err: any) {
        throw new Error("Failed at step 1: " + err.message);
      }

      try {
        await executeObject.run(1);
        setStep(2);
      } catch (err: any) {
        throw new Error("Failed at step 2: " + err.message);
      }

      try {
        await executeObject.run(2);
        setStep(3);
      } catch (err: any) {
        throw new Error("Failed at step 3: " + err.message);
      }

      // Thread sleep to allow for animation toggle
      await new Promise((r) => setTimeout(r, 300));

      setStep(0);
      revalidateRequestByTag("ias");
      return true;
    } catch (err: any) {
      throw new Error("Failed transaction " + err.message);
    }
  };

  const acceptBid = async (bidId: string) => {
    if (!sdk) throw new Error("Please connect your wallet");

    try {
      const order = await sdk.order.acceptBid({
        orderId: toOrderId(bidId),
        amount: 1, //for multiple NFTs you can provide
      });

      revalidateRequestByTag("ias");
      return order;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const getBalance = async (ownerAddress: string, currencyAddress: string) => {
    var currency = toCurrencyId(`ETHEREUM:${currencyAddress}`);

    var owner = toUnionAddress(`ETHEREUM:${ownerAddress}`);

    try {
      var balance = await sdk?.balances.getBalance(owner, currency);

      return balance;
    } catch (error) {
      throw new Error("Could not get balance " + error);
    }
  };

  return (
    <RaribleSdkContext.Provider
      value={{
        cancelOrder,
        sdk,
        connectRaribleSdk,
        sellOrder,
        buyOrder,
        putBid,
        acceptBid,
        getBalance,
        step,
      }}
    >
      {children}
    </RaribleSdkContext.Provider>
  );
};

export const useRaribleSdkContext = () => {
  const context = useContext(RaribleSdkContext);
  return context;
};
