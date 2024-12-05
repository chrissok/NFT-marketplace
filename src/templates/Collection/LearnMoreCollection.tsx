import Image from "next/image";

function LearnMoreCollection() {
  return (
    <>
      <h1 className="text-grey-lightest text-3xl xs:text-xl font-header text-center">
        Learn More About The Collection
      </h1>
      <p className="text-grey-normal font-body text-center w-1/4 mx-auto mt-3 mb-6 smallScreen:w-1/2 xs:w-full">
        Emergence brings you amazing, curated collections that focus on true
        interoperability for games and worlds. Learn more about this collection:
      </p>
      <div className="flex justify-center px-8 w-full gap-10 xs:px-1">
        <div className="relative w-fit overflow-hidden rounded-3xl smallScreen:h-[260px] xs:h-[150px]">
          <Image
            src="/collection/link.png"
            width={680}
            height={564}
            alt="creator profile"
            className="h-[564px] object-cover transition ease-in-out hover:scale-110 duration-300 cursor-pointer smallScreen:h-[260px] xs:h-[150px]"
          />
          <a
            className="absolute flex justify-between cursor-pointer w-[90%] text-violet-main py-8 pl-14 xs:pl-3 xs:py-5 
					text-left font-header text-2xl xs:text-sm xs:text-center bg-white-10 border-t border-white-20 
					backdrop-blur-3xl bottom-0 left-[5%] rounded-t-[60px] xs:rounded-t-3xl"
            href="https://www.emergence.site/articles/creator-profile-lucii"
            target="_blank"
          >
            <p>Creator Profile</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              className="mr-10"
            >
              <path
                d="M9.33398 22.6663L22.6673 9.33301"
                stroke="#7F9BFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.33398 9.33301H22.6673V22.6663"
                stroke="#7F9BFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
        <div className="relative w-fit flex justify-end overflow-hidden rounded-3xl smallScreen:h-[260px] xs:h-[150px]">
          <Image
            src="/collection/link-2.png"
            width={680}
            height={564}
            alt="about vrms"
            className="h-[564px] object-cover transition ease-in-out hover:scale-110 duration-300 cursor-pointer smallScreen:h-[260px] xs:h-[150px]"
          />
          <a
            className="absolute flex w-[90%] justify-between cursor-pointer xs:pl-5 xs:py-5 
					 text-pink-dark py-8 pl-14 text-left font-header text-2xl xs:text-sm xs:text-center bg-white-10 border-t
					  border-white-20 backdrop-blur-3xl bottom-0 left-[5%] rounded-t-[60px] xs:rounded-t-3xl"
            href="https://www.emergence.site/articles/what-is-a-vrm"
            target="_blank"
          >
            <p>About VRMs</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              className="mr-10 xs:hidden"
            >
              <path
                d="M9.33398 22.6663L22.6673 9.33301"
                stroke="#D5B5F6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.33398 9.33301H22.6673V22.6663"
                stroke="#D5B5F6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}

export default LearnMoreCollection;
