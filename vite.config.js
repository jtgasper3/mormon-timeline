import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from '@vuetify/vite-plugin'
//import yamlPlugin from 'vite-plugin-yaml' // Out of date plugin implemented below, keep for dependenies

const path = require('path')

const yamlPlugin = {
  transform(code, id) {
    var __importDefault = (this && this.__importDefault) || function (mod) {
      return (mod && mod.__esModule) ? mod : { "default": mod };
    };
    const tosource_1 = __importDefault(require("tosource"));
    if (!/\.ya?ml$/.test(id)) {
      return
    }
    const transformedCode = `const data = ${tosource_1.default(require("js-yaml").safeLoad(code))}\n`;
    return transformedCode + 'export default data';
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
    yamlPlugin,
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  /* remove the need to specify .vue files https://vitejs.dev/config/#resolve-extensions
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ]
  },
  */
})
