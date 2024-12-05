function InGameStats({
  nft,
  collection,
}: {
  nft: IAS_NFT;
  collection: Collection_IAS;
}) {
  const primaryAssetIndex = nft.NftElement.PrimaryAsset;

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-black-lighter-1 w-full p-3 flex rounded-md font-body justify-between">
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M11.0006 5.23223V5.50359C10.9481 5.61439 10.9017 5.72837 10.8423 5.8351C10.6745 6.13676 10.504 6.43706 10.3292 6.73465C10.2641 6.84546 10.2507 6.95739 10.273 7.08131C10.3391 7.44787 10.406 7.81421 10.4643 8.18212C10.5294 8.59414 10.3574 8.8872 9.9726 9.0317C9.63157 9.15992 9.2901 9.28723 8.94663 9.40911C8.82343 9.45276 8.73683 9.52716 8.673 9.64158C8.49602 9.95952 8.31457 10.2752 8.13402 10.5911C7.91909 10.9672 7.59704 11.0854 7.1962 10.9371C6.87192 10.817 6.54629 10.7008 6.22424 10.5753C6.07382 10.5167 5.93433 10.514 5.78211 10.5744C5.45047 10.706 5.11435 10.8267 4.77868 10.9479C4.4111 11.0807 4.07811 10.9561 3.88127 10.6139C3.7016 10.3017 3.52038 9.99028 3.34853 9.67392C3.27198 9.53304 3.16775 9.44462 3.01799 9.39283C2.68076 9.27615 2.34666 9.15042 2.01211 9.02605C1.65702 8.89399 1.47357 8.58396 1.53405 8.20881C1.59453 7.83365 1.6606 7.4594 1.72822 7.08561C1.75143 6.95717 1.73625 6.84229 1.66952 6.72832C1.48584 6.41422 1.30752 6.09696 1.12741 5.7806C0.913379 5.40477 0.970737 5.06173 1.29569 4.78404C1.56864 4.5509 1.84137 4.31775 2.117 4.08778C2.21922 4.00253 2.28328 3.90303 2.30515 3.76735C2.36384 3.4035 2.43259 3.04124 2.49463 2.67784C2.56471 2.26787 2.8303 2.03902 3.24319 2.03834C3.60764 2.03766 3.9721 2.03699 4.33656 2.0388C4.46511 2.03947 4.5738 2.00035 4.67267 1.91442C4.9463 1.67653 5.2246 1.44384 5.50046 1.20844C5.82497 0.931427 6.17447 0.930297 6.4992 1.2064C6.7755 1.44135 7.05381 1.67382 7.32699 1.91239C7.4292 2.00148 7.54102 2.03993 7.67359 2.03902C8.04184 2.03676 8.40987 2.03721 8.77812 2.03857C9.1678 2.04015 9.43919 2.27601 9.50525 2.66405C9.56774 3.03129 9.63671 3.39717 9.69563 3.76486C9.7175 3.90031 9.77999 4.00049 9.88266 4.08574C10.1157 4.27909 10.3409 4.48215 10.5768 4.67165C10.7662 4.82384 10.9318 4.98869 10.9997 5.23223H11.0006ZM5.35316 7.42051C5.51452 7.4144 5.63794 7.3486 5.74507 7.23915C6.17202 6.8034 6.6012 6.3699 7.02971 5.9355C7.36604 5.59449 7.70327 5.25394 8.03849 4.9118C8.12844 4.81999 8.13067 4.70715 8.05166 4.63276C7.97266 4.55836 7.88026 4.56718 7.78563 4.65831C7.76688 4.6764 7.7488 4.69562 7.73028 4.71416C6.98864 5.46515 6.247 6.21613 5.50537 6.96712C5.38552 7.08832 5.32972 7.0881 5.20898 6.96576C4.87711 6.63063 4.54635 6.2946 4.21358 5.96038C4.12342 5.86992 4.02477 5.86563 3.94777 5.94116C3.87278 6.01487 3.87502 6.12342 3.96094 6.21116C4.30911 6.56686 4.65884 6.92098 5.00901 7.27488C5.10587 7.3728 5.22661 7.41576 5.35316 7.42051Z"
              fill="#D5E2E8"
            />
          </svg>
          <p className="text-grey-lightest text-sm">License</p>
        </div>
        <div className="bg-green-darker rounded px-3 py-1">
          <p className="text-green-bright">
            {collection.CollectionElement.License}
          </p>
        </div>
      </div>
      {/* <div className="flex flex-col w-full p-3 gap-3 bg-black-lighter-1 rounded-md">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M9.45644 2.10296L6.7208 1.07834C6.43729 0.973887 5.97472 0.973887 5.6912 1.07834L2.95557 2.10296C2.42833 2.30191 2.00058 2.91868 2.00058 3.48073V7.50957C2.00058 7.91246 2.2642 8.44467 2.5875 8.68341L5.32314 10.7277C5.8056 11.0908 6.59645 11.0908 7.07892 10.7277L9.81456 8.68341C10.1379 8.43969 10.4015 7.91246 10.4015 7.50957V3.48073C10.4065 2.91868 9.9787 2.30191 9.45644 2.10296ZM7.93443 4.88834L5.79566 7.02711C5.72105 7.10172 5.62654 7.13653 5.53204 7.13653C5.43754 7.13653 5.34303 7.10172 5.26842 7.02711L4.4726 6.22134C4.32836 6.0771 4.32836 5.83835 4.4726 5.69411C4.61684 5.54986 4.85559 5.54986 4.99983 5.69411L5.53701 6.23129L7.41217 4.35613C7.55641 4.21189 7.79516 4.21189 7.9394 4.35613C8.08364 4.50037 8.08364 4.74409 7.93443 4.88834Z"
              fill="#D5E2E8"
            />
          </svg>
          <h1 className="text-grey-lightest font-body ml-3">Permissions</h1>
        </div>
        <div className="flex text-grey-lightest font-body text-sm justify-between">
          <p className="opacity-60">Power</p>
          <p>Everyone</p>
        </div>
        <div className="flex text-grey-lightest font-body text-sm justify-between">
          <p className="opacity-60">Power</p>
          <p className="text-green-bright">Allow</p>
        </div>
        <div className="flex text-grey-lightest font-body text-sm justify-between">
          <p className="opacity-60">Power</p>
          <p className="text-green-bright">Allow</p>
        </div>
        <div className="flex text-grey-lightest font-body text-sm justify-between">
          <p className="opacity-60">Power</p>
          <p className="text-green-bright">Allow</p>
        </div>
      </div> */}

      <div className="flex flex-col w-full p-3 gap-3 bg-black-lighter-1 rounded-md">
        <div className="flex items-center justify-between">
          <h1 className="text-grey-lightest font-body ml-3">File Type</h1>
        </div>
        <div className="flex text-grey-lightest font-body text-sm justify-between">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
            >
              <path
                d="M16.5447 19.998H1.45646C0.652401 19.998 0.000579834 19.3585 0.000579834 18.5695V1.42662C0.000579834 0.637641 0.652401 -0.00195312 1.45646 -0.00195312H11.2506L18.0006 6.62142V18.5695C18.0006 19.3585 17.3488 19.998 16.5447 19.998Z"
                fill="#93A3B2"
              />
            </svg>
            <p className="select-text">
              {nft.NftElement.Assets[primaryAssetIndex]?.AssetLocation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InGameStats;
