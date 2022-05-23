import { nextTick } from "vue";
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import AboutPage from "@/views/AboutPage.vue";

describe("AboutPage", () => {
  const vuetify = createVuetify({ components, directives });

  it("mount component", async () => {
    expect(AboutPage).toBeTruthy();

    const wrapper = mount(AboutPage, {
      global: {
        plugins: [vuetify],
      },
    });

    await nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
