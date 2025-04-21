
import { describe, expect, it, test, vi} from 'vitest'
import { mount } from '@vue/test-utils'
import type { Movie } from '@/types/models/movie'



describe('MovieDetails', async () => {
  const component = await import('../movie/MovieDetails.vue')
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


  it('should render correctly', () => {
    expect(wrapper).toBeTruthy()
    expect(wrapper.props().movie).toBeDefined()
  })

  it('should display details correctly', () => {
    expect(wrapper.props().movie.title).toBe('Test Movie')
    expect(wrapper.props().movie.poster_path).toBe('/test-poster.jpg')
    expect(wrapper.props().movie.vote_average).toBe(7.5)
    expect(wrapper.props().movie.release_date).toBe('2022-01-01')
    expect(wrapper.props().movie.overview).toBe('Test overview')
    expect(wrapper.props().movie.runtime).toBe(120)
    expect(wrapper.props().movie.genres).toEqual([{ id: 1, name: 'Action' }, { id: 2, name: 'Adventure' }])
    expect(wrapper.props().movie.cast).toEqual(['Actor 1', 'Actor 2'])
    expect(wrapper.props().movie.director).toBe('Director 1')
    expect(wrapper.props().movie.status).toBe('Released')
    expect(wrapper.props().movie.budget).toBe(1000000)
    expect(wrapper.props().movie.revenue).toBe(2000000)
    expect(wrapper.props().movie.tagline).toBe('Test tagline')
    expect(wrapper.props().movie.keywords).toEqual(['Keyword 1', 'Keyword 2'])
    expect(wrapper.props().movie.production_companies).toEqual([
      { id: 1, logo_path: '/company-logo-1.jpg', name: 'Company 1' }, { id: 2, logo_path: '/company-logo-2.jpg', name: 'Company 2' },
    ])
    expect(wrapper.props().movie.production_countries).toEqual([
      { iso_3166_1: 'US', name: 'United States' }, { iso_3166_1: 'CA', name: 'Canada' },
    ])
    expect(wrapper.props().movie.spoken_languages).toEqual([
      { iso_639_1: 'en', name: 'English' }, { iso_639_1: 'fr', name: 'French' },
    ])

});
});
