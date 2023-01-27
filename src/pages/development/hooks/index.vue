<script
    lang="ts"
    setup
>
import { ref, watch } from 'vue';
import { useDelayRef } from '@/hooks/use-lib';

const [delayState, update] = useDelayRef(8);

watch(delayState, (newValue) => {
    console.log('-----delayState发生变化-----');
    console.log(newValue);
});

const testDelayState = () => {
    const promiseList: Promise<any>[] = [];

    for (let i = 0; i < 10; i++) {
        const p = new Promise((resolve) => {
            setTimeout(() => {
                delayState.value++;
                resolve(undefined);
            }, 500);
        });
        promiseList.push(p);
    }

    Promise.all(promiseList).then(() => {
        console.log('设置完成');
        setTimeout(() => {
            update();
        }, 3000);
    });
};

const normalState = ref([{ age: 8 }]);
watch(normalState.value, (newValue) => {
    console.log('-----normalState发生改变-----');
    console.log(newValue);
});

const testNormalState = () => {
    for (let i = 0; i < 10; i++) {
        // setTimeout(() => {
        normalState.value[0].age++;
        // });
    }
};
</script>

<template>
    <view class="hooks-test">
        <view>delayState:{{ delayState }}</view>
        <button @click="testDelayState">
            增加(delayState)
        </button>
        <view>normalState:{{ normalState[0].age }}</view>
        <button @click="testNormalState">
            增加(normalState)
        </button>
    </view>
</template>

<style>

</style>
