import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

describe('BackToMoviesButton', async () => {
  const component = await import('../ui/BackToMoviesButton.vue')
  const wrapper = mount(component.default, {
    props: {
      to: '/movies',
      text: 'Back to Movies',
    },
  })
  it('should render correctly', () => {
    expect(wrapper).toBeTruthy()
  })
  it('should display props', () => {
    expect(wrapper.props().to).toBe('/movies')
    expect(wrapper.props().text).toBe('Back to Movies')
  })
})
