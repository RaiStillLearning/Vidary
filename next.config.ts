/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "otakudesu.best",
      },
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
      },
      { protocol: "https", hostname: "v1.samehadaku.how" },
    ],
  },
};

export default nextConfig;
