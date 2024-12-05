export async function getMintDataByCollectionId(
  id: string
): Promise<MintCollectionData> {
  const res = await fetch(
    `${process.env.IAS_URL}/Collection/GetMintingCollectionByID?collectionId=${id}`,
    { next: { revalidate: 40, tags: ["mint"] } }
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

export async function getCollectionDataByID(
  id: string
): Promise<Collection_IAS> {
  const res = await fetch(
    `${process.env.IAS_URL}/Collection/GetNFTCollectionById?collectionId=${id}`,
    { next: { revalidate: 40, tags: ["mint"] } }
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

export async function getAllSupportedCollections(): Promise<
  SupportedCollection[]
> {
  const res = await fetch(
    `${process.env.IAS_URL}/Collection/GetAllSupportedCollections`,
    { next: { revalidate: 40 } }
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}
