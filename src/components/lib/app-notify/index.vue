<script
    lang="ts"
    setup
>
import './variable.scss';

withDefaults(defineProps<{
    visible?: boolean
    msg?: string
    type?: NotifyType
}>(), {
    visible: false,
    type: 'info',
});
</script>

<script lang="ts">
export default { name: 'AppNotify' };
</script>

<template>
    <view
        :class="[
            visible && 'visible',
            type,
        ]"
        class="app-notify-top"
    >
        <view
            id="body"
            class="app-notify-top-body"
        >
            <template v-if="msg">
                {{ msg }}
            </template>
            <slot v-else />
        </view>
    </view>
</template>

<style lang="scss">
.app-notify-top {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    background-color: var(--notify-info);
    color: #fff;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    transition: all .3s;
    transform: translateY(-100%);

    padding: var(--notify-padding-vertical) var(--notify-padding-horizontal);

    &.visible {
        transform: translateY(0);
    }

    &-body {
        text-align: center;
    }

    &.success {
        background-color: var(--notify-success);
    }

    &.danger {
        background-color: var(--notify-danger);
    }

    &.warning {
        background-color: var(--notify-warning);
    }
}
</style>
