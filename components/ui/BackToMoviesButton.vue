<script setup lang="ts">
defineOptions({
  name: 'BackToMoviesButton',
})
defineProps<{
  to?: string
  text?: string
}>()
</script>

<template>
  <v-row class="tw-my-8">
    <v-col cols="12">
      <v-btn
        color="primary"
        variant="text"
        size="large"
        :to="to || '/'"
        prepend-icon="mdi-arrow-left"
      >
        {{ text || 'Back to Movies' }}
      </v-btn>
    </v-col>
  </v-row>
</template>
