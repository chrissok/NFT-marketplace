import ButtonIcon from "@/components/Buttons/ButtonIcon";
import { IconEnum } from "@/constants/iconEnum";
import Image from "next/image";
import Collection3dViewer from "./Collection3dViewer";
import SocialMediaButton from "@/components/Buttons/SocialMediaButton/SocialMediaButton";
import { getMintDataByCollectionId } from "@/actions/IAS/collection";
import { v4 as uuidv4 } from "uuid";
import LikeButton from "@/templates/AssetPage/TopSection/LikeButton";

async function TopSection({ id }: { id: string }) {
  const data = await getMintDataByCollectionId(id);

  const hasVRM = () => {
    return (
      data.CollectionElement.PrimaryAssetFileType.toLocaleLowerCase() === "vrm"
    );
  };

  return (
    <div className="flex w-full h-full pt-12 pb-4 select-none">
      {hasVRM() && (
        <div
          className="absolute w-1/2 h-1/2 bg-white-3 backdrop-blur-sm border border-white-20 
			rounded-tl-[300px] rounded-tr-lg top-1/2 left-[47%] noMinLg:hidden"
        ></div>
      )}
      <div
        className={`p-10 flex flex-col absolute ${hasVRM() ? "h-[40%] top-[60%] max-w-[772px]" : "h-[50%] top-[50%] max-w-[850px]"} 
					gap-y-5 bg-white-3 backdrop-blur-sm border border-white-20 
					rounded-tr-[300px] xl:rounded-tr-[100px] lg:rounded-lg rounded-tl-lg 
					left-[5%] xl:w-[530px] lg:w-full smallScreen:top-[30%] xs:top-[10%] smallScreen:h-[60%] 
					xs:rounded-tr-lg xs:h-full noMinLg:border-none noMinLg:bg-transparent`}
      >
        <h1
          className={`font-header text-5xl xs:text-xl text-grey-lightest ${hasVRM() ? "w-3/4" : "w-full"}  uppercase`}
        >
          {data.CollectionElement.NameOverride ||
            data.CollectionElement.Name ||
            ""}
        </h1>
        <div
          className="xs:h-[400px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white-20
						 scrollbar-track-white-40"
        >
          <p className="font-body text-grey-lightest noMinLg:w-[80%] xs:min-w-full mr-3">
            {data.CollectionElement.DescriptionOverride ||
              data.CollectionElement.Description ||
              ""}
          </p>
        </div>
      </div>
      {hasVRM() && (
        <div className="w-[35%] h-[120%] left-[55%] -top-[20%] overflow-hidden absolute">
          <div className="h-[130vh] noMinLg:hidden">
            <Collection3dViewer vrmSrc={data.CollectionElement.HeroAsset} />
          </div>
        </div>
      )}

      <Image
        src={"/home/home-bg.png"}
        alt="background"
        className={`-z-10 ${hasVRM() ? "h-[85.5vh] noMax:h-[75vh]" : "h-[55vh]"} absolute object-cover w-full top-0 left-0 px-8 noMinLg:h-[50vh] select-none`}
        width={1920}
        height={1080}
        priority
      />

      {/* bottom shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-gray-900 opacity-90 noMinLg:hidden"></div>

      <div className="flex-col absolute bottom-[5%] right-[3%] xs:left-[2%] xs:bottom-[-17%]">
        <div className="flex bg-black-light p-3 pr-4 rounded-2xl items-center gap-3 min-w-56">
          <ButtonIcon
            icon={IconEnum[data.CollectionElement.Id.Chain.ChainName]}
            variant="MEDIUM"
            disableHover
          />

          <h2 className="text-xl text-grey-lightest font-body">
            {data.CollectionElement.Id.Chain.ChainName.toUpperCase()}
          </h2>
        </div>
      </div>

      <div className="flex justify-between absolute right-[3%] xs:top-[20%]">
        <div className="flex flex-col gap-5">
          <LikeButton
            chain={data.CollectionElement.Id.Chain.ChainName}
            collectionId={data.CollectionElement.Id.Contract}
          />
          {Object.entries(data.CollectionElement.SocialUrls).map(
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
        </div>
      </div>
    </div>
  );
}

export default TopSection;
