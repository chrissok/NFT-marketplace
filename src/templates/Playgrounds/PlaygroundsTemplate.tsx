import { getFeaturedDataByLocation } from "@/actions/CMS/featured";
import LearnMoreCollection from "../Collection/LearnMoreCollection";
import PlaygroundsSelector from "./PlaygroundsSelector";
import TopSection from "./TopSection";

async function PlaygroundsTemplate() {
  const [data] = await getFeaturedDataByLocation("Playground");

  return (
    <div className="max-w-[2500px] mx-auto">
      <div className="w-full h-[85vh] noMinLg:h-[70vh] noMax:h-[55vh] relative px-16 py-16 max-h-full mb-14">
        <TopSection />
      </div>
      <div className="p-5 max-w-[1380px] mx-auto mb-28 xs:mb-10">
        <PlaygroundsSelector
          thumbnails={data.Files || playgrounds_thumbnails}
          collectionId={data.id}
          name={data.Name}
        />
      </div>
      <div className="p-5 max-w-[1380px] mx-auto mb-28">
        <LearnMoreCollection />
      </div>
    </div>
  );
}

export default PlaygroundsTemplate;

const playgrounds_thumbnails = [
  { Value: "/playgrounds/ENTRY.png" },
  { Value: "/playgrounds/FRIDGE.png" },
  { Value: "/playgrounds/KITCHEN.png" },
  { Value: "/playgrounds/LIVING2.png" },
];
