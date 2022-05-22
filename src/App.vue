<template>
  <v-app>
    <v-app-bar app color="primary" density="compact">
      <template #prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>The Mormonism Timeline</v-app-bar-title>

      <template #append>
        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-app-bar>
    <v-main app>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import AppFooter from "@/components/AppFooter.vue";

export default {
  name: "App",

  components: {
    AppFooter,
  },

  data: () => ({
    //
  }),
};
</script>
