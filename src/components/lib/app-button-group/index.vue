<script
    lang="ts"
    setup
>
</script>

<script lang="ts">
export default { name: 'AppButtonGroup' };
</script>

<template>
    <view class="app-button-group">
        <slot />
    </view>
</template>

<style lang="scss">
.app-button-group {
    display: flex;
    overflow: hidden;

    .nut-button {
        border-radius: 0;

        border: 0;
        border-top: var(--button-group-outborder) solid var(--button-group-border-color);
        border-bottom: var(--button-group-outborder) solid var(--button-group-border-color);
        border-right: var(--button-group-innerborder) solid var(--button-group-border-color);

        &:first-child {
            border-left: var(--button-group-outborder) solid var(--button-group-border-color);
            border-top-left-radius: var(--button-group-radius);
            border-bottom-left-radius: var(--button-group-radius);
        }

        &:last-child {
            border-right: var(--button-group-outborder) solid var(--button-group-border-color);
            border-top-right-radius: var(--button-group-radius);
            border-bottom-right-radius: var(--button-group-radius);
        }

        &:before {
            border: 0;
        }
    }
}
</style>
