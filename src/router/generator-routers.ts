import { RouteRecordRaw } from 'vue-router';

export const routerTemps = [
    {
        path: '/dashboard',
        component: () => import("~/pages/dashboard/index.vue")
    },
    {
        path: '/components/form',
        component: () => import("~/pages/components/form.vue")
    },
    {
        path: '/components/icon',
        component: () => import("~/pages/components/icon.vue")
    },
    {
        path: '/components/search',
        component: () => import("~/pages/components/search.vue")
    },
    {
        path: '/components/table',
        component: () => import("~/pages/components/table.vue")
    },
    {
        path: '/setting',
        component: () => import("~/pages/ceshi.vue")
    },
];

export const constantRouter: Array<RouteRecordRaw> = [
    {
        path: '/login',
        meta: { title: '登录页面' },
        component: () => import("~/pages/auth/login.vue")
    },
    // {
    //     path: "/:pathMatch(.*)*",
    //     name: "notFound",
    //     redirect: '/404'
    // },
    {
        name: '404',
        path: '/404',
        component: () => import("~/pages/throws/404.vue")
    },
    {
        path: '',
        name: 'root',
        redirect: '/dashboard',
        component: () => import("~/layouts/index.vue"),
        children: []
    }
]

/**
 * notFoundRouter(找不到路由)
 */
export const notFoundRouter = {
    path: "/:pathMatch(.*)*",
    // name: "notFound",
    redirect: { name: "404" }
};

