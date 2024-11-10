import { createPinia } from 'pinia';
import { createApp } from 'vue';

import NotFoundPage from './NotFoundPage.vue';
import ShoppingCartPage from './ShoppingCartPage.vue';
import router from './router';

let currentURL = window.location.href;
currentURL = currentURL.substring(currentURL.indexOf("8033/")+5);

if(currentURL == ("onlineShoppingCart") ||
(currentURL.startsWith("onlineShoppingCart/") && currentURL.substring(41).indexOf("/")==-1)) {
    const app = createApp(ShoppingCartPage);
    app.use(createPinia());
    app.use(router);
    app.mount('#main');
}

else {
    const nf = createApp(NotFoundPage);
    nf.use(createPinia());
    nf.use(router);
    nf.mount('#main');
}