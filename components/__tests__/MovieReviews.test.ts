import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

describe('MovieReviews', async () => {
  const component = await import('../movie/MovieReviews.vue')
  const wrapper = mount(component.default, {
    props: {
      averageRating: 4.5,
      movieId: 10,
    },
  })
  it('should render correctly', () => {
    expect(wrapper).toBeTruthy()
  })
  it('should display props', () => {
    expect(wrapper.props().averageRating).toBe(4.5)
    expect(wrapper.props().movieId).toBe(10)
  })
})
