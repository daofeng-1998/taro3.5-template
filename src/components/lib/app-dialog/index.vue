<script
    lang="ts"
    setup
>
import v from '@/assets/styles/variable.module.scss';
import { useVModel } from '@/hooks/use-lib';

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: '',
    },
    titleColor: {
        type: String,
        default: '#333',
    },
    content: {
        type: String,
        default: '',
    },
    contentType: {
        type: String,
        default: 'TEXT',
    },
    contentColor: {
        type: String,
        default: '#666',
    },
    showCancel: {
        type: Boolean,
        default: false,
    },
    cancelText: {
        type: String,
        default: '取消',
    },
    cancelColor: {
        type: String,
        default: '#333',
    },
    confirmText: {
        type: String,
        default: '确定',
    },
    disableCancel: {
        type: Boolean,
        default: false,
    },
    disableConfirm: {
        type: Boolean,
        default: false,
    },
    confirmColor: {
        type: String,
        default: v.mainColor,
    },
});

const emit = defineEmits(['cancel', 'confirm', 'update:show']);

const vShow = useVModel(props, 'show', emit);

const onCancel = () => emit('cancel');
const onConfirm = () => emit('confirm');
</script>

<script lang="ts">
export default { name: 'AppDialog' };
</script>

<template>
    <nut-overlay
        v-model:visible="vShow"
        :class="s['app-dialog__overlay']"
        :close-on-click-overlay="false"
        :duration="0"
    >
        <div :class="s['app-dialog']">
            <div
                :class="s['app-dialog__title']"
                :style="{ color: titleColor }"
            >
                {{ title }}
            </div>

            <!-- 普通文本内容 -->
            <div

                :class="s['app-dialog__content']"
                :style="{ color: contentColor }"
            >
                <template v-if="contentType === 'TEXT'">
                    {{ content }}
                </template>
                <div
                    v-else-if="contentType === 'HTML'"
                    v-html="content"
                />
                <slot v-else />
            </div>

            <div
                :class="[s['app-dialog__buttons']]"
                class="hairline--top"
            >
                <div
                    v-if="showCancel"
                    :class="[s['button-wrapper']]"
                    class="hairline--right"
                >
                    <nut-button
                        :class="[s.button, s.button_cancel]"
                        :disabled="disableCancel"
                        :style="{ color: cancelColor }"
                        block
                        @click.stop="onCancel"
                    >
                        {{ cancelText }}
                    </nut-button>
                </div>

                <div :class="s['button-wrapper']">
                    <nut-button
                        :class="[s.button, s.button_confirm]"
                        :disabled="disableConfirm"
                        :style="{ color: confirmColor }"
                        block
                        @click.stop="onConfirm"
                    >
                        {{ confirmText }}
                    </nut-button>
                </div>
            </div>
        </div>
    </nut-overlay>
</template>

<style
    lang="scss"
    module="s"
>
.app {
    &-dialog {
        background-color: #fff;
        width: 85%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: var(--space-small);
        overflow: hidden;

        &__overlay {
            position: absolute;
        }

        &__title {
            font-weight: 700;
            text-align: center;
            padding: var(--space-normal) 0;
        }

        &__content {
            text-align: center;
            padding: 0 var(--space-normal) var(--space-large);
            max-height: 60vh;
            overflow-y: scroll;
        }

        & &__buttons {
            display: flex;

            .button-wrapper {
                flex: 1;

                .button {
                    $height: calc(var(--space-small) * 5);
                    border: 0;

                    //text-align: center;
                    line-height: $height;
                    height: $height;
                    background-color: #fff;
                    border-radius: 0;
                    display: block;
                    padding: 0;
                    position: relative;

                }
            }

        }
    }
}
</style>
