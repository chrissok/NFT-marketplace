import Button from "@/components/Buttons/Button";

function PlaygroundList({
  handlePlaygroundChange,
  playgrounds,
}: {
  handlePlaygroundChange: (url: string, id: string) => void;
  playgrounds: IAS_NFT[];
}) {
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

  if (filteredPlaygrounds.length <= 0)
    return (
      <div className="bg-black-lighter-1 p-5 z-20 rounded-xl flex flex-col gap-y-3">
        <p className="font-body text-sm text-grey-lightest">
          You do not own any Playgrounds yet...
        </p>
      </div>
    );

  return (
    <div className="bg-black-lighter-1 p-5 z-20 rounded-xl flex flex-col gap-y-3">
      {filteredPlaygrounds.map((playground) => {
        const primaryAsset = playground.NftElement.PrimaryAsset;

        return (
          <Button
            onClick={() =>
              handlePlaygroundChange(
                playground.NftElement.Assets[primaryAsset].AssetLocation,
                `${playground.NftElement.Chain.ChainName}:${playground.NftElement.Address}:${playground.NftElement.TokenNumber}`
              )
            }
            key={playground.NftElement.TokenNumber}
            text={playground.NftElement.NFTName}
          />
        );
      })}
    </div>
  );
}

export default PlaygroundList;
