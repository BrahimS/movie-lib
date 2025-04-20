import { vi } from 'vitest'
import { config } from '@vue/test-utils'

// Mock Nuxt composables
vi.mock('#app', () => ({
  useNuxtApp: () => ({
    $api: {
      getMovies: vi.fn(),
      searchMovies: vi.fn(),
      getMovieDetails: vi.fn(),
      getMovieCredits: vi.fn()
    }
  }),
  defineNuxtPlugin: vi.fn()
}))

// Mock Vuetify components
config.global.components = {
  'v-rating': {
    template: '<div data-testid="v-rating"></div>',
    props: ['modelValue', 'color', 'halfIncrements', 'readonly']
  },
  'v-card': {
    template: '<div><slot></slot></div>',
  },
  'v-card-title': {
    template: '<div><slot></slot></div>',
  },
  'v-card-subtitle': {
    template: '<div><slot></slot></div>',
  },
  'v-card-text': {
    template: '<div><slot></slot></div>',
  },
  'v-chip': {
    template: '<div><slot></slot></div>',
    props: ['color', 'size']
  },
  'v-icon': {
    template: '<div><slot></slot></div>',
    props: ['icon']
  },
  'v-row': {
    template: '<div><slot></slot></div>',
  },
  'v-col': {
    template: '<div><slot></slot></div>',
    props: ['cols', 'sm', 'md', 'lg']
  },
  'v-container': {
    template: '<div><slot></slot></div>',
  },
  'v-progress-circular': {
    template: '<div data-testid="loading"></div>',
    props: ['size', 'width', 'color', 'indeterminate']
  }
}