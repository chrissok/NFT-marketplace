"use client";
import {
  getAssetLikeStatusByOwner,
  getCollectionLikeStatusByOwner,
} from "@/actions/client/likes";
import { likeCollection, likeNFT } from "@/actions/mutations/like";
import ButtonIcon from "@/components/Buttons/ButtonIcon";
import Spinner from "@/components/Spinner";
import { IconEnum } from "@/constants/iconEnum";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import React, { useEffect, useState } from "react";

function LikeButton({
  nftId,
  chain,
  collectionId,
}: {
  nftId?: string;
  chain: string;
  collectionId?: string;
}) {
  const [likeStatus, setLikeStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [likesCount, setLikesCount] = useState(0);

  const { address } = useWeb3ModalAccount();

  useEffect(() => {
    let isCancelled = false; // Flag to track whether the request should be cancelled

    async function getLikeStatus() {
      setLoading(true); // Ensure loading is set before the request starts
      let data = null;
      const addressToUse =
        address || "0x0000000000000000000000000000000000000000";

      try {
        if (collectionId) {
          data = await getCollectionLikeStatusByOwner(
            addressToUse,
            `${chain}:${collectionId}`
          );
        } else {
          data = await getAssetLikeStatusByOwner(
            addressToUse,
            `${chain}:${nftId}`
          );
        }

        if (!isCancelled) {
          // Only update state if the request wasn't cancelled
          setLikeStatus(data[0].Liked);
          setLikesCount(data[0].LikesCount);
          setLoading(false);
        }
      } catch (error) {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    getLikeStatus();

    // Clean up function to set the flag
    return () => {
      isCancelled = true;
    };
  }, [address, chain, nftId, collectionId]);

  const handleLike = async () => {
    if (!address) {
      return;
    }

    let like = null;

    if (collectionId) {
      like = await likeCollection(address, `${chain}:${collectionId}`);
    } else {
      like = await likeNFT(address, `${chain}:${nftId}`);
    }

    if (like?.SuccessfulToggle) {
      let data = null;
      if (collectionId) {
        data = await getCollectionLikeStatusByOwner(
          address,
          `${chain}:${collectionId}`
        );
      } else {
        data = await getAssetLikeStatusByOwner(address, `${chain}:${nftId}`);
      }
      setLikeStatus(data[0].Liked);
      setLikesCount(data[0].LikesCount);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <ButtonIcon
            icon={IconEnum.Like}
            variant="MEDIUM"
            onClick={handleLike}
            disableHover={!address}
            styles={`${likeStatus && "!bg-red-800"} ${!address && "cursor-not-allowed"}`}
          />
          <p className="text-grey-light text-sm font-body pl-1 text-center">
            {likesCount}
          </p>
        </>
      )}
    </>
  );
}

export default LikeButton;
