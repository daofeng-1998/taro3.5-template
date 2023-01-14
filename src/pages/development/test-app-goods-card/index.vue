<script
    lang="ts"
    setup
>
import { ref } from 'vue';
import { useDialog } from '@/components/lib/app-dialog/hooks';
import AppGoodsCard from '@/components/lib/app-goods-card/index.vue';

const dialog = useDialog();
const goodsCount = ref(1);
</script>

<template>
    <AppGoodsCard
        :image-src="require('@/assets/images/god.jpg')"
        :name-line="2"
        :price="8.12"
        direction="horizontal"
        goods-name="大闸蟹大闸蟹大闸蟹大闸蟹大闸蟹"
        image-mode="aspectFill"
        image-width="25%"
        @click-image="dialog.showContent('点击了图片')"
    >
        <template #bottom>
            sadasdas
        </template>
        <template #count>
            <nut-inputnumber
                v-model="goodsCount"
                button-size="30"
                input-width="50rpx"
            />
        </template>
        <template #footer>
            订单号：165464646
        </template>
    </AppGoodsCard>
    <div
        class="test-app-goods-card-vertical"
    >
        <view
            v-for="y in 2"
            :key="y"
            class="falls-column"
        >
            <view
                v-for="i in 6"
                :key="i"
                class="wrapper"
            >
                <AppGoodsCard
                    :image-src="require(`@/assets/images/${(y + i) % 2 === 0 ? 'new01.png' : 'god.jpg'}`)"
                    :name-line="2"
                    direction="vertical"
                    goods-name="无限狗头"
                    image-mode="widthFix"
                    image-width="100%"
                    @click-image="dialog.showContent('点击了图片')"
                />
                <view class="goods-card-footer">
                    <nut-price
                        price="300"
                        size="normal"
                    />
                    <view>立即试用</view>
                </view>
            </view>
        </view>
    </div>
</template>

<style lang="scss">
.test-app-goods-card-vertical {
    $gap: 20px;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: $gap;
    padding: $gap;

    .wrapper {
        border-radius: var(--space-small);
        overflow: hidden;
        margin-bottom: $gap;
    }

    .goods-card-footer {
        color: #fff;
        background-color: #ff5d58;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 26px;
        padding: var(--padding-1) var(--padding-2);

        .nut-price {
            color: #fff;
            display: flex;
        }
    }
}
</style>
