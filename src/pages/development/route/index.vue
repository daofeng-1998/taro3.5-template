<script
    lang="ts"
    setup
>
import { Router } from 'tarojs-router-next';
import AppPage from '@/components/lib/app-page/index.vue';

definePageConfig({
    navigationBarTitleText: '$END$',
});
const data = {
    ...Router.getData(),
    ...Router.getParams(),
};
</script>

<template>
    <AppPage>
        <div>{{ JSON.stringify(data) }}</div>
    </AppPage>
</template>

<style lang="scss"></style>
