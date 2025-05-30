/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["images.pexels.com", "localhost", "res.cloudinary.com"],
	},
	async rewrites() {
		return [
			{
				source: "/du-an",
				destination: "/programs",
			},
			{
				source: "/du-an/:slug",
				destination: "/programs/:slug",
			},
			{
				source: "/du-an/:slug/dang-ky",
				destination: "/programs/:slug/register",
			},
			{
				source: "/tin-tuc",
				destination: "/news",
			},
			{
				source: "/tin-tuc/:slug",
				destination: "/news/:slug",
			},
			{
				source: "/bao-cao",
				destination: "/reports",
			},
			{
				source: "/tinh-nguyen",
				destination: "/volunteer",
			},
			{
				source: "/quyen-gop",
				destination: "/donate",
			},
		];
	},
};

module.exports = nextConfig;
