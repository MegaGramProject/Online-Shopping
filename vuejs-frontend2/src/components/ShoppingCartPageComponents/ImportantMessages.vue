<template>
    <div v-if="shoppingCartPriceDecreases.length>0 || shoppingCartPriceIncreases.length>0 || savedItemsPriceDecreases.length>0 ||
    savedItemsPriceIncreases.length>0 || unavailableProducts.length>0"
    :style="{borderStyle: 'solid', borderColor: 'orange', width: '75%', padding: '1em 1em', backgroundColor: 'white',
    display: 'flex', flexDirection: 'column', fontSize: '0.83em'}">

        <div :style="{display: 'flex', alignItems: 'center', gap: '0.4em', pointerEvents: 'none',
        marginBottom: '1.5em'}">
            <img :src="warningSign" :style="{height: '1.5em', width: '1.5em', objectFit:'contain'}">
            <b>Important messages about items in your Cart and Saved Items:</b>
        </div>

        <b v-if="shoppingCartPriceDecreases.length>0" :style="{marginLeft: '1.5em'}">
            {{shoppingCartPriceDecreases.length}} {{ shoppingCartPriceDecreases.length==1 ? 'item' : 'items'  }} in your Cart decreased in price.
        </b>
        <p v-if="shoppingCartPriceDecreases.length>0" :style="{marginLeft: '1.5em'}">
            Items in your Shopping Cart will always reflect the most recent price displayed on their product detail pages.
        </p>
        <ul :style="{marginLeft: '1em', marginTop: '-0.5em', marginBottom: '2em'}">
            <li v-for="(product, index) in shoppingCartPriceDecreases" :key="index">
                <a href="" :style="{color: '#429bcf'}">{{product.productName}}{{Object.keys(product.options).length>0 ? product.options : ""}}</a> has decreased from {{ product.prices[0] }} to {{ product.prices[1] }}
            </li>
        </ul>

        <b v-if="shoppingCartPriceIncreases.length>0" :style="{marginLeft: '1.5em'}">
            {{shoppingCartPriceIncreases.length}} {{ shoppingCartPriceIncreases.length==1 ? 'item' : 'items'  }} in your Cart increased in price.
        </b>
        <p v-if="shoppingCartPriceDecreases.length>0" :style="{marginLeft: '1.5em'}">
            Items in your Shopping Cart will always reflect the most recent price displayed on their product detail pages.
        </p>
        <ul :style="{marginLeft: '1em', marginTop: '-0.5em', marginBottom: '2em'}">
            <li v-for="(product, index) in shoppingCartPriceIncreases" :key="index">
                <a href="" :style="{color: '#429bcf'}">{{product.productName}}{{Object.keys(product.options).length>0 ? product.options : ""}}</a> has increased from {{ product.prices[0] }} to {{ product.prices[1] }}
            </li>
        </ul>

        <b v-if="savedItemsPriceDecreases.length>0" :style="{marginLeft: '1.5em'}">
            {{savedItemsPriceDecreases.length}} {{ savedItemsPriceDecreases.length==1 ? 'item' : 'items'  }} in your Saved Items decreased in price.
        </b>
        <p v-if="savedItemsPriceDecreases.length>0" :style="{marginLeft: '1.5em'}">
            Items in your Saved Items will always reflect the most recent price displayed on their product detail pages.
        </p>
        <ul :style="{marginLeft: '1em', marginTop: '-0.5em', marginBottom: '2em'}">
            <li v-for="(product, index) in savedItemsPriceDecreases" :key="index">
                <a href="" :style="{color: '#429bcf'}">{{product.productName}}{{Object.keys(product.options).length>0 ? product.options : ""}}</a> has decreased from {{ product.prices[0] }} to {{ product.prices[1] }}
            </li>
        </ul>

        <b v-if="savedItemsPriceIncreases.length>0" :style="{marginLeft: '1.5em'}">
            {{savedItemsPriceIncreases.length}} {{ savedItemsPriceIncreases.length==1 ? 'item' : 'items'  }} in your Saved Items increased in price.
        </b>
        <p v-if="savedItemsPriceIncreases.length>0" :style="{marginLeft: '1.5em'}">
            Items in your Saved Items will always reflect the most recent price displayed on their product detail pages.
        </p>
        <ul :style="{marginLeft: '1em', marginTop: '-0.5em', marginBottom: '2em'}">
            <li v-for="(product, index) in savedItemsPriceIncreases" :key="index">
                <a href="" :style="{color: '#429bcf'}">{{product.productName}}{{Object.keys(product.options).length>0 ? product.options : ""}}</a> has increased from {{ product.prices[0] }} to {{ product.prices[1] }}
            </li>
        </ul>

        <b v-if="unavailableProducts.length>0" :style="{marginLeft: '1.5em'}">
            {{unavailableProducts.length}} {{ unavailableProducts.length==1 ? 'item' : 'items'  }} in your Cart/Saved-Items aren't available.
        </b>
        <ul :style="{marginLeft: '1em', marginBottom: '2em'}">
            <li v-for="(product, index) in unavailableProducts" :key="index">
                <a href="" :style="{color: '#429bcf'}">{{product.productName}}{{Object.keys(product.options).length>0 ? product.options : ""}}</a> {{ product.status==='removed-from-seller' ? 'has been removed from the seller' : 'is out of stock' }}
            </li>
        </ul>

    </div>

</template>

<script>
import warningSign from '@/assets/images/warningSign.png';

    export default {
        props: {
            deliveryAreaCountry: String,
            authenticatedUsername: String
        },

        data() {
            return {
                warningSign,
                countryCurrencyMap: {
                    "the United States": "$", // USD - US Dollar
                    "Australia": "A$",     // AUD - Australian Dollar
                    "Canada": "C$",        // CAD - Canadian Dollar
                    "China": "CN¥",          // CNY - Chinese Yuan
                    "Germany": "€",        // EUR - Euro
                    "India": "₹",          // INR - Indian Rupee
                    "Japan": "¥",          // JPY - Japanese Yen
                    "Mexico": "MX$",         // MXN - Mexican Peso
                    "United Kingdom": "£"  // GBP - British Pound
                },
                currencyToDollarMap: {
                    "$": 1,            // USD - United States
                    "A$": 1.5063,        // AUD - Australian Dollar
                    "C$": 1.3855,        // CAD - Canadian Dollar
                    "¥": 151.88,       // JPY - Japanese Yen (for Japan)
                    "₹": 84.079,        // INR - Indian Rupee (for India)
                    "€": 0.9240,         // EUR - Euro (for Germany)
                    "CN¥": 7.1198,   // CNY - Chinese Yuan (for China)
                    "MX$": 19.86,      // MXN - Mexican Peso (for Mexico)
                    "£": 0.7709          // GBP - British Pound (for United Kingdom)
                },
                shoppingCartPriceDecreases: [],
                shoppingCartPriceIncreases: [],
                savedItemsPriceDecreases: [],
                savedItemsPriceIncreases: [],
                unavailableProducts: []
            }
        },

        methods: {
            updateCurrencies(currentCurrency, newCurrency) {
                for(let i=0; i<this.shoppingCartPriceDecreases.length; i++) {
                    let currItemPrice0 = this.shoppingCartPriceDecreases[i].prices[0];
                    currItemPrice0 = parseFloat(currItemPrice0.substring(currentCurrency.length));
                    currItemPrice0/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                    currItemPrice0*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                    currItemPrice0 = currItemPrice0.toFixed(2);

                    let currItemPrice1 = this.shoppingCartPriceDecreases[i].prices[1];
                    currItemPrice1 = parseFloat(currItemPrice1.substring(currentCurrency.length));
                    currItemPrice1/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                    currItemPrice1*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                    currItemPrice1 = currItemPrice1.toFixed(2);

                    this.shoppingCartPriceDecreases[i].prices = [newCurrency+currItemPrice0, newCurrency+currItemPrice1];
                }

                for(let i=0; i<this.shoppingCartPriceIncreases.length; i++) {
                    let currItemPrice0 = this.shoppingCartPriceIncreases[i].prices[0];
                    currItemPrice0 = parseFloat(currItemPrice0.substring(currentCurrency.length));
                    currItemPrice0/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                    currItemPrice0*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                    currItemPrice0 = currItemPrice0.toFixed(2);

                    let currItemPrice1 = this.shoppingCartPriceIncreases[i].prices[1];
                    currItemPrice1 = parseFloat(currItemPrice1.substring(currentCurrency.length));
                    currItemPrice1/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                    currItemPrice1*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                    currItemPrice1 = currItemPrice1.toFixed(2);

                    this.shoppingCartPriceIncreases[i].prices = [newCurrency+currItemPrice0, newCurrency+currItemPrice1];
                }

                for(let i=0; i<this.savedItemsPriceDecreases.length; i++) {
                    let currItemPrice0 = this.savedItemsPriceDecreases[i].prices[0];
                    currItemPrice0 = parseFloat(currItemPrice0.substring(currentCurrency.length));
                    currItemPrice0/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                    currItemPrice0*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                    currItemPrice0 = currItemPrice0.toFixed(2);

                    let currItemPrice1 = this.savedItemsPriceDecreases[i].prices[1];
                    currItemPrice1 = parseFloat(currItemPrice1.substring(currentCurrency.length));
                    currItemPrice1/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                    currItemPrice1*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                    currItemPrice1 = currItemPrice1.toFixed(2);

                    this.savedItemsPriceDecreases[i].prices = [newCurrency+currItemPrice0, newCurrency+currItemPrice1];
                }

                for(let i=0; i<this.savedItemsPriceIncreases.length; i++) {
                    let currItemPrice0 = this.savedItemsPriceIncreases[i].prices[0];
                    currItemPrice0 = parseFloat(currItemPrice0.substring(currentCurrency.length));
                    currItemPrice0/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                    currItemPrice0*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                    currItemPrice0 = currItemPrice0.toFixed(2);

                    let currItemPrice1 = this.savedItemsPriceIncreases[i].prices[1];
                    currItemPrice1 = parseFloat(currItemPrice1.substring(currentCurrency.length));
                    currItemPrice1/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                    currItemPrice1*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                    currItemPrice1 = currItemPrice1.toFixed(2);

                    this.savedItemsPriceIncreases[i].prices = [newCurrency+currItemPrice0, newCurrency+currItemPrice1];
                }
            },

            async fetchUpdatesToShoppingCartAndSavedItems() {
                const response = await fetch(`http://localhost:8034/getAllUpdatesOfCartsAndSavedItemsOfUser/${this.authenticatedUsername}`);
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                let updatesToCartAndSavedItems = await response.json();

                const shoppingCartPriceDecreases = [];
                const shoppingCartPriceIncreases = [];
                const savedItemsPriceDecreases = [];
                const savedItemsPriceIncreases = [];
                const unavailableProducts = [];

                for(let update of updatesToCartAndSavedItems) {
                    const newElem =  {
                        productId: update.productId,
                        productName: update.productName,
                        options: update.options,
                    };

                    if(update.prices.length==1) {
                        newElem.status = update.prices[0];
                        unavailableProducts.push(newElem);
                    }
                    else {
                        newElem.prices = ['$'+update.prices[0], '$'+update.prices[1]];
                        if(update.inCart==true) {
                            if(update.prices[1]>update.prices[0]) {
                                shoppingCartPriceIncreases.push(newElem);
                            }
                            else {
                                shoppingCartPriceDecreases.push(newElem);
                            }
                        }
                        else {
                            if(update.prices[1]>update.prices[0]) {
                                savedItemsPriceIncreases.push(newElem);
                            }
                            else {
                                savedItemsPriceDecreases.push(newElem);
                            }
                        }
                    }
                }

                this.shoppingCartPriceDecreases = [...shoppingCartPriceDecreases];
                this.shoppingCartPriceIncreases = [...shoppingCartPriceIncreases];
                this.savedItemsPriceDecreases = [...savedItemsPriceDecreases];
                this.savedItemsPriceIncreases = [...savedItemsPriceIncreases];
                this.unavailableProducts = [...unavailableProducts];

                if(this.updatesToCartAndSavedItems.length>0) {
                    setTimeout(this.listenForVisibilityChange, 2000);
                }
            },

            listenForVisibilityChange() {
                if (!document.hidden) {
                    this.deleteAllUpdatesToCartAndSavedItemsForUser();
                }
                else {
                    document.addEventListener('visibilitychange', this.handleVisibilityChange);
                }
            },

            async deleteAllUpdatesToCartAndSavedItemsForUser() {
                const response = await fetch(`http://localhost:8034/deleteAllUpdatesToCartAndSavedItemsForUser/${this.authenticatedUsername}`, {
                    method: 'DELETE'
                });
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
            },

            handleVisibilityChange() {
                if (!document.hidden) {
                    this.deleteAllUpdatesToCartAndSavedItemsForUser();
                    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
                }
            }
        },

        watch: {
            deliveryAreaCountry(newVal) {
                let currentCurrency = "";
                if(this.shoppingCartPriceDecreases.length>0) {
                    currentCurrency = this.shoppingCartPriceDecreases[0].prices[0][0];
                }
                else if(this.shoppingCartPriceIncreases.length>0) {
                    currentCurrency = this.shoppingCartPriceIncreases[0].prices[0][0];
                }
                else if(this.savedItemsPriceDecreases.length>0) {
                    currentCurrency = this.savedItemsPriceDecreases[0].prices[0][0];
                }
                else if(this.savedItemsPriceIncreases.length>0) {
                    currentCurrency = this.savedItemsPriceIncreases[0].prices[0][0];
                }
                if(currentCurrency.length==0) {
                    return;
                }
                if(currentCurrency==="A") {
                    currentCurrency+="$";
                }
                else if(currentCurrency==="M") {
                    currentCurrency+="X$";
                }
                else if(currentCurrency==="C") {
                    if(this.itemsToPairWithCart[0].price[1]==="$") {
                        currentCurrency="C$";
                    }
                    else {
                        currentCurrency="CN¥";
                    }
                }
                const newCurrency = this.countryCurrencyMap[newVal];
                if(currentCurrency!==newCurrency) {
                    this.updateCurrencies(currentCurrency, newCurrency);
                }
            },

            authenticatedUsername(newVal) {
                if(newVal.length>0) {
                    this.fetchUpdatesToShoppingCartAndSavedItems();
                }
            }
        }
    };
</script>

