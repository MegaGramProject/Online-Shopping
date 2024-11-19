import { createRouter, createWebHistory } from 'vue-router';
import NotFoundPage from './views/NotFoundPage.vue';
import ShoppingCartPage from './views/ShoppingCartPage.vue';
import CheckoutPage from './views/CheckoutPage.vue';

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
            path: '/checkout',
            name: 'CheckoutPage(WithoutUsername)',
            component: CheckoutPage
        },
        {
            path: '/checkout/:username',
            name: 'CheckoutPage',
            component: CheckoutPage
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFoundPage',
            component: NotFoundPage
        }
    ]
});

export default router
