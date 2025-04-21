<script setup lang="ts">
import { ref } from 'vue'
import { useMovieStore } from '@/store/movie'
import SearchBar from '@/components/common/SearchBar.vue'
import MovieList from '@/components/movie/MovieList.vue'
import Hero from '@/components/Hero.vue'

const store = useMovieStore()
const searchQuery = ref('')
const currentPage = ref(1)

// Use Nuxt's useFetch for SSR
await useFetch('/api/movies', {
  transform: (response: any) => {
    store.setInitialMovies(response.results)
    return response
  },
  server: true,
  lazy: false,
})

const searchMovies = async () => {
  currentPage.value = 1
  if (searchQuery.value) {
    await store.searchMovies(searchQuery.value)
  } else {
    await store.fetchMovies()
  }
}

const loadMoreMovies = async () => {
  currentPage.value++
  if (searchQuery.value) {
    await store.searchMovies(searchQuery.value, currentPage.value)
  } else {
    await store.fetchMovies(currentPage.value)
  }
}

definePageMeta({
  keepalive: true,
})
</script>

<template>
  <div>
    <div>
      <Hero />
      <v-container class="tw-py-12">
        <!-- Search -->
        <SearchBar v-model="searchQuery" label="Search Movies" @search="searchMovies" />

        <!-- Results -->
        <MovieList :movies="store.movies" :loading="store.loading" @load-more="loadMoreMovies" />
      </v-container>
    </div>
  </div>
</template>

<style lang="scss"></style>
