"use client";
import ButtonIcon from "@/components/Buttons/ButtonIcon";
import ProgressBarCount from "@/components/Progress/ProgressBarCount";
import MintModal from "@/components/TransactionModal/MintModal";
import { IconEnum } from "@/constants/iconEnum";
import Image from "next/image";
import { useState, useEffect } from "react";
import useSmartContractsHandler from "@/hooks/useSmartContractsHandler";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { convertFromUSD } from "@/actions/external/convert";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import Spinner from "@/components/Spinner";

function LiveMintMobile({ mintData }: { mintData: MintCollectionData }) {
  const [showModal, setShowModal] = useState(false);
  const { isConnected } = useWeb3ModalAccount();
  const [usdPrice, setUsdPrice] = useState<number>(0);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { getMintingPhase, isMintingActive } = useSmartContractsHandler({
    address: mintData.CollectionElement.Id.Contract,
    chain: mintData.CollectionElement.Id.Chain.ChainName,
  });

  const [phase, setPhase] = useState<MintPhase>();
  const [errorSettingPhase, setErrorSettingPhase] = useState<boolean>(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        setErrorSettingPhase(false);
        const phaseId = await getMintingPhase();

        const matchingPhase = mintData.MintCollectionElement.MintPhases.find(
          (phase) => phase.phase_Id === phaseId
        );

        setPhase(matchingPhase);
      } catch {
        setErrorSettingPhase(true);
      }
    };

    initialize();
  }, [getMintingPhase, isMintingActive]);

  useEffect(() => {
    const getUsdPrice = async () => {
      const convertedPrice = await convertFromUSD(
        "eth",
        mintData.MintCollectionElement.ActiveMintPhase.price.toString()
      );
      setUsdPrice(convertedPrice);
    };

    getUsdPrice();
  }, [mintData.MintCollectionElement.ActiveMintPhase.price]);

  if (!isClient) {
    // Prevent rendering until client-side rendering is ready
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center gap-10 w-full mx-auto">
        <div className="bg-black-light w-full flex flex-col rounded-3xl p-5 relative">
          <div className="flex flex-col gap-y-3">
            <div className="flex justify-center w-full">
              {mintData.MintCollectionElement.MintPhases.map((phase) => {
                const currentPhaseId =
                  mintData.MintCollectionElement.ActiveMintPhase.phase_Id;
                const lastIndex =
                  mintData.MintCollectionElement.MintPhases.length - 1;
                if (currentPhaseId === phase.phase_Id) {
                  return (
                    <div
                      key={uuidv4()}
                      className={`flex flex-col items-center bg-grey-medium ${currentPhaseId === lastIndex && "rounded-r-3xl"} 
											gap-1 rounded-l-3xl px-5 py-2`}
                    >
                      <p className="text-xs font-body text-grey-normal">
                        {phase.name} until
                      </p>
                      <p className="text-xs font-body text-grey-lightest font-semibold">
                        {moment(phase.active_to).format("MMMM D")}
                      </p>
                    </div>
                  );
                }

                if (currentPhaseId + 1 === phase.phase_Id) {
                  return (
                    <div
                      key={uuidv4()}
                      className="flex bg-grey-medium rounded-r-3xl px-5 py-2 justify-between w-1/2 max-w-[260px]"
                    >
                      <p className="text-sm font-body text-grey-normal">
                        Next {phase.name} until
                      </p>
                      <p className="text-sm font-body text-grey-lightest font-semibold">
                        {/* check date here */}
                        {moment(phase.active_to).format("MMMM D")}
                      </p>
                    </div>
                  );
                }
              })}
            </div>
            {errorSettingPhase && (
              <small className="text-red-500 mt-2">
                Error getting smart contract information, please contact the
                administrator or try again in a few minutes.
              </small>
            )}

            <div className="bg-green-darker text-green-bright py-3 px-5 rounded-lg font-semibold text-center">
              ${usdPrice} USD //{" "}
              {mintData.MintCollectionElement.ActiveMintPhase.price} ETH
            </div>
            <h1 className="uppercase text-green-bright font-header text-3xl font-bold text-center">
              Mint Now
            </h1>

            <div
              onClick={!isConnected ? undefined : () => setShowModal(true)}
              className={`transition-all duration-1000 ease-in-out mx-auto ${
                !isConnected
                  ? ""
                  : "cursor-pointer hover:shadow-lg hover:shadow-green-bright"
              } rounded-[50%] overflow-hidden w-fit`}
            >
              <Image
                src={
                  isConnected
                    ? "/collection/button-collection.svg"
                    : "/collection/button-collection-disabled.svg"
                }
                width={150}
                height={150}
                alt="mint button"
                className={`transition-all duration-500 mx-auto ease-in-out rounded-[50%] ${
                  !isConnected ? "" : "hover:scale-125"
                }`}
              />
            </div>
          </div>
          <div className="mt-3 w-[95%] bottom-[10%]">
            <ProgressBarCount
              count={Number(mintData.CollectionElement.NumberOfItems)}
              max={mintData.MintCollectionElement.TotalSupply}
            />
          </div>
        </div>

        <div className="flex flex-col font-body bg-black-light p-14 rounded-3xl gap-y-5 w-[35%] noMinLg:w-full">
          <div className="bg-black-lighter-1 py-3 px-6 text-grey-lightest font-body text-xl font-semibold mb-4 w-fit rounded-xl flex gap-2">
            <p>Now Active:</p>
            <p className="font-normal">
              {mintData.MintCollectionElement.ActiveMintPhase.name}
            </p>
          </div>

          <div className="flex items-center gap-5 justify-between">
            <div className="flex items-center gap-5">
              <ButtonIcon icon={IconEnum.Cube} disableHover variant="MEDIUM" />
              <p className="text-grey-normal">Collection Size</p>
            </div>
            <p className="font-semibold text-3xl text-grey-lightest">
              {mintData.MintCollectionElement.TotalSupply}
            </p>
          </div>
          <div className="flex items-center gap-5 justify-between">
            <div className="flex items-center gap-5">
              <ButtonIcon
                icon={IconEnum.CubeWithCircle}
                disableHover
                variant="MEDIUM"
              />
              <p className="text-grey-normal">Number Minted To Date</p>
            </div>
            <p className="font-semibold text-3xl text-grey-lightest">
              {mintData.CollectionElement.NumberOfItems}
            </p>
          </div>
          <div className="flex items-center gap-5 w-full justify-between">
            <div className="flex items-center gap-5 justify-between">
              <ButtonIcon icon={IconEnum.Crown} disableHover variant="MEDIUM" />
              <p className="text-grey-normal">Number of Owners</p>
            </div>
            <p className="font-semibold text-3xl text-grey-lightest ">
              {mintData.CollectionElement.NumberOfOwners}
            </p>
          </div>
        </div>
      </div>
      {phase && (
        <MintModal
          collectionData={mintData}
          phase={phase}
          showModal={showModal}
          onClose={() => setShowModal(false)}
          royalties={mintData.CollectionElement.Royalty.Value}
        />
      )}
    </>
  );
}

export default LiveMintMobile;
