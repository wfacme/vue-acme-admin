import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { constantRouter } from './generator-routers';

const router = createRouter({
	strict: false,
    routes: constantRouter,
    history: createWebHashHistory(),
	scrollBehavior: () => ({ left: 0, top: 0 })
});

export default router;