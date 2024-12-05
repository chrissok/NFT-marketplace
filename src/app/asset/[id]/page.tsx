import { getAllSupportedCollections } from "@/actions/IAS/collection";
import AssetPageTemplate from "@/templates/AssetPage";
import { redirect } from "next/navigation";

export default async function AssetPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    drawer?: string;
    activeTab?: string;
  };
}) {
  const isDrawerOpen = () => {
    if (!searchParams) return false;
    if (!searchParams?.drawer) return false;
    if (searchParams?.drawer === "close") return false;
    if (searchParams?.drawer === "open") return true;
    return false;
  };

  const getActiveTab = () => {
    if (!searchParams) return "0";
    if (!searchParams?.activeTab) return "0";
    return searchParams.activeTab;
  };

  const supportedCollections = await getAllSupportedCollections();
  const collectionExists = supportedCollections.some((collection) => {
    const [chain, contractAddress] = decodeURIComponent(collection.CollectionId)
      .toLowerCase()
      .split(":");
    const [paramChain, paramContractAddress] = decodeURIComponent(params.id)
      .toLowerCase()
      .split(":");

    return chain === paramChain && contractAddress === paramContractAddress;
  });

  if (!collectionExists) {
    redirect("/not-supported");
  }

  return (
    <>
      <AssetPageTemplate
        isDrawerOpen={isDrawerOpen()}
        activeTab={getActiveTab()}
        id={params.id}
      />
    </>
  );
}
