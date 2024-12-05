/* eslint-disable no-unused-vars */
"use client";

import Modal from "@/components/Modal/Modal";
import { useEffect, useState } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import Spinner from "../Spinner";
import useSmartContractsHandler from "@/hooks/useSmartContractsHandler";
import SubmitButton from "../Buttons/SubmitButton";
import SuccessStep from "./SuccessStep";
import { convertToUSD } from "@/actions/external/convert";
import revalidateRequestByTag from "@/actions/IAS/revalidate";
import Checkbox from "../Inputs/Checkbox/Checkbox";
import Link from "next/link";

// Read this from the NFT we are interacting with
export enum Steps {
  Default = 0,
  WalletInteraction = 1,
  Verifying = 2,
  Success = 3,
  Error = 4,
}

let debounceTimer: NodeJS.Timeout;

function MintModal({
  collectionData,
  phase,
  showModal,
  onClose,
  royalties,
}: {
  collectionData: MintCollectionData;
  phase: MintPhase;
  showModal: boolean;
  onClose: VoidFunction;
  royalties: string;
}) {
  const { isConnected, address } = useWeb3ModalAccount();

  const [currentStep, setCurrentStep] = useState<Steps>(Steps.Default);
  const [fetchingConvertedPrice, setFetchingConvertedPrice] = useState(false);
  const [price, setPrice] = useState<number>(0);
  const [usdPrice, setUsdPrice] = useState<number>(0);

  const [leaf, setLeaf] = useState<string[]>([]);
  const [leafNotFound, setLeafNotFound] = useState(false);
  const [errorFetchingLeaf, setErrorFetchingLeaf] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [tokenIds, setTokenIds] = useState<number[]>([]);
  const [fetchingLeaf, setFetchingLeaf] = useState(true);
  const [loading, setLoading] = useState(true);
  const [tcAccepted, setTCAccepted] = useState<boolean>(false);

  const [_isMintingActive, setIsMintingActive] = useState<boolean>(false);

  const [mintingPhase, setMintingPhase] = useState<MintPhase>(phase);
  const [amount, setAmount] = useState<number>(1);

  const smartContractAddress = collectionData.CollectionElement.Id.Contract;
  const chain = collectionData.CollectionElement.Id.Chain.ChainName;

  const {
    emergenceMint,
    awaitTransactionConfirmation,
    extractTokenIdsFromReceipt,
    getMintingPhase,
    isMintingActive,
  } = useSmartContractsHandler({ address: smartContractAddress, chain });

  const onCloseModal = () => {
    if (currentStep === Steps.Success || currentStep === Steps.Error) {
      setCurrentStep(Steps.Default);
    }
    onClose();
  };

  const tryGetLeaf = async (scPhase: number): Promise<ProofResponse | null> => {
    setFetchingLeaf(true);
    setErrorFetchingLeaf(false);
    setLeafNotFound(false); // Reset to false before attempting fetch
    try {
      if (!address) throw new Error("Not connected");

      const walletAddress = encodeURIComponent(address);

      const cmsURL = process.env.NEXT_PUBLIC_IAS_URL;

      const url =
        `${cmsURL}/Collection/GetProof?` +
        `walletAddress=${walletAddress}&` +
        `network=${chain.toLowerCase()}&` +
        `phase=${scPhase}&` +
        `contractAddress=${smartContractAddress}`;

      const response = await fetch(url);

      // Check if the returned data is an empty object
      if (response.status == 404) {
        setLeafNotFound(true);
        return null;
      }

      if (!response.ok) {
        setErrorFetchingLeaf(true);
        setLoading(false);
        throw new Error("Failed to fetch proof");
      }

      const data = await response.json();

      return data;
    } catch (error: any) {
      setErrorFetchingLeaf(true);
      setTCAccepted(false);
      throw new Error("Error fetching leaf:", error);
    } finally {
      setFetchingLeaf(false);
    }
  };

  useEffect(() => {
    setErrorMessage(null);
    if (showModal) {
      const initialize = async () => {
        // get phase again just in case (loading between pages)
        let phaseId = await getMintingPhase();

        const matchingPhase =
          collectionData.MintCollectionElement.MintPhases.find(
            (phase) => phase.phase_Id === phaseId
          );

        if (matchingPhase) setMintingPhase(matchingPhase);

        const isActive = await isMintingActive();

        if (mintingPhase.requires_whitelist) {
          const leaf = await tryGetLeaf(phaseId);

          if (leaf) setLeaf(leaf.proof);
          else setLeafNotFound(true);
        } else {
          setFetchingLeaf(false);
        }

        setIsMintingActive(isActive);
        if (mintingPhase != null) {
          setLoading(false);
          setPrice(mintingPhase.price);
        }
      };

      initialize();
    }
  }, [showModal]);

  useEffect(() => {
    if (!amount || amount === 0 || price === 0) return;
    setFetchingConvertedPrice(true);
    // Clear previous debounce timer if any
    if (debounceTimer) clearTimeout(debounceTimer);

    // Set a new debounce timer

    debounceTimer = setTimeout(async () => {
      const convertedPrice = await convertToUSD(
        "eth",
        (amount * price).toString()
      );

      setUsdPrice(convertedPrice);
      setFetchingConvertedPrice(false);
    }, 500); // Delay by 500ms

    // Cleanup function for useEffect
    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [amount, price]);

  const handleTCUpdated = () => {
    setTCAccepted(!tcAccepted);
  };

  const handleMint = async () => {
    setCurrentStep(Steps.WalletInteraction);
    try {
      const transactionHash = await emergenceMint(price * amount, amount, leaf);
      setCurrentStep(Steps.Verifying);

      setTransactionHash(transactionHash);

      const receipt = await awaitTransactionConfirmation(transactionHash);

      if (!receipt) {
        return;
      }

      const ids = extractTokenIdsFromReceipt(receipt);

      setTokenIds(ids);
      setCurrentStep(Steps.Success);
      revalidateRequestByTag("mint");
    } catch (error: any) {
      setErrorMessage(error?.message || "Transaction canceled");
      setTCAccepted(false);
      setCurrentStep(Steps.Error);
    }
  };

  const handleAmountChange = (event: any) => {
    const newAmount = Number(event.currentTarget.value);
    setAmount(newAmount);
  };

  const emergence_fee = 1.5;

  const steps = [
    {
      title: "Mint",
      content: (
        <div className="flex flex-col p-4 rounded-md">
          {!loading ? (
            <>
              <div className="flex flex-col bg-black-main px-4 py-3 gap-y-3 rounded-t-xl">
                <div className="flex justify-between">
                  <p className="text-grey-lightest text-sm font-body opacity-80">
                    Price
                  </p>
                  <p className="text-grey-lightest text-sm font-body font-semibold">
                    {price === 0 ? (
                      <span className="text-green-main">FREE </span>
                    ) : (
                      <> {price} ETH</>
                    )}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-grey-lightest text-sm font-body opacity-80">
                    Quantity
                  </p>
                  <div className="flex items-center bg-white-6 rounded-lg">
                    {/* Minus button */}
                    <button
                      type="button"
                      className="px-2 py-1 text-sm font-semibold"
                      onClick={() => setAmount((prev) => Math.max(prev - 1, 0))} // Decrease amount but prevent negative values
                      disabled={
                        amount <= 1 ||
                        mintingPhase?.per_wallet_minting_limit === 1
                      }
                    >
                      -
                    </button>

                    {/* Input field */}
                    <div className="w-fit">
                      <input
                        disabled={mintingPhase?.per_wallet_minting_limit === 1}
                        onChange={handleAmountChange}
                        value={amount === 0 ? "" : amount} // Display empty string if amount is 0
                        className="flex-1 p-2  [appearance:textfield] bg-transparent [&::-webkit-outer-spin-button]:appearance-none 
												[&::-webkit-inner-spin-button]:appearance-none h-[25px] w-[30px] text-grey-lightest text-sm font-body font-semibold"
                        placeholder="Amount"
                        type="number"
                      />
                    </div>

                    {/* Plus button */}
                    <button
                      type="button"
                      className="pr-2 py-y text-sm font-semibold"
                      onClick={() => setAmount((prev) => prev + 1)} // Increase amount
                      disabled={mintingPhase?.per_wallet_minting_limit === 1}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <p className="text-grey-lightest text-sm font-body opacity-80">
                    Emergence fee
                  </p>
                  <p className="font-semibold text-grey-lightest text-sm font-body">
                    {emergence_fee}%
                  </p>
                </div>
              </div>

              <div className="flex flex-col bg-black-main px-4 py-3 gap-y-3 rounded-b-xl mt-[2px] mb-3">
                <div className="flex justify-between">
                  <p className="text-sm font-body text-grey-lightest opacity-80">
                    Total price
                  </p>
                  <p className="text-sm font-body text-blue-bright font-semibold">
                    {price === 0 ? (
                      <span className="text-green-main">FREE </span>
                    ) : (
                      <> {amount * price} ETH</>
                    )}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-body text-grey-lightest opacity-80">
                    USD Equivalent
                  </p>
                  {fetchingConvertedPrice ? (
                    <div className="h-[20px]">
                      <Spinner styles="w-[20px] h-[20px]" />
                    </div>
                  ) : price === 0 ? (
                    <span className="text-green-main text-sm font-body font-semibold">
                      FREE{" "}
                    </span>
                  ) : (
                    <p className="text-sm font-body text-blue-bright font-semibold">
                      ${usdPrice}
                    </p>
                  )}
                </div>
              </div>

              {royalties && (
                <div className="flex justify-between">
                  <p className="text-sm font-body text-grey-lightest opacity-80">
                    Creator royalty (secondary)
                  </p>
                  <p className="font-semibold text-grey-lightest text-sm font-body">
                    {royalties}
                  </p>
                </div>
              )}

              <div className="flex justify-between px-4 mb-3">
                <p>
                  I have read and agree to the
                  <Link
                    href={`/terms/${collectionData.CollectionElement.Id.Contract}`}
                    className="hover:text-blue-light text-blue-main"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    Terms and Conditions
                  </Link>
                </p>
                <Checkbox onChange={handleTCUpdated} />
              </div>

              {mintingPhase.requires_whitelist === false && (
                <SubmitButton
                  text="Mint"
                  onClick={() => handleMint()}
                  disabled={!tcAccepted}
                  styles={`${!tcAccepted && "bg-white-40 hover:bg-white-40 cursor-not-allowed"}`}
                />
              )}

              {mintingPhase.requires_whitelist === true && (
                <>
                  <SubmitButton
                    text="Mint"
                    disabled={
                      fetchingLeaf ||
                      !tcAccepted ||
                      errorFetchingLeaf ||
                      leafNotFound
                    }
                    onClick={() => handleMint()}
                    styles={`${
                      (fetchingLeaf ||
                        !tcAccepted ||
                        errorFetchingLeaf ||
                        leafNotFound) &&
                      "bg-white-40 hover:bg-white-40 cursor-not-allowed"
                    }`}
                  />

                  {fetchingLeaf ? (
                    <div className="text-gray-500 mt-2">
                      Checking eligibility...
                    </div>
                  ) : errorFetchingLeaf ? (
                    <div className="text-red-main 0 mt-2">
                      <p>
                        An error occurred, if you need help reach out via our{" "}
                        <a
                          href="https://www.emergence.site/contact-us"
                          className="!text-blue-main !underline"
                        >
                          contact page{" "}
                        </a>
                        or join our{" "}
                        <a
                          href="https://discord.gg/openmetadao"
                          className="!text-blue-main !underline"
                        >
                          Discord
                        </a>{" "}
                        community for assistance.
                      </p>
                    </div>
                  ) : leafNotFound ? (
                    <div className="text-red-500 mt-2">
                      Wallet not found in whitelist
                    </div>
                  ) : null}
                </>
              )}
            </>
          ) : (
            <div className="flex justify-center">
              <Spinner />
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Loading",
      content: (
        <div className="flex flex-col items-center p-6 rounded-lg w-full h-full">
          <div className="font-body mb-6">
            Please confirm the transaction on your wallet
          </div>
          <Spinner />
        </div>
      ),
    },
    {
      title: "Verifying",
      content: (
        <div className="flex flex-col items-center p-6 rounded-lg w-full h-full">
          <div className="font-body mb-6 text-center">
            Please await while your transaction gets verified, this may take
            some minutes.
          </div>
          <Spinner />
        </div>
      ),
    },
    {
      title: (
        <div className="flex justify-center items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="26"
            viewBox="0 0 27 26"
            fill="none"
          >
            <path
              d="M3.75 8.88268V17.116C3.75 17.8743 4.18333 18.6327 4.83333 18.9577L12.4167 23.1827C13.0667 23.5077 13.825 23.5077 14.475 23.1827L22.0583 18.9577C22.7083 18.5243 23.1417 17.8743 23.1417 17.116V8.88268C23.1417 8.12435 22.7083 7.36602 22.0583 7.04102L14.475 2.81602C13.825 2.49102 13.0667 2.49102 12.4167 2.81602L4.83333 6.93268C4.18333 7.36602 3.75 8.12435 3.75 8.88268Z"
              fill="#2FD4A1"
            />
            <path
              d="M10.5 13.5L12.1364 15L16.5 11"
              stroke="#161B27"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Success!
        </div>
      ),
      content: <SuccessStep tokenIds={tokenIds} />,
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

          <div>
            {errorMessage ? errorMessage : "The transaction was canceled"}
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
        disableClose={
          currentStep === Steps.WalletInteraction ||
          currentStep === Steps.Verifying
        }
        wrapperStyle="bg-black-light p-5 rounded-3xl mt-16 w-[400px] h-fit"
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

export default MintModal;
