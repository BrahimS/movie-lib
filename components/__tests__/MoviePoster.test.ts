import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

describe('MoviePoster', async () => {
  const component = await import('../movie/MoviePoster.vue')
  const wrapper = mount(component.default, {
    props: {
      posterPath: '/test.jpg',
      alt: 'Test Movie',
      aspectRatio: 1,
      rounded: true,
      shadow: true,
    },
  })
  it('should render correctly', () => {
    expect(wrapper).toBeTruthy()
    expect(wrapper.find('.movie-poster').exists()).toBe(true)
  })
  it('should display poster correctly', () => {
    expect(wrapper.find('.movie-poster').attributes('src')).toBe('https://image.tmdb.org/t/p/w500/test.jpg')
    expect(wrapper.find('.movie-poster').attributes('alt')).toBe('Test Movie')
  })
})
