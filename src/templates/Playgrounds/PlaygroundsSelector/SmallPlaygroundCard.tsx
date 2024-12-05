import Image from "next/image";

function SmallPlaygroundCard({
  onClick,
  img,
}: {
  onClick?: VoidFunction;
  img: string;
}) {
  return (
    <div
      className="relative rounded-lg overflow-hidden group"
      onClick={onClick}
    >
      <div className="absolute inset-0">
        <Image
          alt="playground background"
          src={img}
          fill
          className="object-cover bg-blur-dark-6 blur-lg"
        />
      </div>
      <div className="relative p-2 flex flex-col rounded-lg">
        <div className="overflow-hidden rounded-lg">
          <Image
            alt="playground img"
            width={208}
            height={140}
            src={img}
            className="rounded-[5%] w-full h-[140px] object-cover select-none group-hover:scale-110 duration-300"
          />
        </div>
      </div>
    </div>
  );
}

export default SmallPlaygroundCard;
