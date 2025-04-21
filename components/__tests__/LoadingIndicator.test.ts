import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

describe('LoadingIndicator', async () => {
  const component = await import('../common/LoadingIndicator.vue');


  it('should render correctly', () => {
    expect(component).toBeTruthy();
   expect(component.default.props).toEqual({
     color: {
       type: String,
       required: false
     },
     size: {
       type: Number,
       required: false
     }
   });
  });
});
