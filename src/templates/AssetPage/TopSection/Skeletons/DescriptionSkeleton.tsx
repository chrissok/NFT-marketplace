function DescriptionSkeleton() {
  return (
    <>
      <div className="animate-pulse bg-white-3 w-96 p-3 rounded-md flex flex-col h-56">
        <div className="rounded-md bg-blue-06 px-3 py-2 w-fit mb-3">
          <h3 className="text-blue-light font-header text-base">
            Collection Name
          </h3>
        </div>
        <div className="flex flex-col gap-3">
          <div className="h-2 bg-white-40 rounded-full max-w-[360px]"></div>
          <div className="h-2 bg-white-40 rounded-full max-w-[360px]"></div>
          <div className="h-2 bg-white-40 rounded-full max-w-[360px]"></div>
          <div className="h-2 bg-white-40 rounded-full max-w-[360px]"></div>
        </div>
      </div>
    </>
  );
}

export default DescriptionSkeleton;
