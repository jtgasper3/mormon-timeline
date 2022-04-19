<template>
  <v-app>
    <v-main>
      <v-container>
        <HistoricTimeline />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HistoricTimeline from './components/HistoricTimeline.vue'

export default {
  name: 'App',

  components: {
    HistoricTimeline,
  },

  data: () => ({
    //
  }),
}
</script>
