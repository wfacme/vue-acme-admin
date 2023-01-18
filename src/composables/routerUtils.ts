import router from '~/router';
import { isExternal } from '~/composables/validate';
import { routerTemps } from '~/router/generator-routers';
import type { RouteRecordRaw } from 'vue-router';

export const getRouterTemp = (router: RouteRecordRaw): RouteRecordRaw => {
    return routerTemps.find(item => item.path == router?.path) || ({} as RouteRecordRaw);
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routers
 * @param parent
 * @returns {*}
 */
export const generator = (routers: Array<RouteRecordRaw>): Array<RouteRecordRaw> => {
    return routers.map((item: RouteRecordRaw) => {
        const itemTmp: RouteRecordRaw = getRouterTemp(item);
        const currentRouter: RouteRecordRaw = Object.assign({}, item, itemTmp);
        // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
        if (!currentRouter.path.startsWith('http')) {
            currentRouter.path = currentRouter.path.replace('//', '/')
        }
        if (item.children && item.children.length > 0) {
            currentRouter.children = generator(item.children)
        }
        return currentRouter
    })
}

/**
 * 路由跳转
 * @param RouteRecordRaw item
 */
export const navigateTo = (item: RouteRecordRaw): void => {
    if (!item.children) {
        if (isExternal(item.path)) {
            window.open(item.path);
        } else {
            router.push({ path: item.path });
        }
    } else {

    }
}
