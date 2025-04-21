<script setup lang="ts">
import { defineOptions } from 'vue'
defineOptions({
  name: 'MovieCardSkeleton',
})
</script>
<template>
  <v-card class="movie-card tw-h-full">
    <div class="tw-relative tw-h-[300px] tw-overflow-hidden">
      <div class="tw-absolute tw-inset-0 tw-bg-gray-700 tw-animate-pulse" />
    </div>

    <v-card-title>
      <div class="tw-h-6 tw-w-3/4 tw-bg-gray-700 tw-animate-pulse tw-rounded" />
    </v-card-title>

    <v-card-subtitle>
      <div class="tw-h-4 tw-w-1/2 tw-bg-gray-700 tw-animate-pulse tw-rounded" />
    </v-card-subtitle>

    <v-card-text>
      <div class="tw-space-y-2">
        <div class="tw-h-4 tw-w-full tw-bg-gray-700 tw-animate-pulse tw-rounded" />
        <div class="tw-h-4 tw-w-5/6 tw-bg-gray-700 tw-animate-pulse tw-rounded" />
        <div class="tw-h-4 tw-w-4/6 tw-bg-gray-700 tw-animate-pulse tw-rounded" />
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped lang="scss">
.movie-card {
  background-color: rgb(31, 31, 31);
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.tw-animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
