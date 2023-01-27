<script
    lang="ts"
    setup
>
withDefaults(defineProps<{
    src?: string
    size?: string
    mode?: keyof ImageMode
    radius?: string
    round?: boolean
}>(), {
    size: '100%',
    mode: 'widthFix',
    radius: '0',
    round: false,
});
</script>

<script lang="ts">
export default { name: 'AppSquareImg' };
</script>

<template>
    <view
        :class="{ round }"
        class="app-square-img"
    >
        <image
            :mode="mode"
            :src="src"
            class="app-square-img__image"
        />
    </view>
</template>

<style lang="scss">
.app-square-img {
    width: v-bind(size);
    overflow: hidden;
    border-radius: v-bind(radius);
    height: 0;
    padding-bottom: v-bind(size);
    position: relative;

    &.round {
        border-radius: 50%;
    }

    &__image {
        width: 100%;
        height: 100% !important;
        position: absolute;
        top: 0;
        left: 0;
        vertical-align: middle;
    }
}
</style>
