import HomePage from '@/pages/HomePage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';

import { createRouter, createWebHistory } from 'vue-router';
import { getMe } from '@/api/user.js';

const routes = [
    {
        name: 'home',
        path: '/',
        component: HomePage,
        meta: {
            layout: 'Default',
        },
    },
    {
        name: 'login',
        path: '/login',
        component: LoginPage,
        meta: {
            layout: 'Auth',
        },
    },
    {
        name: 'register',
        path: '/register',
        component: RegisterPage,
        meta: {
            layout: 'Auth',
            noAuth: true,
        },
    },
];

export function initRouter() {
    const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes,
    });

    /**
     * Перед каждым заходом на роут будем проверять, есть ли у нас сессия
     * Гвард нужен для того чтобы не допустить неавторизованног пользователя
     * на страницы которые требуют авторизации
     */
    router.beforeEach((to, from, next) => {
        getMe().then((user) => {
            if (to.name === 'login') {
                if (user) {
                    next('/');
                } else {
                    next();
                }

                return;
            }

            if (to.meta.noAuth) {
                next();
                return;
            }

            if (!user) {
                next('/login');
                return;
            }

            next();
        });
    });

    return router;
}
