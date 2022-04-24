import { mount } from '@vue/test-utils'
import { describe, it, expect } from "vitest"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import HistoricTimeline from '@/components/HistoricTimeline.vue'

describe("HistoricTimeline", () => {
  const vuetify = createVuetify({ components, directives })

  it('mount component', () => {
    expect(HistoricTimeline).toBeTruthy()

    const wrapper = mount(HistoricTimeline, {
      global: {
        plugins: [vuetify],
      },
    })
  })
})
