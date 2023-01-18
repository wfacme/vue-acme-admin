import type { App } from "vue";
import router from '~/router';
import NProgress from '~/config/nprogress'
import { ElNotification } from 'element-plus'
import { useUserStore } from '~/store/modules/user';
import { setDocumentTitle } from '~/composables/utils';
import { usePermissionStore } from '~/store/modules/permission';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


/**
 * 图标注册
 * @param passable 
 * @param next 
 * @returns 
 */
export const registerIcons = (passable: App, next: Function) => {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        passable.component(key, component);
    }
    return next(passable);
}

export const loadRouters = async (passable: App, next: Function) => {
    const permissionStore = usePermissionStore();
    await permissionStore.generateRoutes();
    return next(passable);
}

export const authentication = (passable: App, next: Function) => {
    const LOGIN_URL = '/login';
    router.beforeEach(async (to, from, next) => {
        NProgress.start();
        const userStore = useUserStore();
        const permissionStore = usePermissionStore();
        //设置页面标题
        setDocumentTitle(`${to.meta?.title}`);
        //验证是否登录
        if (userStore.isLogin) {
            if (to.path === LOGIN_URL) {
                next({ path: '/', replace: true });
            } else {
                if (!permissionStore.routers.length) {
                    await permissionStore.generateRoutes();
                    next({ ...to, replace: true })
                } else {
                    next();
                }
            }
        } else {
            if (to.path !== LOGIN_URL) {
                ElNotification({ type: 'error', message: '请先登录！', duration: 300 });
                next({ path: LOGIN_URL });
            } else {
                next();
            }
        }
    });

    router.afterEach(() => {
        NProgress.done();
    });

    /**
     * @description 路由跳转错误
     * */
    router.onError(error => {
        NProgress.done();
        console.warn("路由错误", error.message);
    });
    return next(passable);
}