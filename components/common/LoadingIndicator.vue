<script setup lang="ts">
import { defineProps, defineOptions } from 'vue'
defineOptions({
  name: 'LoadingIndicator',
})
defineProps<{
  color?: string
  size?: number
}>()
</script>

<template>
  <div class="tw-text-center tw-py-8">
    <v-progress-circular indeterminate :color="color || 'primary'" :size="size || 40" />
  </div>
</template>
