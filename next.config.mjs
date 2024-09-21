import nextSafe from "next-safe";

const isDev = process.env.NODE_ENV !== "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // async headers() {
  //   return [
  //     {
  //       source: "/:path*",
  //       headers: nextSafe({ isDev })
  //     }
  //   ];
  // },
  async redirects() {
    return [
      {
        source: "/auth",
        destination: "/auth/login",
        permanent: false
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: ""
      }
    ]
  }
};

export default nextConfig;
