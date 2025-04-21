import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

describe('SearchBar', async () => {
  const component = await import('../common/SearchBar.vue')
  const wrapper = mount(component.default, {
    props: {
      modelValue: 'test',
      label: 'Search Movies',
    },
  })
  it('should render correctly', () => {
    expect(wrapper).toBeTruthy()
    expect(wrapper.find('.search-bar').exists()).toBe(true)
  })
})
