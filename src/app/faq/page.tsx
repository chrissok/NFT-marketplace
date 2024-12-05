import Image from "next/image";
import Link from "next/link";

function FAQ() {
  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-8 xs:p-2 font-body">
      <div className="w-full max-w-4xl space-y-8 mt-12 xs:space-y-4">
        <div className="absolute w-full h-[70vh] top-0 left-0 rounded-b-xl pointer-events-none -z-10">
          <Image
            alt="my playground background image"
            fill
            src="/my-playgrounds/bg.jpeg"
            className="object-cover px-8 rounded-b-[5%] pointer-events-none"
          />
        </div>
        <h1 className="text-4xl xs:text-xl font-bold text-center text-[#D4E9FF]">
          Frequently Asked Questions
        </h1>

        {/* GETTING SET UP */}
        <div className="bg-[#1A1F36] p-6 rounded-lg shadow-md flex-col flex gap-y-5">
          <h1 className="text-4xl xs:text-xl font-bold text-center text-[#D4E9FF]">
            GETTING SET UP
          </h1>
          <div className="">
            <h2 className="text-2xl xs:text-lg font-semibold text-[#D4E9FF]">
              Do I need a wallet?
            </h2>
            <p className="text-[#D4E9FF] mt-2">
              To access the Emergence Marketplace to its full potential, you
              will require a wallet. This wallet will hold all your NFT assets
              from Playgrounds, VRMs, and more.
            </p>
          </div>
          <div className="">
            <h2 className="text-2xl xs:text-lg font-semibold text-[#D4E9FF]">
              How do I get a wallet?
            </h2>
            <p className="text-[#D4E9FF] mt-2">
              Visit the homepage and look at the top right of the screen. Click
              the &quot;Connect Wallet&quot; button to set up your wallet.
              Approve the connection request when prompted. If you don’t already
              have a wallet, check the list of compatible wallets supported by
              Emergence. Our recommended choice is Metamask for its
              user-friendly interface.
            </p>
          </div>
          <div className="">
            <h2 className="text-2xl xs:text-lg font-semibold text-[#D4E9FF]">
              Which wallets do you support?
            </h2>
            <p className="text-[#D4E9FF] mt-2">
              Emergence supports over 430 compatible wallets, including
              Metamask, Trust Wallet, WalletConnect, Brave, and OKX Wallet. We
              aim to integrate more wallets as the platform evolves.
            </p>
          </div>
          <div className="">
            <h2 className="text-2xl xs:text-lg font-semibold text-[#D4E9FF]">
              What blockchains do you support?
            </h2>
            <p className="text-[#D4E9FF] mt-2">
              Emergence Marketplace currently supports the Ethereum blockchain
              for transactions and assets. Additional chains may be added in the
              future. Feel free to contact us if you have a collection on
              another chain and want it listed.
            </p>
          </div>
          <div className="">
            <h2 className="text-2xl xs:text-lg font-semibold text-[#D4E9FF]">
              What do I do if I need support?
            </h2>
            <p className="text-[#D4E9FF] mt-2">
              Visit our FAQ section for general information. If you still need
              help, reach out via our{" "}
              <a
                href="https://www.emergence.site/contact-us"
                className="!text-blue-main !underline"
              >
                contact page{" "}
              </a>
              or join our{" "}
              <a
                href="https://discord.gg/openmetadao"
                className="!text-blue-main !underline"
              >
                Discord
              </a>{" "}
              community for assistance.
            </p>
          </div>
        </div>

        {/* BUYING */}
        <div className="bg-[#1A1F36] p-6 rounded-lg shadow-md flex-col flex gap-y-5">
          <h1 className="text-4xl xs:text-xl font-bold text-center text-[#D4E9FF]">
            BUYING
          </h1>
          <div className="">
            <h2 className="text-2xl xs:text-lg font-semibold text-[#D4E9FF]">
              What is a “mint”?
            </h2>
            <p className="text-[#D4E9FF] mt-2">
              A mint is the creation of a digital asset to be sold, bought, and
              exchanged on the Emergence Marketplace. These assets can represent
              Playgrounds, Virtual Reality Models (VRMs), or in-game items like
              weapons and music.
            </p>
          </div>
          <div className="">
            <h2 className="text-2xl xs:text-lg font-semibold text-[#D4E9FF]">
              Why do mints have phases?
            </h2>
            <p className="text-[#D4E9FF] mt-2">
              Mint phases allow for fair and meritocratic releases, prioritizing
              active community members. This ensures creators can launch
              collections without unnecessary competition.
            </p>
          </div>
          <div className="">
            <h2 className="text-2xl xs:text-lg font-semibold text-[#D4E9FF]">
              How do I get on an allow list?
            </h2>
            <p className="text-[#D4E9FF] mt-2">
              Allow list criteria depend on the specific creator or project.
              Typically, this involves tasks such as community engagement or
              social interactions. Contact the creator for details.
            </p>
          </div>
        </div>

        {/* USING MY ASSETS */}
        <div className="bg-[#1A1F36] p-6 rounded-lg shadow-md flex-col flex gap-y-5">
          <h1 className="text-4xl xs:text-xl font-bold text-center text-[#D4E9FF]">
            USING MY ASSETS
          </h1>
          <div className="">
            <h2 className="text-2xl xs:text-lg font-semibold text-[#D4E9FF]">
              What is the focus of Emergence?
            </h2>
            <p className="text-[#D4E9FF] mt-2">
              Emergence focuses on 3D interoperable assets, offering an
              immersive experience for gamers, collectors, creators, and
              developers.
            </p>
          </div>
          <div className="">
            <h2 className="text-2xl xs:text-lg font-semibold text-[#D4E9FF]">
              How do I review the details of an asset?
            </h2>
            <p className="text-[#D4E9FF] mt-2">
              Connect your wallet to the Emergence Marketplace and visit the
              collections page. Select an asset to view its details, such as
              traits, in-game stats, and blockchain data. You can also test VRM
              avatars or Playgrounds in the Playground Viewer to experience them
              in 3D.
            </p>
          </div>
          <div className="">
            <h2 className="text-2xl xs:text-lg font-semibold text-[#D4E9FF]">
              What is rarity?
            </h2>
            <p className="text-[#D4E9FF] mt-2">
              Rarity depends on an asset&apos;s traits and availability. Scarcer
              assets are more highly regarded within the community.
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="mt-6 inline-block bg-white-6 px-6 py-3 text-[#D4E9FF] rounded-full shadow-md hover:bg-white-40 transition border border-white-10"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default FAQ;
