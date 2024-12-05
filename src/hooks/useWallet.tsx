"use client";
import { useWeb3ModalProvider } from "@web3modal/ethers5/react";
import { ethers } from "ethers";

function useWallet() {
  const { walletProvider } = useWeb3ModalProvider();

  const getSigner = async () => {
    if (!walletProvider) return;
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();

      return signer;
    } catch (error) {
      throw new Error("Could not get wallet provider" + error);
    }
  };

  return { getSigner, walletProvider };
}

export default useWallet;
