import { joinedArrayCollections } from "@/constants/collections";

export async function getNftsByOwnerAndCollection(
  walletAddress: string,
  isTestChain: boolean,
  pageNumber?: number
): Promise<IAS_NFT[]> {
  let url = `${process.env.NEXT_PUBLIC_IAS_URL}/Marketplace/GetDataOfNFTsByOwnerAndCollection?walletAddress=${walletAddress}&collectionId=${joinedArrayCollections}&pageSize=20&pageNumber=0`;

  if (isTestChain) {
    url = `${process.env.NEXT_PUBLIC_IAS_URL}/Marketplace/GetDataOfNFTsByOwnerAndCollection?walletAddress=${walletAddress}&collectionId=${joinedArrayCollections}&pageSize=20&pageNumber=0&chains=SEPOLIA`;
  }
  try {
    let res = await fetch(url);

    let data = await res.json();
    return data;
  } catch (error: any) {
    // to do: catch error
    return [];
  }
}
