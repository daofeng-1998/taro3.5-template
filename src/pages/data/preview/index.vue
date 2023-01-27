<script
    lang="ts"
    setup
>
import AppPreview from '@/components/lib/app-preview/index.vue';
import AppPreviewItem from '@/components/lib/app-preview-item/index.vue';

definePageConfig({
    navigationBarTitleText: '表单预览',
});
</script>

<script lang="ts">
export default { name: 'Preview' };
</script>

<template>
    <nut-cell-group title="普通用法">
        <AppPreview
            content="$29.9"
            label="订单详情"
        >
            <AppPreviewItem
                label="订单号"
                value="18616848686"
            />
            <AppPreviewItem
                label="订单号"
                value="18616848686"
            />
            <AppPreviewItem
                label="订单号"
                value="18616848686"
            />
            <AppPreviewItem
                value-color="red"
                label="订单号"
                value="18616848686"
            />
        </AppPreview>
    </nut-cell-group>
    <nut-cell-group title="底部插槽">
        <AppPreview label="详细信息">
            <AppPreviewItem
                label="账号"
                value="181684616"
            />
            <AppPreviewItem label="账号状态">
                <template #content>
                    <switch :checked="true" />
                </template>
            </AppPreviewItem>
            <AppPreviewItem
                label="姓名"
                value="张三"
            />
            <AppPreviewItem
                label="联系电话"
                value="189****1564"
            />
            <AppPreviewItem
                label="性别"
                value="男"
            />
            <AppPreviewItem
                label="家庭住址"
                value="广东省广州市白云区嘉禾街道鹏上新村中南街8巷9横10号"
            />

            <template #footer>
                <view class="slot-footer-wrapper">
                    <button
                        class="a-button"
                    >
                        修改
                    </button>
                    <button
                        class="a-button"
                        type="warn"
                    >
                        删除
                    </button>
                </view>
            </template>
        </AppPreview>
    </nut-cell-group>
</template>

<style lang="scss">
.slot-footer-wrapper {
    display: flex;

    .a-button {
        display: block;
        margin: 0;
        flex: 1;
    }
}
</style>
