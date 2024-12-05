import ButtonIcon from "@/components/Buttons/ButtonIcon";
import { IconEnum } from "@/constants/iconEnum";
import Image from "next/image";
import Link from "next/link";

function ProfileItem({ item }: { item: IAS_NFT }) {
  const getUnit = (chain: string) => {
    if (chain.toLocaleLowerCase() === "ethereum") {
      return "ETH";
    }
    if (chain.toLocaleLowerCase() === "sepolia") {
      return "ETH";
    }
  };
  return (
    <div className="flex xs:flex-col xs:h-[460px] xs:w-[225px] rounded-xl border border-white-3 xs:border-white-20 p-2 gap-3 w-[450px] h-[230px] justify-self-center">
      <div className="w-1/2 relative xs:w-full">
        {item.ThumbnailElement?.LargeThumbnail?.url ? (
          <Image
            width={214}
            height={214}
            alt="item thumbnail"
            src={item.ThumbnailElement.LargeThumbnail.url}
            className="rounded-lg w-full h-full object-cover"
          />
        ) : (
          <div className="w-[214px] h-[214px]"></div>
        )}

        {item.ByNftCollectionMetadataElement?.ListedForSale && (
          <div className="absolute py-1 px-3 bg-green-main mt-2 text-grey-lightest text-sm w-fit rounded-md top-0 -right-[5%]">
            LISTED
          </div>
        )}
        <div className="absolute bg-blur-dark-6 backdrop-blur-md rounded-md py-2 px-3 bottom-[3%] w-[90%] left-[5%]">
          <div className="flex justify-around">
            <div className="text-grey-lightest font-body">
              <p className="text-xs opacity-65">FLOOR</p>
              <p className="font-semibold">
                {Number(
                  item.ByNftCollectionMetadataElement?.FloorPrice
                ).toFixed(2)}{" "}
                $USD
              </p>
            </div>
            <div className="w-[1px] bg-white-10"></div>
            <div className="text-grey-lightest font-body">
              <p className="text-xs opacity-65">VOL</p>
              <p className="font-semibold">
                {Number(item.ByNftCollectionMetadataElement?.Volume).toFixed(2)}{" "}
                {getUnit(item.NftElement?.Chain?.ChainName.toUpperCase())}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/2 xs:w-full">
        <div className="flex flex-col justify-between h-full">
          <div className="">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-header font-semibold text-grey-lightest pl-1">
                {item.NftElement.NFTName.replace(/_/g, " ")}
              </h3>
              <Link
                href={`/asset/${item.NftElement.Chain.ChainName}:${item.NftElement.Address}:${item.NftElement.TokenNumber}`}
              >
                <ButtonIcon variant="MEDIUM" icon={IconEnum.ArrowRightBig} />
              </Link>
            </div>
            <div className="py-1 px-3 bg-black-lighter-1 mt-2 text-grey-lightest text-sm w-fit rounded-md">
              {item.NftElement.ElementName}
            </div>
          </div>
          <div className="">
            <div
              className="p-1 rounded-lg text-grey-lightest scrollbar-thin scrollbar-thumb-black-main
						 scrollbar-track-black-lighter-2 opacity-65 font-body text-xs border border-white-10 mb-1 h-[50px] overflow-x-hidden overflow-y-auto"
            >
              {item.NftElement.Description}
            </div>
            <div className="bg-black-lighter-1 rounded-md py-2 px-2">
              <div className="flex justify-around gap-2">
                <div className="text-grey-lightest font-body flex flex-col justify-between">
                  <p className="text-xs opacity-65">Blockchain</p>
                  <p className="font-semibold">
                    {item.NftElement.Chain.ChainName.toUpperCase()}
                  </p>
                </div>
                <div className="w-[1px] bg-white-10"></div>
                <div className="text-grey-lightest font-body">
                  <p className="text-xs opacity-65">Token Standard</p>
                  <p className="font-semibold">{item.NftElement.TokenType}</p>
                </div>
                <div className="w-[1px] bg-white-10"></div>
                <div className="text-grey-lightest font-body overflow-hidden">
                  <p className="text-xs opacity-65">Creator Royalties</p>
                  <p className="font-semibold">
                    {item.ByNftCollectionMetadataElement?.Royalty.Value}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileItem;
