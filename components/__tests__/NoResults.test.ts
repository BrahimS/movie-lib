import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

describe('NoResults', async () => {
  const component = await import('../common/NoResults.vue')
  const wrapper = mount(component.default, {
    props: {
      message: 'No results found',
    },
  })
  it('should render correctly', () => {
    expect(wrapper).toBeTruthy()
    expect(wrapper.text()).toContain('No results found')
  })
})
