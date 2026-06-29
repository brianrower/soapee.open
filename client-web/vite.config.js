import path from 'path';

import react from '@vitejs/plugin-react';
import VitePluginHtmlEnv from 'vite-plugin-html-env';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';

export default function({ command, mode }) {
  const building = command === 'build';
  const serving = command === 'serve';
  const stating = mode === 'stats';

  if (building) {
    // helps with dev only code elimination during builds
    process.env.NODE_ENV = 'production';
  }

  return {
    plugins: [
      VitePluginHtmlEnv(),
      serving && react(),
      building && !(stating) && viteCompression(),
      stating && visualizer()
    ],
    resolve: {
      alias: {
        data: path.resolve(__dirname, './src/data'),
        components: path.resolve(__dirname, './src/components'),
        hooks: path.resolve(__dirname, './src/hooks'),
        services: path.resolve(__dirname, './src/services'),
        styles: path.resolve(__dirname, './src/styles')
      }
    },
    css: {
      preprocessorOptions: {
        styl: {
          imports: [
            // import global variables for each file
            path.resolve(__dirname, './src/styles/variables.styl'),
            path.resolve(__dirname, './src/styles/mixins/index.styl')
          ]
        }
      }
    },
    server: {
      host: '0.0.0.0',
      hmr: {
        port: 5001,
        path: 'vite-hmr'
      }
    },
    build: {
      outDir: 'build',
      brotliSize: false
    },
    clearScreen: false
  };
}
