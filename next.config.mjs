/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.externals.push("pino-pretty", "lokijs", "encoding");
		return config;
	},
	transpilePackages: ["three"],
	logging: { fetches: { fullUrl: true } },
	images: {
		//all this are for testing, should be removed
		remotePatterns: [
			{
				protocol: "https",
				hostname: "s3-alpha-sig.figma.com",
			},
			{
				protocol: "http",
				hostname: "ipfs.openmeta.xyz",
			},
			{
				protocol: "https",
				hostname: "emergence-nft-thumbnails.s3.us-east-1.amazonaws.com",
			},
			{
				protocol: "https",
				hostname: "minting-avatars-demo.s3.amazonaws.com",
			},
			{
				protocol: "https",
				hostname: "p325k7wa.twic.pics",
			},
			{
				protocol: "https",
				hostname: "cdn.hobbyconsolas.com",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "img.redbull.com",
			},
			{
				protocol: "https",
				hostname: "emergence-nft-thumbnails.s3.amazonaws.com",
			},
		],
	},
};

export default nextConfig;
