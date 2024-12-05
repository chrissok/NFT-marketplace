import Spinner from "@/components/Spinner";
import GetInvolved from "../GetInvolved";
import LearnMoreCollection from "../LearnMoreCollection";
import TopSection from "./TopSection";
import { getMintDataByCollectionId } from "@/actions/IAS/collection";
import LiveMintScreenWrapper from "@/templates/Home/LiveMintScreenWrapper";
import dynamic from "next/dynamic";
import { getNftsByCollectionId } from "@/actions/IAS/marketplace";

const Items = dynamic(() => import("../CollectionItems/CollectionItems"), {
  loading: () => (
    <div className="flex mx-auto w-full justify-center">
      <Spinner />,
    </div>
  ),
});

async function MintPhaseCollection({ id }: { id: string }) {
  const data = await getMintDataByCollectionId(id);
  const nfts = await getNftsByCollectionId(id);

  const hasVRM = () => {
    return (
      data.CollectionElement.PrimaryAssetFileType.toLocaleLowerCase() === "vrm"
    );
  };

  return (
    <div className="max-w-[2500px] mx-auto">
      <div
        className={`w-full ${hasVRM() ? "h-[86vh] noMax:h-[75vh]" : "h-[55vh]"} relative px-16 py-16 max-h-full noMinLg:h-[50vh]`}
      >
        <TopSection id={id} />
      </div>
      <div className="mt-20 px-8">
        <LiveMintScreenWrapper mintData={data} />
      </div>
      <div className="mt-20 px-8 w-full xs:mt-3">
        <Items id={id} name={data.CollectionElement.Name} initialNfts={nfts} />
      </div>
      <div className="mt-28 xs:px-8 xs:mt-14">
        <LearnMoreCollection />
      </div>
      <div className="mt-36 xs:mt-14">
        <GetInvolved />
      </div>
    </div>
  );
}

export default MintPhaseCollection;
