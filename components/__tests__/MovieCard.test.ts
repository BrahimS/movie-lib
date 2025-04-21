
import { describe, expect, it, test, vi} from 'vitest'
import { mount } from '@vue/test-utils'
import type { Movie } from '@/types/models/movie'

class MockIntersectionObserver implements IntersectionObserver {
  root: Document | Element | null = null
  rootMargin: string = ``
  thresholds: readonly number[] = []

  disconnect = vi.fn()
  observe = vi.fn()
  takeRecords = vi.fn()
  unobserve = vi.fn()
}
window.IntersectionObserver = MockIntersectionObserver
describe('MovieCard', async () => {
  const component = await import('../movie/MovieCard.vue')
  const wrapper = mount(component.default, {
    props: {
      movie: {
        id: 1,
        title: 'Test Movie',
        poster_path: '/test-poster.jpg',
        vote_average: 7.5,
        release_date: '2022-01-01',
        overview: 'Test overview',
        runtime: 120,
        genres: [{ id: 1, name: 'Action' }, { id: 2, name: 'Adventure' }],
        cast: ['Actor 1', 'Actor 2'],
        director: 'Director 1',
        status: 'Released',
        budget: 1000000,
        revenue: 2000000,
        tagline: 'Test tagline',
        keywords: ['Keyword 1', 'Keyword 2'],
        production_companies: [
          { id: 1, logo_path: '/company-logo-1.jpg', name: 'Company 1' },
          { id: 2, logo_path: '/company-logo-2.jpg', name: 'Company 2' },
        ],
        production_countries: [
          { iso_3166_1: 'US', name: 'United States' },
          { iso_3166_1: 'CA', name: 'Canada' },
        ],
        spoken_languages: [
          { iso_639_1: 'en', name: 'English' },
          { iso_639_1: 'fr', name: 'French' },
        ],
        videos: {
          results: [
            { key: 'video-key-1', name: 'Video 1', site: 'YouTube' },
            { key: 'video-key-2', name: 'Video 2', site: 'YouTube' },
          ],
        },
        images: {
          backdrops: [

        ]}

      },
    } as Movie,
  })

  it(`IntersectionObserver`, () => {
    expect(new IntersectionObserver((entries) => entries)).toBeInstanceOf(
      IntersectionObserver
    )
  })
  it('should render correctly', () => {
    expect(wrapper).toBeTruthy()
    expect(wrapper.find('.movie-card').exists()).toBe(true)
    expect(wrapper.find('.movie-card').text()).toContain('Test Movie')
    expect(wrapper.props().movie).toBeDefined()
  })
  it('should emit click event', async () => {
    await wrapper.find('.movie-card').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

});
