<script
    lang="ts"
    setup
>
import type { ComputedRef } from 'vue';
import { computed, inject } from 'vue';
import Taro from '@tarojs/taro';

defineProps({
    label: String,
    value: String,
    valueColor: {
        type: String,
        default: '#000',
    },
});

const labelWidth
    = inject<ComputedRef<string>>('label-width')
    || computed(() => Taro.pxTransform(200));
</script>

<script lang="ts">
export default { name: 'AppPreviewItem' };
</script>

<template>
    <view class="app-preview-item">
        <view
            :style="{ width: labelWidth }"
            class="app-preview-item__label"
        >
            <view
                v-if="label"
                class="app-preview-item__label-text"
            >
                {{ label }}
            </view>
            <slot
                v-else
                name="label"
            />
        </view>

        <view
            :style="{ color: valueColor }"
            class="app-preview-item__content"
        >
            <template v-if="value">
                {{ value }}
            </template>
            <slot
                v-else
                name="content"
            />
        </view>
    </view>
</template>

<style lang="scss">
.app-preview-item {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    font-size: var(--preview-item-font-size);
    padding: var(--preview-item-padding) var(--space-small);

    &__label {
        color: var(--color-gray2);

    }

    &__content {
        text-align: right;
    }
}
</style>
