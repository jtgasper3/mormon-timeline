// Vuetify needs CSS.supports() but we don't have it in our test DOM, so create it and it always returns false
// Adapted from https://github.com/governance-foundation/template-electron-vuex-vuetify
/* c8 ignore next */
import { beforeAll } from "vitest"
;global.CSS = { supports: () => false }

beforeAll(() => {
  global.CSS = {
    supports: (str) => false,
    escape: (str) => str,
  }
  // console.log("CSS.support:" + CSS.supports("selector(:focus-visible)")) // Visual test
})