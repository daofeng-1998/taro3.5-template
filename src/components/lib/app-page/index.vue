<script
    lang="ts"
    setup
>
import AppSafeBottom from '@/components/lib/app-safe-bottom.vue';
import AppLoading from '@/components/lib/app-loading/index.vue';
import AppDialog from '@/components/lib/app-dialog/index.vue';
import { useComponentState } from '@/components/lib/script/component-states';
import { SYMBOL_DIALOG, SYMBOL_LOADING, SYMBOL_NOTIFY } from '@/components/lib/script/Symbols';
import AppNotify from '@/components/lib/app-notify/index.vue';

withDefaults(defineProps<{
    safeBottom?: boolean
}>(), {
    safeBottom: true,
});

const loadingState = useComponentState<ILoadingState>(SYMBOL_LOADING);
const dialogState = useComponentState<IDialogSync>(SYMBOL_DIALOG);
const notifyState = useComponentState<INotifyState>(SYMBOL_NOTIFY);
</script>

<script lang="ts">
export default { name: 'AppPage' };
</script>

<!-- 页面包裹容器 -->
<template>
    <view class="app-page">
        <AppNotify
            :msg="notifyState.msg"
            :type="notifyState.type"
            :visible="notifyState.show"
        />
        <AppLoading
            v-if="loadingState.activated"
            :msg="loadingState.msg"
            :show="loadingState.show"
        />
        <AppDialog
            v-if="dialogState.activated"
            v-model:show="dialogState.show"

            :cancel-color="dialogState.cancelColor"
            :cancel-text="dialogState.cancelText"
            :confirm-color="dialogState.confirmColor"
            :confirm-text="dialogState.confirmText"

            :content="dialogState.content"
            :content-color="dialogState.contentColor"

            :content-type="dialogState.contentType"
            :disable-cancel="dialogState.disableCancel"

            :disable-confirm="dialogState.disableConfirm"
            :show-cancel="dialogState.showCancel"

            :title="dialogState.title"
            :title-color="dialogState.titleColor"

            @cancel="dialogState.onCancel"
            @confirm="dialogState.onConfirm"
        />
        <slot />
        <AppSafeBottom v-if="safeBottom" />
    </view>
</template>

<style lang="scss">
.app-page {
    box-sizing: border-box;
    overflow: scroll;
}

page > .app-page {
    height: 100vh;
}

.taro_page > .app-page {
    height: 100%;
}
</style>
