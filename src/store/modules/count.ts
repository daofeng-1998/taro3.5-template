import { defineStore } from 'pinia';
import { reactive, toRefs } from 'vue';

export const useCountStore = defineStore('count', () => {
    const state = reactive({
        count: 0,
    });

    const increment = (num = 1) => state.count += num;

    const decrement = (num = 1) => state.count -= num;

    return {
        ...toRefs(state),
        increment,
        decrement,
    };
});
