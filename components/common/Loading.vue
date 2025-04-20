<template>
  <div
    class="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-black/80 tw-z-50"
  >
    <v-progress-circular :size="70" :width="7" color="primary" indeterminate />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Loading',
})
</script>

<style lang="scss" scoped>
/* Removed styles as they are no longer needed */
</style>
