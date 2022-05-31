// From https://github.com/testing-library/vue-testing-library/blob/main/src/__tests__/vuetify.js
import { render } from "@testing-library/vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Custom container to integrate Vuetify with Vue Testing Library.
// Vuetify requires you to wrap your app with a v-app component that provides
// a <div data-app="true"> node.
export const renderWithVuetify = (component, globals, options) => {
  const vuetify = createVuetify({ components, directives });

  return render(component, {
    // for Vuetify components that use the $vuetify instance property
    global: {
      plugins: [vuetify],
      ...globals,
    },
    ...options,
  });
};
