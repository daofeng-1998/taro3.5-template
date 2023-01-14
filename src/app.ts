import { createApp } from 'vue';
import './app.scss';
import nutui from '@/plugins/nutui';

// 导入自定义组件状态，需要优先导入
import '@/components/lib/script/component-states';
import store from '@/store';
import { navigateAny, redirectAny, switchAny } from '@/utils/RouterNext';

const App = createApp({
    onShow() {
    },
    // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

App
    .use(nutui)
    .use(store);

// 挂载全局方法
Object.assign(App.config.globalProperties, {
    navigateAny,
    redirectAny,
    switchAny,
});

export default App;
