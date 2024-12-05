import ProfileTemplate from "@/templates/Profile";

export default function Profile({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    test?: string;
    drawer?: string;
    activeTab?: string;
  };
}) {
  const getActiveTab = () => {
    if (!searchParams) return "0";
    if (!searchParams?.activeTab) return "0";
    return searchParams.activeTab;
  };

  let isTestChain = false;

  if (searchParams?.test) {
    isTestChain = true;
  }

  return (
    <>
      <ProfileTemplate
        activeTab={getActiveTab()}
        address={params.id}
        isTestChain={isTestChain}
      />
    </>
  );
}
