import '@/components/lib/script/component-states';
import { createApp } from 'vue';
import './app.scss';
import dayjs from 'dayjs';
import nutui from '@/plugins/nutui';
import './polyfill';
import store from '@/store';
import { navigateAny, redirectAny, switchAny } from '@/utils/RouterNext';
import { dayJsFormat } from '@/plugins/dayjs';

const App = createApp({});

App
    .use(nutui)
    .use(store);

// dayjs插件扩展
dayjs.extend(dayJsFormat);

// 挂载全局方法
Object.assign(App.config.globalProperties, {
    navigateAny,
    redirectAny,
    switchAny,
});

export default App;
