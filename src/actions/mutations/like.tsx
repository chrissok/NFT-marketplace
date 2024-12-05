export async function likeNFT(
  walletAddress: `0x${string}`,
  nftId: string
): Promise<{ SuccessfulToggle: boolean }> {
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_IAS_URL}/Likes/Like?walletAddress=${walletAddress}&nftId=${nftId}`,
      { method: "PUT" }
    );
    let data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function likeCollection(
  walletAddress: `0x${string}`,
  collectionId: string
): Promise<{ SuccessfulToggle: boolean }> {
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_IAS_URL}/Likes/Like?walletAddress=${walletAddress}&collectionId=${collectionId}`,
      { method: "PUT" }
    );
    let data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}
