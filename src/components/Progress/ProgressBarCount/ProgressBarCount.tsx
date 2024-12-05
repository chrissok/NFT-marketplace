type ProgressBarCountProps = {
  count: number;
  max: number;
};

function ProgressBarCount({ count, max }: ProgressBarCountProps) {
  // Calculate the percentage of progress
  const progressPercentage = (count / max) * 100;

  return (
    <div className="h-20 w-full p-5 bg-white-3 rounded-[1000px]">
      <div className="flex font-body text-grey-lightest items-center">
        <p className="text-lg">{count}</p>
        <p className="text-xs pt-1">/{max}</p>
        <p className="text-lg opacity-50 ml-1">Minted</p>
      </div>
      <div className="flex mt-1 w-full h-[6px] bg-white-10 rounded-3xl">
        {/* Green progress bar */}
        <div
          className="bg-green-main h-[6px] rounded-3xl"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBarCount;
