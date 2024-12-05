"use client";

import { v4 as uuidv4 } from "uuid";
import LargeButton from "@/components/Buttons/LargeButton";
import { IconEnum } from "@/constants/iconEnum";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LikeButton from "@/templates/AssetPage/TopSection/LikeButton";

function CollectionItem({ nft }: { nft: IAS_NFT }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <div className="relative rounded-xl h-full cursor-pointer w-[260px]	">
      {nft.MarketplaceInfoElement?.SellOrders?.OrderId && !isPanelOpen && (
        <div className="absolute py-1 px-3 bg-green-main mt-2 text-grey-lightest text-sm w-fit rounded-md top-0 -left-[5%] z-30">
          LISTED
        </div>
      )}
      <div className="overflow-hidden rounded-xl">
        <div className="absolute z-10 left-[82%] top-[2%]">
          <LikeButton
            chain={nft.NftElement.Chain.ChainName}
            nftId={`${nft.NftElement.Address}:${nft.NftElement.TokenNumber}`}
          />
        </div>
        <div className="bg-blur-dark-6 backdrop-blur-md py-4 px-3 absolute w-[80%] rounded-xl bottom-[3%] left-[10%] z-10">
          <p className="text-grey-lightest font-body font-semibold text-base text-center">
            {nft.NftElement.NFTName.replace(/_/g, " ")}
          </p>
        </div>
        {nft.ThumbnailElement?.LargeThumbnail?.url ? (
          <Image
            alt="collection item"
            width={nft.ThumbnailElement?.LargeThumbnail?.width}
            height={nft.ThumbnailElement?.LargeThumbnail?.height}
            className="rounded-xl	object-cover transition ease-in-out hover:scale-110 duration-300 w-full"
            onClick={() => setIsPanelOpen(true)}
            src={nft.ThumbnailElement?.LargeThumbnail?.url}
          />
        ) : (
          <div className="w-[260px] h-[266px]"></div>
        )}
      </div>

      {/* Overlay */}
      <div
        className={`absolute top-0 bg-[rgba(20,_27,_43,_0.33)] rounded-xl p-3 transition-all ease-in-out duration-500 w-full h-full backdrop-blur-xl ${
          isPanelOpen ? "opacity-100 z-20" : "opacity-0 -z-10"
        }`}
        onClick={() => setIsPanelOpen(false)}
      >
        <h2 className="text-grey-lightest text-base font-header mb-3">
          {nft.NftElement.NFTName.replace(/_/g, " ")}
        </h2>
        <div
          className="h-[125px] overflow-y-auto rounded-sm scrollbar-thin scrollbar-thumb-white-20
						 scrollbar-track-white-40 pr-1"
        >
          {nft.NftElement?.Attributes.map((attribute) => (
            <div
              key={uuidv4()}
              className="flex justify-between text-grey-lightest text-sm mb-1 font-body"
            >
              <p className="opacity-75">{attribute.Key}</p>
              <p>{attribute.Value}</p>
            </div>
          ))}
        </div>

        <Link
          href={`/asset/${nft.NftElement.Chain.ChainName}:${nft.NftElement.Address}:${nft.NftElement.TokenNumber}`}
        >
          <LargeButton
            icon={IconEnum.ArrowRightBig}
            text="View"
            styles="absolute bottom-[5%] !w-[90%]"
            prefix={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M8.225 19.9167C5.5 18.6167 3.55 15.9667 3.25 12.8333H2C2.41667 17.9667 6.71667 22 11.9583 22L12.5083 21.975L9.33333 18.8L8.225 19.9167ZM8.96667 14.4667C8.80833 14.4667 8.66667 14.4417 8.53333 14.4C8.40887 14.3587 8.29505 14.2904 8.2 14.2C8.10833 14.1167 8.03333 14.0167 7.98333 13.8917C7.93333 13.775 7.90833 13.6417 7.90833 13.5H6.825C6.825 13.8 6.88333 14.0833 7 14.2917C7.11667 14.5 7.275 14.7083 7.46667 14.8667C7.66667 15.0167 7.89167 15.1333 8.15 15.2083C8.4 15.2917 8.66667 15.3333 8.95 15.3333C9.25833 15.3333 9.55 15.2917 9.80833 15.2083C10.075 15.125 10.3083 15 10.5 14.8417C10.6917 14.6833 10.85 14.5 10.9583 14.2417C11.0667 14 11.125 13.7333 11.125 13.4333C11.125 13.275 11.1083 13.1167 11.0667 12.9667C11.025 12.8333 10.9667 12.675 10.875 12.5417C10.7917 12.4167 10.675 12.2917 10.5417 12.1833C10.4 12.075 10.2333 12 10.0333 11.925C10.3353 11.792 10.5927 11.5751 10.775 11.3C10.8583 11.1667 10.9167 11.05 10.9583 10.9167C11 10.7833 11.0167 10.65 11.0167 10.5167C11.0167 10.2167 10.9667 9.95 10.8667 9.71667C10.75 9.5 10.625 9.29167 10.4417 9.14167C10.275 8.98333 10.05 8.86667 9.8 8.78333C9.54167 8.70833 9.25833 8.66667 8.95 8.66667C8.66667 8.66667 8.375 8.70833 8.11667 8.8C7.86667 8.89167 7.64167 9.01667 7.45833 9.175C7.28333 9.33333 7.14167 9.5 7.03333 9.73333C6.93333 9.95 6.88333 10.1833 6.88333 10.4417H7.96667C7.96667 10.3 7.99167 10.175 8.04167 10.0667C8.08874 9.95765 8.15998 9.86077 8.25 9.78333C8.34167 9.70833 8.44167 9.64167 8.56667 9.6C8.69167 9.55833 8.81667 9.53333 8.96667 9.53333C9.3 9.53333 9.55 9.61667 9.70833 9.79167C9.86667 9.95833 9.95 10.2 9.95 10.5083C9.95 10.6583 9.91667 10.7917 9.88333 10.9167C9.8419 11.0358 9.77009 11.1421 9.675 11.225C9.58333 11.3083 9.46667 11.375 9.33333 11.425C9.2 11.475 9.03333 11.5 8.85 11.5H8.20833V12.3583H8.85C9.03333 12.3583 9.2 12.375 9.35 12.4167C9.5 12.4583 9.625 12.525 9.725 12.6083C9.825 12.7 9.91667 12.8083 9.96667 12.9417C10.025 13.075 10.05 13.25 10.05 13.4167C10.05 13.7583 9.95 14.0167 9.75833 14.1917C9.56667 14.3833 9.3 14.4667 8.96667 14.4667ZM17.0917 9.53333C16.825 9.25833 16.5083 9.04167 16.1417 8.89167C15.7833 8.74167 15.375 8.66667 14.925 8.66667H12.9583V15.3333H14.875C15.3333 15.3333 15.7583 15.2583 16.1333 15.1083C16.5083 14.9583 16.8333 14.75 17.1 14.475C17.3667 14.2 17.5833 13.8667 17.7167 13.4833C17.8583 13.0917 17.9333 12.6583 17.9333 12.175V11.8417C17.9333 11.3583 17.8583 10.925 17.7167 10.5333C17.5833 10.1417 17.3583 9.80833 17.0917 9.53333ZM16.75 12.1667C16.75 12.5167 16.725 12.8333 16.65 13.1083C16.5667 13.3833 16.45 13.625 16.2917 13.8167C16.1333 14.0083 15.9167 14.1583 15.7 14.2583C15.4583 14.3583 15.1833 14.4083 14.875 14.4083H14.1167V9.6H14.925C15.525 9.6 15.9833 9.79167 16.2917 10.175C16.6083 10.5583 16.75 11.1083 16.75 11.8333M11.9583 2L11.4083 2.025L14.5833 5.2L15.6917 4.08333C18.4167 5.38333 20.3667 8.025 20.6583 11.1667H21.9083C21.4917 6.03333 17.2 2 11.9583 2Z"
                  fill="#0E1420"
                />
                <path
                  d="M16.75 12.1667C16.75 12.5167 16.725 12.8333 16.65 13.1083C16.5667 13.3833 16.45 13.625 16.2917 13.8167C16.1333 14.0083 15.9167 14.1583 15.7 14.2583C15.4583 14.3583 15.1833 14.4083 14.875 14.4083H14.1167V9.6H14.925C15.525 9.6 15.9833 9.79167 16.2917 10.175C16.6083 10.5583 16.75 11.1083 16.75 11.8333M8.225 19.9167C5.5 18.6167 3.55 15.9667 3.25 12.8333H2C2.41667 17.9667 6.71667 22 11.9583 22L12.5083 21.975L9.33333 18.8L8.225 19.9167ZM8.96667 14.4667C8.80833 14.4667 8.66667 14.4417 8.53333 14.4C8.40887 14.3587 8.29505 14.2904 8.2 14.2C8.10833 14.1167 8.03333 14.0167 7.98333 13.8917C7.93333 13.775 7.90833 13.6417 7.90833 13.5H6.825C6.825 13.8 6.88333 14.0833 7 14.2917C7.11667 14.5 7.275 14.7083 7.46667 14.8667C7.66667 15.0167 7.89167 15.1333 8.15 15.2083C8.4 15.2917 8.66667 15.3333 8.95 15.3333C9.25833 15.3333 9.55 15.2917 9.80833 15.2083C10.075 15.125 10.3083 15 10.5 14.8417C10.6917 14.6833 10.85 14.5 10.9583 14.2417C11.0667 14 11.125 13.7333 11.125 13.4333C11.125 13.275 11.1083 13.1167 11.0667 12.9667C11.025 12.8333 10.9667 12.675 10.875 12.5417C10.7917 12.4167 10.675 12.2917 10.5417 12.1833C10.4 12.075 10.2333 12 10.0333 11.925C10.3353 11.792 10.5927 11.5751 10.775 11.3C10.8583 11.1667 10.9167 11.05 10.9583 10.9167C11 10.7833 11.0167 10.65 11.0167 10.5167C11.0167 10.2167 10.9667 9.95 10.8667 9.71667C10.75 9.5 10.625 9.29167 10.4417 9.14167C10.275 8.98333 10.05 8.86667 9.8 8.78333C9.54167 8.70833 9.25833 8.66667 8.95 8.66667C8.66667 8.66667 8.375 8.70833 8.11667 8.8C7.86667 8.89167 7.64167 9.01667 7.45833 9.175C7.28333 9.33333 7.14167 9.5 7.03333 9.73333C6.93333 9.95 6.88333 10.1833 6.88333 10.4417H7.96667C7.96667 10.3 7.99167 10.175 8.04167 10.0667C8.08874 9.95765 8.15998 9.86077 8.25 9.78333C8.34167 9.70833 8.44167 9.64167 8.56667 9.6C8.69167 9.55833 8.81667 9.53333 8.96667 9.53333C9.3 9.53333 9.55 9.61667 9.70833 9.79167C9.86667 9.95833 9.95 10.2 9.95 10.5083C9.95 10.6583 9.91667 10.7917 9.88333 10.9167C9.8419 11.0358 9.77009 11.1421 9.675 11.225C9.58333 11.3083 9.46667 11.375 9.33333 11.425C9.2 11.475 9.03333 11.5 8.85 11.5H8.20833V12.3583H8.85C9.03333 12.3583 9.2 12.375 9.35 12.4167C9.5 12.4583 9.625 12.525 9.725 12.6083C9.825 12.7 9.91667 12.8083 9.96667 12.9417C10.025 13.075 10.05 13.25 10.05 13.4167C10.05 13.7583 9.95 14.0167 9.75833 14.1917C9.56667 14.3833 9.3 14.4667 8.96667 14.4667ZM17.0917 9.53333C16.825 9.25833 16.5083 9.04167 16.1417 8.89167C15.7833 8.74167 15.375 8.66667 14.925 8.66667H12.9583V15.3333H14.875C15.3333 15.3333 15.7583 15.2583 16.1333 15.1083C16.5083 14.9583 16.8333 14.75 17.1 14.475C17.3667 14.2 17.5833 13.8667 17.7167 13.4833C17.8583 13.0917 17.9333 12.6583 17.9333 12.175V11.8417C17.9333 11.3583 17.8583 10.925 17.7167 10.5333C17.5833 10.1417 17.3583 9.80833 17.0917 9.53333ZM11.9583 2L11.4083 2.025L14.5833 5.2L15.6917 4.08333C18.4167 5.38333 20.3667 8.025 20.6583 11.1667H21.9083C21.4917 6.03333 17.2 2 11.9583 2Z"
                  stroke="#0E1420"
                  strokeWidth="0.3"
                />
              </svg>
            }
          />
        </Link>
      </div>
    </div>
  );
}

export default CollectionItem;
