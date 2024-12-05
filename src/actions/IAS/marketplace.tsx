import { getAllSupportedCollections } from "./collection";

export async function getNFTDataByID(id: string): Promise<IAS_NFT> {
  try {
    const res = await fetch(
      `${process.env.IAS_URL}/Marketplace/GetDataOfNFTById?nftId=${id}`,
      { next: { revalidate: 40 } }
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch NFT data.");
  }
}

export async function getNftBidsTransfers(
  id: string
): Promise<MarketplaceTransactions> {
  const res = await fetch(
    `${process.env.IAS_URL}/Marketplace/GetMarketplaceDetailsOfNFTsByNftId?nftId=${id}`,
    { next: { revalidate: 40 } }
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return data;
}

export async function getNftsByCollectionId(id: string): Promise<IAS_NFT[]> {
  const res = await fetch(
    `${process.env.IAS_URL}/Marketplace/GetDataOfNFTsByCollection?collectionId=${id}&pageSize=20&pageNumber=0`,
    { next: { revalidate: 40 } }
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

export async function getNFTsByOwner(
  walletAddress: string,
  isTestChain: boolean
): Promise<IAS_NFT[]> {
  let url = `${process.env.IAS_URL}/Marketplace/GetDataOfNFTsByOwner?walletAddress=${walletAddress}&pageSize=20&pageNumber=0`;

  if (isTestChain) {
    url = `${process.env.IAS_URL}/Marketplace/GetDataOfNFTsByOwner?walletAddress=${walletAddress}&pageSize=20&pageNumber=0&chains=SEPOLIA`;
  }

  const res = await fetch(url, { next: { revalidate: 40 } });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

export async function GetNftsBidsByOwner(
  walletAddress: string,
  isTestChain: boolean
): Promise<IAS_NFT[]> {
  let url = `${process.env.IAS_URL}/Marketplace/GetNftsByWalletAddressBids?walletAddress=${walletAddress}&pageSize=20&pageNumber=0`;

  if (isTestChain) {
    url = `${process.env.IAS_URL}/Marketplace/GetNftsByWalletAddressBids?walletAddress=${walletAddress}&pageSize=20&pageNumber=0&testnet=SEPOLIA`;
  }

  const res = await fetch(url, { next: { revalidate: 40 } });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export async function getNftsByOwnerAndCollection(
  walletAddress: string,
  pageNumber?: number
): Promise<IAS_NFT[]> {
  const supportedCollections = await getAllSupportedCollections();

  const supportedCollectionsIds = supportedCollections
    .map((collection) => collection.CollectionId)
    .join(",");

  let url = `${process.env.NEXT_PUBLIC_IAS_URL}/Marketplace/GetDataOfNFTsByOwnerAndCollection?walletAddress=${walletAddress}&collectionId=${supportedCollectionsIds}&pageSize=20&pageNumber=0`;

  try {
    let res = await fetch(url, { next: { revalidate: 40 } });

    let data = await res.json();
    return data;
  } catch (error: any) {
    // to do: catch error
    return [];
  }
}
