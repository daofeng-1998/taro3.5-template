<script
    lang="ts"
    setup
>
defineProps({
    url: {
        type: String,
        default: '',
    },
});
</script>

<template>
    <div
        class="app-link"
        @click="navigateAny(url)"
    >
        <slot />
    </div>
</template>

<style></style>
