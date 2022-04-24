<template>
  <v-app>
      <v-app-bar
        color="primary"
        density="compact"
      >
        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>The Mormonism Timeline</v-app-bar-title>

        <template v-slot:append>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-app-bar>
      <v-main>
        <v-container>
          <HistoricTimeline />
        </v-container>
      </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import AppFooter from './components/AppFooter.vue'
import HistoricTimeline from './components/HistoricTimeline.vue'

export default {
  name: 'App',

  components: {
    AppFooter,
    HistoricTimeline,
  },

  data: () => ({
    //
  }),
}
</script>
