<script setup>
defineOptions({
  name: 'DefaultLayout',
})
</script>
<template>
  <v-app>
    <v-main class="tw-bg-gray-900">
      <slot />
    </v-main>
  </v-app>
</template>
