import dynamic from "next/dynamic";
import TopSection from "./TopSection";
import Playgrounds from "@/templates/Home/MidSection/Playgrounds";
import Spinner from "@/components/Spinner";
import { getCollectionDataByID } from "@/actions/IAS/collection";
import { getNftsByCollectionId } from "@/actions/IAS/marketplace";

const Items = dynamic(() => import("../CollectionItems/CollectionItems"), {
  loading: () => (
    <div className="flex mx-auto w-full justify-center">
      <Spinner />,
    </div>
  ),
});

async function OnSaleCollection({ id }: { id: string }) {
  const data = await getCollectionDataByID(id);
  const nfts = await getNftsByCollectionId(id);

  return (
    <div className="max-w-[2500px] mx-auto">
      <div
        className={`w-full h-[86vh] noMax:h-[55vh] relative px-16 py-16 max-h-full select-none`}
      >
        <TopSection id={id} />
      </div>
      <div className="mt-20 px-8 w-full xs:mt-3">
        <Items id={id} name={data.CollectionElement.Name} initialNfts={nfts} />
      </div>
      <div className="mt-20 px-8 xs:mt-3">
        <Playgrounds />
      </div>
    </div>
  );
}

export default OnSaleCollection;
