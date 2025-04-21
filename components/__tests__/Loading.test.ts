import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

describe('Loading', async () => {
  const component = await import('../common/Loading.vue')
  const wrapper = mount(component.default, {
    props: {
      loading: true,
      error: null,
      data: null,
    },
  })
  it('should render correctly', () => {
    expect(wrapper).toBeTruthy()
    expect(wrapper.find('.error').exists()).toBe(false)
  })
})
