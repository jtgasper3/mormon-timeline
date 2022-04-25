import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import vue from "@vitejs/plugin-vue";
import vuetify from "@vuetify/vite-plugin";
//import yamlPlugin from 'vite-plugin-yaml' // Out of date plugin implemented below, keep for dependencies

const path = require("path");

const yamlPlugin = {
  transform(code, id) {
    if (!/\.ya?ml$/.test(id)) {
      return;
    }
    const transformedCode = `const data = ${JSON.stringify(
      require("js-yaml").safeLoad(code)
    )}\n`;
    return transformedCode + "export default data";
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    eslintPlugin(),
    vue(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
    yamlPlugin,
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
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
  test: {
    globals: true,
    setupFiles: ["test/vitest.beforeall.js"],
    environment: "happy-dom",
    deps: {
      inline: ["vuetify"],
    },
  },
});
