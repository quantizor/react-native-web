import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pages = fs
  .readdirSync(path.resolve(__dirname, 'pages'), { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    pages: JSON.stringify(pages)
  },
  webpack: (config) => {
    config.resolve.alias['react-native'] = 'react-native-web';

    return config;
  }
};

export default nextConfig;
