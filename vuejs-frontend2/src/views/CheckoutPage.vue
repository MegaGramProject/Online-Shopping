<template>

    <div :style="{display: 'flex', flexDirection: 'column'}">
        <TopSection :authenticatedUsername="authenticatedUsername" :hasPremium="hasPremium"/>

        <div v-if="orderHasBeenPlaced" :style="{display: 'flex', alignItems: 'start', justifyContent: 'center', marginTop:'1em'}">
            <OrderHasBeenPlaced v-if="orderHasBeenPlaced" @cancelPlacingOrder="toggleOrderHasBeenPlaced"
            :selectedDeliveryAddress="selectedDeliveryAddress" :selectedPaymentCard="selectedPaymentCard"
            :selectedPickupLocation="selectedPickupLocation" :shippingAndHandlingFeesSavedWithPremium="shippingAndHandlingFeesSavedWithPremium"
            :totalItemDiscounts="totalItemDiscounts"
            />
        </div>

        <div :style="{display: !orderHasBeenPlaced ? 'flex' : 'none', alignItems: 'start', justifyContent: 'center', gap: '1em', marginTop:'1em'}">
            <div :style="{display: 'flex', flexDirection: 'column', gap: '1em'}">
                <SelectADeliveryAddress :authenticatedUsername="authenticatedUsername" @notifyParentOfSelectedDeliveryAddress="receiveSelectedDeliveryAddress"
                @showEditOrDeleteAddressPopup="showEditOrDeleteAddressPopup" :adjustmentsToAddressToEditOrDelete="adjustmentsToAddressToEditOrDelete"
                @showAddNewDeliveryAddressPopup="toggleAddNewDeliveryAddressPopup" :newAddressToAdd="newAddressToAdd"
                @showSelectPickupLocationPopup="toggleSelectPickupLocationPopup" :newlySetPickupLocation="newlySetPickupLocation"
                @notifyParentOfSelectedPickupLocation="receiveSelectedPickupLocation" @showAddDeliveryInstructionsPopup="toggleAddDeliveryInstructionsPopup"
                :addressWithUpdatedDeliveryInstructions="addressWithUpdatedDeliveryInstructions"
                />
                <PaymentSection :authenticatedUsername="authenticatedUsername" @notifyParentOfSelectedCard="receiveSelectedPaymentCard"
                @showAddPaymentCardPopup="toggleAddPaymentCardPopup" :newCardOfUser="newCardOfUser"
                :promoCodes="promoCodes" @applyPromoCode="applyPromoCode"/>
                <OrderArrivals v-for="(arrivalTextHeader) in arrivalTextHeaders"
                    :key="arrivalTextHeader" :getItAsSoonAs="itemsToBeOrderedByUserAsDict[arrivalTextHeader][0].getItAsSoonAs"
                    :arrivalTextHeader="arrivalTextHeader"
                    :hasPremium="hasPremium" :products="itemsToBeOrderedByUserAsDict[arrivalTextHeader]"
                    @updateItemQuantity="updateItemQuantity" @updateSelectedProductDeal="updateSelectedProductDeal"
                />
                <PlaceYourOrder :orderSubtotal="orderSubtotal" :selectedDeliveryAddress="selectedDeliveryAddress"
                :selectedPickupLocation="selectedPickupLocation"
                :selectedPaymentCard="selectedPaymentCard" @placeOrder="toggleOrderHasBeenPlaced"/>
            </div>
            <SubtotalAndPlaceOrder :itemsSubtotal="itemsSubtotal" :shippingHandlingAndDeliverySubtotal="shippingHandlingAndDeliverySubtotal"
            :taxSubtotal="taxSubtotal" :orderSubtotal="orderSubtotal" :selectedDeliveryAddress="selectedDeliveryAddress" :selectedPickupLocation="selectedPickupLocation"
            :selectedPaymentCard="selectedPaymentCard" @placeOrder="toggleOrderHasBeenPlaced" :quantityTotal="quantityTotal"
            :shippingAndHandlingFeesSavedWithPremium="shippingAndHandlingFeesSavedWithPremium" :totalItemDiscounts="totalItemDiscounts"
            />
        </div>

        <FooterSection v-if="!orderHasBeenPlaced" @updateDeliveryAreaCountry="updateDeliveryAreaCountry"/>

    </div>

    <img v-if="displayDarkScreen" :src="blackScreen" :style="{opacity: '0.7',
    position: 'absolute', top: '0%', left: '0%', height: '250%', width: '105%', objectFit: 'cover'}">

    <AddPaymentCardPopup v-if="displayAddPaymentCardPopup" @closePopup="toggleAddPaymentCardPopup"
    @addPaymentCard="addPaymentCard"/>

    <EditOrDeleteAddressPopup v-if="displayEditOrDeleteAddressPopup" @closePopup="closeEditOrDeleteAddressPopup"
    :indexOfAddressToEditOrDelete="addressToEditOrDelete.index" :propCountry="addressToEditOrDelete.country"
    :propFullName="addressToEditOrDelete.fullName" :propHouseOrBuildingNumber="addressToEditOrDelete.houseOrBuildingNumber"
    :propStreetName="addressToEditOrDelete.streetName" :propApartmentOrSuiteNumber="addressToEditOrDelete.apartmentOrSuiteNumber"
    :propTownOrCity="addressToEditOrDelete.townOrCity" :propStateOrProvince="addressToEditOrDelete.stateOrProvince"
    :propZipCode="addressToEditOrDelete.zipCode" :propPhoneNumber="addressToEditOrDelete.phoneNumber"
    :propIsSelected="addressToEditOrDelete.isSelected" @deleteThisAddress="deleteThisAddress"
    @saveEditsToThisAddress="saveEditsToThisAddress"
    />

    <AddNewDeliveryAddressPopup v-if="displayAddNewDeliveryAddressPopup" @closePopup="toggleAddNewDeliveryAddressPopup"
    @addNewAddress="addNewAddress"
    />

    <SelectPickupLocationPopup v-if="displaySelectPickupLocationPopup" @closePopup="toggleSelectPickupLocationPopup"
    @setPickupLocation="setPickupLocation" :deliveryAreaCountry="deliveryAreaCountry"/>

    <AddDeliveryInstructionsPopup v-if="displayAddDeliveryInstructionsPopup" @closePopup="toggleAddDeliveryInstructionsPopup"
    :addressToAddDeliveryInstructions="addressToAddDeliveryInstructions" @saveDeliveryInstructions="saveDeliveryInstructions"/>


</template>

<script>
import blackScreen from '@/assets/images/blackScreen.png';
import blueCologne from '@/assets/images/blueCologne.jpg';
import popcorn from '@/assets/images/popcorn.jpg';
import showerCurtains from '@/assets/images/showerCurtains.jpg';
import AddDeliveryInstructionsPopup from '@/components/CheckoutPageComponents/AddDeliveryInstructionsPopup.vue';
import AddNewDeliveryAddressPopup from '@/components/CheckoutPageComponents/AddNewDeliveryAddressPopup.vue';
import AddPaymentCardPopup from '@/components/CheckoutPageComponents/AddPaymentCardPopup.vue';
import EditOrDeleteAddressPopup from '@/components/CheckoutPageComponents/EditOrDeleteAddressPopup.vue';
import FooterSection from '@/components/CheckoutPageComponents/FooterSection.vue';
import OrderArrivals from '@/components/CheckoutPageComponents/OrderArrivals.vue';
import OrderHasBeenPlaced from '@/components/CheckoutPageComponents/OrderHasBeenPlaced.vue';
import PaymentSection from '@/components/CheckoutPageComponents/PaymentSection.vue';
import PlaceYourOrder from '@/components/CheckoutPageComponents/PlaceYourOrder.vue';
import SelectADeliveryAddress from '@/components/CheckoutPageComponents/SelectADeliveryAddress.vue';
import SelectPickupLocationPopup from '@/components/CheckoutPageComponents/SelectPickupLocationPopup.vue';
import SubtotalAndPlaceOrder from '@/components/CheckoutPageComponents/SubtotalAndPlaceOrder.vue';
import TopSection from '@/components/CheckoutPageComponents/TopSection.vue';

import '../styles.css';

    export default {

        data() {
            return {
                blueCologne,
                showerCurtains,
                popcorn,
                blackScreen,
                numTimesRouteParamsWasWatched: 0,
                authenticatedUsername: "",
                hasPremium: false,
                itemsSubtotal: "$0.00",
                shippingHandlingAndDeliverySubtotal: "$0.00",
                taxSubtotal: "$0.00",
                orderSubtotal: "$0.00",
                shippingAndHandlingFeesSavedWithPremium: "$0.00",
                totalItemDiscounts: "$0.00",
                quantityTotal: 0,
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
                arrivalTextHeaders: [],
                orderHasBeenPlaced: false,
                displayDarkScreen: false,
                displayAddPaymentCardPopup: false,
                newCardOfUser: null,
                promoCodes: {},
                displayEditOrDeleteAddressPopup: false,
                addressToEditOrDelete: {
                    index: -1,
                    fullName: null,
                    country: null,
                    houseOrBuildingNumber: null,
                    streetName: null,
                    apartmentOrSuiteNumber: null,
                    townOrCity: null,
                    stateOrProvince: null,
                    zipCode: null,
                    addressText: null,
                    phoneNumber: null,
                    isSelected: false
                },
                adjustmentsToAddressToEditOrDelete: null,
                displayAddNewDeliveryAddressPopup: false,
                newAddressToAdd: null,
                displaySelectPickupLocationPopup: false,
                newlySetPickupLocation: null,
                selectedPickupLocation: null,
                displayAddDeliveryInstructionsPopup: false,
                addressToAddDeliveryInstructions: null,
                addressWithUpdatedDeliveryInstructions: null
            }
        },

        components: {
            TopSection,
            SubtotalAndPlaceOrder,
            SelectADeliveryAddress,
            PlaceYourOrder,
            FooterSection,
            PaymentSection,
            OrderArrivals,
            OrderHasBeenPlaced,
            AddPaymentCardPopup,
            EditOrDeleteAddressPopup,
            AddNewDeliveryAddressPopup,
            SelectPickupLocationPopup,
            AddDeliveryInstructionsPopup
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
                //in the deals list, the first deal is always the selected one, and the selected-deal is always the best one(i.e the one that saves the most money)
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
                        tax: "$0.01",
                        sAndHPriceSavedWithPremium: "$0.40",
                        unDiscountedPrice: "$45.92",
                        deals: [
                            {
                                discount: "50% off",
                                prices: ["$45.92", "$22.96", "$22.96"],
                                requirement: "PREMIUM"
                            },
                            {
                                discount: "2 for 1",
                                prices: [],
                                requirement: "NONE"
                            }
                        ]
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
                        tax: "$0.05",
                        sAndHPriceSavedWithPremium: "$0.40",
                        unDiscountedPrice: "$16.99",
                        deals: []
                    },
                    {
                        id: 2,
                        productId: "2",
                        productImage: popcorn,
                        productName: "KUDO Protein Popcorn, Variety 6-Pack | 10g of Protein Per Bag | 100% Whole Grain & Non-GMO Healthy Snacks | Keto Friendly & Gluten Free Kettle Popcorn, 2 oz. Bags",
                        productPrice: "$29.99",
                        productPricePerUnit: "$2.50/Ounce",
                        productOptions: {},
                        quantity: 3,
                        getItAsSoonAs: 38,
                        shippingAndHandlingPrice: "$7.40",
                        tax: "$0.036",
                        sAndHPriceSavedWithPremium: "$0.40",
                        unDiscountedPrice: "$29.99",
                        deals: [
                            {
                                discount: "3 for 1",
                                prices: ["$89.97", "$29.99", "$59.98"],
                                requirement: "NONE"
                            }
                        ]
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
                    let shippingAndHandlingFeesSavedWithPremium = 0;
                    let totalItemDiscounts = 0;
                    let quantityTotal = 0;
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

                        quantityTotal+=item.quantity;
                        itemsSubtotal+=parseFloat(item.unDiscountedPrice.substring(currentCurrency.length))*item.quantity;
                        shippingHandlingAndDeliverySubtotal+=parseFloat(item.shippingAndHandlingPrice.substring(currentCurrency.length))*item.quantity;
                        taxSubtotal+=parseFloat(item.tax.substring(currentCurrency.length))*item.quantity;

                        if(this.hasPremium) {
                            shippingAndHandlingFeesSavedWithPremium+=parseFloat(item.sAndHPriceSavedWithPremium.substring(currentCurrency.length))*item.quantity;
                        }

                        if(item.deals.length>0 && item.deals[0].prices.length==3) {
                            totalItemDiscounts+=parseFloat(item.deals[0].prices[2].substring(currentCurrency.length));
                        }
                    }

                    this.itemsToBeOrderedByUserAsDict = itemsToBeOrderedByUserAsDict;
                    this.arrivalTextHeaders = arrivalTextHeaders;
                    this.quantityTotal = quantityTotal;

                    this.itemsSubtotal= currentCurrency+itemsSubtotal.toFixed(2);
                    this.shippingHandlingAndDeliverySubtotal = currentCurrency+shippingHandlingAndDeliverySubtotal.toFixed(2);
                    this.shippingAndHandlingFeesSavedWithPremium = currentCurrency+shippingAndHandlingFeesSavedWithPremium.toFixed(2);
                    this.taxSubtotal = currentCurrency+taxSubtotal.toFixed(2);
                    this.totalItemDiscounts = currentCurrency+totalItemDiscounts.toFixed(2);
                    this.orderSubtotal = this.getTotal(
                        this.itemsSubtotal,
                        this.shippingHandlingAndDeliverySubtotal,
                        this.taxSubtotal,
                        this.shippingAndHandlingFeesSavedWithPremium,
                        this.totalItemDiscounts
                    );

                    let promoCodes = {
                        "GetRichKwik": [["0", "Blue Cologne", "30% off"], ["1", "Shower Curtains", "2 for 1"], ["2", "Kudos Protein Popcorn", "28% off"]],
                        "SAVEBIG": [["1", "Shower Curtains", "Buy 1, Get 2nd one 36% off"]],
                        "goBigOrGoHome$$$": [["2", "Kudos Protein Popcorn", "Buy 10, Get 11th one 36% off"]]
                    };
                    this.promoCodes = promoCodes;

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
                        
                        let unDiscountedPrice = parseFloat(product.unDiscountedPrice.substring(currentCurrency.length));
                        unDiscountedPrice/=this.currencyToDollarMap[currentCurrency];
                        unDiscountedPrice*=this.currencyToDollarMap[newCurrency];
                        product.unDiscountedPrice= newCurrency+unDiscountedPrice.toFixed(2);

                        if(product.productPricePerUnit!==null) {
                            const indexOfSeparator = product.productPricePerUnit.indexOf("/");
                            const perUnitSection = product.productPricePerUnit.substring(indexOfSeparator);
                            let priceSection = product.productPricePerUnit.substring(0, indexOfSeparator);
                            priceSection = parseFloat(priceSection.substring(currentCurrency.length));
                            priceSection/=this.currencyToDollarMap[currentCurrency];
                            priceSection*=this.currencyToDollarMap[newCurrency];
                            product.productPricePerUnit= newCurrency+priceSection.toFixed(2)+perUnitSection;
                        }

                        for(let deal of product.deals) {
                            const newPrices = [];
                            for(let price of deal.prices) {
                                let newPrice = parseFloat(price.substring(currentCurrency.length));
                                newPrice/=this.currencyToDollarMap[currentCurrency];
                                newPrice*=this.currencyToDollarMap[newCurrency];
                                newPrices.push(newCurrency+newPrice.toFixed(2));
                            }
                            deal.prices = [...newPrices];
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

                let shippingAndHandlingFeesSavedWithPremium = parseFloat(this.shippingAndHandlingFeesSavedWithPremium.substring(currentCurrency.length));
                shippingAndHandlingFeesSavedWithPremium/=this.currencyToDollarMap[currentCurrency];
                shippingAndHandlingFeesSavedWithPremium*=this.currencyToDollarMap[newCurrency];
                this.shippingAndHandlingFeesSavedWithPremium = newCurrency+shippingAndHandlingFeesSavedWithPremium.toFixed(2);

                let totalItemDiscounts = parseFloat(this.totalItemDiscounts.substring(currentCurrency.length));
                totalItemDiscounts/=this.currencyToDollarMap[currentCurrency];
                totalItemDiscounts*=this.currencyToDollarMap[newCurrency];
                this.totalItemDiscounts = newCurrency+totalItemDiscounts.toFixed(2);

                let orderSubtotal = parseFloat(this.orderSubtotal.substring(currentCurrency.length));
                orderSubtotal/=this.currencyToDollarMap[currentCurrency];
                orderSubtotal*=this.currencyToDollarMap[newCurrency];
                this.orderSubtotal = newCurrency+orderSubtotal.toFixed(2);
            },

            receiveSelectedDeliveryAddress(selectedDeliveryAddress) {
                this.selectedDeliveryAddress = selectedDeliveryAddress;
            },

            receiveSelectedPaymentCard(selectedPaymentCard) {
                this.selectedPaymentCard = selectedPaymentCard;
            },

            getTotal(itemsSubtotal, shippingHandlingAndDeliverySubtotal, taxSubtotal,
            shippingAndHandlingFeesSavedWithPremium, totalItemDiscounts) {
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
                orderTotal-=parseFloat(shippingAndHandlingFeesSavedWithPremium.substring(currencySymbol.length));
                orderTotal-=parseFloat(totalItemDiscounts.substring(currencySymbol.length));
                return currencySymbol + orderTotal.toFixed(2);
            },

            async updateDeliveryAreaCountry(newDeliveryAreaCountry) {
                //make API-request to update delivery area country
                this.deliveryAreaCountry = newDeliveryAreaCountry;
            },

            toggleOrderHasBeenPlaced() {
                this.orderHasBeenPlaced = !this.orderHasBeenPlaced;
            },

            toggleDisplayDarkScreen() {
                this.displayDarkScreen = !this.displayDarkScreen;
            },

            toggleAddPaymentCardPopup() {
                this.displayAddPaymentCardPopup = !this.displayAddPaymentCardPopup;
                if(this.displayAddPaymentCardPopup) {
                    this.displayDarkScreen = true;
                }
                else {
                    this.displayDarkScreen = false;
                }
            },

            toggleAddDeliveryInstructionsPopup(addressToAddDeliveryInstructions) {
                this.addressToAddDeliveryInstructions = addressToAddDeliveryInstructions;

                this.displayAddDeliveryInstructionsPopup = !this.displayAddDeliveryInstructionsPopup;
                if(this.displayAddDeliveryInstructionsPopup) {
                    this.displayDarkScreen = true;
                }
                else {
                    this.displayDarkScreen = false;
                }
            },

            closeEditOrDeleteAddressPopup() {
                this.displayEditOrDeleteAddressPopup = false;
                this.displayDarkScreen = false;
            },
            

            showEditOrDeleteAddressPopup(addressToEditOrDelete) {
                this.displayEditOrDeleteAddressPopup = true;
                this.displayDarkScreen = true;
                this.addressToEditOrDelete = {...addressToEditOrDelete};
            },

            deleteThisAddress() {
                this.displayEditOrDeleteAddressPopup = false;
                this.displayDarkScreen = false;

                this.adjustmentsToAddressToEditOrDelete = {
                    index: this.addressToEditOrDelete.index,
                    delete: true
                };
            },

            saveEditsToThisAddress(changesMade) {
                this.displayEditOrDeleteAddressPopup = false;
                this.displayDarkScreen = false;

                this.adjustmentsToAddressToEditOrDelete = {
                    index: this.addressToEditOrDelete.index,
                    ...changesMade
                };
            },

            addPaymentCard(newCardOfUser) {
                this.newCardOfUser = newCardOfUser;
                this.displayAddPaymentCardPopup = false;
                this.displayDarkScreen = false;
            },

            updateItemQuantity(info) {
                const arrivalTextHeaderOfItem = info.arrivalTextHeader;
                const idOfItem = info.id;
                const newQuantityOfItem = info.newQuantity;

                for(let i=0; i< this.itemsToBeOrderedByUserAsDict[arrivalTextHeaderOfItem].length; i++) {
                    const product = this.itemsToBeOrderedByUserAsDict[arrivalTextHeaderOfItem][i];
                    if(product.id==idOfItem) {
                        const differenceInQuantities = newQuantityOfItem-product.quantity;
                        if (newQuantityOfItem==0) {
                            this.itemsToBeOrderedByUserAsDict[arrivalTextHeaderOfItem].splice(i, 1);
                            if(this.itemsToBeOrderedByUserAsDict[arrivalTextHeaderOfItem].length==0) {
                                this.arrivalTextHeaders.splice(this.arrivalTextHeaders.indexOf(arrivalTextHeaderOfItem), 1);
                            }
                        }
                        else {
                            product.quantity = newQuantityOfItem;
                        }

                        let currentCurrency = product.productPrice[0];
                        if(currentCurrency==="A") {
                            currentCurrency+="$";
                        }
                        else if(currentCurrency==="M") {
                            currentCurrency+="X$";
                        }
                        else if(currentCurrency==="C") {
                            if(product.productPrice[1]==="$") {
                                currentCurrency="C$";
                            }
                            else {
                                currentCurrency="CN¥";
                            }
                        }

                        this.quantityTotal+=differenceInQuantities;
                        //later, the biggest-product-deal will be the selected one and the totalItemDiscounts variable will be updated

                        let itemsSubtotal = parseFloat(this.itemsSubtotal.substring(currentCurrency.length));
                        itemsSubtotal+=differenceInQuantities*parseFloat(product.productPrice.substring(currentCurrency.length));
                        this.itemsSubtotal = currentCurrency+itemsSubtotal.toFixed(2);

                        let shippingHandlingAndDeliverySubtotal = parseFloat(this.shippingHandlingAndDeliverySubtotal.substring(currentCurrency.length));
                        shippingHandlingAndDeliverySubtotal+=differenceInQuantities*parseFloat(product.shippingAndHandlingPrice.substring(currentCurrency.length));
                        this.shippingHandlingAndDeliverySubtotal = currentCurrency+shippingHandlingAndDeliverySubtotal.toFixed(2);

                        let taxSubtotal = parseFloat(this.taxSubtotal.substring(currentCurrency.length));
                        taxSubtotal+=differenceInQuantities*parseFloat(product.tax.substring(currentCurrency.length));
                        this.taxSubtotal = currentCurrency+taxSubtotal.toFixed(2);
                        
                        let shippingAndHandlingFeesSavedWithPremium = parseFloat(this.shippingAndHandlingFeesSavedWithPremium.substring(currentCurrency.length));
                        shippingAndHandlingFeesSavedWithPremium+=differenceInQuantities*parseFloat(product.sAndHPriceSavedWithPremium.substring(currentCurrency.length));
                        this.shippingAndHandlingFeesSavedWithPremium = currentCurrency+shippingAndHandlingFeesSavedWithPremium.toFixed(2);

                        this.orderSubtotal = this.getTotal(
                            this.itemsSubtotal,
                            this.shippingHandlingAndDeliverySubtotal,
                            this.taxSubtotal,
                            this.shippingAndHandlingFeesSavedWithPremium,
                            this.totalItemDiscounts
                        );

                        return;
                    }
                }
            },

            formatProductDealText(productDealInfo) {
                if(productDealInfo.requirement==='NONE') {
                    return `FOR EVERYBODY: ${productDealInfo.discount}`;
                }
                else if(productDealInfo.requirement==='PREMIUM') {
                    return `PREMIUM ONLY: ${productDealInfo.discount}`;
                }
                else {
                    return `FROM PROMO-CODE: ${productDealInfo.discount}`;
                }
            },

            updateSelectedProductDeal(info) {
                const arrivalTextHeaderOfItem = info.arrivalTextHeader;
                const idOfItem = info.id;
                const newlySelectedProductDeal = info.newlySelectedProductDeal;

                for(let i=0; i<this.itemsToBeOrderedByUserAsDict[arrivalTextHeaderOfItem].length; i++) {
                    const product = this.itemsToBeOrderedByUserAsDict[arrivalTextHeaderOfItem][i];
                    if(product.id==idOfItem) {
                        for(let j=1; j<product.deals.length; j++) {
                            const currentProductDeal = product.deals[j];
                            if(this.formatProductDealText(currentProductDeal)===newlySelectedProductDeal) {
                                product.deals.splice(j,1);
                                currentProductDeal.prices = [];
                                product.deals.splice(0, 0, currentProductDeal);
                                return;
                            }
                        }
                    }
                }
            },

            applyPromoCode(promoCode) {
                const promoCodeMatches = this.promoCodes[promoCode];
                const productIdToPromoCodeDiscountMappings = {};
                for(let match of promoCodeMatches) {
                    const productId = match[0];
                    const promoCodeDiscount = match[2];
                    if(productId in productIdToPromoCodeDiscountMappings) {
                        productIdToPromoCodeDiscountMappings[productId].push(promoCodeDiscount)
                    }
                    else {
                        productIdToPromoCodeDiscountMappings[productId] = [promoCodeDiscount]
                    }
                }

                for(let arrivalTextHeader of Object.keys(this.itemsToBeOrderedByUserAsDict)) {
                    for(let i=0; i<this.itemsToBeOrderedByUserAsDict[arrivalTextHeader].length; i++) {
                        const product = this.itemsToBeOrderedByUserAsDict[arrivalTextHeader][i];
                        if(product.productId in productIdToPromoCodeDiscountMappings) {
                            for(let promoCodeDiscount of productIdToPromoCodeDiscountMappings[product.productId]) {
                                product.deals.push({
                                    discount: promoCodeDiscount,
                                    prices: [],
                                    requirement: `PROMO-CODE=${promoCode}`
                                });
                                //later, the biggest-product-deal will be the selected one instead of just adding
                                //each new product-deal to the deals list of the product.
                            }
                        }
                    }
                }
            },


            toggleAddNewDeliveryAddressPopup() {
                this.displayDarkScreen = !this.displayDarkScreen;
                this.displayAddNewDeliveryAddressPopup = !this.displayAddNewDeliveryAddressPopup;
            },

            addNewAddress(newAddress) {
                this.displayDarkScreen = false;
                this.displayAddNewDeliveryAddressPopup = false;
                this.newAddressToAdd = newAddress;
            },

            toggleSelectPickupLocationPopup() {
                this.displayDarkScreen = !this.displayDarkScreen;
                this.displaySelectPickupLocationPopup = !this.displaySelectPickupLocationPopup;
            },

            setPickupLocation(newlySetPickupLocation) {
                this.newlySetPickupLocation = newlySetPickupLocation;
                this.selectedPickupLocation = newlySetPickupLocation;
                this.displaySelectPickupLocationPopup = false;
                this.displayDarkScreen = false;
            },

            receiveSelectedPickupLocation(newlySelectedPickupLocation) {
                this.selectedPickupLocation = newlySelectedPickupLocation;
            },

            convertDistancesFromOneUnitToAnother(desiredUnit) {
                let conversionCoefficient = 1;
                if(desiredUnit==='km') {
                    conversionCoefficient*=1.60934;
                }
                else  {
                    conversionCoefficient*=0.62137;
                }

                this.selectedPickupLocation.distance*=conversionCoefficient;
                this.selectedPickupLocation.distance=parseFloat(this.selectedPickupLocation.distance.toFixed(2));
                this.selectedPickupLocation.distanceUnit = desiredUnit;
                this.newlySetPickupLocation = this.selectedPickupLocation;
            },


            saveDeliveryInstructions(updatedDeliveryInstructions) {
                let addressWithUpdatedDeliveryInstructions = this.addressToAddDeliveryInstructions;
                addressWithUpdatedDeliveryInstructions.deliveryInstructions = updatedDeliveryInstructions;
                this.addressWithUpdatedDeliveryInstructions = addressWithUpdatedDeliveryInstructions;

                this.displayAddDeliveryInstructionsPopup = false;
                this.displayDarkScreen = false;
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

                if(this.selectedPickupLocation!==null) {
                    const originalDistanceUnit = this.selectedPickupLocation.distanceUnit;
                    const newDistanceUnit = newVal==='the United States' ? 'mi' : 'km';
                    if(originalDistanceUnit!==newDistanceUnit) {
                        this.convertDistancesFromOneUnitToAnother(newDistanceUnit);
                    }
                }
            }
        }
    }
</script>