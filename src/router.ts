import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// 路由
const routes: RouteRecordRaw[] = [
    // 根路径，默认跳转到pub页面
    {
        path: '/',
        redirect: '/pub',
    },
    // 登陆页面
    {
        path: '/login',
        name: 'Login',
        component: () => import('./views/Login.vue'),
        meta: {
            title: 'Login',
            hideMenu: true
        }
    },
    // 发布页面
    {
        path: '/pub',
        name: 'Pub',
        component: () => import('./views/PubStep.vue'),
        meta: {
            title: 'Code Publish',
        }
    },
    // 配置nacos地址页面
    {
        path: '/config/nacos',
        name: 'ConfigNacos',
        component: () => import('./views/ConfigNacos.vue'),
        meta: {
            title: 'Config Nacos',
        }
    },
    // 配置etcd地址页面
    {
        path: '/config/etcd',
        name: 'ConfigEtcd',
        component: () => import('./views/ConfigEtcd.vue'),
        meta: {
            title: 'Config Etcd',
        }
    },
    // 配置mysql地址页面
    {
        path: '/config/mysql',
        name: 'ConfigMysql',
        component: () => import('./views/ConfigMysql.vue'),
        meta: {
            title: 'Config Mysql',
        }
    },
    // 配置postgres地址页面
    {
        path: '/config/postgres',
        name: 'ConfigPostgres',
        component: () => import('./views/ConfigPostgres.vue'),
        meta: {
            title: 'Config Postgres',
        }
    },
    // 配置jenkins地址页面
    {
        path: '/config/jenkins',
        name: 'ConfigJenkins',
        component: () => import('./views/ConfigJenkins.vue'),
        meta: {
            title: 'Config Jenkins',
        }
    },
    // {
    //     path: '/log',
    //     name: 'Log',
    //     component: () => import('./views/Log.vue'),
    //     meta: {
    //         title: 'Log',
    //     }
    // },
    // 用户管理页面
    {
        path: '/user',
        name: 'User',
        component: () => import('./views/User.vue'),
        meta: {
            title: 'User',
        }
    },
];

// 创建路由
const router = createRouter({
    history: createWebHistory(),
    routes
});

// 修改页面的标题，如果没有登陆则重定向到登陆页面
router.beforeEach((to, _, next) => {
    const session = localStorage.getItem('session');
    if (to.meta.title) {
        document.title = to.meta.title as string;
    }
    if (to.matched.some(record => record.meta.requiresAuth) && !session) {
        next({ path: '/login', query: { redirect: to.fullPath } });
    }
    next();
});

// 使用路由
export default router;