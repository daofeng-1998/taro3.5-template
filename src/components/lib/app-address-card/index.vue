<script
    lang="ts"
    setup
>
const props = withDefaults(defineProps<{
    name: string
    phone: string
    address: string
    showArrow?: boolean
}>(), {
    showArrow: true,
});
</script>

<script lang="ts">
export default { name: 'AppAddressCard' };
</script>

<template>
    <view class="app-address-card">
        <view class="app-address-card-info">
            <view style="display: flex;">
                <view class="app-address-card-name">
                    {{ name }}
                </view>
                <view class="app-address-card-phone">
                    {{ phone }}
                </view>
            </view>
            <view class="app-address-card-address">
                {{ address }}
            </view>
        </view>
        <text
            v-if="showArrow"
            class="iconfont icon-arrow-right"
        />
    </view>
</template>

<style lang="scss">
.app-address-card {
    @include flex-center-between;
    background-color: #fff;
    padding: var(--space-small);

    &-name {
        font-weight: 700;
        margin-right: var(--space-normal);
    }

    &-info {
        flex: 1;
    }

    &-address {
        font-size: .9em;
        padding-top: 8px;
        color: var(--color-gray4);
    }

    .iconfont {
        padding: 0 var(--space-small);
        font-size: 1.5em;
        color: var(--color-gray4);
    }
}
</style>
