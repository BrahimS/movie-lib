import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { useFetch } from '@vueuse/core'
import type { FetchOptions } from 'ofetch'

interface TMDBResponse {
  results?: any[]
  [key: string]: any
}

const cache = new Map<string, Promise<any>>()
const CACHE_TIME = 5 * 60 * 1000 // 5 minutes

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const baseURL = config.public.tmdbBaseURL
  const apiKey = config.public.tmdbApiKey

  const defaultOptions: FetchOptions = {
    baseURL,
    headers: {
      Accept: 'application/json',
      'Cache-Control': 'public, max-age=300',
    },
  }

  const makeRequest = async <T = TMDBResponse>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
    const cacheKey = `${endpoint}${JSON.stringify(options.params || {})}`

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey) as Promise<T>
    }

    try {
      const params = {
        api_key: apiKey,
        language: 'en-US',
        ...(options.params || {}),
      }

      const promise = $fetch<T>(endpoint, {
        ...defaultOptions,
        ...options,
        params,
      })

      cache.set(cacheKey, promise)

      // Clear cache after expiry
      setTimeout(() => {
        cache.delete(cacheKey)
      }, CACHE_TIME)

      return promise
    } catch (error: any) {
      console.error(`API Error (${endpoint}):`, error.message)
      throw error
    }
  }

  const api = {
    async getMovies(page = 1) {
      return makeRequest('/movie/popular', {
        params: { page },
      })
    },

    async searchMovies(query: string, page = 1) {
      return makeRequest('/search/movie', {
        params: { query, page },
      })
    },

    async getMovieDetails(id: string) {
      return makeRequest(`/movie/${id}`, {
        params: { append_to_response: 'videos,images' },
      })
    },

    async getMovieCredits(id: string) {
      return makeRequest(`/movie/${id}/credits`)
    },
  }

  return {
    provide: {
      api,
    },
  }
})
