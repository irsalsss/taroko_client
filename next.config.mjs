import path from "path";
import { URL } from "url";

const __dirname = new URL(".", import.meta.url).pathname;

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    async redirects() {
      return [
        {
          source: "/",
          destination: "/contacts",
          permanent: true,
        },
      ];
    },
  },
};

export default nextConfig;
