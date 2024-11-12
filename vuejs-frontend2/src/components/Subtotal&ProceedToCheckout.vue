<template>
    <div :style="{backgroundColor: 'white', width: '100%', display: 'flex',
    flexDirection: 'column', alignItems: 'start', paddingLeft: '12%', paddingBottom: '1.5em',
    paddingTop: '1em'}">
        <p v-if="numSelectedCartItems==0">No items selected</p>
        <p v-if="numSelectedCartItems>0" :style="{fontSize: '1.1em'}">Subtotal({{numSelectedCartItems}} {{numSelectedCartItems==1 ? 'item' : 'items'}}): <b>{{ mutableSelectedCartItemsPriceSubtotal }}</b></p>
        <button @click="takeUserToCheckoutPage" :style="{backgroundColor: '#f2cb30', borderRadius: '1em', border: 'none',
        outline: 'none', cursor: 'pointer', padding: '0.5em 1em', width: '85%'}">Proceed to checkout</button>
    </div>

</template>

<script>

    export default {
        props: {
            numSelectedCartItems: Number,
            selectedCartItemsPriceSubtotal: String,
            deliveryAreaCountry: String
        },

        data() {
            return {
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
                mutableSelectedCartItemsPriceSubtotal: ''
            }
        },

        methods: {
            takeUserToCheckoutPage() {
                window.location.href = "http://localhost:8033/shoppingCheckout"
            },

            updateCurrencies(currentCurrency, newCurrency) {
                let selectedCartItemsPriceSubtotal = parseFloat(this.selectedCartItemsPriceSubtotal.substring(currentCurrency.length));
                selectedCartItemsPriceSubtotal/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                selectedCartItemsPriceSubtotal*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                this.mutableSelectedCartItemsPriceSubtotal = newCurrency+selectedCartItemsPriceSubtotal.toFixed(2);
            }
        },

        watch: {
            deliveryAreaCountry(newVal) {
                if(newVal.length==0 || this.selectedCartItemsPriceSubtotal.length==0) {
                    return;
                }
                let currentCurrency = this.selectedCartItemsPriceSubtotal[0];
                if(currentCurrency==="A") {
                    currentCurrency+="$";
                }
                else if(currentCurrency==="M") {
                    currentCurrency+="X$";
                }
                else if(currentCurrency==="C") {
                    if(this.selectedCartItemsPriceSubtotal[1]==="$") {
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

            selectedCartItemsPriceSubtotal(newVal) {
                this.mutableSelectedCartItemsPriceSubtotal = newVal;
                if(this.deliveryAreaCountry.length>0) {
                    let currentCurrency = this.selectedCartItemsPriceSubtotal[0];
                    if(currentCurrency==="A") {
                        currentCurrency+="$";
                    }
                    else if(currentCurrency==="M") {
                        currentCurrency+="X$";
                    }
                    else if(currentCurrency==="C") {
                        if(this.selectedCartItemsPriceSubtotal[1]==="$") {
                            currentCurrency="C$";
                        }
                        else {
                            currentCurrency="CN¥";
                        }
                    }
                    const newCurrency = this.countryCurrencyMap[this.deliveryAreaCountry];
                    if(currentCurrency!==newCurrency) {
                        this.updateCurrencies(currentCurrency, newCurrency);
                    }
                }
            }

        }
    };
</script>