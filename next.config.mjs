/** @type {import('next').NextConfig} */
const nextConfig = {
    images :{
        remotePatterns :[
            {
                protocol : "https",
                hostname :"randomuser.me"
            }
        ]
    },
    babel: {
        presets: ["next/babel"]
    }
};

export default nextConfig;
