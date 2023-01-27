<script
    lang="ts"
    setup
>
import Taro from '@tarojs/taro';
import { computed, provide } from 'vue';

const props = defineProps({
    label: String,
    value: String,
    labelWidth: {
        type: String,
        default: Taro.pxTransform(200),
    },
});

provide('label-width', computed(() => props.labelWidth));
</script>

<script lang="ts">
export default { name: 'AppPreview' };
</script>

<template>
    <view class="app-preview">
        <div class="app-preview__head hairline--bottom">
            <div
                v-if="label || value"
                class="app-preview__head-wrapper"
            >
                <view
                    :style="{ width: labelWidth }"
                    class="app-preview__head-label"
                >
                    {{ label }}
                </view>
                <view class="app-preview__head-content">
                    {{ value }}
                </view>
            </div>
            <slot
                v-else
                name="head"
            />
        </div>
        <!-- 默认插槽 -->
        <div class="app-preview__body hairline--bottom">
            <slot />
        </div>

        <!-- 底部插槽 -->
        <div class="app-preview__footer">
            <slot name="footer" />
        </div>
    </view>
</template>

<style lang="scss">
.app-preview {
    background-color: #fff;

    &__head {
        display: flex;
        justify-content: space-between;
        font-size: var(--preview-head-font-size);

        &-wrapper {
            width: 100%;
            display: flex;
            padding: var(--space-normal) var(--space-small);
        }

        &-label {
            color: var(--color-gray2);
        }

        &-content {
            flex: 1;
            text-align: right;
        }
    }

    &__body {
        padding: var(--space-small) 0;
    }
}
</style>
