export const routerConfing: Array<any> = [
    {
        path: '/home',
        meta: { title: '首页', icon: 'el Compass' },
        children: [
            { path: '/dashboard', meta: { title: '控制台', icon: 'el Odometer' } },
        ]
    },
    {
        path: '/components',
        meta: { title: '组件', icon: 'el Grid' },
        children: [
            {
                path: '/components/index', meta: { title: '基础组件', icon: 'el Aim' },
                children: [
                    { path: '/components/icon', meta: { title: '字体图标'} },
                    { path: '/components/form', meta: { title: '表单组件'} },
                    { path: '/components/table', meta: { title: '表格组件'} },
                    { path: '/components/search', meta: { title: '模糊检索'} },
                ]
            },
            {
                path: '/other', meta: { title: '高级组件', icon: 'el Discount' },
                children: [
                    { path: '/other/audio', meta: { title: '语音合成'} },
                ]
            },
        ]
    },
    {
        path: '/setting',
        meta: { title: '设置', icon: 'el Setting' },
    },
    {
        path: 'https://www.baidu.com',
        meta: { title: '百度', icon: 'el Link' },
    },

    // {
    //     path:'/ceshi',
    //     meta:{title:'测试页面',icon:'Operation'},
    // }
];





