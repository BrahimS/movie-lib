<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMovieStore } from '@/store/movie'
import { useCommentsStore } from '@/store/comments'
import MovieDetails from '@/components/movie/MovieDetails.vue'
import MovieReviews from '@/components/movie/MovieReviews.vue'
import BackToMoviesButton from '@/components/ui/BackToMoviesButton.vue'

const route = useRoute()
const movieId = computed(() => Number(route.params.id))
const movieStore = useMovieStore()
const { currentMovie, loading } = storeToRefs(movieStore)
const commentsStore = useCommentsStore()
const averageRating = computed(() => commentsStore.getAverageRating(movieId.value))

onMounted(async () => {
  await movieStore.fetchMovieDetails(route.params.id as string)
})
</script>
<template>
  <div>
    <v-container v-if="currentMovie" class="tw-py-12">
      <BackToMoviesButton />
      <MovieDetails :movie="currentMovie" />
      <MovieReviews
        :averageRating="averageRating"
        :movieId="movieId"
      />
    </v-container>
    <div v-else-if="loading" class="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-black/80 tw-z-50">
      <v-progress-circular :size="70" :width="7" color="primary" indeterminate />
    </div>
    <div v-else class="tw-py-12 tw-text-center">
      <h1 class="tw-text-2xl tw-font-bold">Movie not found</h1>
    </div>
  </div>
</template>
