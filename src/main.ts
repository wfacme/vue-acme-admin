import { App, createApp } from "vue";
import AppVue from "./App.vue";
import Router from '~/router';
import Pinia from '~/store'
import { Middleware } from '~/core/middleware';
import { loadRouters, registerIcons, authentication } from '~/core/middleware/bootstrap';
import 'uno.css'
import 'virtual:svg-icons-register'
import 'nprogress/nprogress.css';
import 'element-plus/theme-chalk/display.css'

const app = createApp(AppVue)
app.use(Pinia);
app.use(Router);
const middleware: Middleware = new Middleware([
    //加载路由
    // loadRouters,
    //图标注册
    registerIcons,
    //权限认证
    authentication
]);
middleware.send<App>(app);
middleware.then((passable: App) => {
    Router.isReady().then(() => {
        passable.mount('#app')
    })
});