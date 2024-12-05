"use client";
import useWallet from "@/hooks/useWallet";
import { ethers } from "ethers";
import {
  STANDARD_ERC721_ABI,
  EMERGENCE_AVATAR_COLLECTION_ABI,
} from "../constants/web3/abi";

function useSmartContractsHandler({
  address,
  chain,
}: {
  address: string;
  chain: string;
}) {
  const { getSigner } = useWallet();

  const getProvider = (): ethers.providers.JsonRpcProvider => {
    const devRpcUrl = `https://endpoints.omniatech.io/v1/eth/sepolia/public`;
    const prodRpcUrl = "https://cloudflare-eth.com";

    const rpcUrl =
      chain.toLocaleLowerCase() === "sepolia" ? devRpcUrl : prodRpcUrl;

    return new ethers.providers.JsonRpcProvider(rpcUrl);
  };

  const getAllowance = async (
    owner: string,
    spender: string,
    smartContractAddress: string
  ): Promise<ethers.BigNumber> => {
    try {
      const signer = await getSigner();
      const contract = new ethers.Contract(
        smartContractAddress,
        STANDARD_ERC721_ABI,
        signer?.provider
      );
      const allowance: ethers.BigNumber = await contract.allowance(
        owner,
        spender
      );
      return allowance;
    } catch (error: any) {
      return ethers.BigNumber.from(0);
    }
  };

  const isMintingActive = async (): Promise<boolean> => {
    try {
      const provider = getProvider();

      const contract = new ethers.Contract(
        address,
        EMERGENCE_AVATAR_COLLECTION_ABI,
        provider
      );

      const isMintingActive = await contract.mintingIsActive();

      return isMintingActive;
    } catch (error) {
      throw new Error(`"Error getting minting phase:", ${error}`);
    }
  };

  const getMintingPhase = async (): Promise<number> => {
    try {
      const provider = getProvider();

      const contract = new ethers.Contract(
        address,
        EMERGENCE_AVATAR_COLLECTION_ABI,
        provider
      );

      const mintingPhase = await contract.mintingPhase();

      return mintingPhase; // Convert BigNumber to number
    } catch (error) {
      throw new Error(`"Error getting minting phase:", ${error}`);
    }
  };

  function extractTokenIdsFromReceipt(
    receipt: ethers.providers.TransactionReceipt
  ): number[] {
    // Assuming your contract emits a Transfer event on minting, you can parse the logs to get the tokenId
    const iface = new ethers.utils.Interface(STANDARD_ERC721_ABI);
    const tokenIds: number[] = [];

    for (const log of receipt.logs) {
      try {
        const parsedLog = iface.parseLog(log);
        if (parsedLog.name === "Transfer") {
          // Add the tokenId to the array and convert it to a number
          tokenIds.push(Number(parsedLog.args.tokenId.toString()));
        }
      } catch (error) {
        // Ignore if the log cannot be parsed
      }
    }

    return tokenIds;
  }
  const ownerOfERC721 = async (
    smartContractAddress: string,
    tokenId: string
  ) => {
    try {
      const signer = await getSigner();
      const contract = new ethers.Contract(
        smartContractAddress,
        STANDARD_ERC721_ABI,
        signer?.provider
      );
      const ownerAddress = await contract.ownerOf(tokenId);
      return ownerAddress;
    } catch (error) {
      console.error("Error fetching allowance:", error);
      return false;
    }
  };

  const emergenceMint = async (
    price: number,
    amount: number,
    leaf: string[]
  ): Promise<string> => {
    try {
      const signer = await getSigner();
      const contract = new ethers.Contract(
        address,
        EMERGENCE_AVATAR_COLLECTION_ABI,
        signer
      );

      const { hash } = await contract.mint(amount, leaf, {
        value: ethers.utils.parseEther(price.toString()), // Convert price to Wei
      });

      return hash;
    } catch (error: any) {
      throw new Error(error?.error?.message || "Transaction Canceled");
    }
  };

  const awaitTransactionConfirmation = async (txHash: string) => {
    const signer = await getSigner();

    if (!signer) return;

    try {
      const receipt = await signer.provider.waitForTransaction(txHash);

      // Check if the transaction was successful
      if (receipt.status === 1) {
        // Retrieve the tokenId from the event logs
        return receipt;
      } else {
        throw new Error("There was an error with your transaction:" + txHash);
      }
    } catch (error) {
      console.error("Error confirming transaction:", error);
      throw new Error("error" + error);
    }
  };

  const getIsApprovedForAll = async (
    owner: string,
    spender: string,
    smartContractAddress: string
  ): Promise<boolean> => {
    try {
      const signer = await getSigner();
      const contract = new ethers.Contract(
        smartContractAddress,
        STANDARD_ERC721_ABI,
        signer?.provider
      );
      const approvedForAll = await contract.isApprovedForAll(owner, spender);
      return approvedForAll;
    } catch (error) {
      console.error("Error fetching allowance:", error);
      return false;
    }
  };

  return {
    getAllowance,
    getIsApprovedForAll,
    emergenceMint,
    awaitTransactionConfirmation,
    extractTokenIdsFromReceipt,
    ownerOfERC721,
    getMintingPhase,
    isMintingActive,
  };
}

export default useSmartContractsHandler;
