<script
    lang="ts"
    setup
>
import AppPage from '@/components/lib/app-page/index.vue';
import { useCountStore } from '@/store/modules/count';

const countStore = useCountStore();
</script>

<template>
    <AppPage>
        <view>{{ countStore.count }}</view>
        <button @click="countStore.increment()">
            +1
        </button>
        <button @click="countStore.decrement()">
            -1
        </button>
    </AppPage>
</template>
