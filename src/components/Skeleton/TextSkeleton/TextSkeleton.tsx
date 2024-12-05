function TextSkeleton() {
  return (
    <div
      role="status"
      className="max-w-sm animate-pulse bg-white-3 w-96 p-3 rounded-md flex flex-col relative h-full justify-center"
    >
      <div className="h-2 bg-white-40 rounded-full w-48 mb-4"></div>
      <div className="h-2 bg-white-40 rounded-full max-w-[360px] mb-2.5"></div>
      <div className="h-2 bg-white-40 rounded-full mb-2.5"></div>
      <div className="h-2 bg-white-40 rounded-full max-w-[330px] mb-2.5"></div>
      <div className="h-2 bg-white-40 rounded-full max-w-[300px] mb-2.5"></div>
      <div className="h-2 bg-white-40 rounded-full max-w-[360px]"></div>
    </div>
  );
}

export default TextSkeleton;
