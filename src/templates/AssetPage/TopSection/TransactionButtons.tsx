"use client";

import LargeButton from "@/components/Buttons/LargeButton";
import SellModal from "@/components/TransactionModal/SellModal";
import { IconEnum } from "@/constants/iconEnum";
import {
  useWalletInfo,
  useWeb3Modal,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
import { useEffect, useState } from "react";
import BuyModal from "@/components/TransactionModal/BuyModal";
import PlaceBidModal from "@/components/TransactionModal";
import Spinner from "@/components/Spinner";
import CancelOrderModal from "@/components/TransactionModal/CancelOrderModal";
import CancelButtonWithIcon from "@/components/Buttons/CancelButtonWithIcon";
import { IAS_CHAIN_MAP, IAS_CHAIN_NAMES_MAP } from "@/constants/web3/iasChains";
import { chainMap } from "@/constants/web3/chains";
import InfoSVG from "@/templates/PlaygroundViewer/InfoSVG";

function TransactionButtons({ data }: { data: IAS_NFT }) {
  const [showModal, setShowModal] = useState({
    bid: false,
    sell: false,
    buy: false,
    cancel: false,
  });

  const { walletInfo } = useWalletInfo();
  const { address, chainId } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Prevent rendering until client-side rendering is ready
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (!chainId) {
    return <LargeButton text="Connect wallet" onClick={() => open()} />;
  }

  const isSameChain = () => {
    const assetChainName = data.NftElement.Chain.ChainName.toLowerCase();
    if (IAS_CHAIN_MAP[assetChainName] === chainId) {
      return true;
    } else {
      return false;
    }
  };

  if (!isSameChain() && chainId) {
    return (
      <div className="flex flex-col gap-y-3">
        <div className="rounded-lg border border-white-3 font-body bg-grey-lightest p-4 relative">
          <div className="absolute top-0 right-0">
            <InfoSVG />
          </div>
          You are connected with{" "}
          <span className="text-red-main">
            {chainMap[chainId] || "other network"}.
          </span>{" "}
          To proceed with actions for this NFT, please connect with{" "}
          <span className="text-green-main">
            {IAS_CHAIN_NAMES_MAP[data.NftElement.Chain.ChainName]}
          </span>
        </div>
        <LargeButton
          text="Change Network"
          onClick={() => open({ view: "Networks" })}
        />
      </div>
    );
  }

  const isOwner = () => {
    return address === data.NftElement.Owner;
  };

  const isForSale = () => {
    if (data?.MarketplaceInfoElement?.SellOrders) return true;
  };

  return (
    <>
      {isForSale() && isOwner() && (
        <>
          {data?.MarketplaceInfoElement?.SellOrders !== null && (
            <CancelOrderModal
              showModal={showModal.cancel}
              onClose={() => setShowModal({ ...showModal, cancel: false })}
              nft={data.NftElement}
              order={data.MarketplaceInfoElement?.SellOrders}
              img={data.ThumbnailElement?.LargeThumbnail}
            />
          )}
          <CancelButtonWithIcon
            text="Cancel Sell Order"
            icon={IconEnum.Cross}
            onClick={() => setShowModal({ ...showModal, cancel: true })}
            disabled={!walletInfo}
          />
        </>
      )}
      {!isOwner() && chainId && (
        <>
          <PlaceBidModal
            showModal={showModal.bid}
            onClose={() => setShowModal({ ...showModal, bid: false })}
            nft={data.NftElement}
            chainId={chainId}
            img={data.ThumbnailElement?.LargeThumbnail}
          />
          <LargeButton
            text="Place Bid"
            icon={IconEnum.ArrowRightBig}
            onClick={() => setShowModal({ ...showModal, bid: true })}
            disabled={!walletInfo}
          />
        </>
      )}
      {isOwner() && (
        <>
          <SellModal
            showModal={showModal.sell}
            onClose={() => setShowModal({ ...showModal, sell: false })}
            nft={data.NftElement}
            img={data.ThumbnailElement?.LargeThumbnail}
          />
          <LargeButton
            text="Sell it"
            icon={IconEnum.ArrowRightBig}
            onClick={() => setShowModal({ ...showModal, sell: true })}
            disabled={!walletInfo}
          />
        </>
      )}
      {isForSale() && !isOwner() && (
        <>
          {data?.MarketplaceInfoElement?.SellOrders !== null && (
            <BuyModal
              showModal={showModal.buy}
              onClose={() => setShowModal({ ...showModal, buy: false })}
              nft={data.NftElement}
              order={data.MarketplaceInfoElement?.SellOrders}
              img={data.ThumbnailElement?.LargeThumbnail}
            />
          )}
          <LargeButton
            text="Buy it"
            icon={IconEnum.ArrowRightBig}
            onClick={() => setShowModal({ ...showModal, buy: true })}
            disabled={!walletInfo}
          />
        </>
      )}
    </>
  );
}

export default TransactionButtons;
