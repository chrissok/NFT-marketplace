export async function getAvatarsByOwner(
  walletAddress: string,
  pageNumber?: number
): Promise<Avatar[]> {
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_IAS_URL}/Marketplace/GetAvatarsByOwner?walletAddress=${walletAddress}&pageSize=20&pageNumber=0&chains=sepolia`
    );

    let data = await res.json();
    return data;
  } catch (error: any) {
    // to do: catch error
    return [];
  }
}
