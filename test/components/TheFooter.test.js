import { nextTick } from "vue";
import { describe, it, expect, afterAll, beforeAll } from "vitest";
import { config, mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import TheFooter from "@/components/TheFooter.vue";

  beforeAll(() => {
    config.renderStubDefaultSlot = true
  })

  afterAll(() => {
    config.renderStubDefaultSlot = false
  })

global.__APP_VERSION__ = "TEST_VERSION";
global.__APP_BUILD_DATE__ = "01/20/1974";

describe("TheFooter", () => {
  const vuetify = createVuetify({ components, directives });
  
  it("mount component", async () => {
    expect(TheFooter).toBeTruthy();

    const wrapper = mount(TheFooter, {
      global: {
        plugins: [vuetify],
        stubs: {
          VFooter: true
        }
      },
    });

    await nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
