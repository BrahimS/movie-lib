<script setup lang="ts">
import { defineOptions, defineProps } from 'vue'
import type { MovieDetailsType } from '@/types/models/movieDetails'

defineOptions({
  name: 'MovieDetails',
})
defineProps<{
  movie: MovieDetailsType
}>()
</script>

<template>
  <v-row>
    <!-- Poster -->
    <MoviePoster
      :posterPath="
        movie.poster_path
          ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path
          : undefined
      "
      :alt="movie.title"
      :aspectRatio="2 / 3"
    />

    <v-col cols="12" sm="8" md="9">
      <!-- Title & Tagline -->
      <h1 class="tw-text-4xl tw-font-bold tw-mb-2">{{ movie.title }}</h1>
      <div v-if="movie.tagline" class="tw-text-xl tw-text-gray-400 tw-mb-6">
        {{ movie.tagline }}
      </div>

      <!-- Status & Release Date -->
      <div class="tw-mb-4">
        <span class="tw-font-bold">Status:</span>
        <v-chip color="success" class="tw-ml-2">{{ movie.status }}</v-chip>
        <span class="tw-ml-4 tw-font-bold">Release Date:</span>
        <span class="tw-text-gray-600 tw-ml-2">{{ movie.release_date }}</span>
      </div>

      <!-- Director -->
      <div class="tw-mb-4">
        <span class="tw-font-bold">Director:</span>
        <span v-if="movie.director" class="tw-ml-2">{{ movie.director }}</span>
        <span v-else class="tw-ml-2 tw-text-gray-500">Not available</span>
      </div>

      <!-- Actors -->
      <div class="tw-mb-4">
        <span class="tw-font-bold">Cast:</span>
        <span v-if="movie.cast?.length" class="tw-ml-2">
          {{ movie.cast.join(', ') }}
        </span>
        <span v-else class="tw-ml-2 tw-text-gray-500">Not available</span>
      </div>

      <!-- Genres -->
      <div class="tw-mb-4">
        <span class="tw-font-bold">Genres:</span>
        <span class="tw-ml-2">
          <v-chip
            v-for="genre in movie.genres"
            :key="genre.id"
            color="primary"
            variant="outlined"
            class="tw-mr-2"
          >
            {{ genre.name }}
          </v-chip>
        </span>
      </div>

      <!-- Rating & Voters -->
      <div class="tw-mb-4">
        <span class="tw-font-bold">TMDB Rating:</span>
        <v-rating
          :model-value="movie.vote_average / 2"
          color="amber"
          half-increments
          readonly
          class="tw-mx-2 tw-inline"
        />
        <span class="tw-text-gray-600"> {{ movie.vote_average }}/10 </span>
        <span class="tw-ml-4 tw-font-bold">Voters:</span>
        <v-icon icon="mdi-account-group" class="tw-mx-1" />
        <span class="tw-text-gray-600">{{ movie.vote_count }}</span>
      </div>

      <!-- Runtime -->
      <div v-if="movie.runtime" class="tw-mb-4">
        <span class="tw-font-bold">Runtime:</span>
        <v-icon icon="mdi-clock-outline" class="tw-mx-1" />
        <span
          >{{ Math.floor(movie.runtime / 60) }}h {{ movie.runtime % 60 }}m</span
        >
      </div>

      <!-- Overview/Description -->
      <div class="tw-mb-8">
        <h2 class="tw-text-2xl tw-font-bold tw-mb-2">Description</h2>
        <p class="tw-text-lg tw-leading-relaxed">{{ movie.overview }}</p>
      </div>
    </v-col>
  </v-row>
</template>
