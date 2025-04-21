import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import type { Movie } from '@/types/models/movie.ts'

describe('MovieList', async () => {
  const vuetify = createVuetify()
  const component = await import('../movie/MovieList.vue')

  const mockMovies: Movie[] = []
  const wrapper = mount(component.default, {
    props: {
      movies: mockMovies,
      loading: false,
      hasNextPage: false,
    },
    global: {
      plugins: [vuetify],
    },
  })

  it('should render correctly', () => {
    expect(wrapper).toBeTruthy()
  })

  it('should show no results when movies array is empty', () => {
    expect(wrapper.html()).toContain('No results')
  })
})
