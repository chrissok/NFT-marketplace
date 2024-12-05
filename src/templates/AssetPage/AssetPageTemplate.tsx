// import Image from "next/image";
import TopSection from "./TopSection";
async function AssetPageTemplate({
  isDrawerOpen,
  activeTab,
  id,
}: {
  isDrawerOpen: boolean;
  activeTab: string;
  id: string;
}) {
  return (
    <div className="max-w-[2500px] mx-auto select-none noMax:max-w-[3000px]">
      <div className="w-full h-screen xs:h-fit relative px-16 pt-16 max-h-full xs:px-3">
        <TopSection isDrawerOpen={isDrawerOpen} activeTab={activeTab} id={id} />
      </div>
    </div>
  );
}

export default AssetPageTemplate;
