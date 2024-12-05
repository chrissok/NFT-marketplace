import { getMintDataByCollectionId } from "@/actions/IAS/collection";
import MintPhaseCollection from "./MintPhaseCollection";
import OnSaleCollection from "./OnSaleCollection/OnSaleCollection";

async function CollectionTemplate({ id }: { id: string }) {
  const data = await getMintDataByCollectionId(id);

  if (data.IsMintingCollection) return <MintPhaseCollection id={id} />;

  return (
    <>
      <OnSaleCollection id={id} />
    </>
  );
}

export default CollectionTemplate;
