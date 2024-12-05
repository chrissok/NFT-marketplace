"use client";
import CollectionItem from "./CollectionItem";
import React, { useState } from "react";
import Spinner from "@/components/Spinner";
import Button from "@/components/Buttons/Button";
import { getNftsByCollection } from "@/actions/client/nfts";

function CollectionItems({
  id,
  name,
  initialNfts,
}: {
  id: string;
  name: string;
  initialNfts: IAS_NFT[];
}) {
  const [nfts, setNfts] = useState<IAS_NFT[]>(initialNfts);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(true);

  const fetchMoreNfts = async () => {
    setLoading(true);

    try {
      const res = await getNftsByCollection(id, pageNumber);

      setNfts((prevNfts) => [...prevNfts, ...res]);
      setPageNumber((prev) => prev + 1);

      if (res.length < 20) {
        setShowMore(false);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-5 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-5 mt-6">
        {nfts.map((nft, index) => (
          <React.Fragment
            key={`${nft.NftElement.Address}/${nft.NftElement.TokenNumber}`}
          >
            {nft.NftElement.PrimaryAsset >= 0 && (
              <div className="w-fit mx-auto">
                <CollectionItem nft={nft} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="mx-auto mt-6 flex justify-center flex-col">
        <div className="my-2 flex justify-center h-8">
          {loading && <Spinner />}
        </div>
        {nfts.length > 14 && showMore && (
          <Button
            text="Show More"
            onClick={fetchMoreNfts}
            styles="cursor-pointer w-fit mx-auto"
          />
        )}
      </div>
    </div>
  );
}

export default CollectionItems;
