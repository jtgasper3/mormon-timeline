<template>
  <v-footer app absolute>
    <v-card elevation="0" rounded="0" width="100%" class="bg-grey text-center">
      <v-card-text class="text-white">
        <strong>Managed by John Gasper - v{{ version }} - Built on {{ buildDate }}</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script setup>
  // eslint-disable-next-line no-undef
  const version = __APP_VERSION__
  // eslint-disable-next-line no-undef
  const buildDate = __APP_BUILD_DATE__
</script>