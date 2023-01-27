<script
    lang="ts"
    setup
>
import { useReady } from '@tarojs/taro';
import { reactive, useCssModule } from 'vue';
import { useDragArea } from '@/components/lib/app-drag/hooks';
import { getNodeInfo } from '@/utils/PlatformTools';

const props = withDefaults(defineProps<{
    tag: string | Symbol
    top?: number
    left?: number
}>(), {
    top: 0,
    left: 0,
});

const s = useCssModule('s');
const env = process.env.TARO_ENV;

// 容器信息
const {
    dragAreaInfo,
    refresh,
} = useDragArea(props.tag);

const selfState = reactive({
    x: props.left,
    y: props.top,
});

// 自身信息
const selfOffset = {
    width: 0,
    height: 0,
    offsetX: selfState.x,
    offsetY: selfState.y,
};

// 鼠标偏移量
const mouseOffset = {
    offsetX: 0,
    offsetY: 0,
};

// 相对于页面的最大位置信息
const minTop = () => 0;
const minLeft = () => 0;
const maxTop = () => dragAreaInfo ? dragAreaInfo.height - selfOffset.height : 0;
const maxLeft = () => dragAreaInfo ? dragAreaInfo.width - selfOffset.width : 0;

const querySelf = async () => {
    const {
        width,
        height,
    } = await getNodeInfo(`.${s['app-drag']}`);

    Object.assign(selfOffset, {
        width,
        height,
    });
};

const onTouchStart = (event) => {
    refresh(); // 重新查询容器尺寸信息
    querySelf(); // 重新查询自身尺寸

    // 鼠标所在页面中的位置
    const [{
        pageX,
        pageY,
    }] = event.changedTouches;

    // 记录当前鼠标偏移信息
    mouseOffset.offsetX = pageX;
    mouseOffset.offsetY = pageY;

    selfOffset.offsetX = selfState.x;
    selfOffset.offsetY = selfState.y;
};

const handleMove = (event) => {
    const {
        pageX,
        pageY,
    } = event.changedTouches[0];

    // 计算鼠标偏移量，也就是drag需要移动的距离
    const targetOffsetY = pageY - mouseOffset.offsetY;
    const targetOffsetX = pageX - mouseOffset.offsetX;

    // 计算目标top和left
    let targetTop = selfOffset.offsetY + targetOffsetY;
    let targetLeft = selfOffset.offsetX + targetOffsetX;

    // 控制在可移动范围内，超过则取最值，否则取本身
    targetTop = Math.max(Math.min(targetTop, maxTop()), minTop());
    targetLeft = Math.max(Math.min(targetLeft, maxLeft()), minLeft());

    selfState.y = targetTop;
    selfState.x = targetLeft;
};

if (env === 'h5')
    useReady(querySelf);
</script>

<script lang="ts">
export default { name: 'AppDrag' };
</script>

<template>
    <view
        v-if="env === 'h5'"
        :catch-move="true"
        :class="s['app-drag']"
        :style="{
            transform: `translate3d(${selfState.x}px, ${selfState.y}px, 0)`,
        }"
        @touchstart="onTouchStart"
        @touchmove.prevent.stop="handleMove"
    >
        <slot />
    </view>
    <movable-view
        v-else
        :class="s['app-drag']"
        :x="left"
        :y="top"
        direction="all"
    >
        <slot />
    </movable-view>
</template>

<style module="s">
.app-drag {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 985;
}
</style>
