// import FeaturedCollections from "./FeaturedCollections";
import TopSection from "./TopSection";
import MidSection from "./MidSection";
import LearnMoreCollection from "../Collection/LearnMoreCollection";
import { getFeaturedDataByLocation } from "@/actions/CMS/featured";
import FeaturedCollections from "./FeaturedCollections";

async function HomeTemplate() {
  const [data] = await getFeaturedDataByLocation("Hero");
  const collections = await getFeaturedDataByLocation("HomepageCollections");

  return (
    <div className="max-w-[2500px] mx-auto">
      <TopSection id={data.id} />
      <div className="mb-10">
        <FeaturedCollections collections={collections} />
      </div>
      <div className="mt-16 noMinLg:mt-2 px-8 xs:mb-10">
        <MidSection />
      </div>
      <div className="mt-16 noMinLg:mt-2 px-8">
        <LearnMoreCollection />
      </div>
    </div>
  );
}

export default HomeTemplate;
