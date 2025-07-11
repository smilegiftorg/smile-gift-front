/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["images.pexels.com", "localhost", "res.cloudinary.com", "smile-gift-cms-production.up.railway.app"],
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
				source: "/tinh-nguyen/:slug",
				destination: "/volunteer/:slug",
			},
			{
				source: "/quyen-gop",
				destination: "/donate",
			},
			{
				source: "/lien-he",
				destination: "/contact",
			},
		];
	},
};

module.exports = nextConfig;
