import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import vue from "@vitejs/plugin-vue";
import vuetify from "@vuetify/vite-plugin";

const path = require("path");

const yamlPlugin = {
  transform(code, id) {
    if (!/\.ya?ml$/.test(id)) {
      return;
    }
    const transformedCode = `const data = ${JSON.stringify(
      require("js-yaml").load(code)
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
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __APP_BUILD_DATE__: JSON.stringify(
      new Date().toLocaleDateString("en-US") +
        " " +
        new Date().toLocaleTimeString("en-US")
    ),
    "process.env": {},
  },
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
