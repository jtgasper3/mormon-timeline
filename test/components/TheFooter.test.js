import { describe, test, expect } from "vitest";
import { waitFor } from "@testing-library/vue";
import { h } from "vue";
import { VApp } from "vuetify/components";
import TheFooter from "@/components/TheFooter.vue";
import { renderWithVuetify } from "../vitest.vuetifySetup.js";

global.__APP_VERSION__ = "TEST_VERSION";
global.__APP_BUILD_DATE__ = "01/20/1974";

describe("TheFooter", () => {
  test("mount component", async () => {
    expect(TheFooter).toBeTruthy();

    const { html } = renderWithVuetify(
      VApp,
      {},
      {
        slots: {
          default: h(TheFooter),
        },
      }
    );

    await waitFor(() => {});
    expect(html()).toMatchSnapshot();
  });
});
