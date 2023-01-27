<script
    lang="ts"
    setup
>
import Taro from '@tarojs/taro';
import { computed } from 'vue';
import AppPage from '@/components/lib/app-page/index.vue';
import { tabBar } from '@/config/tabBar';
import { switchAny } from '@/utils/RouterNext';

const props = withDefaults(defineProps<{
    className?: string
    current?: number
}>(), {
    current: 0,
});

Taro.hideTabBar({
    animation: false,
});

const color = computed(() => tabBar.color);
const selectedColor = computed(() => tabBar.selectedColor);

const onClick = (index) => {
    if (props.current !== index)
        switchAny(tabBar.list[index].pagePath);
};
</script>

<script lang="ts">
export default { name: 'AppTabPage' };
</script>

<template>
    <AppPage
        :safe-bottom="false"
        class="app-tab-page"
    >
        <view
            :class="className"
            class="tab-page-slot"
        >
            <slot />
        </view>
        <view class="tab-page-tabbar">
            <view class="tabbar-wrapper">
                <view
                    v-for="(item, index) in tabBar.list"
                    :key="item"
                    :class="{
                        activated: current === index,
                    }"
                    class="tab-page-tabbar-item"
                    @click="onClick(index)"
                >
                    <view class="tab-bar-icon">
                        <image
                            :src="current === index ? item.selectedIconPath : item.iconPath"
                            mode="widthFix"
                            style="width: 100%; height: 100%"
                        />
                    </view>

                    <text>{{ item.text }}</text>
                </view>
            </view>
            <view class="safe-area-bottom" />
        </view>
    </AppPage>
</template>

<style lang="scss">
.app-tab-page {
    height: 100%;
    display: flex;
    flex-direction: column;

    .tab-page-slot {
        flex: 1;
        height: 0;
        overflow: scroll;
    }

    .tab-page-tabbar {
        background-color: #fff;
        border-top: 1px solid #eee;
        font-size: 28px;
    }

    .tabbar-wrapper {
        height: 115px;
        display: flex;
    }

    .tab-page-tabbar-item {
        flex: 1;
        color: v-bind(color);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &.activated {
            color: v-bind(selectedColor);
        }

    }

    .tab-bar-icon {
        width: 55px;
        height: 55px;
        //height: 70px !important;
    }
}
</style>
