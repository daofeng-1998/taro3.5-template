import type { App } from 'vue';
import { createPinia } from 'pinia';
import piniaPersist from '@/store/plugins/persistent';

const pinia = createPinia();
pinia.use(piniaPersist);

export default {
    install(app: App) {
        app.use(pinia);
    },
};
