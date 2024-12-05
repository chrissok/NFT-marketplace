import Image from "next/image";
import Link from "next/link";

export interface CardWithImageProps {
  image: string;
  creatorName: string;
  name: string;
  variantColorIndex: number;
  avatarImg?: string;
  date?: string;
  id?: string;
}

const variantColor = [
  "bg-variant-color-0 group-hover:!bg-[#7DABE1]",
  "bg-variant-color-1 group-hover:!bg-[#C59CF0]",
  "bg-variant-color-2 group-hover:!bg-[#A1A4FB]",
];

function CardWithImage({
  image,
  avatarImg,
  creatorName,
  name,
  variantColorIndex,
  date,
  id,
}: CardWithImageProps) {
  return (
    <Link href={`/collection/${id}`}>
      <div
        className="h-full w-full max-w-[444px] min-w-[444px] xs:min-w-[340px] xs:max-w-[340px] border border-blur-dark-6 
			hover:border-white-10 cursor-pointer ease-in-out duration-300 hover:drop-shadow-glow rounded-xl group"
      >
        <div className="w-full rounded-xl p-4 max-w-[444px] min-w-[444px] xs:min-w-[340px] xs:max-w-[340px] h-[322px] bg-blur-dark-6 relative">
          <div className="overflow-hidden w-full h-full absolute top-0 left-0 rounded-xl">
            <Image
              src={image}
              alt="image"
              width={100}
              height={100}
              className="w-full h-full object-cover absolute -z-10 top-0 left-0 blur-xl rounded-lg"
            />
          </div>
          <div className="relative w-full h-4/5">
            <div className="overflow-hidden">
              <Image
                src={image}
                alt="image"
                width={400}
                height={400}
                className="w-full rounded-md h-[238px] object-cover transition ease-in-out group-hover:scale-110 duration-300"
              />
            </div>
            <div
              className={`flex justify-center items-center absolute h-10 top-2 -left-6 p-4 ${variantColor[variantColorIndex]} rounded-md overflow-visible`}
            >
              <div className="font-special text-grey-lightest font-normal mr-2 leading-5">
                OPENS:
              </div>
              <div className="font-body text-grey-lightest font-semibold">
                NOW
              </div>
            </div>

            <div
              className={`flex justify-between items-center absolute w-1/3 top-3 -left-4 p-4 h-10 ${variantColor[variantColorIndex]} -z-10 rounded-md`}
            >
              <div>..</div>
            </div>
            {/* 
          <div className="flex justify-between items-center absolute bottom-2 w-[95%] left-3 noMin:left-1 p-4 bg-blur-dark-6 backdrop-blur-md rounded-lg">
            <div className="font-body text-grey-lightest font-normal opacity-65 text-base">
              Opening
            </div>
            <div className="font-body text-grey-lightest font-semibold">
              13 ETH
            </div>
          </div> */}
          </div>

          <div className="pt-6 flex w-full justify-between items-center">
            <div className="font-header font-bold text-base flex-1 text-grey-lightest">
              {name}
            </div>
            {/* <AvatarWithName avatarImg={avatarImg} avatarName={creatorName} /> */}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CardWithImage;
