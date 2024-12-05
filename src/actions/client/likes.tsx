export async function getAssetLikeStatusByOwner(
  walletAddress: `0x${string}`,
  nftId: string
): Promise<[{ Liked: boolean; LikesCount: number }]> {
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_IAS_URL}/Likes/GetLikeStatus?walletAddress=${walletAddress}&nftId=${nftId}`
    );
    let data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getCollectionLikeStatusByOwner(
  walletAddress: `0x${string}`,
  collectionId: string
): Promise<[{ Liked: boolean; LikesCount: number }]> {
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_IAS_URL}/Likes/GetLikeStatus?walletAddress=${walletAddress}&collectionId=${collectionId}`
    );
    let data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}
