import MyPlaygroundsTemplate from "@/templates/MyPlaygrounds";

export default async function MyPlaygrounds({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <MyPlaygroundsTemplate id={params.id} />
    </>
  );
}
