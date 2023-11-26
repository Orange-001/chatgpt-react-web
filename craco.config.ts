import path from 'path';

const resolve = (dir: string) => path.resolve(__dirname, dir);

export default {
  plugins: [],
  webpack: {
    alias: {
      '@': resolve('src')
    }
  }
};
