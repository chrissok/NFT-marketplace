import CardWithImage from "@/components/Cards/CardWithImage";
import CardWithImageInactive from "@/components/Cards/CardWithImage/CardWithImageInactive";
import { v4 as uuidv4 } from "uuid";

function FeaturedCollections({ collections }: { collections: FeaturedItem[] }) {
  return (
    <div className="flex flex-col px-8 xs:px-1 mx-auto">
      <div className="w-max-[1380px] mx-auto">
        <div className="mb-6 flex items-center font-header text-xl text-grey-lightest">
          <div className="w-1/2 flex items-center">
            <h2 className="mr-5 text-3xl">Collections</h2>
          </div>
        </div>
        <div
          className={`grid gap-6 grid-cols-3 2xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-1`}
        >
          {collections.map((collection, index) => {
            const releaseDateFile = collection.Files.find(
              (file) => file.Name === "ReleaseDate"
            );
            const imageFile = collection.Files.find(
              (file) => file.Name === "Thumbnail" || file.FileType === "webp"
            );

            const isComingSoon = collection.id.includes("COMINGSOON");

            if (isComingSoon) {
              return (
                <div className="w-[440px] xs:w-[340px]" key={uuidv4()}>
                  <CardWithImageInactive
                    creatorName={""}
                    name={collection.Name}
                    image={imageFile?.Value || ""}
                    variantColorIndex={index % 3}
                    date={releaseDateFile?.Value}
                  />
                </div>
              );
            }

            return (
              <div className="w-[440px] xs:w-[340px]" key={uuidv4()}>
                <CardWithImage
                  creatorName={""}
                  name={collection.Name}
                  image={imageFile?.Value || ""}
                  variantColorIndex={index % 3}
                  date={releaseDateFile?.Value}
                  id={collection.id}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FeaturedCollections;
