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
import SingleItemToPairWithCart from './SingleItemToPairWithCart.vue';
import bedding from '@/assets/images/bedding.jpg';
import jeans from '@/assets/images/jeans.jpg';

    export default {
        props: {
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
                        productId: "0",
                        image: bedding,
                        name: "Bed mattess and blankets full set",
                        price: "$59.99",
                        avgRating: 4.5,
                        numRatings: 123
                    },
                    {
                        productId: "1",
                        image: jeans,
                        name: "Apple-bottom jeans",
                        price: "$89.99",
                        avgRating: 4.9,
                        numRatings: 143500
                    },
                    {
                        productId: "2",
                        image: jeans,
                        name: "Apple-bottom jeans2",
                        price: "$89.99",
                        avgRating: 3.8,
                        numRatings: 143500
                    },
                    {
                        productId: "3",
                        image: jeans,
                        name: "Apple-bottom jeans3",
                        price: "$89.99",
                        avgRating: 1,
                        numRatings: 14350
                    },
                    {
                        productId: "4",
                        image: bedding,
                        name: "Bedding2",
                        price: "$89.99",
                        avgRating: 0,
                        numRatings: 0
                    },
                ]
            }
        },

        methods: {
            async addItemToCart(itemInfo) {
                //make API-request to add item to cart
                itemInfo.id = Math.floor(Math.random() * 5010) + 150;
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