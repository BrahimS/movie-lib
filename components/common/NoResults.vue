<script setup lang="ts">
const props = defineProps<{
  message?: string
}>()
</script>

<template>
  <v-row justify="center" class="tw-mt-12">
    <v-col cols="12" class="tw-text-center">
      <v-icon icon="mdi-movie-off" size="64" class="tw-mb-4" />
      <div class="tw-text-xl tw-text-gray-400">
        {{ message || 'No results found' }}
      </div>
    </v-col>
  </v-row>
</template>
