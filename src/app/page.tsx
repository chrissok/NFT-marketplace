import HomeTemplate from "@/templates/Home";
import MobileWIP from "@/templates/Layout/Mobile/MobileWIP";

export default async function Home({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    viewport?: string;
  };
}) {
  const viewport = searchParams?.viewport;

  return <>{viewport === "mobile" ? <MobileWIP /> : <HomeTemplate />}</>;
}
