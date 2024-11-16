<template>
    <div class="miniSection" :style="{backgroundColor: 'white', width: '100%', padding: '0.5em 1em', borderRadius: '0.6em'}">
        <h3>Pair with your cart</h3>

        <SingleItemToPairWithCart v-for="(item, index) in itemsToPairWithCart" :key="index"
        :productId="item.productId" :productImage="item.image" :productName="item.name"
        :productPrice="item.price" :avgRating="item.avgRating" :numRatings="item.numRatings" :hasPremium="hasPremium"
        @addItemToCart="addItemToCart"/>
    </div>

</template>

<script>
import bedding from '@/assets/images/bedding.jpg';
import jeans from '@/assets/images/jeans.jpg';
import SingleItemToPairWithCart from './SingleItemToPairWithCart.vue';

    export default {
        props: {
            authenticatedUsername: String,
            hasPremium: Boolean,
            deliveryAreaCountry: String
        },

        components: {
            SingleItemToPairWithCart
        },

        data() {
            return {
                bedding,
                jeans,
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
                itemsToPairWithCart: [
                    {
                        productId: "671c5644368a9fb6fe7f7d73",
                        image: bedding,
                        name: "Roscoe Baseballs",
                        price: "$59.99",
                        avgRating: 4.5,
                        numRatings: 123
                    },
                    {
                        productId: "671c474a368a9fb6fe7f7d66",
                        image: jeans,
                        name: "Unisex-Adult Soccer Cleats Lightweight Futsal Training Football Shoes",
                        price: "$89.99",
                        avgRating: 4.9,
                        numRatings: 143500
                    },
                    {
                        productId: "671c49cb368a9fb6fe7f7d69",
                        image: jeans,
                        name: "27' Pro Tennis Rackets (2-Pack), Lightweight, Durable Strings, Ideal",
                        price: "$89.99",
                        avgRating: 3.8,
                        numRatings: 143500
                    }
                ]
            }
        },

        methods: {
            async addItemToCart(itemInfo) {
                const response = await fetch(`http://localhost:8022/getOptionsOfProduct/${itemInfo.productId}`);
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                const optionsOfProduct = await response.json();
                const defaultOptionsOfItem = {};
                for(let option of Object.keys(optionsOfProduct)) {
                    defaultOptionsOfItem[option] = 0;
                }

                const escapedDefaultOptions = JSON.stringify(defaultOptionsOfItem).replace(/"/g, '\\"');

                const response1 = await fetch("http://localhost:8029/graphql", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        query: `mutation {
                            addShoppingCartItem(username: "${this.authenticatedUsername}", productId: "${itemInfo.productId}", quantity: 1, options: "${escapedDefaultOptions}") {
                                id
                            }
                        }`
                    })
                });
                if(!response1.ok) {
                    throw new Error('Network response not ok');
                }
                let newlyAddedShoppingCartItemId = await response1.json();
                newlyAddedShoppingCartItemId = newlyAddedShoppingCartItemId.data.addShoppingCartItem.id;
                itemInfo.id = newlyAddedShoppingCartItemId;
                
                for(let option of Object.keys(optionsOfProduct)) {
                    defaultOptionsOfItem[option] = optionsOfProduct[option][0];
                }
                itemInfo.options = defaultOptionsOfItem;
                this.itemsToPairWithCart = this.itemsToPairWithCart.filter(
                    x=> {
                        return x.productId!==itemInfo.productId;
                    }
                );
                this.$emit("addItemToCart", itemInfo);
            },

            updateCurrencies(currentCurrency, newCurrency) {
                for(let i=0; i<this.itemsToPairWithCart.length; i++) {
                    let currItemPrice = this.itemsToPairWithCart[i].price;
                    currItemPrice = parseFloat(currItemPrice.substring(currentCurrency.length));
                    currItemPrice/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                    currItemPrice*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                    this.itemsToPairWithCart[i].price = newCurrency+currItemPrice.toFixed(2);
                }
            }
        },

        watch: {
            deliveryAreaCountry(newVal) {
                if(this.itemsToPairWithCart.length==0) {
                    return;
                }
                let currentCurrency = this.itemsToPairWithCart[0].price[0];
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