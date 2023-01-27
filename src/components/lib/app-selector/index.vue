<script
    lang="ts"
    setup
>
import { reactive } from 'vue';
import AppSearchBar from '@/components/lib/app-search-bar/index.vue';
import { useVModel } from '@/hooks/use-lib';

const props = withDefaults(defineProps<{
    visible?: boolean
    list: any[]
    itemKey: string
    itemText: string
    itemSubText?: string
    multiple?: boolean
}>(), {
    visible: false,
    multiple: true,
});

const emits = defineEmits(['update:visible', 'confirm', 'search', 'scrollToLower']);

const vVisible = useVModel(props, 'visible', emits);

const state = reactive({
    searchText: '',
    showList: props.list,
    selectedIndex: {},
});

const onSelect = (index) => {
    if (!props.multiple)
        state.selectedIndex = {};

    if (state.selectedIndex[index])
        state.selectedIndex[index].checked = !state.selectedIndex[index].checked;
    else
        state.selectedIndex[index] = { checked: true };
};

const onConfirm = () => {
    const arr: any[] = [];
    Object.keys(state.selectedIndex).sort().forEach((item) => {
        arr.push(props.list[item]);
    });
    emits('confirm', arr);
};

const onSearch = (keyword: string) => {
    state.selectedIndex = {};
    emits('search', keyword);
};

const onClear = () => {
    state.selectedIndex = {};
    // state.showList = props.list;
    emits('search', '');
};

const onScrollToLower = () => {
    emits('scrollToLower');
};
</script>

<script lang="ts">
export default { name: 'AppSelector' };
</script>

<template>
    <nut-popup
        v-model:visible="vVisible"
        class="app-selector"
        closeable
        position="bottom"
        round
    >
        <view class="app-selector-content-wrapper">
            <view class="app-selector-title">
                请选择
            </view>
            <AppSearchBar
                v-model="state.searchText"
                :disabled="false"
                :round="true"
                align="center"
                @clear="onClear"
                @search="onSearch"
            />
            <scroll-view
                :scroll-y="true"
                class="app-selector-content"
                @scrolltolower="onScrollToLower"
            >
                <nut-cell-group>
                    <nut-cell
                        v-for="(item, index) in state.showList"
                        :key="item[itemKey]"
                        :sub-title="itemSubText && item[itemSubText]"
                        :title="item[itemText]"
                        is-link
                        @click="onSelect(index)"
                    >
                        <template #link>
                            <nut-checkbox
                                :model-value="state.selectedIndex[index]?.checked"
                                icon-size="20"
                            />
                        </template>
                    </nut-cell>
                </nut-cell-group>
            </scroll-view>
            <nut-button
                block
                type="primary"
                @click="onConfirm"
            >
                确 定
            </nut-button>
        </view>
    </nut-popup>
</template>

<style lang="scss">
.app-selector {
    .nut-overlay {
        position: absolute;
    }

    .nutui-popup__content-wrapper {
        height: 60vh;
        width: 100%;
    }

    .nut-popup {
        position: absolute;
    }

    .nut-button {
        width: calc(100% - 2 * var(--space-normal));
        margin: 0 auto;
    }

    &-search {
        background-color: #eee;
        border-radius: 999px;
        padding: 10px;
    }

    &-title {
        text-align: center;
        font-size: 1.2em;
        padding: 14px 0;
    }

    &-content {
        flex: 1;
        height: 0;
        overflow: hidden;

        &-wrapper {
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            padding: var(--space-normal) 0;

            display: flex;
            flex-direction: column;
        }

    }
}
</style>
