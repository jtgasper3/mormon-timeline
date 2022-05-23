<template>
  <v-footer
    app
    absolute
    class="bg-grey-lighten-1"
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        variant="text"
        class="mx-2"
        rounded="xl"
        :to="link.link"
      >
        {{ link.label }}
      </v-btn>
      <v-col
        class="text-center text-white mt-4"
        cols="12"
      >
        Managed by John Gasper - v{{ version }} - Built on {{ buildDate }}
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup>
  // eslint-disable-next-line no-undef
  const version = __APP_VERSION__
  // eslint-disable-next-line no-undef
  const buildDate = __APP_BUILD_DATE__

  const links = [
    { label: 'Home', link: '/' },
    { label: 'About', link: 'about' },
    { label: 'Team', link: 'team' },
    { label: 'Contact Us', link: 'contact' }
  ]
</script>