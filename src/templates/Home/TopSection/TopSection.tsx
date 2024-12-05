import { getFeaturedDataByLocation } from "@/actions/CMS/featured";
import { getMintDataByCollectionId } from "@/actions/IAS/collection";
import LargeButton from "@/components/Buttons/LargeButton";
import { IconEnum } from "@/constants/iconEnum";
import Image from "next/image";
import Spinner from "@/components/Spinner";
import dynamic from "next/dynamic";
import Link from "next/link";

const DynamicViewer = dynamic(() => import("./Home3dViewer"), {
  loading: () => (
    <div className="absolute top-1/2 left-1/2 z-10">
      <Spinner />
    </div>
  ),
  ssr: false,
});

async function TopSection({ id }: { id: string }) {
  const [data] = await getFeaturedDataByLocation("Hero");

  const collectionData = await getMintDataByCollectionId(id);

  const bgImageSource = data.Files.find(
    (file) => file.Name === "BG_Image"
  )?.Value;

  const vrmFileSource = data.Files.find(
    (file) => file.Name === "Example_Avatar"
  )?.Value;

  return (
    <div className="relative w-full h-[85vh] xs:h-screen noMax:h-[55vh] px-16 py-16 max-h-full select-none">
      <div className="absolute w-full h-[70vh] noMax:h-[82%] top-0 left-0 rounded-b-xl pointer-events-none">
        <Image
          alt="my playground background image"
          fill
          src={bgImageSource || "/home/home-bg.png"}
          className="object-cover px-8 rounded-b-[5%] pointer-events-none"
        />
      </div>
      <div
        className="absolute w-[60%] noMin:w-[90%] h-[60%] noMax:top-[22%] bg-white-3 backdrop-blur-lg 
			 noMin:border-none rounded-tl-[90px] noMinLg:rounded-3xl rounded-tr-[200px] border
			 border-white-6 flex flex-col left-[5%] top-[22.4%] noMinLg:top-[10%] pl-20 pt-10 xs:pt-5 noMin:pl-7 noMinLg:backdrop-blur-sm xs:w-full"
      >
        <div className="flex flex-col gap-y-5 xs:gap-y-1">
          <div className="bg-[rgba(47,_212,_161,_0.10)] text-green-bright p-3 font-body font-semibold w-fit rounded-lg">
            <p>Featured collection</p>
          </div>
          <h1 className="text-4xl font-header text-grey-lightest font-bold mr-5 xs:mr-2">
            {data.Name}
          </h1>
          <div
            className="max-w-[750px] h-[100px] mr-10 xs:h-[100px] overflow-y-auto xs:mr-2
						 scrollbar-thin scrollbar-thumb-black-lighter-2 scrollbar-track-transparent"
          >
            <p className="font-body opacity-80 text-grey-lightest noMinLg:opacity-100">
              {data.Description}
            </p>
          </div>
          <Link href={`/collection/${data.id}`} className="w-[252px]">
            <LargeButton icon={IconEnum.ArrowRightBig} text="View Collection" />
          </Link>
        </div>
      </div>
      <div className="w-[32%] h-full absolute left-[64%] top-[10%] noMinLg:hidden">
        <DynamicViewer vrmSrc={vrmFileSource} />
      </div>
      <div className="absolute flex top-[70%] xs:flex-col xs:left-[4%] xs:top-[58%] xs:w-full left-[9%] gap-2 mr-28 xs:mr-0">
        <div
          className="flex max-w-[380px] xs:max-w-[92%] gap-6 h-[170px] bg-black-main rounded-3xl p-3 border
				 border-white-3 cursor-pointer items-center group"
        >
          <Link
            href={`/collection/${data.id}`}
            className="transition-all duration-1000 ease-in-out group-hover:shadow-lg group-hover:shadow-green-bright rounded-[50%] overflow-hidden cursor-pointer noMinLg:w-[109px]"
          >
            <Image
              src="/home/button.svg"
              width={109}
              height={109}
              alt="mint button"
              className="transition-all duration-500 ease-in-out rounded-[50%] group-hover:scale-125"
            />
          </Link>
          <div className="flex flex-col font-header gap-y-3 pr-7 noMinLg:pr-1">
            <h2 className="text-grey-light uppercase text-xs">
              {data.Name} collection
            </h2>
            <h2 className="text-green-bright uppercase text-2xl">MINT NOW</h2>
          </div>
        </div>
        <div className="relative flex max-w-[230px] xs:max-w-[92%] h-[170px] xs:h-[100px] bg-black-main rounded-3xl border border-white-3 shadow-[0px_4px_46.6px_0px_rgba(173,_114,_233,_0.14)] items-center">
          <div className="flex flex-col font-body w-full noMinLg:text-sm gap-y-5">
            <div className="flex items-center w-full gap-5 py-7 xs:py-0 pl-[30px] pr-[26px] xs:pr-0 xs:pl-0 justify-center">
              <div className="text-grey-normal text-lg noMinLg:text-sm w-[82px]">
                Price
              </div>
              <div className="bg-black-lighter-2 rounded-lg">
                <p className="text-grey-lightest px-4 py-1 text-base font-semibold noMinLg:text-sm min-w-[70px] text-nowrap">
                  {collectionData.MintCollectionElement?.ActiveMintPhase.price}{" "}
                  ETH
                </p>
              </div>
            </div>
            <div className="flex items-center w-full gap-5 py-7 xs:py-0 pl-[30px] pr-[26px] xs:pr-0 xs:pl-0 justify-center">
              <div className="text-grey-normal text-lg noMinLg:text-sm w-[82px]">
                For Sale
              </div>
              <div className="bg-black-lighter-2 rounded-lg">
                <p className="text-grey-lightest text-base font-semibold px-4 py-1 noMinLg:text-sm w-[70px] text-center">
                  {collectionData.MintCollectionElement?.TotalSupply}
                </p>
              </div>
            </div>
          </div>
          <div className="absolute h-[1px] bg-white-10 bottom-1/2 w-full left-0"></div>
        </div>
      </div>
    </div>
  );
}

export default TopSection;
