<script
    lang="ts"
    setup
>
import type { CommonEventFunction } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { computed } from 'vue';
import { isNullOrUndefined, isString } from '@/utils/TypeTools/TypesTools';
import AppNumber from '@/components/lib/app-number/index.vue';

const props = withDefaults(defineProps<{
    imageSrc?: string | string[]
    imageMode?: keyof ImageMode
    imageWidth?: string
    imageHeight?: string
    goodsName?: string
    goodsDesc?: string
    nameLine?: number
    direction?: 'vertical' | 'horizontal'
    count?: number | string
    price?: number
    preview?: boolean
}>(), {
    imageMode: 'widthFix',
    imageWidth: '30%',
    imageHeight: '100%',
    direction: 'horizontal',
    nameLine: 2,
    preview: true,
});

const emit = defineEmits(['clickImage']);

// 缩略图，如果本身是一个字符串，则取本身，如果是数组，则取数组第一个成员
const thumb = computed<string>(() => {
    if (isString(props.imageSrc))
        return props.imageSrc as string;
    else if (Array.isArray(props.imageSrc) && props.imageSrc.length > 0)
        return props.imageSrc[0];
    else
        return '';
});

// 是否有缩略图
const hasImg = computed(() => {
    return thumb.value.length > 0;
});

// 预览图片
const handlePreview: CommonEventFunction = ($event) => {
    if (props.preview) {
        let imgArr: string[] = [];
        if (isString(props.imageSrc))
            imgArr.push(props.imageSrc);
        else if (Array.isArray(props.imageSrc))
            imgArr = props.imageSrc;

        Taro.previewImage({
            urls: imgArr,
        });

        $event.stopPropagation();
    } else {
        emit('clickImage', $event);
    }
};
</script>

<script lang="ts">
export default { name: 'AppGoodsCard' };
</script>

<template>
    <view class="app-goods-card">
        <view
            :class="direction"
            class="app-goods-card-wrapper"
        >
            <!-- 图片区域 -->
            <view
                v-if="hasImg"
                class="app-goods-card__img-area"
            >
                <view
                    :class="direction"
                    class="app-goods-card__img-wrapper"
                    @click="handlePreview"
                >
                    <image
                        :mode="imageMode"
                        :src="thumb"
                        :class="direction"
                        class="app-goods-card__img"
                    />
                </view>
            </view>

            <!-- 产品信息区 -->
            <view class="app-goods-card__body">
                <!-- 产品信息区域分为上下两个区域 -->
                <view class="app-goods-card__body-top">
                    <view class="app-goods-card__body-goods-name">
                        {{ goodsName }}
                    </view>
                    <view
                        v-if="isString(goodsDesc) && goodsDesc.length > 0"
                        class="app-goods-card__body-goods-desc"
                    >
                        {{ goodsDesc }}
                    </view>
                    <slot
                        v-else
                        name="desc"
                    />
                </view>
                <view class="app-goods-card__body-bottom">
                    <slot name="bottom" />
                    <view class="app-goods-card__body-count">
                        <view class="app-goods-card__body-price">
                            <!-- <nut-price -->
                            <!--    v-if="!isNullOrUndefined(price)" -->
                            <!--    :price="price" -->
                            <!--    size="normal" -->
                            <!-- /> -->
                            <AppNumber
                                v-if="!isNullOrUndefined(price)"
                                :number="Number(price).toFixed(2)"
                                left-symbol="￥"
                                size="small"
                            />
                            <slot
                                v-else
                                name="price"
                            />
                        </view>
                        <view class="app-goods-card__body-count">
                            <template v-if="count">
                                <text class="app-goods-card__body-count-text">
                                    x{{ count }}
                                </text>
                            </template>
                            <slot
                                v-else
                                name="count"
                            />
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <slot name="footer" />
    </view>
</template>

<style lang="scss">
.app-goods-card {
    background-color: #fff;
    padding: var(--padding-2);
    box-sizing: border-box;

    .taro-img__mode-aspectfit {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    &-wrapper {

        box-sizing: border-box;
        display: flex;

        &.vertical {
            flex-direction: column;

            .app-goods-card__body {
                padding-left: 0;
                padding-top: var(--padding-2);
                width: v-bind(imageWidth);
            }
        }
    }

    &__img {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;

        &.horizontal {
            /* 横向模式下必须设置 否则会被taro覆盖 */
            height: 100% !important;
        }

        &.vertical {
            position: unset;
        }

        &-area {
            align-self: flex-start;
            width: v-bind(imageWidth);
            overflow: hidden;
            border-radius: var(--border-radius-2);
        }

        &-wrapper {
            height: 0;
            padding-bottom: v-bind(imageHeight);
            position: relative;

            &.vertical {
                height: v-bind(imageHeight) !important;
                padding-bottom: unset;
            }
        }
    }

    &__body {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: var(--padding-2);

        &-goods-name {
            @include multi-ellipsis(v-bind(nameLine));
        }

        &-goods-desc {
            font-size: .8em;
            color: var(--color-gray2);
        }

        &-count {
            display: flex;
            justify-content: space-between;

            &-text {
                color: var(--color-gray3);
                font-size: 26px;
            }
        }
    }
}
</style>
