import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const IS_DEV = mode === 'development';

  return {
    plugins: [
      svgr({
        svgrOptions: {
          ref: true,
          svgo: false,
          titleProp: true,
        },
        include: '**/*.svg?react',
      }),
      react(),
    ],
    resolve: {
      alias: {
        assets: path.resolve(__dirname, 'src/assets'),
        config: path.resolve(__dirname, 'src/config'),
        components: path.resolve(__dirname, 'src/components'),
        styles: path.resolve(__dirname, 'src/styles'),
        pages: path.resolve(__dirname, 'src/pages'),
        types: path.resolve(__dirname, 'src/types'),
      },
    },
    css: {
      modules: {
        generateScopedName: IS_DEV ? '[name]__[local]__[hash:base64:5]' : '[hash:base64:5]',
      },
    },
  };
});
