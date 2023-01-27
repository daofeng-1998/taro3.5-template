<script
    lang="ts"
    setup
>
import { useReady } from '@tarojs/taro';
import { onUpdated, provide, reactive, useCssModule } from 'vue';
import { getNodeInfo } from '@/utils/PlatformTools';
import { debounce } from '@/utils/TypeTools/FunctionTools';

const props = defineProps<{
    tag: string | Symbol
}>();

const env = process.env.TARO_ENV;

const s = useCssModule('s');

const dragAreaInfo = reactive({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
});

const queryInfo = async () => {
    const {
        top,
        left,
        width,
        height,
    } = await getNodeInfo(`.${s['app-drag-area']}`);

    Object.assign(dragAreaInfo, {
        top,
        left,
        width,
        height,
    });
};

provide(props.tag, {
    dragAreaInfo,
    refresh: queryInfo,
});

if (env === 'h5') {
    useReady(queryInfo);

    // @ts-ignore
    onUpdated(debounce(200, false, queryInfo));
}
</script>

<script lang="ts">
export default { name: 'AppDragArea' };
</script>

<template>
    <view
        v-if="env === 'h5'"
        :class="s['app-drag-area']"
    >
        <slot />
    </view>
    <movable-area v-else>
        <slot />
    </movable-area>
</template>

<style
    lang="scss"
    module="s"
>
.app-drag-area {
    position: relative;
}
</style>
