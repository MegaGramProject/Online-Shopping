import { createPinia } from 'pinia';
import { createApp } from 'vue';

import NotFoundPage from './views/NotFoundPage.vue';
import ShoppingCartPage from './views/ShoppingCartPage.vue';
import CheckoutPage from './views/CheckoutPage.vue';
import router from './router';

let currentURL = window.location.href;
currentURL = currentURL.substring(currentURL.indexOf("8033/")+5);

if(currentURL == ("onlineShoppingCart") ||
(currentURL.startsWith("onlineShoppingCart/") && currentURL.substring(19).indexOf("/")==-1)) {
    const scp = createApp(ShoppingCartPage);
    scp.use(createPinia());
    scp.use(router);
    scp.mount('#main');
}

else if(currentURL == ("checkout") ||
(currentURL.startsWith("checkout/") && currentURL.substring(9).indexOf("/")==-1)) {
    const cp = createApp(CheckoutPage);
    cp.use(createPinia());
    cp.use(router);
    cp.mount('#main');
}

else {
    const nf = createApp(NotFoundPage);
    nf.use(createPinia());
    nf.use(router);
    nf.mount('#main');
}