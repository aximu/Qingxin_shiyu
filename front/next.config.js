/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

const fs = require('fs');
const path = require('path');

module.exports = {
  devServer: {
    https: {
      key: fs.readFileSync(path.join(__dirname, 'localhost-key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'localhost.pem')),
    },
  },
  // 其他配置
}