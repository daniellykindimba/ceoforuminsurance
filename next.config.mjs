/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
     eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: ['www.nicinsurance.co.tz'],
    },
};

export default nextConfig;
