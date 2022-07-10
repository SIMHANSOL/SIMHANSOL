const nextConfig = {
  reactStrictMode: true,
  assetPrefix: process.env.NODE_ENV === "production" ? "/SIMHANSOL" : "",
};

module.exports = nextConfig;
