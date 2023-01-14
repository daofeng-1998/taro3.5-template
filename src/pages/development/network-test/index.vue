<script
    lang="ts"
    setup
>
import http from '@/api/lib/http';

const onTest = () => {
    http.post('/CRM/YoSoftCustomerService.asmx/getSaleSixSetList', {
        params: {
            name: '哈哈',
        },
        data: {
            bUse: 1,
        },
    }).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.log(err);
    });
};
</script>

<template>
    <view class="network-test">
        <button @click="onTest">
            发起请求
        </button>
    </view>
</template>

<style scoped>

</style>
