import { getAllSupportedCollections } from "@/actions/IAS/collection";
import CollectionTemplate from "@/templates/Collection";
import { redirect } from "next/navigation";
export default async function CollectionPage({
  params,
}: {
  params: { id: string };
}) {
  const supportedCollections = await getAllSupportedCollections();
  const collectionExists = supportedCollections.some(
    (collection) =>
      decodeURIComponent(collection.CollectionId).toLowerCase() ===
      decodeURIComponent(params.id).toLowerCase()
  );

  if (!collectionExists) {
    redirect("/not-supported");
  }
  return (
    <>
      <CollectionTemplate id={params.id} />
    </>
  );
}
