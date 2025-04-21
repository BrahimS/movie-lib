// store/movie.ts
import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'
import { useStorage } from '@vueuse/core'
import type { Movie } from '@/types/models/movie'
import type { MovieDetailsType } from '@/types/models/movieDetails'

interface MovieState {
  movies: Movie[]
  currentMovie: MovieDetailsType | null
  loading: boolean
  error: string | null
  cache: {
    movies: Record<number, Movie[]>
    details: Record<string, MovieDetailsType>
    timestamp: number
  }
}

const CACHE_DURATION = 1000 * 60 * 5 // 5 minutes

export const useMovieStore = defineStore('movie', {
  state: (): MovieState => ({
    movies: [],
    currentMovie: null,
    loading: false,
    error: null,
    cache: useStorage('movie-cache', {
      movies: {},
      details: {},
      timestamp: Date.now()
    }).value
  }),

  getters: {
    isCacheValid(): boolean {
      return Date.now() - this.cache.timestamp < CACHE_DURATION
    }
  },

  actions: {
    setInitialMovies(movies: Movie[]) {
      this.movies = movies.map(movie => ({
        ...movie,
        poster_path: movie.poster_path 
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null
      }))
      this.cache.movies[1] = this.movies
      this.cache.timestamp = Date.now()
    },

    clearCache() {
      this.cache = {
        movies: {},
        details: {},
        timestamp: Date.now()
      }
    },

    async fetchMovies(page = 1) {
      try {
        // Check cache first
        if (this.isCacheValid && this.cache.movies[page]) {
          this.movies = page === 1 
            ? this.cache.movies[page] 
            : [...this.movies, ...this.cache.movies[page]]
          return
        }

        this.loading = true
        const { $api } = useNuxtApp()
        const response = await $api.getMovies(page)

        if (!response?.results) {
          throw new Error('Invalid response format')
        }

        // Process and validate each movie
        const movies = response.results.map((movie: any) => ({
          ...movie,
          poster_path: movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : null
        }))

        // Update state and cache
        if (page === 1) {
          this.movies = movies
        } else {
          this.movies = [...this.movies, ...movies]
        }
        
        this.cache.movies[page] = movies
        this.cache.timestamp = Date.now()
        this.error = null
      } catch (error: any) {
        console.error('Error fetching movies:', error)
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async searchMovies(query: string, page = 1) {
      try {
        this.loading = true
        const { $api } = useNuxtApp()
        const response = await $api.searchMovies(query, page)

        if (!response?.results) {
          throw new Error('Invalid response format')
        }

        // Process and validate each movie
        const movies = response.results.map((movie: any) => ({
          ...movie,
          poster_path: movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : null
        }))

        // Update state
        if (page === 1) {
          this.movies = movies
        } else {
          this.movies = [...this.movies, ...movies]
        }
        
        this.error = null
      } catch (error: any) {
        console.error('Error searching movies:', error)
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async fetchMovieDetails(id: string) {
      try {
        // Check cache first
        if (this.isCacheValid && this.cache.details[id]) {
          this.currentMovie = this.cache.details[id]
          return
        }

        this.loading = true
        const { $api } = useNuxtApp()
        const [details, credits] = await Promise.all([
          $api.getMovieDetails(id),
          $api.getMovieCredits(id)
        ])

        if (!details || !credits) {
          throw new Error('Failed to fetch movie details')
        }

        // Process poster and backdrop paths
        const movieDetails = {
          ...details,
          poster_path: details.poster_path 
            ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
            : null,
          backdrop_path: details.backdrop_path
            ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
            : null,
          // Extract director from crew
          director: credits.crew?.find(person => person.job === 'Director')?.name || null,
          // Get top cast members (first 5)
          cast: credits.cast?.slice(0, 5).map(actor => actor.name) || [],
          credits
        }

        this.currentMovie = movieDetails
        this.cache.details[id] = movieDetails
        this.cache.timestamp = Date.now()
        this.error = null
      } catch (error: any) {
        console.error('Error fetching movie details:', error)
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
})