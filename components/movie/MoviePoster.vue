<script setup lang="ts">
defineOptions({
  name: 'MoviePoster',
})
defineProps<{
  posterPath?: string
  alt?: string
  aspectRatio?: number
  rounded?: boolean
  shadow?: boolean
}>()
</script>

<template>
  <v-col cols="12" sm="4" md="3">
    <v-img
      :src="
        posterPath
          ? 'https://image.tmdb.org/t/p/w500' + posterPath
          : 'https://placehold.co/500x750?text=No+Poster'
      "
      :aspect-ratio="aspectRatio || 2 / 3"
      cover
      :class="[
        rounded !== false ? 'tw-rounded-lg' : '',
        shadow !== false ? 'tw-shadow-xl' : '',
      ]"
      :alt="alt || 'Movie poster'"
    />
  </v-col>
</template>
