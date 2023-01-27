<script
    lang="ts"
    setup
>
import { computed, ref } from 'vue';
import { useVModel } from '@/hooks/use-lib';

const props = withDefaults(defineProps<{
    modelValue: string
    clearAble?: boolean
    disabled?: boolean
    align?: 'right' | 'center' | 'left'
    round?: boolean
    placeholder?: string
    focus?: boolean
}>(), {
    disabled: false,
    clearAble: true,
    align: 'left',
    round: true,
    placeholder: '请输入搜索关键词',
    focus: false,
});

const emits = defineEmits(['update:modelValue', 'update:focus', 'search', 'clear']);

const content = useVModel(props, 'modelValue', emits);
const vFocus = useVModel(props, 'focus', emits);

const isSearch = ref(props.focus.valueOf());

// 右侧的图标当前是否显示
const rightIconIsShow = computed(() => props.clearAble && !props.disabled && props.modelValue?.length > 0);

const onClear = () => {
    content.value = '';
    emits('clear');
};
</script>

<script lang="ts">
export default { name: 'AppSearchBar' };
</script>

<template>
    <view class="app-search-bar">
        <view
            :class="[round ? 'round' : '']"
            class="app-search-bar-content"
        >
            <view class="app-search-bar-left-icon iconfont icon-sousuo" />
            <input
                v-model="content"
                :class="[
                    disabled ? 'disabled' : '',
                    align,
                    !rightIconIsShow ? 'self-padding' : '',
                ]"
                :disabled="disabled"
                :focus="isSearch"
                :placeholder="placeholder"
                class="app-search-bar-input"
                confirmType="search"
                @blur="vFocus = false"
                @confirm="emits('search', content)"
                @focus="vFocus = true"
            >
            <template v-if="clearAble && !disabled">
                <view
                    v-show="modelValue?.length > 0"
                    class="app-search-bar-right-icon iconfont icon-clear1"
                    @click="onClear"
                />
            </template>
        </view>
        <button
            v-show="modelValue?.length > 0"
            class="app-search-bar-button"
            @click="emits('search', content)"
        >
            搜索
        </button>
    </view>
</template>

<style lang="scss">
$right-padding: var(--app-search-content-padding, 30px);
$horizontal-padding: var(--app-search-content-padding, 30px);
$content-height: var(--app-search-bar-height, 70px);

.app-search-bar {
    padding: var(--app-search-bar-padding1, 20px) var(--app-search-bar-padding2, var(--space-normal));
    display: flex;

    .iconfont {
        color: #aaa;
        height: $content-height;
        line-height: $content-height;
    }

    &-right-icon {
        padding-right: $horizontal-padding;
    }

    &-content {
        flex: 1;
        background-color: #eee;
        display: flex;
        align-items: center;
        border-radius: 5px;
        height: $content-height;
        padding: 0 0 0 $horizontal-padding;

        &.round {
            border-radius: 999px;
        }

        .icon-clear1 {
            font-size: 1.2em;
        }

    }

    &-input {
        display: block;
        flex: 1;
        padding: 0 10px;

        &.disabled {
            color: #aaa;
        }

        &.left {
            text-align: left;
        }

        &.center {
            text-align: center;
        }

        &.right {
            text-align: right;
        }

        &.self-padding {
            padding-right: $horizontal-padding;
        }
    }

    &-button {
        display: block;
        width: max-content;
        padding-left: 20px;
        padding-right: 20px;
        height: $content-height;
        background-color: transparent;
        color: var(--app-search-bar-button-color, var(--main-color));
        font-size: 1em;
        @include flex-center;

        &:after {
            border: 0;
        }
    }
}
</style>
