<template>

    <div :style="{display: 'flex', flexDirection: 'column'}">
        <TopSection :authenticatedUsername="authenticatedUsername" :hasPremium="hasPremium"/>

        <div :style="{display: 'flex', alignItems: 'start', justifyContent: 'center', gap: '1em', marginTop:'1em'}">
            <div :style="{display: 'flex', flexDirection: 'column', gap: '1em'}">
                <SelectADeliveryAddress :authenticatedUsername="authenticatedUsername" @notifyParentOfSelectedDeliveryAddress="receiveSelectedDeliveryAddress"/>
                <PaymentSection :authenticatedUsername="authenticatedUsername" @notifyParentOfSelectedCard="receiveSelectedPaymentCard"/>
                <OrderArrivals v-for="(arrivalTextHeader) in arrivalTextHeaders"
                    :key="arrivalTextHeader" :getItAsSoonAs="itemsToBeOrderedByUserAsDict[arrivalTextHeader][0].getItAsSoonAs"
                    :arrivalTextHeader="arrivalTextHeader"
                    :hasPremium="hasPremium" :products="itemsToBeOrderedByUserAsDict[arrivalTextHeader]"
                />
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
import blueCologne from '@/assets/images/blueCologne.jpg';
import popcorn from '@/assets/images/popcorn.jpg';
import showerCurtains from '@/assets/images/showerCurtains.jpg';
import FooterSection from '@/components/CheckoutPageComponents/FooterSection.vue';
import OrderArrivals from '@/components/CheckoutPageComponents/OrderArrivals.vue';
import PaymentSection from '@/components/CheckoutPageComponents/PaymentSection.vue';
import PlaceYourOrder from '@/components/CheckoutPageComponents/PlaceYourOrder.vue';
import SelectADeliveryAddress from '@/components/CheckoutPageComponents/SelectADeliveryAddress.vue';
import SubtotalAndPlaceOrder from '@/components/CheckoutPageComponents/SubtotalAndPlaceOrder.vue';
import TopSection from '@/components/CheckoutPageComponents/TopSection.vue';
import '../styles.css';

    export default {

        data() {
            return {
                blueCologne,
                showerCurtains,
                popcorn,
                numTimesRouteParamsWasWatched: 0,
                authenticatedUsername: "",
                hasPremium: false,
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
                },
                itemsToBeOrderedByUserAsDict: {},
                arrivalTextHeaders: []
            }
        },

        components: {
            TopSection,
            SubtotalAndPlaceOrder,
            SelectADeliveryAddress,
            PlaceYourOrder,
            FooterSection,
            PaymentSection,
            OrderArrivals
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

                //fetch selected cart items from localStorage(using JSON.parse()) as well as additional-data
                //the list below is supposed to be ordered in ascending order of getItAsSoonAs
                let itemsToBeOrderedByUser = [
                    {
                        id: 0,
                        productId: "0",
                        productImage: blueCologne,
                        productName: "Blue Cologne for Men - Spice & Black Vanilla Mens Cologne - An Explosion of Vibrant Spices, Dark Woods and Black Vanilla, 3.4 Fl Oz",
                        productPrice: "$22.96",
                        productPricePerUnit: "$6.75/Fl Oz",
                        productOptions: {Scent: 'Spice & Black Vanilla'},
                        quantity: 1,
                        getItAsSoonAs: 12,
                        shippingAndHandlingPrice: "$4.40",
                        tax: "$0.01"
                    },
                    {
                        id: 1,
                        productId: "1",
                        productImage: showerCurtains,
                        productName: "Gibelle Abstract Marble Shower Curtain, Blue Green Purple Jade Texture Gold Stripes Ombre Watercolor Paint, Modern Ink Art Decor Waterproof Fabric Shower Curtain for Bathroom Set with Hooks, 71x71",
                        productPrice: "$16.99",
                        productPricePerUnit: null,
                        productOptions: {Color: 'Green', Size: '71"W x 71"L (Pack of 1)'},
                        quantity: 2,
                        getItAsSoonAs: 32,
                        shippingAndHandlingPrice: "$5.40",
                        tax: "$0.05"
                    },
                    {
                        id: 2,
                        productId: "2",
                        productImage: popcorn,
                        productName: "KUDO Protein Popcorn, Variety 6-Pack | 10g of Protein Per Bag | 100% Whole Grain & Non-GMO Healthy Snacks | Keto Friendly & Gluten Free Kettle Popcorn, 2 oz. Bags",
                        productPrice: "$29.99",
                        productPricePerUnit: "$2.50/Ounce",
                        productOptions: {},
                        quantity: 1,
                        getItAsSoonAs: 38,
                        shippingAndHandlingPrice: "$7.40",
                        tax: "$0.036"
                    }
                ];

                if(itemsToBeOrderedByUser.length>0) {
                    const itemsToBeOrderedByUserAsDict = {};
                    /* in the dict above, keys are the getItAsSoonAs(number of hours it takes for the fastest-delivery of the product),
                    and values are lists of products with that delivery-time */

                    let currentCurrency = itemsToBeOrderedByUser[0].productPrice[0];
                    if(currentCurrency==="A") {
                        currentCurrency+="$";
                    }
                    else if(currentCurrency==="M") {
                        currentCurrency+="X$";
                    }
                    else if(currentCurrency==="C") {
                        if(itemsToBeOrderedByUser[0].productPrice[1]==="$") {
                            currentCurrency="C$";
                        }
                        else {
                            currentCurrency="CN¥";
                        }
                    }

                    let itemsSubtotal = 0;
                    let shippingHandlingAndDeliverySubtotal = 0;
                    let taxSubtotal = 0;
                    let arrivalTextHeaders = [];

                    for(let item of itemsToBeOrderedByUser) {
                        const arrivalTextHeader = this.formatArrivalTextHeader(item.getItAsSoonAs);
                        if(arrivalTextHeader in itemsToBeOrderedByUserAsDict) {
                            itemsToBeOrderedByUserAsDict[arrivalTextHeader].push(item);
                        }
                        else {
                            itemsToBeOrderedByUserAsDict[arrivalTextHeader] = [item];
                            arrivalTextHeaders.push(arrivalTextHeader);
                        }

                        itemsSubtotal+=parseFloat(item.productPrice.substring(currentCurrency.length))*item.quantity;
                        shippingHandlingAndDeliverySubtotal+=parseFloat(item.shippingAndHandlingPrice.substring(currentCurrency.length))*item.quantity;
                        taxSubtotal+=parseFloat(item.tax.substring(currentCurrency.length))*item.quantity;
                    }

                    this.itemsToBeOrderedByUserAsDict = itemsToBeOrderedByUserAsDict;
                    this.arrivalTextHeaders = arrivalTextHeaders;

                    this.itemsSubtotal= currentCurrency+itemsSubtotal.toFixed(2);
                    this.shippingHandlingAndDeliverySubtotal = currentCurrency+shippingHandlingAndDeliverySubtotal.toFixed(2);
                    this.taxSubtotal = currentCurrency+taxSubtotal.toFixed(2);
                    this.orderSubtotal = this.getTotal(this.itemsSubtotal, this.shippingHandlingAndDeliverySubtotal, this.taxSubtotal);
                }
            },

            formatArrivalTextHeader(getItAsSoonAs) {
                const currentDate = new Date();
                
                const arrivalDate = new Date(currentDate.getTime() + getItAsSoonAs * 60 * 60 * 1000);
                
                const options = { month: 'short', day: 'numeric', year: 'numeric' };
                const formattedDate = arrivalDate.toLocaleDateString('en-US', options);
                
                return `Arriving ${formattedDate}`;
            },

            updateCurrencies(currentCurrency, newCurrency) {
                for(let arrivalTextHeader of this.arrivalTextHeaders) {
                    for(let product of this.itemsToBeOrderedByUserAsDict[arrivalTextHeader]) {
                        let productPrice = parseFloat(product.productPrice.substring(currentCurrency.length));
                        productPrice/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                        productPrice*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                        product.productPrice= newCurrency+productPrice.toFixed(2);

                        let shippingAndHandlingPrice = parseFloat(product.shippingAndHandlingPrice.substring(currentCurrency.length));
                        shippingAndHandlingPrice/=this.currencyToDollarMap[currentCurrency];
                        shippingAndHandlingPrice*=this.currencyToDollarMap[newCurrency];
                        product.shippingAndHandlingPrice= newCurrency+shippingAndHandlingPrice.toFixed(2);

                        let tax = parseFloat(product.tax.substring(currentCurrency.length));
                        tax/=this.currencyToDollarMap[currentCurrency];
                        tax*=this.currencyToDollarMap[newCurrency];
                        product.tax= newCurrency+tax.toFixed(2);

                        if(product.productPricePerUnit!==null) {
                            const indexOfSeparator = product.productPricePerUnit.indexOf("/");
                            const perUnitSection = product.productPricePerUnit.substring(indexOfSeparator);
                            let priceSection = product.productPricePerUnit.substring(0, indexOfSeparator);
                            priceSection = parseFloat(priceSection.substring(currentCurrency.length));
                            priceSection/=this.currencyToDollarMap[currentCurrency];
                            priceSection*=this.currencyToDollarMap[newCurrency];
                            product.productPricePerUnit= newCurrency+priceSection.toFixed(2)+perUnitSection;
                        }
                    }
                }

                let itemsSubtotal = parseFloat(this.itemsSubtotal.substring(currentCurrency.length));
                itemsSubtotal/=this.currencyToDollarMap[currentCurrency];
                itemsSubtotal*=this.currencyToDollarMap[newCurrency];
                this.itemsSubtotal= newCurrency+itemsSubtotal.toFixed(2);

                let shippingHandlingAndDeliverySubtotal = parseFloat(this.shippingHandlingAndDeliverySubtotal.substring(currentCurrency.length));
                shippingHandlingAndDeliverySubtotal/=this.currencyToDollarMap[currentCurrency];
                shippingHandlingAndDeliverySubtotal*=this.currencyToDollarMap[newCurrency];
                this.shippingHandlingAndDeliverySubtotal= newCurrency+shippingHandlingAndDeliverySubtotal.toFixed(2);

                let taxSubtotal = parseFloat(this.taxSubtotal.substring(currentCurrency.length));
                taxSubtotal/=this.currencyToDollarMap[currentCurrency];
                taxSubtotal*=this.currencyToDollarMap[newCurrency];
                this.taxSubtotal= newCurrency+taxSubtotal.toFixed(2);

                this.orderSubtotal = this.getTotal(this.itemsSubtotal, this.shippingHandlingAndDeliverySubtotal, this.taxSubtotal);
                
                //in order to trigger UI-change for OrderArrivals-components
                const arrivalTextHeaders = [...this.arrivalTextHeaders];
                this.arrivalTextHeaders = [];
                this.arrivalTextHeaders = [...arrivalTextHeaders];
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