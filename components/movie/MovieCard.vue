<script setup lang="ts">
import { ref, onMounted, computed, withDefaults, defineProps } from 'vue'
import type { Movie } from '@/types/models/movie'


const props = withDefaults(
  defineProps<{
    movie: Movie
  }>(),
  {},
)

import type { Ref } from 'vue'

const imgRef: Ref<HTMLElement | null> = ref(null)
const isVisible = ref(false)
const imageLoaded = ref(false)

const imageUrl = computed(() => {
  if (!props.movie?.poster_path) {
    return 'https://placehold.co/500x750?text=No+Poster'
  }
  return `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
})

const rating = computed(() => {
  return props.movie?.vote_average ? props.movie.vote_average / 2 : 0
})

onMounted(() => {
  if (!imgRef.value) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer.disconnect()
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '50px',
    },
  )

  observer.observe(imgRef.value)
  return () => observer.disconnect()
})
</script>

<template>
  <v-card
    :to="`/movies/${movie.id}`"
    :elevation="4"
    class="movie-card tw-h-full tw-transition-transform hover:tw-scale-105"
    v-ripple
  >
    <div ref="imgRef" class="tw-relative tw-h-[300px] tw-overflow-hidden">
      <template v-if="isVisible">
        <v-img
          :src="imageUrl"
          :aspect-ratio="2 / 3"
          cover
          @load="imageLoaded = true"
          class="tw-h-full"
          :class="{
            'tw-opacity-0': !imageLoaded,
            'tw-opacity-100 tw-transition-opacity tw-duration-300': imageLoaded,
          }"
        >
          <template #placeholder>
            <div
              class="tw-absolute tw-inset-0 tw-bg-gray-700 tw-animate-pulse"
            />
          </template>
        </v-img>
      </template>
      <div
        v-else
        class="tw-absolute tw-inset-0 tw-bg-gray-700 tw-animate-pulse"
      />
    </div>

    <v-card-title class="tw-line-clamp-2">
      {{ movie.title }}
    </v-card-title>

    <v-card-subtitle v-if="movie.vote_average">
      <v-rating
        :model-value="rating"
        color="amber"
        density="compact"
        half-increments
        readonly
        size="small"
      />
    </v-card-subtitle>

    <v-card-text v-if="movie.overview" class="tw-line-clamp-3">
      {{ movie.overview }}
    </v-card-text>
  </v-card>
</template>

<style scoped>
.movie-card {
  background-color: rgb(31, 31, 31);
  will-change: transform;
}
</style>
