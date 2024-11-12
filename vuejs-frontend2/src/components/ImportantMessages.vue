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
            deliveryAreaCountry: String
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
                shoppingCartPriceDecreases: [
                    {
                        productId: "0",
                        productName: "Takis",
                        options: {
                            Size: 'small',
                            Color: 'blue'
                        },
                        prices: ['$6', '$4']
                    },
                    {
                        productId: "1",
                        productName: "Engraved Hydroflask",
                        options: {},
                        prices: ['$60', '$55']
                    }
                ],
                shoppingCartPriceIncreases: [
                    {
                        productId: "2",
                        productName: "Takis",
                        options: {
                            Size: 'large',
                            Color: 'blue'
                        },
                        prices: ['$4', '$6']
                    }
                ],
                savedItemsPriceDecreases: [
                    {
                        productId: "3",
                        productName: "Apollo Shirt",
                        options: {
                            Size: 'medium',
                        },
                        prices: ['$6', '$4']
                    },
                    {
                        productId: "4",
                        productName: "Watergun",
                        options: {},
                        prices: ['$60', '$55']
                    }
                ],
                savedItemsPriceIncreases: [
                    {
                        productId: "5",
                        productName: "Bose Headphones",
                        options: {},
                        prices: ['$400', '$600']
                    }
                ],
                unavailableProducts: [
                    {
                        productId: "6",
                        productName: "Beats by Dre",
                        options: {},
                        status: 'removed-from-seller'
                    },
                    {
                        productId: "7",
                        productName: "Apple Airpods",
                        options: {
                            Color: 'pink',
                            'Battery-Life': '24h'
                        },
                        status: 'removed-from-seller'
                    },
                    {
                        productId: "8",
                        productName: "Winter Tires",
                        options: {},
                        status: 'out-of-stock'
                    }
                ]
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
            }
        }
    };
</script>

