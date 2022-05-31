import { waitFor } from "@testing-library/vue";
import { describe, it, expect, vi } from "vitest";
import TimelinePage from "@/views/TimelinePage.vue";
import { renderWithVuetify } from "../vitest.vuetifySetup.js";

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

describe("TimelinePage", () => {
  it("mount component", async () => {
    const { html } = renderWithVuetify(TimelinePage);

    await waitFor(() => {});
    expect(html()).toMatchSnapshot();
  });
});
