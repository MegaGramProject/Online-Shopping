<template>

    <div :style="{display: 'flex', flexDirection: 'column'}">
        <TopSection :authenticatedUsername="authenticatedUsername" :hasPremium="hasPremium"/>

        <div :style="{display: 'flex', alignItems: 'start', justifyContent: 'center', gap: '1em', marginTop:'1em'}">
            <div :style="{display: 'flex', flexDirection: 'column', gap: '1em'}">
                <SelectADeliveryAddress :authenticatedUsername="authenticatedUsername" @notifyParentOfSelectedDeliveryAddress="receiveSelectedDeliveryAddress"/>
                <PaymentSection :authenticatedUsername="authenticatedUsername" @notifyParentOfSelectedCard="receiveSelectedPaymentCard"/>
                <PlaceYourOrder :orderSubtotal="orderSubtotal" :selectedDeliveryAddress="selectedDeliveryAddress"
                :selectedPaymentCard="selectedPaymentCard"/>
            </div>
            <SubtotalAndPlaceOrder :itemsSubtotal="itemsSubtotal" :shippingHandlingAndDeliverySubtotal="shippingHandlingAndDeliverySubtotal"
            :taxSubtotal="taxSubtotal" :orderSubtotal="orderSubtotal" :selectedDeliveryAddress="selectedDeliveryAddress"
            :selectedPaymentCard="selectedPaymentCard"
            />
        </div>

        <FooterSection @updateDeliveryAreaCountry="updateDeliveryAreaCountry"/>
    </div>

</template>

<script>
import PlaceYourOrder from '@/components/CheckoutPageComponents/PlaceYourOrder.vue';
import SelectADeliveryAddress from '@/components/CheckoutPageComponents/SelectADeliveryAddress.vue';
import SubtotalAndPlaceOrder from '@/components/CheckoutPageComponents/SubtotalAndPlaceOrder.vue';
import TopSection from '@/components/CheckoutPageComponents/TopSection.vue';
import FooterSection from '@/components/CheckoutPageComponents/FooterSection.vue';
import PaymentSection from '@/components/CheckoutPageComponents/PaymentSection.vue';
import '../styles.css';

    export default {

        data() {
            return {
                numTimesRouteParamsWasWatched: 0,
                authenticatedUsername: "",
                hasPremium: true,
                itemsSubtotal: "$0.00",
                shippingHandlingAndDeliverySubtotal: "$0.00",
                taxSubtotal: "$0.00",
                orderSubtotal: "$0.00",
                deliveryAreaCountry: "",
                deliveryZipcode: "",
                selectedDeliveryAddress: null,
                selectedPaymentCard: null,
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
                }
            }
        },

        components: {
            TopSection,
            SubtotalAndPlaceOrder,
            SelectADeliveryAddress,
            PlaceYourOrder,
            FooterSection,
            PaymentSection
        },

        methods: {
            async authenticateUser(username) {
                /*
                const response = await fetch('http://localhost:8003/cookies/authenticateUser/'+username, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                const isAuth = await response.json();
                if(isAuth) {
                    localStorage.setItem('authenticatedUsername', username);
                    setAuthenticatedUsername(username);
                    return;
                }
                else {
                    const data = {'username':username};
                    const options = {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data),
                        credentials: 'include',
                    }
                    const response2 = await fetch('http://localhost:8003/cookies/updateAuthToken', options);
                    if(!response2.ok) {
                        throw new Error('Network response not ok');
                    }
                    const response2Data = await response2.text();
                    if(response2Data === "Cookie updated successfully") {
                        const response3 = await fetch('http://localhost:8003/cookies/authenticateUser/'+username, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            credentials: 'include'
                        });
                        if(!response3.ok) {
                            throw new Error('Network response not ok');
                        }
                        const isAuth = await response.json();
                        if(isAuth) {
                            localStorage.setItem('authenticatedUsername', username);
                            setAuthenticatedUsername(username);
                            return;
                        }
                    }

                }
                window.location.href = "http://location:8000/login";
                */
                localStorage.setItem('defaultUsername', username);
                this.authenticatedUsername = username;
            },

            async fetchRelevantDataAtStart() {
                /*
                const response = await fetch(`http://localhost:8022/getBasicUserInfo/${this.authenticatedUsername}`);
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                const basicUserInfo = await response.json();

                if(basicUserInfo.zipCode==null) {
                    this.deliveryArea = basicUserInfo.deliveryAreaCountry;
                }
                else {
                    this.deliveryArea =`${basicUserInfo.townOrCity}, ${basicUserInfo.zipCode}`;
                    this.deliveryZipcode = basicUserInfo.zipCode;
                }
                this.deliveryAreaCountry = basicUserInfo.deliveryAreaCountry;
                this.hasPremium = basicUserInfo.hasPremium == 1 ? true : false;
                */
                

                this.deliveryZipcode = '53593';
                this.deliveryAreaCountry = 'the United States';
                this.hasPremium = true;

                this.itemsSubtotal= "$16.99";
                this.shippingHandlingAndDeliverySubtotal = "$0.00";
                this.taxSubtotal = "$0.93";
                this.orderSubtotal = this.getTotal(this.itemsSubtotal, this.shippingHandlingAndDeliverySubtotal, this.taxSubtotal);
            },

            updateCurrencies(currentCurrency, newCurrency) {
                let itemsSubtotal = parseFloat(this.itemsSubtotal.substring(currentCurrency.length));
                itemsSubtotal/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                itemsSubtotal*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                this.itemsSubtotal= newCurrency+itemsSubtotal.toFixed(2);

                let shippingHandlingAndDeliverySubtotal =  parseFloat(this.shippingHandlingAndDeliverySubtotal.substring(currentCurrency.length));
                shippingHandlingAndDeliverySubtotal/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                shippingHandlingAndDeliverySubtotal*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                this.shippingHandlingAndDeliverySubtotal= newCurrency+shippingHandlingAndDeliverySubtotal.toFixed(2);

                let taxSubtotal = parseFloat(this.taxSubtotal.substring(currentCurrency.length));
                taxSubtotal/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                taxSubtotal*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                this.taxSubtotal= newCurrency+taxSubtotal.toFixed(2);

                this.orderSubtotal = this.getTotal(this.itemsSubtotal, this.shippingHandlingAndDeliverySubtotal, this.taxSubtotal);
            },

            receiveSelectedDeliveryAddress(selectedDeliveryAddress) {
                this.selectedDeliveryAddress = selectedDeliveryAddress;
            },

            receiveSelectedPaymentCard(selectedPaymentCard) {
                this.selectedPaymentCard = selectedPaymentCard;
            },

            getTotal(itemsSubtotal, shippingHandlingAndDeliverySubtotal, taxSubtotal) {
                let currencySymbol = itemsSubtotal[0];
                if(currencySymbol==="A") {
                    currencySymbol+="$";
                }
                else if(currencySymbol==="M") {
                    currencySymbol+="X$";
                }
                else if(currencySymbol==="C") {
                    if(this.itemsSubtotal[1]==="$") {
                        currencySymbol="C$";
                    }
                    else {
                        currencySymbol="CN¥";
                    }
                }
                let orderTotal = 0;
                orderTotal+=parseFloat(itemsSubtotal.substring(currencySymbol.length));
                orderTotal+=parseFloat(shippingHandlingAndDeliverySubtotal.substring(currencySymbol.length));
                orderTotal+=parseFloat(taxSubtotal.substring(currencySymbol.length));
                return currencySymbol + orderTotal.toFixed(2);
            },

            async updateDeliveryAreaCountry(newDeliveryAreaCountry) {
                //make API-request to update delivery area country
                this.deliveryAreaCountry = newDeliveryAreaCountry;
            }
        },

        watch: {
            '$route.params': {
                immediate: true,
                async handler(newParams) {
                    this.numTimesRouteParamsWasWatched++;
                    if(this.numTimesRouteParamsWasWatched<2) {
                        return;
                    }
                    if(typeof newParams.username !== 'undefined') {
                        await this.authenticateUser(newParams.username);
                        this.fetchRelevantDataAtStart();
                    }
                    else if(localStorage.getItem('defaultUsername')) {
                        await this.authenticateUser(localStorage.getItem('defaultUsername'));
                        this.fetchRelevantDataAtStart();
                    }
                    else {
                    //window.location.href = "http://location:8000/login";
                    }
                }
            },

            deliveryAreaCountry(newVal) {
                if(newVal==null) {
                    return;
                }
                let currentCurrency = this.itemsSubtotal[0];
                if(currentCurrency==="A") {
                    currentCurrency+="$";
                }
                else if(currentCurrency==="M") {
                    currentCurrency+="X$";
                }
                else if(currentCurrency==="C") {
                    if(this.itemsSubtotal[1]==="$") {
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
    }
</script>