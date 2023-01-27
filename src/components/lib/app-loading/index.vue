<script
    lang="ts"
    setup
>
import { ref } from 'vue';
import { useVModel } from '@/hooks/use-lib';

const props = defineProps({
    show: {
        type: Boolean,
        default: true,
    },
    msg: {
        type: String,
        default: null,
    },
});

const emit = defineEmits(['update:show']);

const vShow = useVModel(props, 'show', emit);
const vMsg = useVModel(props, 'msg', emit);
const visible = ref(vShow);
</script>

<script lang="ts">
export default { name: 'AppLoading' };
</script>

<template>
    <view
        v-show="visible"
        :class="vShow ? 'show' : 'hidden'"
        class="app-loading_overlay"
        @transitionend="visible = vShow"
    >
        <div class="app-loading">
            <div
                v-for="i in 5"
                :key="i"
                :class="`rect${i}`"
                class="app-loading-block"
            />
        </div>
    </view>
</template>

<style>
.app-loading_overlay {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .6);
    z-index: 999;
    transition: opacity .2s;
}

.app-loading_overlay.show {
    opacity: 1;
}

.app-loading_overlay.hidden {
    opacity: 0;
}

.app-loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 80px;
    text-align: center;
    font-size: 20px;
}

.app-loading > .app-loading-block {
    background-color: #fff;
    height: 100%;
    width: 12px;
    display: inline-block;

    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
    margin-left: 5px;
}

.app-loading .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
}

.app-loading .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
}

.app-loading .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
}

.app-loading .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
}

@-webkit-keyframes sk-stretchdelay {
    0%, 40%, 100% {
        -webkit-transform: scaleY(0.4)
    }
    20% {
        -webkit-transform: scaleY(1.0)
    }
}

@keyframes sk-stretchdelay {
    0%, 40%, 100% {
        transform: scaleY(0.4);
        -webkit-transform: scaleY(0.4);
    }
    20% {
        transform: scaleY(1.0);
        -webkit-transform: scaleY(1.0);
    }
}
</style>
