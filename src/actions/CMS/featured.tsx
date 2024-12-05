export async function getFeaturedDataByLocation(
  location: "Hero" | "Playground" | "HomepageCollections"
): Promise<FeaturedItem[]> {
  try {
    let res = await fetch(
      `${process.env.IAS_URL}/Featured/GetActiveFeaturesByLocation?location=${location}`,
      { next: { revalidate: 120 } }
    );
    let data = await res.json();
    //todo: refactor IAS, not return array
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}
