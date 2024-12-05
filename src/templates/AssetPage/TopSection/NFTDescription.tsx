import { getNFTDataByID } from "@/actions/IAS/marketplace";
import ButtonIcon from "@/components/Buttons/ButtonIcon";
import ProfileLabel from "@/components/ProfileLabel/ProfileLabel";
import { IconEnum } from "@/constants/iconEnum";
import Image from "next/image";

async function NFTDescription({ id }: { id: string }) {
  const data = await getNFTDataByID(id);

  return (
    <div className="flex flex-col">
      <div className="flex w-[438px] gap-3 noMinLg:w-full">
        {data.ThumbnailElement?.LargeThumbnail?.url && (
          <Image
            src={data.ThumbnailElement?.LargeThumbnail?.url}
            width={167}
            height={167}
            alt="avatar thumbnail"
            priority
            className="w-1/2 object-cover h-[167px] rounded-lg smallScreen:w-[167px] xs:w-[100px] xs:h-[100px]"
          />
        )}
        <div className="flex flex-col relative w-1/2">
          <div className="rounded-md bg-blue-06 px-3 py-2 w-fit mb-4">
            <h3 className="text-blue-light font-header text-base">
              {data.NftElement.CollectionName}
            </h3>
          </div>

          <h2 className="text-xl font-header text-grey-lightest mb-2 break-words">
            {data.NftElement.NFTName}
          </h2>
          <div className="h-[80px] overflow-y-auto break-words pointer-events-auto select-text scroll-smooth scrollbar-thin scrollbar-thumb-black-main scrollbar-track-black-lighter-2">
            <div className="text-grey-normal font-body text-sm mb-5 pointer-events-auto">
              {data.NftElement.Description}
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-md bg-black-lighter-1 p-3 flex items-center gap-3 my-4 noMinLg:w-[300px]">
        <ButtonIcon
          icon={
            IconEnum[data.NftElement.Chain.ChainName as keyof typeof IconEnum]
          }
          disableHover
        />
        <p className="font-body text-lg font-semibold ml-1 text-grey-lightest">
          {data.NftElement.Chain.ChainName.toUpperCase()}
        </p>
      </div>
      {/* TODO darker color */}
      <div className="rounded-md bg-[#1B212C] p-3 flex justify-between noMinLg:w-[300px]">
        <div className="w-1/2">
          <ProfileLabel profileName={data.NftElement.Creator} label="Creator" />
        </div>
        <div className="w-1/2">
          <ProfileLabel profileName={data.NftElement.Owner} label="Owner" />
        </div>
      </div>
    </div>
  );
}

export default NFTDescription;
