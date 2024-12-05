import ButtonIcon from "@/components/Buttons/ButtonIcon";
import { IconEnum } from "@/constants/iconEnum";
import Image from "next/image";
import dynamic from "next/dynamic";
import Spinner from "@/components/Spinner";
import SocialMediaButton from "@/components/Buttons/SocialMediaButton/SocialMediaButton";
import LikeButton from "@/templates/AssetPage/TopSection/LikeButton";
import { getCollectionDataByID } from "@/actions/IAS/collection";
import { Suspense } from "react";
import { convertFromUSD } from "@/actions/external/convert";

const DynamicViewer = dynamic(() => import("./Collection3dViewer"), {
  loading: () => (
    <div className="absolute top-1/2 left-1/2">
      <Spinner />
    </div>
  ),
  ssr: false,
});

async function TopSection({ id }: { id: string }) {
  const data = await getCollectionDataByID(id);

  const convertedFloorPrice = await convertFromUSD(
    data.CollectionElement.CurrencySymbol,
    data.CollectionElement.FloorPrice
  );

  const hasVRM = () => {
    return (
      data.CollectionElement.PrimaryAssetFileType.toLocaleLowerCase() === "vrm"
    );
  };

  return (
    <div className="flex w-full h-full pt-12 pb-4">
      {hasVRM() && (
        <div
          className="absolute w-1/2 h-1/2 bg-white-3 backdrop-blur-sm border noMinLg:hidden
			 border-white-20 rounded-tl-[300px] rounded-tr-lg top-1/2 left-[47%]"
        ></div>
      )}
      <div
        className={`p-14 pl-10 md:p-6 flex flex-col absolute ${hasVRM() ? "h-[70%] top-[30%] max-w-[782px]" : "h-[70%] top-[30%] max-w-[850px]"} 
			gap-y-5 bg-white-3 backdrop-blur-sm border  border-white-20 rounded-tr-[300px] 
			md:rounded-3xl md:w-[90%] rounded-tl-lg left-[5%] xs:top-[15%]`}
      >
        <h1 className="font-header text-5xl xs:text-xl text-grey-lightest uppercase pr-5 md:text-center md:w-full w-[95%]">
          {data.CollectionElement.NameOverride}
        </h1>
        <div className="h-[144px] overflow-y-auto scrollbar-thin scrollbar-thumb-black-lighter-2 scrollbar-track-transparent">
          <p className="font-body text-grey-lightest opacity-80 w-[70%] md:w-full">
            {data.CollectionElement.DescriptionOverride}
          </p>
        </div>

        <div className="absolute flex gap-6 bottom-[4%] xs:-bottom-[20%] md:left-[1%] md:p-3 md:justify-between w-full xs:flex-col">
          <div
            className="bg-black-main p-20 md:p-15 xs:p-3 self-end xs:self-center flex flex-col rounded-3xl 
					shadow-[0px_4px_46.6px_0px_rgba(173,_114,_233,_0.34)]"
          >
            <Suspense>
              <h1 className="text-grey-lightest text-4xl xs:text-xl font-semibold text-center">
                {convertedFloorPrice} {data.CollectionElement.CurrencySymbol}
              </h1>
            </Suspense>
            <p className="text-grey-normal text-xl xs:text-lg  text-center">
              Floor
            </p>
          </div>

          <div
            className="bg-black-main px-24 py-16  md:p-14 xs:p-3 flex flex-col rounded-3xl h-fit 
					self-end xs:self-center shadow-[0px_4px_46.6px_0px_rgba(173,_114,_233,_0.34)]"
          >
            <h1 className="text-grey-lightest text-4xl xs:text-xl font-semibold text-center">
              {data.CollectionElement.NumberForSale}
            </h1>
            <p className="text-grey-normal text-xl xs:text-lg text-center">
              For Sale
            </p>
          </div>
        </div>
      </div>
      {hasVRM() && (
        <div className="w-[35%] h-[120%] left-[55%] -top-[20%] overflow-hidden absolute noMinLg:hidden">
          <div className="h-[130vh]">
            <DynamicViewer vrmSrc={data.CollectionElement.HeroAsset} />
          </div>
        </div>
      )}

      <Image
        src={`${hasVRM() ? "/collection/collection-hero.png" : "https://emergence-nft-thumbnails.s3.amazonaws.com/gallery-3.webp"}`}
        alt="background"
        className={`-z-10 h-[85vh] noMax:h-[55vh] absolute object-cover w-full top-0 left-0 px-8 xs:h-[85%] xs:rounded-b-lg`}
        width={1920}
        height={1080}
        priority
      />

      {/* bottom shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-gray-900 opacity-90 xs:hidden"></div>

      <div className="absolute flex-col bottom-[5%] right-[3%] md:hidden">
        <div className="flex-col mb-2">
          <div className="flex bg-black-light p-3 pr-4 rounded-2xl items-center gap-3 min-w-56">
            <ButtonIcon
              icon={IconEnum.Calendar}
              variant="MEDIUM"
              disableHover
            />
            <div className="flex flex-col">
              <h2 className="text-xl text-grey-lightest font-body">Jan 2024</h2>
              <p className="text-grey-lightest opacity-50 text-sm">Mint Date</p>
            </div>
          </div>
        </div>
        <div className="flex-col">
          <div className="flex bg-black-light p-3 pr-4 rounded-2xl items-center gap-3 min-w-56">
            <ButtonIcon
              icon={IconEnum[data.CollectionElement.Id.Chain.ChainName]}
              variant="MEDIUM"
              disableHover
            />

            <h2 className="text-xl text-grey-lightest font-body p-2 pl-0">
              {data.CollectionElement.Id.Chain.ChainName.toUpperCase()}
            </h2>
          </div>
        </div>
      </div>

      <div className="flex justify-between absolute right-[3%]">
        <div className="flex flex-col gap-5">
          <LikeButton
            chain={data.CollectionElement.Id.Chain.ChainName}
            collectionId={data.CollectionElement.Id.Contract}
          />
          {Object.entries(data.CollectionElement.SocialUrls).map(
            ([key, value], index) => {
              // Check if the key is one of the valid SocialMediaTypes
              if (
                ["discord", "twitter", "youtube", "instagram"].includes(key)
              ) {
                return (
                  <SocialMediaButton
                    socialMedia={key as SocialMediaTypes}
                    key={index}
                    url={value}
                  />
                );
              }
              return null;
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default TopSection;
