import { getCollectionDataByID } from "@/actions/IAS/collection";
import { getNFTDataByID } from "@/actions/IAS/marketplace";
import PlaygroundViewerTemplate from "@/templates/PlaygroundViewer/PlaygroundViewerTemplate";

type playgroundViewerInitLoadType =
  | "playgroundAsset"
  | "avatarAsset"
  | "playgroundCollection"
  | "";

export default async function PlaygroundViewer({
  params,
  searchParams,
}: {
  params: { playground: string; vrm: string };
  searchParams?: {
    test?: string;
    playgroundAsset?: string;
    type?: playgroundViewerInitLoadType;
  };
}) {
  let vrm = null;
  let playground: string = "";
  let test = false;
  let paramPlaygroundId = "";
  let collectionId = null;
  let avatarId = null;

  if (searchParams?.type === "playgroundCollection") {
    const data = await getCollectionDataByID(params.playground);
    playground = data.CollectionElement?.HeroAsset;
    collectionId = params.playground;
  }

  if (searchParams?.type === "playgroundAsset") {
    const data = await getNFTDataByID(params.playground);
    playground =
      data.NftElement.Assets[data.NftElement.PrimaryAsset].AssetLocation;
    paramPlaygroundId = params.playground;
  }

  if (searchParams?.type === "avatarAsset") {
    let data = await getNFTDataByID(params.vrm);

    vrm = data?.NftElement?.Assets[data.NftElement.PrimaryAsset].AssetLocation;
    avatarId = params.vrm;
  }

  return (
    <>
      <PlaygroundViewerTemplate
        playground={playground}
        vrm={vrm}
        isTest={test}
        collectionId={collectionId}
        paramPlaygroundId={decodeURIComponent(paramPlaygroundId)}
        avatarId={avatarId && decodeURIComponent(avatarId)}
      />
    </>
  );
}
