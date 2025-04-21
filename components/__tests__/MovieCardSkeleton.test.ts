import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

describe('MovieCardSkeleton', async () => {
  const component = await import('../movie/skeleton/MovieCardSkeleton.vue')
  const wrapper = mount(component.default, {})
  it('should render correctly', () => {
    expect(wrapper).toBeTruthy()
    expect(wrapper.find('.movie-card').exists()).toBe(true)
  })
})
