<template>
  <v-app>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>

<script setup lang="ts">
import { defineNuxtPlugin } from '#app'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
    variations: {
      colors: [],
      lighten: 0,
      darken: 0,
    },
  },
  defaults: {
    VCard: {
      elevation: 4,
    },
    VImg: {
      eager: true,
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  display: {
    mobileBreakpoint: 'sm',
  },
})

provide('vuetify', vuetify)
</script>

<style lang="scss" scoped>
.v-application {
  background-color: rgb(18, 18, 18) !important;
}

/* Optimize transitions */
.v-enter-active,
.v-leave-active {
  transition-duration: 0.2s;
}

/* Disable transitions on mobile */
@media (max-width: 600px) {
  .v-enter-active,
  .v-leave-active {
    transition: none !important;
  }
}
</style>
