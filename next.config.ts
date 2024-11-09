import type { NextConfig } from "next";

module.exports = {
  env: {
    MONGODB_URI:process.env.MONGODB_URI,
  },
}

const nextConfig: NextConfig = {
  env: {
    MONGODB_URI:process.env.MONGODB_URI,
  },
};

export default nextConfig;
