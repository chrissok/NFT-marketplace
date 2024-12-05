import Image from "next/image";

export default function MobileWIP() {
  return (
    <div className="h-screen relative w-full">
      <Image
        src="/error/error-bg.png"
        width={1980}
        height={990}
        alt="background"
        className="absolute object-cover h-[60vh] rounded-b-[100px] w-full opacity-80"
      />
      <div className="absolute flex justify-center bg-white-3 border border-white-10 py-20 font-header text-xl text-grey-lightest backdrop-blur bottom-[35%] left-[10%] rounded-[40px] w-[80%] text-center">
        <p className="w-2/3">Oops! Mobile not supported yet</p>
      </div>
      <div className="bg-black-main flex p-8 absolute left-[10%] w-[80%] shadow-[0px_4px_46.6px_0px_rgba(173,_114,_233,_0.34)] bottom-[5%] justify-between rounded-2xl">
        <p className="text-grey-light text-lg font-body w-2/3">
          Don’t worry, we will have it working soon!.
        </p>
      </div>
    </div>
  );
}
