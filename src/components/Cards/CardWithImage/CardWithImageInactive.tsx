import moment from "moment";
import Image from "next/image";

export interface CardWithImageInactiveProps {
  image: string;
  creatorName: string;
  name: string;
  variantColorIndex: number;
  avatarImg?: string;
  date?: string;
}

function CardWithImageInactive({
  image,
  avatarImg,
  creatorName,
  name,
  date,
}: CardWithImageInactiveProps) {
  const hasDate = date && Number(date) > -1;

  return (
    <div className="h-full w-full max-w-[444px] min-w-[444px] xs:min-w-[340px] xs:max-w-[340px] border border-blur-dark-6 rounded-xl">
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
              className="w-full rounded-md h-[238px] object-cover opacity-30"
            />
          </div>
          <div
            className={`flex justify-center items-center absolute h-10 top-2 -left-6 p-4 rounded-md overflow-visible bg-grey-medium border-white-3 border`}
          >
            {hasDate ? (
              <>
                <div className="font-special text-grey-lightest font-normal mr-2 leading-5">
                  OPENS:
                </div>
                <div className="font-body text-grey-lightest font-semibold">
                  {moment(Number(date)).format("MMMM DD")}
                </div>
              </>
            ) : (
              <div className="font-special text-grey-lightest font-normal mr-2 leading-5">
                COMING SOON
              </div>
            )}
          </div>
        </div>

        <div className="pt-6 flex w-full justify-between items-center">
          <div className="font-header font-bold text-base flex-1 text-grey-lightest opacity-75">
            {name}
          </div>
          {/* <AvatarWithName avatarImg={avatarImg} avatarName={creatorName} /> */}
        </div>
      </div>
    </div>
  );
}

export default CardWithImageInactive;
