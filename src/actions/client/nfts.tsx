export async function getNftsByCollection(
  id: string,
  pageNumber: number
): Promise<IAS_NFT[]> {
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_IAS_URL}/Marketplace/GetDataOfNFTsByCollection?collectionId=${id}&pageSize=${20}&pageNumber=${pageNumber}`
    );
    let data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}
