<script
    lang="ts"
    setup
>
import { computed } from 'vue';
import { isNumber, isString } from '@/utils/TypeTools/TypesTools';

const props = withDefaults(defineProps<{
    number?: number | string
    thousands?: boolean
    leftSymbol?: string
    size?: 'small' | 'normal' | 'big' | 'large'
    floatSmall?: boolean
}>(), {
    number: 0,
    size: 'normal',
    thousands: true,
    floatSmall: true,
});

const numberMap = {
    '0': '\uE900',
    '1': '\uE901',
    '2': '\uE902',
    '3': '\uE903',
    '4': '\uE904',
    '5': '\uE905',
    '6': '\uE906',
    '7': '\uE907',
    '8': '\uE908',
    '9': '\uE909',
    ',': '\uE90B',
    '，': '\uE90B',
    '.': '\uE90A',
};

const keys = Object.keys(numberMap);

// 插入千分位
const insertComma = (arr: string[]) => {
    return arr.reduce<string[]>((previousValue, currentValue, index) => {
        if (index > 0 && index % 3 === 0)
            previousValue.push(',');

        return previousValue.concat(currentValue);
    }, []);
};

const numbers = computed(() => {
    let intPart = '';
    let floatPart = '';

    if (isNumber(props.number) || isString(props.number)) {
        const numArr = props.number.toString().split('').filter(i => keys.includes(i));

        const dotIndex = numArr.indexOf('.');

        let intArr = dotIndex > 0 ? numArr.slice(0, dotIndex) : numArr;
        let floatArr = dotIndex > 0 ? numArr.slice(dotIndex + 1) : [];

        if (props.thousands) {
            intArr = insertComma(intArr.reverse()).reverse().map(i => numberMap[i]);
            floatArr = insertComma(floatArr).map(i => numberMap[i]);
        }

        intPart = intArr.join('');
        floatPart = floatArr.join('');
    }

    return {
        intPart,
        floatPart,
    };
});
</script>

<script lang="ts">
export default { name: 'AppNumber' };
</script>

<template>
    <view
        :class="size"
        class="app-number"
    >
        <text class="app-number-integer icon-number">
            {{ (leftSymbol || '') + numbers.intPart }}
        </text>

        <text
            v-if="numbers.floatPart.length > 0"
            :style="{
                fontSize: floatSmall ? '.7em' : '1em',
            }"
            class="app-number-float icon-number"
        >
            {{ numberMap['.'] + numbers.floatPart }}
        </text>
    </view>
</template>

<style lang="scss">
.app-number {
    display: inline;
    font-size: 34px;
    color: var(--app-number-color);
    letter-spacing: 6px;

    &.small {
        font-size: 30px;
    }

    &.big {
        font-size: 38px;
    }

    &.large {
        font-size: 42px;
    }

    .app-number-integer {
        display: inline;
    }

    .app-number-float {
        display: inline;
    }

}
</style>
