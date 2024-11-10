import { createRouter, createWebHistory } from 'vue-router';
import NotFoundPage from './NotFoundPage.vue';
import ShoppingCartPage from './ShoppingCartPage.vue';

const router = createRouter({
    history: createWebHistory("/"),
    routes: [
        {
            path: '/onlineShoppingCart',
            name: 'ShoppingCartPage(WithoutUsername)',
            component: ShoppingCartPage
        },
        {
            path: '/onlineShoppingCart/:username',
            name: 'ShoppingCartPage',
            component: ShoppingCartPage
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFoundPage',
            component: NotFoundPage
        }
    ]
});

export default router
