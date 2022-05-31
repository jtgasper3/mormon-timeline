import { describe, test, expect } from "vitest";
import AboutPage from "@/views/AboutPage.vue";
import { renderWithVuetify } from "../vitest.vuetifySetup.js";

describe("AboutPage", () => {
  test("mount component", async () => {
    const { html } = renderWithVuetify(AboutPage);

    expect(html()).toMatchSnapshot();
  });
});
