import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

describe('MovieList', async () => {
  const component = await import('../movie/MovieList.vue')
  const wrapper = mount(component.default)
  it('should render correctly', () => {
    expect(wrapper).toBeTruthy()
  })
})
