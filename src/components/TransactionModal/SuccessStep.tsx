import React from "react";

function SuccessStep({ tokenIds }: { tokenIds: number[] }) {
  return (
    <>
      <div className="flex flex-col items-center justify-between h-full">
        <div className="text-center">
          <p className="text-green-bright mb-4 font-body font-semibold">
            {tokenIds.length === 1 ? "NFT Minted" : "NFTs Minted"}
          </p>

          <div className="flex flex-col">
            <p className="text-grey-lightest opacity-80 text-center font-body px-14">
              It will take some minutes for your assets to be shown in your
              wallet and on your profile.
            </p>
            <div className="flex flex-col gap-y-3 mt-3">
              {tokenIds.map((id) => (
                <div
                  className="px-4 py-3 flex justify-between bg-black-lighter-1 rounded-xl items-center"
                  key={id}
                >
                  <p className="text-sm text-grey-lightest font-body">NFT ID</p>
                  <p className="text-sm text-grey-lightest font-body font-semibold">
                    {id}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-grow flex items-center justify-center my-6"></div>
      </div>
    </>
  );
}

export default SuccessStep;
