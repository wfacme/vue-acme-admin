import router from '~/router'
import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router'
import { routerConfing } from '~/config/router';
import { generator } from '~/composables/routerUtils';
import { notFoundRouter } from '~/router/generator-routers';


/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles: String[], route: RouteRecordRaw) {
    if (route.meta && route.meta.roles) {
        // return roles.some(role => route.meta?.roles.includes(role))
    } else {
        return true
    }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes: RouteRecordRaw[], roles: String[]): RouteRecordRaw[] {
    const authRouters: RouteRecordRaw[] = []
    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            authRouters.push(tmp)
        }
    })
    return authRouters
}

export const usePermissionStore = defineStore(
    'permission',
    {
        state: () => ({
            routers: [] as Array<RouteRecordRaw>,
        }),
        actions: {
            generateRoutes() {
                return new Promise((reslove, reject) => {
                    // filterAsyncRoutes()
                    //获取路由配置信息 在这里处理异步还是静态路由
                    let generatoreRouter:Array<RouteRecordRaw> = generator(routerConfing);
                    this.routers = generatoreRouter;
                    generatoreRouter.map((item:RouteRecordRaw)=>{
                        router.addRoute('root',item);
                    });
                    router.addRoute(notFoundRouter);
                    reslove(this.routers);
                });
            },


        }
    },
)
