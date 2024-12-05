import Image from "next/image";
import MyPlaygroundsSlider from "./MyPlaygroundsSlider";
import TestPlaygroundSlider from "./TestPlaygroundSlider";
import { getNftsByOwnerAndCollection } from "@/actions/IAS/marketplace";
import Link from "next/link";
import Button from "@/components/Buttons/Button";

async function MyPlaygroundsTemplate({ id }: { id: string }) {
  const playgrounds = await getNftsByOwnerAndCollection(id);

  const filteredAssets = playgrounds.filter(
    (playground) => playground.NftElement.PrimaryAsset !== -1
  );

  const filteredPlaygrounds = filteredAssets.filter((playground) => {
    const primaryAsset = playground.NftElement.PrimaryAsset;
    return (
      playground.NftElement.Assets[
        primaryAsset
      ].MediaType.Element.toString() === "gltf-binary"
    );
  });

  return (
    <div className="relative w-full h-screen xs:h-[60vh] px-16 py-16 xs:px-4 max-h-full">
      <div className="absolute w-full h-[80vh] xs:h-[60vh] top-0 left-0 rounded-b-xl">
        <Image
          alt="my playground background image"
          fill
          src="/my-playgrounds/bg.jpeg"
          className="object-cover px-8 rounded-b-[5%]"
        />
      </div>
      <div
        className="absolute w-1/3 h-1/3 bg-white-3 backdrop-blur-lg rounded-t-[100px] border
			 border-white-6 flex justify-center left-[35%] top-[20%] xs:top-[10%] xs:text-center xs:w-2/3 xs:left-[20%] xs:h-[100px]"
      >
        <h1 className="text-3xl xs:text-xl font-header text-grey-lightest mt-6">
          Welcome To:
        </h1>
      </div>
      <div
        className="absolute w-3/4 h-1/2 bg-white-3 backdrop-blur-lg rounded-t-[100px] border
			 border-white-6 flex justify-center left-[13%] top-[30%] xs:top-[30%] xs:h-[100px] xs:rounded-3xl	"
      >
        <h1 className="text-7xl xs:text-2xl font-header text-grey-lightest mt-24 xs:mt-4 xs:text-center">
          MY PLAYGROUNDS
        </h1>
      </div>
      <div
        className="absolute flex justify-center w-[85%] gap-6 top-[60%] left-[8%]
			 xs:flex-col xs:w-full xs:top-[35%] xs:left-[3%] xs:hidden"
      >
        <TestPlaygroundSlider href="/playground-viewer/0/0" />
        <MyPlaygroundsSlider playgrounds={filteredPlaygrounds} />
      </div>

      <div className="absolute xs:top-[55%] hidden xs:flex bg-blur-dark-12 w-[80%] mx-auto left-[10%] justify-center rounded-3xl p-10">
        <div className="font-body text-lg text-grey-lightest text-center">
          Playground Viewer not supported for mobile yet, check your assets at
          Dashboard
          <div className="flex justify-center">
            <Link href={`/profile/${id}`}>
              <Button text="Go to Dashboard" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPlaygroundsTemplate;
