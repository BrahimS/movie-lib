<script setup lang="ts">
import { ref, defineEmits, defineOptions } from 'vue'
import { useInfiniteScroll } from '@vueuse/core'
import MovieCard from '@/components/movie/MovieCard.vue'
import MovieCardSkeleton from '@/components/movie/skeleton/MovieCardSkeleton.vue'
import NoResults from '@/components/common/NoResults.vue'
import type { Movie } from '@/types/models/movie.ts'

defineOptions({
  name: 'MovieList',
})

const props = defineProps<{
  movies: Movie[]
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'load-more'): void
}>()

const el = ref<HTMLElement | null>(null)
const isLoadingMore = ref(false)

// Create an array of 8 items for skeleton loading
const skeletonCount = 8
const skeletonArray = Array.from({ length: skeletonCount })

useInfiniteScroll(
  el,
  async () => {
    if (!props.loading && !isLoadingMore.value) {
      isLoadingMore.value = true
      await emit('load-more')
      isLoadingMore.value = false
    }
  },
  { distance: 100 },
)
</script>

<template>
  <div ref="el">
    <!-- Initial loading state (only show on first load) -->
    <v-row v-if="props.loading && !props.movies.length">
      <v-col
        v-for="(_, index) in skeletonArray"
        :key="`skeleton-${index}`"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <MovieCardSkeleton />
      </v-col>
    </v-row>

    <!-- No results -->
    <NoResults v-else-if="!props.loading && props.movies.length === 0" />

    <!-- Movie grid -->
    <v-row v-else>
      <v-col
        v-for="movie in props.movies"
        :key="movie.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="movie-list tw-transition-all"
      >
        <MovieCard :movie="movie" />
      </v-col>

      <!-- Loading more indicator -->
      <template v-if="isLoadingMore">
        <v-col
          v-for="(_, index) in skeletonArray.slice(0, 4)"
          :key="`loading-more-${index}`"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <MovieCardSkeleton />
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<style scoped>
.v-row {
  margin: 0 -12px;
}

.v-col {
  padding: 12px;
}
</style>
