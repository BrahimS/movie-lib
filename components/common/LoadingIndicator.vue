<script setup lang="ts">
const props = defineProps<{
  color?: string
  size?: number
}>()
</script>

<template>
  <div class="tw-text-center tw-py-8">
    <v-progress-circular
      indeterminate
      :color="color || 'primary'"
      :size="size || 40"
    />
  </div>
</template>
