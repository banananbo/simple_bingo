import 'jest';
import { shallowMount } from '@vue/test-utils'
import Test from '@src/pages/TestPage.vue'

describe('TestPage.vue',()=>{
    test(`renders props.msg when passed`, () => {
        const wrapper = shallowMount(Test)
        expect(wrapper.text()).toMatch('hello World!');
    })
})
