<script
    lang="ts"
    setup
>
import Taro from '@tarojs/taro';
import AppPage from '@/components/lib/app-page/index.vue';
import { useCountDown, useFormData } from '@/hooks/use-lib';
import { useLoading } from '@/components/lib/app-loading/hooks';
import { useDialog } from '@/components/lib/app-dialog/hooks';
import { useNotify } from '@/components/lib/app-notify/hooks';
import { navigateAny } from '@/utils/RouterNext';

definePageConfig({
    navigationBarTitleText: '首页',
});

const Loading = useLoading();
const dialog = useDialog();
const notify = useNotify();

const showLoading = () => {
    Loading.show();
    setTimeout(() => {
        Loading.hide();
    }, 3000);
};

const showDialog = () => {
    dialog.show({
        title: '哈哈',
        titleColor: 'red',
        content: '一是素材的积累。许多学生在写作的时候苦于没有素材，或者说来说去只是千篇一律的素材，毫无新意。',
        contentColor: 'skyblue',
        showCancel: true,
        cancelText: '不需要',
        cancelColor: 'red',
        confirmText: '谢谢',
        confirmColor: 'blue',
    }).then(() => {
        Taro.showToast({
            title: '点击了确认',
            icon: 'none',
        });
    }).catch(() => {
        Taro.showToast({
            title: '点击了取消',
            icon: 'none',
        });
    });
};

const onRichDialog = () => {
    dialog.show({
        title: '富文本展示',
        contentType: 'HTML',
        content: '<img mode="widthFix" style="width: 100%" src="https://www.baidu.com/img/pc_d421b05ca87d7884081659a6e6bdfaaa.png"/>'
            + '<video autoplay controls style="width: 100%"  src="https://vd2.bdstatic.com/mda-nj225vh0nfbdrr8g/sc/cae_h264/1664761364992520146/mda-nj225vh0nfbdrr8g.mp4"></video>',
        showCancel: true,
        cancelText: '谢谢',
        confirmText: '就不穿',
    });
};

const route = {
    onRouteJump() {
        navigateAny('/pages/development/route/index?code=123465789798', {
            data: {
                name: 'feng',
                age: 18,
                address: '的hi发客户看技术按时艰苦的贺卡上撒娇电话卡',
            },
        });
    },
};

const [formData, reset] = useFormData(() => ({
    username: '',
    password: '',
}));

const { action, isActive, count } = useCountDown();

const onSms = () => {
    action(10);
};

const onTestLog = () => {
    console.log('test log');
};
</script>

<script lang="ts">
export default { name: 'Home' };
</script>

<template>
    <AppPage>
        <nut-button @click="onTestLog">
            log测试
        </nut-button>
        <nut-input
            v-model="formData.password"
            :border="false"
            label="用户名"
            placeholder="请输入密码"
        />
        <nut-cell-group title="函数式组件">
            <nut-cell
                is-link
                title="对话框dialog"
                @click="showDialog"
            />
            <nut-cell
                is-link
                title="富文本loading"
                @click="onRichDialog"
            />
            <nut-cell
                is-link
                title="加载中loading"
                @click="showLoading"
            />
            <nut-cell
                is-link
                title="通知notify"
                @click="notify.info('通知消息')"
            />
        </nut-cell-group>

        <nut-cell-group title="路由">
            <nut-cell
                is-link
                title="带参数跳转"
                @click="route.onRouteJump"
            />
        </nut-cell-group>

        <nut-cell-group title="数据组件">
            <nut-cell
                is-link
                title="表单预览"
                @click="navigateAny('/pages/data/preview/index')"
            />
            <nut-cell
                is-link
                title="商品卡片"
                @click="navigateAny('/pages/development/test-app-goods-card/index')"
            />
        </nut-cell-group>

        <nut-cell-group title="工具测试">
            <nut-cell title="倒计时">
                <nut-button
                    :disabled="isActive"
                    size="small"
                    @click="onSms"
                >
                    {{ isActive ? `剩余${count}秒` : '获取验证码' }}
                </nut-button>
            </nut-cell>
        </nut-cell-group>

        <nut-cell-group title="store测试">
            <nut-cell
                is-link
                title="pinia"
                @click="navigateAny('/pages/development/store/index')"
            />
        </nut-cell-group>
        <view style="padding: 100px" />
    </AppPage>
</template>

<style lang="scss">

</style>
