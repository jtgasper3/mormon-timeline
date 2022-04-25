import { nextTick } from "vue";
import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import HistoricTimeline from "@/components/HistoricTimeline.vue";

vi.mock("@/services", () => {
  return {
    getEvents: () => [
      {
        id: "bom_bob_birth",
        title: "Mormon Timeline Created",
        date: new Date("2022-04-22T00:00:00"),
        description: "This is a test",
        references: [],
        category: "bom",
        tags: ["test"],
      },
    ],
  };
});

describe("HistoricTimeline", () => {
  const vuetify = createVuetify({ components, directives });

  it("mount component", async () => {
    expect(HistoricTimeline).toBeTruthy();

    const wrapper = mount(HistoricTimeline, {
      global: {
        plugins: [vuetify],
      },
    });

    await nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
