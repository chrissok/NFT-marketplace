import { IconEnum } from "@/constants/iconEnum";
import DetailsDrawerButton from "./DetailsDrawerButton";
import SubmitButton from "@/components/Buttons/SubmitButton";
import Drawer from "@/components/Drawer/Drawer";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Spinner from "@/components/Spinner/Spinner";
import DescriptionSkeleton from "./Skeletons/DescriptionSkeleton";
import TransactionButtons from "./TransactionButtons";
import NFTDescription from "./NFTDescription";
import { formatStringDecimals } from "@/utils/formatString";
import Link from "next/link";
import ArrowLeftSVG from "./ArrowLeftSVG";
import LikeButton from "./LikeButton";
import { getNFTDataByID } from "@/actions/IAS/marketplace";
import AnimationDropdown from "./AnimationDropdown";
import LargeButton from "@/components/Buttons/LargeButton";
import { getCollectionDataByID } from "@/actions/IAS/collection";
import SocialMediaButton from "@/components/Buttons/SocialMediaButton/SocialMediaButton";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

const Details = dynamic(() => import("./Details"), {
  loading: () => (
    <div className="absolute top-1/2 left-1/2">
      <Spinner />
    </div>
  ),
});

const DynamicViewer = dynamic(() => import("./AssetPage3dViewer"), {
  loading: () => (
    <div className="absolute top-1/2 left-1/2">
      <Spinner />
    </div>
  ),
  ssr: false,
});

async function TopSection({
  isDrawerOpen,
  activeTab,
  id,
}: {
  isDrawerOpen: boolean;
  activeTab: string;
  id: string;
}) {
  const data = await getNFTDataByID(id);
  const collectionData = await getCollectionDataByID(
    `${data.NftElement.Chain.ChainName}:${data.NftElement.Address}`
  );

  const hasAsset = () => {
    return data.NftElement.PrimaryAsset >= 0;
  };

  const isVRM = () => {
    return (
      data.NftElement.Assets[data.NftElement?.PrimaryAsset]?.MediaType
        .Element === "vrm"
    );
  };
  const isGLB = () => {
    return (
      data.NftElement.Assets[
        data.NftElement?.PrimaryAsset
      ]?.MediaType.Element.toLowerCase() === "gltf-binary"
    );
  };
  const isPNG = () => {
    return (
      data.NftElement.Assets[data.NftElement?.PrimaryAsset]?.MediaType
        .Element === "png" ||
      data.NftElement.Assets[data.NftElement?.PrimaryAsset]?.MediaType
        .Element === "gif"
    );
  };

  const assetPrice = () => {
    if (!data.MarketplaceInfoElement?.SellOrders) return;
    return (
      data.MarketplaceInfoElement?.SellOrders?.Price +
      data.MarketplaceInfoElement?.SellOrders?.CurrencySymbol +
      " // " +
      formatStringDecimals(data.MarketplaceInfoElement?.SellOrders?.UsdPrice) +
      " USD$"
    );
  };

  const isForSale = () => {
    if (data?.MarketplaceInfoElement?.SellOrders) return true;
  };

  const playgroundViewerHref = isVRM()
    ? `/playground-viewer/0/${decodeURIComponent(id)}?type=${isVRM() ? "avatarAsset" : "playgroundAsset"}`
    : `/playground-viewer/${decodeURIComponent(id)}/0?type=${isVRM() ? "avatarAsset" : "playgroundAsset"}`;

  return (
    <>
      <div className="mt-14 flex w-full h-full justify-between xs:mt-3">
        <div className="flex flex-col justify-between h-[95%] xs:w-[90%]">
          <div className="">
            <Link
              href={`/collection/${data.NftElement.Chain.ChainName}:${data.NftElement.Address}`}
              className="flex items-center mb-8 px-[2px] gap-[6px]"
            >
              <ArrowLeftSVG />
              <p className="font-body text-grey-normal">Collection</p>
            </Link>
            <Suspense fallback={<DescriptionSkeleton />}>
              <NFTDescription id={id} />
            </Suspense>
            <div className="flex gap-3 items-center mt-8">
              {hasAsset() && !isPNG() && (
                <Link
                  href={playgroundViewerHref}
                  className="w-[200px] relative group"
                >
                  <LargeButton
                    text="Test Drive"
                    icon={IconEnum.ArrowRightBig}
                    prefix={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="group-hover:fill-blue-main group-hover:stroke-blue-main"
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
                  <div className="w-[15px] bg-blue-main absolute h-[15px] rounded-full animate-ping -top-[5px] -left-[5px]"></div>
                  <div className="w-[15px] bg-blue-main absolute h-[15px] rounded-full animate-pulse -top-[5px] -left-[5px]"></div>
                </Link>
              )}
              <Link
                href={`?drawer=open&activeTab=4`}
                className="flex items-center gap-[6px] bg-green-darker w-fit px-2 py-3 rounded-md border
								 border-white-3 hover:bg-[#2B4A52] transition-colors duration-300"
              >
                <p className="font-body text-green-main font-semibold">
                  See Offers
                </p>
              </Link>
            </div>
          </div>

          <div className="bg-white-3 w-96 p-3 flex flex-col gap-2 rounded-md mb-10 xs:w-[95%] xs:mt-6">
            <Suspense>
              <SubmitButton
                disabled
                text={isForSale() ? assetPrice() : "Not For Sale"}
              />
              <TransactionButtons data={data} />
            </Suspense>
          </div>
        </div>

        {/* asset background */}
        <div className="w-[15%] h-[25%] absolute left-[45%] top-[35%] bg-[#949aa1] blur-[200px] noMinLg:top-[60%]"></div>
        <div
          className={`w-1/2 h-full noMinLg:hidden absolute left-[30%] top-1/8 3xl:w-1/2 2xl:w-[45%] 3xl:left-[37%] 
				2xl:left-[40%] xl:!w-[40%] xl:!left-[48%] ${!isVRM() && !isPNG() && "noMax:w-[70%] noMax:left-[20%] noMax:top-[10%]"}
				${isPNG() && "top-[20%] noMax:top-[30%]"}`}
        >
          <div className="relative w-full h-3/4">
            {hasAsset() && (isGLB() || isVRM()) && (
              <DynamicViewer
                itemURL={
                  data.NftElement.Assets[data.NftElement?.PrimaryAsset]
                    ?.AssetLocation
                }
                isVRM={isVRM()}
              />
            )}
            {isPNG() &&
              data.NftElement.Assets[data.NftElement?.PrimaryAsset]
                ?.AssetLocation && (
                <div className="flex justify-center items-center">
                  <Image
                    src={
                      data.NftElement.Assets[data.NftElement?.PrimaryAsset]
                        ?.AssetLocation
                    }
                    alt="pre-reveal"
                    width={500}
                    height={500}
                    priority
                    className="rounded-lg"
                  />
                </div>
              )}
          </div>
        </div>
        <div className="flex gap-10">
          {isVRM() && (
            <div className="flex flex-col gap-3 noMinLg:hidden">
              <AnimationDropdown />
            </div>
          )}
          <div className="flex flex-col h-[95%] justify-between noMinLg:h-full">
            <div className="flex flex-col gap-5 self-end">
              <LikeButton
                chain={data.NftElement.Chain.ChainName}
                nftId={`${data.NftElement.Address}:${data.NftElement.TokenNumber}`}
              />
              {Object.entries(collectionData.CollectionElement.SocialUrls).map(
                ([key, value]) => {
                  // Check if the key is one of the valid SocialMediaTypes
                  if (
                    ["discord", "twitter", "youtube", "instagram"].includes(key)
                  ) {
                    return (
                      <SocialMediaButton
                        socialMedia={key as SocialMediaTypes}
                        key={uuidv4()}
                        url={value}
                      />
                    );
                  }
                  return null;
                }
              )}
              <div className="h-36 w-12 translate-y-1/2 mt-48">
                <DetailsDrawerButton />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Drawer isOpen={isDrawerOpen}>
        <Details activeTab={activeTab} id={id} />
      </Drawer>
    </>
  );
}

export default TopSection;
