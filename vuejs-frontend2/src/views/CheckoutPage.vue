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
                    @notifyParentToUnselectPickupLocation="unselectPickupLocation" @showAddDeliveryInstructionsPopup="toggleAddDeliveryInstructionsPopup"
                    :addressWithUpdatedDeliveryInstructions="addressWithUpdatedDeliveryInstructions"
                />
                <PaymentSection :authenticatedUsername="authenticatedUsername" @notifyParentOfSelectedCard="receiveSelectedPaymentCard"
                    @showAddPaymentCardPopup="toggleAddPaymentCardPopup" :newCardOfUser="newCardOfUser"
                    :promoCodes="promoCodes" @applyPromoCode="applyPromoCode" @giveParentTheStripeCustomerId="receiveStripeCustomerId"
                />
                <OrderArrivals v-for="(arrivalTextHeader) in arrivalTextHeaders"
                    :key="arrivalTextHeader" :getItAsSoonAs="arrivalTextHeaderToItemListMappings[arrivalTextHeader][0].getItAsSoonAs"
                    :arrivalTextHeader="arrivalTextHeader"
                    :hasPremium="hasPremium" :products="arrivalTextHeaderToItemListMappings[arrivalTextHeader]"
                    @updateItemQuantity="updateItemQuantity" @updateSelectedProductDeal="updateSelectedProductDeal"
                    @productDeliveryDateHasBeenUpdated="updateProductDeliveryDate" :deliveryAreaCountry="deliveryAreaCountry"
                    :selectedDestination="selectedDestination"
                />
                <PlaceYourOrder :orderSubtotal="orderSubtotal" :selectedDeliveryAddress="selectedDeliveryAddress"
                    :selectedPickupLocation="selectedPickupLocation"
                    :selectedPaymentCard="selectedPaymentCard" @placeOrder="toggleOrderHasBeenPlaced"
                />
            </div>
            <SubtotalAndPlaceOrder :itemsSubtotal="itemsSubtotal" :shippingHandlingAndDeliverySubtotal="shippingHandlingAndDeliverySubtotal"
                :taxSubtotal="taxSubtotal" :orderSubtotal="orderSubtotal" :selectedDeliveryAddress="selectedDeliveryAddress" :selectedPickupLocation="selectedPickupLocation"
                :selectedPaymentCard="selectedPaymentCard" @placeOrder="toggleOrderHasBeenPlaced" :quantityTotal="quantityTotal"
                :shippingAndHandlingFeesSavedWithPremium="shippingAndHandlingFeesSavedWithPremium"
                :totalItemDiscounts="totalItemDiscounts" :priceDifferencesFromSchedulingLater="priceDifferencesFromSchedulingLater"
                :hasPremium="hasPremium"
            />
        </div>

        <FooterSection v-if="!orderHasBeenPlaced" @updateDeliveryAreaCountry="updateDeliveryAreaCountry"/>

    </div>

    <img v-if="displayDarkScreen" :src="blackScreen" :style="{opacity: '0.7',
    position: 'absolute', top: '0%', left: '0%', height: '250%', width: '105%', objectFit: 'cover'}">

    <AddPaymentCardPopup v-if="displayAddPaymentCardPopup" @closePopup="toggleAddPaymentCardPopup"
        @addPaymentCard="addPaymentCard" :stripeCustomerId="stripeCustomerId"
    />

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
        @setPickupLocation="setPickupLocation" :deliveryAreaCountry="deliveryAreaCountry"
    />

    <AddDeliveryInstructionsPopup v-if="displayAddDeliveryInstructionsPopup" @closePopup="toggleAddDeliveryInstructionsPopup"
        :addressToAddDeliveryInstructions="addressToAddDeliveryInstructions" @saveDeliveryInstructions="saveDeliveryInstructions"
    />


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
import { v4 as uuidv4 } from 'uuid';

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
                itemsSubtotal: "",
                shippingHandlingAndDeliverySubtotal: "",
                taxSubtotal: "",
                orderSubtotal: "",
                shippingAndHandlingFeesSavedWithPremium: "",
                totalItemDiscounts: "",
                priceDifferencesFromSchedulingLater: "",
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
                arrivalTextHeaderToItemListMappings: {},
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
                addressWithUpdatedDeliveryInstructions: null,
                notifyOfSelectedAddressBecomingUnselected: 0,
                selectedCartItems: null,
                selectedDestination: {type: null, data: null},
                /*
                    in the dict above, type is either 'delivery', 'pickup', or null. data is the actual
                    selectedDeliveryAddress/selectedPickupLocation if applicable, null otherwise.
                */
                orderId: "",
                displayOrderCancelErrorMessage: false,
                orderCancelErrorMessage: "",
                dataOfOrderedCartItems: null,
                stripeCustomerId: null
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

        mounted() {
            document.title = "Checkout";
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


                let selectedCartItems = localStorage.getItem('selectedCartItems');
                if(selectedCartItems==null) {
                    return;
                }
                let itemsToBeOrderedByUser = JSON.parse(selectedCartItems);
                this.selectedCartItems = JSON.parse(selectedCartItems);
                //above is a dict with two keys: 'fetchDateTime' & 'data'
                if(itemsToBeOrderedByUser.data.length==0) {
                    return;
                }

                const productIdToOptionsListMappings = {};
                for(let item of itemsToBeOrderedByUser.data) {
                    if(!(item.productId in productIdToOptionsListMappings)) {
                        productIdToOptionsListMappings[item.productId] = []
                    }
                    productIdToOptionsListMappings[item.productId].push(item.optionsWithoutText);
                }
                const productIds = Object.keys(productIdToOptionsListMappings);

                const response1 = await fetch('http://localhost:8027/api/getProductsThatDeliverToLocation', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        zipcode: this.deliveryZipcode,
                        country: this.deliveryAreaCountry
                    })
                });
                if(!response1.ok) {
                    throw new Error('Network response not ok');
                }
                let idsOfProductsAvailableToUser = await response1.json();
                idsOfProductsAvailableToUser = idsOfProductsAvailableToUser.map(x=>x.productId);
                idsOfProductsAvailableToUser = new Set(idsOfProductsAvailableToUser);

                let shdPriceAndTaxAndFastestDeliveryTimeOfProducts = {};
                if(this.selectedDeliveryAddress!==null) {
                    const response2 = await fetch('http://localhost:8029/getFactoryAddressesAndShippingPricesAndTaxesAndShortestDeliveryTimesOfProducts', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            hasPremium: this.hasPremium,
                            productIds: productIds,
                            destinationAddress: this.selectedDeliveryAddress.addressText
                        })
                    });
                    if(!response2.ok) {
                        throw new Error('Network response not ok');
                    }
                    shdPriceAndTaxAndFastestDeliveryTimeOfProducts = await response2.json();
                    /*
                    above is a dict where keys are productIds in the the list productIds and values are dicts
                    structured like the following:
                        {
                            factoryAddress: "1234 Industrial Park Road, Building 5, Suite 200, Springfield, IL 62704, United States",
                            fastestDeliveryTimeInHours: 120,
                            shdPrice: 40,
                            shdPriceSavedWithPremium: 15,
                            taxRate: 3.8
                        }
                    
                    'shdPrice' stands for shippingHandlingDeliveryPrice for a single product, and 'shdPriceSavedWithPremium'
                    is present if this.hasPremium is true. Furthermore, taxRate is a percentage on the shdPrice
                    and represents the tax to be collected for the shippingHandlingAndDelivery of the product as well as the product itself.
                    */
                }
                else {
                    for(let productId of productIds) {
                        shdPriceAndTaxAndFastestDeliveryTimeOfProducts[productId] = {
                            factoryAddress: "",
                            fastestDeliveryTimeInHours: 0,
                            shdPrice: 0,
                            taxRate: 0
                        };
                        if(this.hasPremium) {
                            shdPriceAndTaxAndFastestDeliveryTimeOfProducts[productId].shdPriceSavedWithPremium = 0;
                        }
                    }
                }
                
                const currentDateTime = new Date();
                const fetchDateTime = itemsToBeOrderedByUser.fetchDateTime;
                itemsToBeOrderedByUser = itemsToBeOrderedByUser.data;
                if(currentDateTime-new Date(fetchDateTime)>(60 * 60 * 1000)) {
                    const selectedCartItemsInfo = {}; //keys are selected cart-item-ids(not their productIds) and values are dicts that represent relevant info about the cartItem selected for checkout
                    for(let item of itemsToBeOrderedByUser) {
                        const id = item.id;
                        const productId = item.productId;
                        const optionsWithoutText = item.optionsWithoutText;
                        selectedCartItemsInfo[id] = {
                            productId: productId,
                            options: optionsWithoutText
                        };
                    }
                    
                    const response0 = await fetch('http://localhost:8022/getNamesAndSpecificPricesOfGivenProducts', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            productIdToOptionsListMappings: productIdToOptionsListMappings
                        })
                    });
                    if(!response0.ok) {
                        throw new Error('Network response not ok');
                    }
                    const dictOfNamesAndPricesOfCartItems = await response0.json();
                    /*
                    above is a dict where keys are productIds of selected items in cart and
                    values are lists of lists of 3 or 5 elements: first is the options of that product,
                    second is the product-name, third is the price of the product with
                    the given options, and fourth & fifth(these two are missing for certain products)
                    are the price per unit of the product with the given options.

                    an examples of a value of this dict is:
                    [
                        [{Size: 0, Color: 2}, "Product-Name", "$35"],
                        [{Size: 1, 'Color': 0}, "Product-Name", "$20", "$2" "oz"]
                    ]
                    */

                    for(let itemIdNotProductId of Object.keys(selectedCartItemsInfo)) {
                        const productId = selectedCartItemsInfo[itemIdNotProductId].productId;
                        const options = selectedCartItemsInfo[itemIdNotProductId].options;
                        const allNamesAndPricesOfCurrProductId = dictOfNamesAndPricesOfCartItems[productId];
                        let indexCorrespondingToCurrCartItemOptions = 0;
                        for(let i=0; i<allNamesAndPricesOfCurrProductId.length; i++) {
                            if(this.areDictsEqual(allNamesAndPricesOfCurrProductId[i][0],options)) {
                                indexCorrespondingToCurrCartItemOptions = i;
                                break;
                            }
                        }
                        selectedCartItemsInfo[itemIdNotProductId].productName = allNamesAndPricesOfCurrProductId[indexCorrespondingToCurrCartItemOptions][1];
                        selectedCartItemsInfo[itemIdNotProductId].productPrice =  allNamesAndPricesOfCurrProductId[indexCorrespondingToCurrCartItemOptions][2];
                        if(allNamesAndPricesOfCurrProductId[indexCorrespondingToCurrCartItemOptions].length>3) {
                            selectedCartItemsInfo[itemIdNotProductId].productPricePerUnit = allNamesAndPricesOfCurrProductId[indexCorrespondingToCurrCartItemOptions][3]+"/"+allNamesAndPricesOfCurrProductId[indexCorrespondingToCurrCartItemOptions][4];
                        }
                        else {
                            selectedCartItemsInfo[itemIdNotProductId].productPricePerUnit = null;
                        }
                    }

                    const response = await fetch('http://localhost:8026/getNumProductsLeftForListOfProducts', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(productIds)
                    });
                    if(!response.ok) {
                        throw new Error('Network response not ok');
                    }
                    const numProductsLeftForListOfProducts = await response.json();

                    const response1 = await fetch('http://localhost:8030/getPairsOfProductIdsAndOptionsOfThoseInStock', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            numProductsLeftForListOfProducts: numProductsLeftForListOfProducts,
                            productIdToOptionsListMappings: productIdToOptionsListMappings
                        })
                    });
                    if(!response1.ok) {
                        throw new Error('Network response not ok');
                    }
                    let productIdToInStockOptionsMappings = await response1.json();
                    /*
                    above is a dict where keys are productIds of selected-cart-items and values are
                    lists of options of the product that are in the cart and in-stock.
                    */

                    for(let itemIdNotProductId of Object.keys(selectedCartItemsInfo)) {
                        const productId = selectedCartItemsInfo[itemIdNotProductId].productId;
                        const options = selectedCartItemsInfo[itemIdNotProductId].options;
                        selectedCartItemsInfo[itemIdNotProductId].inStock = productIdToInStockOptionsMappings[productId].some(
                            (opts) => this.areDictsEqual(opts, options)
                        );
                    }

                    const response3 = await fetch('http://localhost:8030/getProductDealsForMany', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            productIds: productIds
                        })
                    });
                    if(!response3.ok) {
                        throw new Error('Network response not ok');
                    }
                    const productIdToDealsMapping = await response3.json();
                    /*
                        above is a dict where keys are productIds in the list productIds,
                        & values are lists of elements like the following:
                        {
                            deal: '50% off',
                            required: 'PREMIUM'
                        }
                    */

                    const idToStatusMappings = {};
                    for(let item of itemsToBeOrderedByUser) {
                        if(selectedCartItemsInfo[item.id].inStock==false) {
                            idToStatusMappings[item.id] = 'Out of stock';
                        }
                        else if((idsOfProductsAvailableToUser.has(item.productId)) || (this.selectedDeliveryAddress==null)) {
                            idToStatusMappings[item.id] = 'Available';
                        }
                        else {
                            idToStatusMappings[item.id] = 'Does not deliver to selected address';
                        }
                    }

                    for(let i=0; i<itemsToBeOrderedByUser.length; i++) {
                        const currItem = itemsToBeOrderedByUser[i];
                        const newItem = {
                            id: currItem.id,
                            productId: currItem.productId,
                            productImage: currItem.productImage,
                            productName: selectedCartItemsInfo[currItem.id].productName,
                            productOptions: currItem.options,
                            productOptionsWithoutText: currItem.optionsWithoutText,
                            status: idToStatusMappings[currItem.id],
                            quantity: currItem.quantity,
                        };


                        let currentCurrency = "$";
                        const targetCurrency = this.countryCurrencyMap[this.deliveryAreaCountry];

                        newItem.getItAsSoonAs = shdPriceAndTaxAndFastestDeliveryTimeOfProducts[currItem.productId].fastestDeliveryTimeInHours;
                        newItem.factoryAddress = shdPriceAndTaxAndFastestDeliveryTimeOfProducts[currItem.productId].factoryAddress;

                        if(currentCurrency===targetCurrency) {
                            newItem.shippingAndHandlingPrice = "$"+shdPriceAndTaxAndFastestDeliveryTimeOfProducts[currItem.productId].shdPrice;
                            newItem.tax = "$"+(shdPriceAndTaxAndFastestDeliveryTimeOfProducts[currItem.productId].taxRate/100 * shdPriceAndTaxAndFastestDeliveryTimeOfProducts[currItem.productId].shdPrice);
                            if(this.hasPremium) {
                                newItem.shdPriceSavedWithPremium = "$"+shdPriceAndTaxAndFastestDeliveryTimeOfProducts[currItem.productId].shdPriceSavedWithPremium;
                            }
                            newItem.productPrice = selectedCartItemsInfo[currItem.id].productPrice;
                            newItem.productPricePerUnit = selectedCartItemsInfo[currItem.id].productPricePerUnit;
                        }
                        else {
                            let shippingAndHandlingPrice = shdPriceAndTaxAndFastestDeliveryTimeOfProducts[currItem.productId].shdPrice;
                            shippingAndHandlingPrice/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                            shippingAndHandlingPrice*=this.currencyToDollarMap[targetCurrency]; //convert from USD to targetCurrency
                            newItem.shippingAndHandlingPrice= targetCurrency+shippingAndHandlingPrice.toFixed(2);

                            let tax = (shdPriceAndTaxAndFastestDeliveryTimeOfProducts[currItem.productId].taxRate/100 * shdPriceAndTaxAndFastestDeliveryTimeOfProducts[currItem.productId].shdPrice);
                            tax/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                            tax*=this.currencyToDollarMap[targetCurrency]; //convert from USD to targetCurrency
                            newItem.tax= targetCurrency+tax.toFixed(2);

                            if(this.hasPremium) {
                                let shdPriceSavedWithPremium = shdPriceAndTaxAndFastestDeliveryTimeOfProducts[currItem.productId].shdPriceSavedWithPremium;
                                shdPriceSavedWithPremium/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                                shdPriceSavedWithPremium*=this.currencyToDollarMap[targetCurrency]; //convert from USD to targetCurrency
                                newItem.shdPriceSavedWithPremium= targetCurrency+shdPriceSavedWithPremium.toFixed(2);
                            }

                            let productPrice = parseFloat(selectedCartItemsInfo[currItem.id].productPrice.substring(currentCurrency.length));
                            productPrice/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                            productPrice*=this.currencyToDollarMap[targetCurrency]; //convert from USD to targetCurrency
                            newItem.productPrice= targetCurrency+productPrice.toFixed(2);

                            if(selectedCartItemsInfo[currItem.id].productPricePerUnit!==null) {
                                let indexOfSeparator = selectedCartItemsInfo[currItem.id].productPricePerUnit.indexOf("/");
                                let currItemPricePerUnit = selectedCartItemsInfo[currItem.id].productPricePerUnit.substring(0, indexOfSeparator);
                                currItemPricePerUnit = parseFloat(currItemPricePerUnit.substring(currentCurrency.length));
                                currItemPricePerUnit/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                                currItemPricePerUnit*=this.currencyToDollarMap[targetCurrency]; //convert from USD to targetCurrency
                                newItem.productPricePerUnit = targetCurrency+currItemPricePerUnit.toFixed(2)+ selectedCartItemsInfo[currItem.id].productPricePerUnit.substring(indexOfSeparator);
                            }
                            else {
                                newItem.productPricePerUnit = null;
                            }
                        }
                        
                        let dealsOfProduct = productIdToDealsMapping[currItem.productId];
                        const deals = [];
                        let indexOfBestDeal = -1;
                        let amountSavedFromBestDeal = 0;
                        currentCurrency = this.countryCurrencyMap[this.deliveryAreaCountry];
                        for(let i=0; i<dealsOfProduct.length; i++) {
                            const deal = dealsOfProduct[i];
                            const pricesArray = this.getPricesAsResultOfDeal(deal.deal, currItem.quantity, parseFloat(newItem.productPrice.substring(currentCurrency.length)), currentCurrency);
                            deals.push({
                                discount: deal.deal,
                                prices: pricesArray,
                                requirement: deal.required
                            })

                            if(this.hasPremium==false && deal.required==='PREMIUM') {
                                continue;
                            }
                            let amountSaved = 0;
                            if(pricesArray.length==3) {
                                amountSaved+=parseFloat(pricesArray[2].substring(currentCurrency.length));
                            }
                            if(indexOfBestDeal==-1 || amountSaved>amountSavedFromBestDeal) {
                                indexOfBestDeal = i;
                                amountSavedFromBestDeal = amountSaved;
                            }
                        }
                        
                        if(indexOfBestDeal>0) {
                            const bestDeal = deals[indexOfBestDeal];
                            deals.splice(indexOfBestDeal, 1);
                            deals.splice(0,0,bestDeal);
                        }
                        newItem.deals = deals;

                        itemsToBeOrderedByUser[i] = newItem;
                    }
                    
                }
                else {
                    const idToStatusMappings = {};
                    for(let item of itemsToBeOrderedByUser) {
                        if(item.inStock==false) {
                            idToStatusMappings[item.id] = 'Out of stock';
                        }
                        else if((idsOfProductsAvailableToUser.has(item.productId)) || (this.selectedDeliveryAddress==null)) {
                            idToStatusMappings[item.id] = 'Available';
                        }
                        else {
                            idToStatusMappings[item.id] = 'Does not deliver to selected address';
                        }
                    }

                    const response3 = await fetch('http://localhost:8030/getProductDealsForMany', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            productIds: productIds
                        })
                    });
                    if(!response3.ok) {
                        throw new Error('Network response not ok');
                    }
                    const productIdToDealsMapping = await response3.json();
                    /*
                        above is a dict where keys are productIds in the list productIds,
                        & values are lists of elements like the following:
                        {
                            deal: '50% off',
                            required: 'PREMIUM'
                        }
                    */


                    for(let i=0; i<itemsToBeOrderedByUser.length; i++) {
                        const currItem = itemsToBeOrderedByUser[i];
                        const newItem = {
                            id: currItem.id,
                            productId: currItem.productId,
                            productImage: currItem.productImage,
                            productName: currItem.productName,
                            productPrice: currItem.productPrice,
                            productPricePerUnit: currItem.productPricePerUnit,
                            productOptions: currItem.options,
                            productOptionsWithoutText: currItem.optionsWithoutText,
                            status: idToStatusMappings[currItem.id],
                            quantity: currItem.quantity,
                        };

                        newItem.getItAsSoonAs = shdPriceAndTaxAndFastestDeliveryTimeOfProducts[currItem.productId].fastestDeliveryTimeInHours;
                        newItem.factoryAddress = shdPriceAndTaxAndFastestDeliveryTimeOfProducts[currItem.productId].factoryAddress;

                        let currentCurrency = "$";
                        const targetCurrency = this.countryCurrencyMap[this.deliveryAreaCountry];

                        if(currentCurrency===targetCurrency) {
                            newItem.shippingAndHandlingPrice = "$"+shdPriceAndTaxAndFastestDeliveryTimeOfProducts[currItem.productId].shdPrice;
                            newItem.tax = "$"+(shdPriceAndTaxAndFastestDeliveryTimeOfProducts[currItem.productId].taxRate/100 * shdPriceAndTaxAndFastestDeliveryTimeOfProducts[currItem.productId].shdPrice);
                            if(this.hasPremium) {
                                newItem.shdPriceSavedWithPremium = "$"+shdPriceAndTaxAndFastestDeliveryTimeOfProducts[currItem.productId].shdPriceSavedWithPremium;
                            }
                        }
                        else {
                            let shippingAndHandlingPrice = shdPriceAndTaxAndFastestDeliveryTimeOfProducts[currItem.productId].shdPrice;
                            shippingAndHandlingPrice/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                            shippingAndHandlingPrice*=this.currencyToDollarMap[targetCurrency]; //convert from USD to targetCurrency
                            newItem.shippingAndHandlingPrice= targetCurrency+shippingAndHandlingPrice.toFixed(2);

                            let tax = (shdPriceAndTaxAndFastestDeliveryTimeOfProducts[currItem.productId].taxRate/100 * shdPriceAndTaxAndFastestDeliveryTimeOfProducts[currItem.productId].shdPrice);
                            tax/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                            tax*=this.currencyToDollarMap[targetCurrency]; //convert from USD to targetCurrency
                            newItem.tax= targetCurrency+tax.toFixed(2);

                            if(this.hasPremium) {
                                let shdPriceSavedWithPremium = shdPriceAndTaxAndFastestDeliveryTimeOfProducts[currItem.productId].shdPriceSavedWithPremium;
                                shdPriceSavedWithPremium/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                                shdPriceSavedWithPremium*=this.currencyToDollarMap[targetCurrency]; //convert from USD to targetCurrency
                                newItem.shdPriceSavedWithPremium= targetCurrency+shdPriceSavedWithPremium.toFixed(2);
                            }
                        }
                    
                        let dealsOfProduct = productIdToDealsMapping[currItem.productId];
                        const deals = [];
                        let indexOfBestDeal = -1;
                        let amountSavedFromBestDeal = 0;
                        currentCurrency = this.countryCurrencyMap[this.deliveryAreaCountry];
                        for(let i=0; i<dealsOfProduct.length; i++) {
                            const deal = dealsOfProduct[i];
                            const pricesArray = this.getPricesAsResultOfDeal(deal.deal, currItem.quantity, parseFloat(currItem.productPrice.substring(currentCurrency.length)), currentCurrency);
                            deals.push({
                                discount: deal.deal,
                                prices: pricesArray,
                                requirement: deal.required
                            })

                            if(this.hasPremium==false && deal.required==='PREMIUM') {
                                continue;
                            }
                            let amountSaved = 0;
                            if(pricesArray.length==3) {
                                amountSaved+=parseFloat(pricesArray[2].substring(currentCurrency.length));
                            }
                            if(indexOfBestDeal==-1 || amountSaved>amountSavedFromBestDeal) {
                                indexOfBestDeal = i;
                                amountSavedFromBestDeal = amountSaved;
                            }
                        }
                        
                        if(indexOfBestDeal>0) {
                            const bestDeal = deals[indexOfBestDeal];
                            deals.splice(indexOfBestDeal, 1);
                            deals.splice(0,0,bestDeal);
                        }
                        newItem.deals = deals;

                        itemsToBeOrderedByUser[i] = newItem;
                    }
                }

                itemsToBeOrderedByUser = itemsToBeOrderedByUser.sort((a,b) => a.getItAsSoonAs - b.getItAsSoonAs);

                const arrivalTextHeaderToItemListMappings = {};
                /* in the dict above, keys are the values like "Arriving Nov 28, 2024"
                and values are lists of products with that delivery-time */

                const currentCurrency = this.countryCurrencyMap[this.deliveryAreaCountry];
                let itemsSubtotal = 0;
                let shippingHandlingAndDeliverySubtotal = 0;
                let taxSubtotal = 0;
                let shippingAndHandlingFeesSavedWithPremium = 0;
                let totalItemDiscounts = 0;
                let quantityTotal = 0;
                let arrivalTextHeaders = [];
                let productIdToProductNameMappings = {};

                for(let item of itemsToBeOrderedByUser) {
                    const arrivalTextHeader = this.formatArrivalTextHeader(item.getItAsSoonAs);
                    if(arrivalTextHeader in arrivalTextHeaderToItemListMappings) {
                        arrivalTextHeaderToItemListMappings[arrivalTextHeader].push(item);
                    }
                    else {
                        arrivalTextHeaderToItemListMappings[arrivalTextHeader] = [item];
                        arrivalTextHeaders.push(arrivalTextHeader);
                    }

                    if(item.status==='Available') {
                        quantityTotal+=item.quantity;
                        itemsSubtotal+=parseFloat(item.productPrice.substring(currentCurrency.length))*item.quantity;
                        shippingHandlingAndDeliverySubtotal+=parseFloat(item.shippingAndHandlingPrice.substring(currentCurrency.length))*item.quantity;
                        taxSubtotal+=parseFloat(item.tax.substring(currentCurrency.length))*item.quantity;

                        if(this.hasPremium) {
                            shippingAndHandlingFeesSavedWithPremium+=parseFloat(item.shdPriceSavedWithPremium.substring(currentCurrency.length))*item.quantity;
                        }

                        if(item.deals.length>0 && item.deals[0].prices.length==3) {
                            if((this.hasPremium==false && item.deals[0].requirement==='PREMIUM')==false) {
                                totalItemDiscounts+=parseFloat(item.deals[0].prices[2].substring(currentCurrency.length));
                            }
                        }
                    }
                    productIdToProductNameMappings[item.productId] = item.productName;
                }
                    

                this.arrivalTextHeaderToItemListMappings = arrivalTextHeaderToItemListMappings;
                this.arrivalTextHeaders = arrivalTextHeaders;
                this.quantityTotal = quantityTotal;

                this.itemsSubtotal= currentCurrency+itemsSubtotal.toFixed(2);
                this.shippingHandlingAndDeliverySubtotal = currentCurrency+shippingHandlingAndDeliverySubtotal.toFixed(2);
                this.shippingAndHandlingFeesSavedWithPremium = currentCurrency+shippingAndHandlingFeesSavedWithPremium.toFixed(2);
                this.taxSubtotal = currentCurrency+taxSubtotal.toFixed(2);
                this.totalItemDiscounts = currentCurrency+totalItemDiscounts.toFixed(2);
                this.priceDifferencesFromSchedulingLater = `${currentCurrency}0.00`;
                this.orderSubtotal = this.getTotal(
                    this.itemsSubtotal,
                    this.shippingHandlingAndDeliverySubtotal,
                    this.taxSubtotal,
                    this.shippingAndHandlingFeesSavedWithPremium,
                    this.totalItemDiscounts,
                    this.priceDifferencesFromSchedulingLater
                );

                const promoCodeDealsResponse = await fetch('http://localhost:8030/getPromoCodeDealsForListOfProducts', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        productIds: Object.keys(productIdToProductNameMappings)
                    })
                });
                if(!promoCodeDealsResponse.ok) {
                    throw new Error('Network response not ok');
                }
                let promoCodes = await promoCodeDealsResponse.json();
                /*
                    above is a dict where keys are valid promo-codes and values are lists of elems in the following structure:
                    [productId, discount] i.e: [productId1, "35% off"] or [productId2, "3 for 1"], or [productId2, "Buy 10, Get 11th one 36% off"], etc.
                */
            
                for(let promoCode of Object.keys(promoCodes)) {
                    const promoCodeMatches = promoCodes[promoCode];
                    for(let i=0; i<promoCodeMatches.length; i++) {
                        promoCodeMatches[i] = [promoCodeMatches[i][0], productIdToProductNameMappings[promoCodeMatches[i][0]], promoCodeMatches[i][1]]
                    }
                }
                this.promoCodes = promoCodes;
            },

            async updateDataForSelectedDeliveryAddressOrPickupLocation() {
                const productIds = [];
                let itemsToBeOrderedByUser = [];
                let arrivalTextHeaderToItemListMappings = {...this.arrivalTextHeaderToItemListMappings};

                for(let arrivalTextHeader of Object.keys(arrivalTextHeaderToItemListMappings)) {
                    for(let item of arrivalTextHeaderToItemListMappings[arrivalTextHeader]) {
                        itemsToBeOrderedByUser.push(item);
                        productIds.push(item.productId);
                    }
                }
                
                let shdPriceAndTaxAndFastestDeliveryTimeOfProducts = {};
                /*
                    above is a dict where keys are to be productIds in the the list productIds and values are to be dicts
                    structured like the following:
                        {
                            factoryAddress: "1234 Industrial Park Road, Building 5, Suite 200, Springfield, IL 62704, United States",
                            fastestDeliveryTimeInHours: 120,
                            shdPrice: 40,
                            shdPriceSavedWithPremium: 15,
                            tax: 3.8
                        }
                    
                    'shdPrice' stands for shippingHandlingDeliveryPrice for a single product, and 'shdPriceSavedWithPremium'
                    is present if this.hasPremium is true.
                */
            
                const currency = this.countryCurrencyMap[this.deliveryAreaCountry];
                if(this.selectedDeliveryAddress!==null || this.selectedPickupLocation!==null) {
                    const response = await fetch('http://localhost:8029/getFactoryAddressesAndShippingPricesAndTaxesAndShortestDeliveryTimesOfProducts', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            hasPremium: this.hasPremium,
                            productIds: productIds,
                            destinationAddress: this.selectedDeliveryAddress!==null ? this.selectedDeliveryAddress.addressText : this.selectedPickupLocation.pickupLocationAddress
                        })
                    });
                    if(!response.ok) {
                        throw new Error('Network response not ok');
                    }
                    shdPriceAndTaxAndFastestDeliveryTimeOfProducts = await response.json();
                    if(this.deliveryAreaCountry!=="the United States") {
                        for(let productId of Object.keys(shdPriceAndTaxAndFastestDeliveryTimeOfProducts)) {
                            const currValue = shdPriceAndTaxAndFastestDeliveryTimeOfProducts[productId];

                            let shdPrice = currValue.shdPrice;
                            shdPrice/=this.currencyToDollarMap["$"];
                            shdPrice*=this.currencyToDollarMap[currency];

                            let shdPriceSavedWithPremium;
                            if(this.hasPremium) {
                                shdPriceSavedWithPremium = currValue.shdPriceSavedWithPremium;
                                shdPriceSavedWithPremium/=this.currencyToDollarMap["$"];
                                shdPriceSavedWithPremium*=this.currencyToDollarMap[currency];
                            }

                            let tax = (currValue.taxRate/100 * currValue.shdPrice);
                            tax/=this.currencyToDollarMap["$"];
                            tax*=this.currencyToDollarMap[currency];

                            shdPriceAndTaxAndFastestDeliveryTimeOfProducts[productId] = {
                                factoryAddress: currValue.factoryAddress,
                                fastestDeliveryTimeInHours: currValue.fastestDeliveryTimeInHours,
                                shdPrice: shdPrice,
                                tax: tax
                            };
                            if(this.hasPremium) {
                                shdPriceAndTaxAndFastestDeliveryTimeOfProducts[productId].shdPriceSavedWithPremium = shdPriceSavedWithPremium;
                            }
                        }
                    }
                    else {
                        for(let productId of Object.keys(shdPriceAndTaxAndFastestDeliveryTimeOfProducts)) {
                            const currValue = shdPriceAndTaxAndFastestDeliveryTimeOfProducts[productId];
                            let tax = (currValue.taxRate/100 * currValue.shdPrice);
                            shdPriceAndTaxAndFastestDeliveryTimeOfProducts[productId].tax = tax;
                        }
                    }
                }
                else {
                    for(let productId of productIds) {
                        shdPriceAndTaxAndFastestDeliveryTimeOfProducts[productId] = {
                            factoryAddress: "",
                            fastestDeliveryTimeInHours: 0,
                            shdPrice: 0,
                            tax: 0
                        };
                        if(this.hasPremium) {
                            shdPriceAndTaxAndFastestDeliveryTimeOfProducts[productId].shdPriceSavedWithPremium = 0;
                        }
                    }
                }

                const response1 = await fetch('http://localhost:8027/api/getProductsThatDeliverToLocation', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        zipcode: this.deliveryZipcode,
                        country: this.deliveryAreaCountry
                    })
                });
                if(!response1.ok) {
                    throw new Error('Network response not ok');
                }
                let idsOfProductsAvailableToUser = await response1.json();
                idsOfProductsAvailableToUser = idsOfProductsAvailableToUser.map(x=>x.productId);
                idsOfProductsAvailableToUser = new Set(idsOfProductsAvailableToUser);
                
                let itemsSubtotal = 0;
                let shippingHandlingAndDeliverySubtotal = 0;
                let taxSubtotal = 0;
                let shippingAndHandlingFeesSavedWithPremium = 0;
                let totalItemDiscounts = 0;
                let quantityTotal = 0;
                const arrivalTextHeaders = [];
                arrivalTextHeaderToItemListMappings = {};
                itemsToBeOrderedByUser = itemsToBeOrderedByUser.map(item => ({
                    ...item,
                    getItAsSoonAs: shdPriceAndTaxAndFastestDeliveryTimeOfProducts[item.productId].fastestDeliveryTimeInHours
                }));
                itemsToBeOrderedByUser = itemsToBeOrderedByUser.sort((a,b) => a.getItAsSoonAs - b.getItAsSoonAs);

                for(let item of itemsToBeOrderedByUser) {
                    delete item.deliveryDate;
                    const arrivalTextHeader = this.formatArrivalTextHeader(item.getItAsSoonAs);
                    if(arrivalTextHeader in arrivalTextHeaderToItemListMappings) {
                        arrivalTextHeaderToItemListMappings[arrivalTextHeader].push(item);
                    }
                    else {
                        arrivalTextHeaderToItemListMappings[arrivalTextHeader] = [item];
                        arrivalTextHeaders.push(arrivalTextHeader);
                    }

                    if(item.status==='Out of stock') {
                        //do nothing here
                    }
                    else if((idsOfProductsAvailableToUser.has(item.productId)) || (this.selectedDeliveryAddress==null && this.selectedPickupLocation==null)) {
                        item.status = 'Available';
                    }
                    else {
                        if(this.selectedDeliveryAddress!==null) {
                            item.status = 'Does not deliver to selected address';
                        }
                        else {
                            item.status = 'Does not deliver to selected pickup-location';
                        }
                    }
                    item.shippingAndHandlingPrice = currency+shdPriceAndTaxAndFastestDeliveryTimeOfProducts[item.productId].shdPrice;
                    item.tax = currency+shdPriceAndTaxAndFastestDeliveryTimeOfProducts[item.productId].tax;
                    if(this.hasPremium) {
                        item.shdPriceSavedWithPremium = currency+shdPriceAndTaxAndFastestDeliveryTimeOfProducts[item.productId].shdPriceSavedWithPremium;
                    }
                    if(item.status==='Available') {
                        quantityTotal+=item.quantity;
                        itemsSubtotal+=parseFloat(item.productPrice.substring(currency.length))*item.quantity;
                        shippingHandlingAndDeliverySubtotal+=shdPriceAndTaxAndFastestDeliveryTimeOfProducts[item.productId].shdPrice*item.quantity;
                        taxSubtotal+=shdPriceAndTaxAndFastestDeliveryTimeOfProducts[item.productId].tax*item.quantity;
                        if(this.hasPremium) {
                            shippingAndHandlingFeesSavedWithPremium+=shdPriceAndTaxAndFastestDeliveryTimeOfProducts[item.productId].shdPriceSavedWithPremium*item.quantity;
                        }
                        if(item.deals.length>0 && item.deals[0].prices.length==3) {
                            if((this.hasPremium==false && item.deals[0].requirement==='PREMIUM')==false) {
                                totalItemDiscounts+=parseFloat(item.deals[0].prices[2].substring(currency.length));
                            }
                        }
                    }
                }

                this.arrivalTextHeaders = [...arrivalTextHeaders];
                this.arrivalTextHeaderToItemListMappings = {...arrivalTextHeaderToItemListMappings};
                
                this.quantityTotal = quantityTotal;
                this.itemsSubtotal = currency+itemsSubtotal.toFixed(2);
                this.totalItemDiscounts = currency+totalItemDiscounts.toFixed(2);
                this.shippingHandlingAndDeliverySubtotal = currency+shippingHandlingAndDeliverySubtotal.toFixed(2);
                this.taxSubtotal = currency+taxSubtotal.toFixed(2);
                this.shippingAndHandlingFeesSavedWithPremium = currency+shippingAndHandlingFeesSavedWithPremium.toFixed(2);
                this.priceDifferencesFromSchedulingLater = currency+'0.00';
                this.orderSubtotal = this.getTotal(
                    this.itemsSubtotal,
                    this.shippingHandlingAndDeliverySubtotal,
                    this.taxSubtotal,
                    this.shippingAndHandlingFeesSavedWithPremium,
                    this.totalItemDiscounts,
                    this.priceDifferencesFromSchedulingLater
                );
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
                    for(let product of this.arrivalTextHeaderToItemListMappings[arrivalTextHeader]) {
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

                        if('deliveryDate' in product) {
                            let priceDifference = product.deliveryDate[2];
                            let firstChar = priceDifference[0]; //either '+' or '-'
                            priceDifference = parseFloat(priceDifference.substring(1));
                            priceDifference/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                            priceDifference*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                            product.deliveryDate[2] = firstChar+priceDifference.toFixed(2);

                            let shdPriceDifference = product.deliveryDate[4];
                            firstChar = shdPriceDifference[0]; //either '+' or '-'
                            shdPriceDifference = parseFloat(shdPriceDifference.substring(1));
                            shdPriceDifference/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                            shdPriceDifference*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                            product.deliveryDate[4] = firstChar+shdPriceDifference.toFixed(2);

                            let taxDifference = product.deliveryDate[5];
                            firstChar = taxDifference[0]; //either '+' or '-'
                            taxDifference = parseFloat(taxDifference.substring(1));
                            taxDifference/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                            taxDifference*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                            product.deliveryDate[5] = firstChar+taxDifference.toFixed(2);

                            if(this.hasPremium) {
                                let shdPriceSavedForPremiumDifference = product.deliveryDate[6];
                                firstChar = shdPriceSavedForPremiumDifference[0]; //either '+' or '-'
                                shdPriceSavedForPremiumDifference = parseFloat(shdPriceSavedForPremiumDifference.substring(1));
                                shdPriceSavedForPremiumDifference/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                                shdPriceSavedForPremiumDifference*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                                product.deliveryDate[6] = firstChar+shdPriceSavedForPremiumDifference.toFixed(2);
                            }

                        }
                    }
                }

                if(this.selectedCartItems!==null) {
                    let data = this.selectedCartItems.data;
                    for(let i=0; i<data.length; i++) {
                        let itemPrice = parseFloat(data[i].productPrice.substring(currentCurrency.length));
                        itemPrice/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                        itemPrice*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                        data[i].productPrice = newCurrency+itemPrice.toFixed(2);

                        if(data[i].productPricePerUnit!==null) {
                            const indexOfSeparator = data[i].productPricePerUnit.indexOf("/");
                            const perUnitSection = data[i].productPricePerUnit.substring(indexOfSeparator);
                            let priceSection = data[i].productPricePerUnit.substring(0, indexOfSeparator);
                            priceSection = parseFloat(priceSection.substring(currentCurrency.length));
                            priceSection/=this.currencyToDollarMap[currentCurrency];
                            priceSection*=this.currencyToDollarMap[newCurrency];
                            data[i].productPricePerUnit= newCurrency+priceSection.toFixed(2)+perUnitSection;
                        }
                    }

                    localStorage.setItem("selectedCartItems",
                        JSON.stringify({
                            fetchDateTime: this.selectedCartItems.fetchDateTime,
                            data: data
                        })
                    );
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

                let priceDifferencesFromSchedulingLater = parseFloat(this.priceDifferencesFromSchedulingLater.substring(currentCurrency.length));
                priceDifferencesFromSchedulingLater/=this.currencyToDollarMap[currentCurrency];
                priceDifferencesFromSchedulingLater*=this.currencyToDollarMap[newCurrency];
                this.priceDifferencesFromSchedulingLater = newCurrency+priceDifferencesFromSchedulingLater.toFixed(2);

                let orderSubtotal = parseFloat(this.orderSubtotal.substring(currentCurrency.length));
                orderSubtotal/=this.currencyToDollarMap[currentCurrency];
                orderSubtotal*=this.currencyToDollarMap[newCurrency];
                this.orderSubtotal = newCurrency+orderSubtotal.toFixed(2);
            },

            async receiveSelectedDeliveryAddress(selectedDeliveryAddressInfo) {
                this.selectedDeliveryAddress = selectedDeliveryAddressInfo[1];

                if(selectedDeliveryAddressInfo[0]==='CHANGED') {
                    const selectedDeliveryAddress = this.selectedDeliveryAddress;
                    let patchRequestBody = {};
                    
                    if(selectedDeliveryAddress==null) {
                        patchRequestBody = {
                            hasPremium: this.hasPremium,
                            deliveryAreaCountry: this.deliveryAreaCountry,
                            townOrCity: null,
                            zipCode: null
                        };
                    }
                    else {
                        patchRequestBody = {
                            hasPremium: this.hasPremium,
                            deliveryAreaCountry: selectedDeliveryAddress.country,
                            townOrCity: selectedDeliveryAddress.townOrCity,
                            zipCode: selectedDeliveryAddress.zipCode
                        };
                    }
                    const response = await fetch(`http://localhost:8022/editBasicUserInfo/${this.authenticatedUsername}`, {
                        method: 'PATCH',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(patchRequestBody)
                    });
                    if(!response.ok) {
                        throw new Error('Network response not ok');
                    }

                    if(selectedDeliveryAddress!==null) {
                        this.selectedDestination = {
                            type: "delivery",
                            data: this.selectedDeliveryAddress
                        };
                        this.deliveryAreaCountry = selectedDeliveryAddress.country;
                        this.deliveryZipcode = selectedDeliveryAddress.zipCode;
                    }
                    else {
                        this.selectedDestination = {
                            type: null,
                            data: null
                        };
                        this.deliveryZipcode = null;
                    }

                    this.updateDataForSelectedDeliveryAddressOrPickupLocation();
                }
                else {
                    // selectedDeliveryAddressInfo[0] is 'ORIGINAL'
                    this.selectedDestination = {
                        type: "delivery",
                        data: this.selectedDeliveryAddress
                    };
                }
            },

            receiveSelectedPaymentCard(selectedPaymentCard) {
                this.selectedPaymentCard = selectedPaymentCard;
            },

            getTotal(itemsSubtotal, shippingHandlingAndDeliverySubtotal, taxSubtotal,
            shippingAndHandlingFeesSavedWithPremium, totalItemDiscounts, priceDifferencesFromSchedulingLater) {
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
                if(this.hasPremium) {
                    orderTotal-=parseFloat(shippingAndHandlingFeesSavedWithPremium.substring(currencySymbol.length));
                }
                orderTotal-=parseFloat(totalItemDiscounts.substring(currencySymbol.length));
                orderTotal+=parseFloat(priceDifferencesFromSchedulingLater.substring(currencySymbol.length));

                return currencySymbol + orderTotal.toFixed(2);
            },

            async updateDeliveryAreaCountry(newDeliveryAreaCountry) {
                if(newDeliveryAreaCountry!==this.deliveryAreaCountry) {
                    const response = await fetch(`http://localhost:8022/editBasicUserInfo/${this.authenticatedUsername}`, {
                        method: 'PATCH',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            hasPremium: this.hasPremium,
                            deliveryAreaCountry: newDeliveryAreaCountry,
                            townOrCity: null,
                            zipCode: null
                        })
                    });
                    if(!response.ok) {
                        throw new Error('Network response not ok');
                    }
                    this.deliveryZipcode = null;
                    this.deliveryAreaCountry = newDeliveryAreaCountry;

                    if(this.selectedDeliveryAddress!==null) {
                        const response1 = await fetch(`http://localhost:8026/unselectSelectedAddressOfUser/${this.authenticatedUsername}`, {
                            method: 'PATCH'
                        });
                        if(!response1.ok) {
                            throw new Error('Network response not ok');
                        }
                        this.selectedDeliveryAddress = null;
                        this.selectedDestination = {
                            type: null,
                            data: null
                        };
                        this.notifyOfSelectedAddressBecomingUnselected++;
                        this.updateDataForSelectedDeliveryAddressOrPickupLocation();
                    }
                    else if(this.selectedPickupLocation!==null) {
                        this.selectedPickupLocation = null;
                        this.selectedDestination = {
                            type: null,
                            data: null
                        };
                    }
                }
            },

            async toggleOrderHasBeenPlaced() {
                if(this.displayOrderCancelErrorMessage==true) {
                    return;
                }

                const orderedItemIds = [];
                const orderedItems = [];
                for(let arrivalTextHeader of this.arrivalTextHeaders) {
                    for(let item of this.arrivalTextHeaderToItemListMappings[arrivalTextHeader]) {
                        if(item.status!=='Available') {
                            continue;
                        }
                        orderedItemIds.push(item.id);
                        const newItem = {...item};
                        delete newItem.id;
                        delete newItem.productOptions;
                        delete newItem.productImage;
                        delete newItem.status;
                        delete newItem.productPricePerUnit;
                        delete newItem.productName;
                        delete newItem.getItAsSoonAs;
                        if(('deliveryDate' in newItem) == false) {
                            newItem.scheduled_for = arrivalTextHeader;
                        }
                        orderedItems.push(newItem);
                    }
                }
                
                if(orderedItemIds.length==0) {
                    return;
                }

                let orderHasBeenPlaced = this.orderHasBeenPlaced;
                orderHasBeenPlaced = !orderHasBeenPlaced;

                if(orderHasBeenPlaced==true) {
                    this.orderId = uuidv4();
                    const response = await fetch(`http://localhost:8036/placeNewOrders/${this.orderId}`, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            username: this.authenticatedUsername,
                            date_time_of_purchase: new Date(),
                            orderedItems: orderedItems,
                            country_of_purchase: this.deliveryAreaCountry,
                            has_premium: this.hasPremium,
                            delivery_address: this.selectedDeliveryAddress!==null ? this.selectedDeliveryAddress.addressText : this.selectedPickupLocation.pickupLocationAddress,
                            is_pickup: this.selectedPickupLocation!==null ? true : false,
                            payment_method_id: this.selectedPaymentCard.id
                        })
                    });
                    if(!response.ok) {
                        throw new Error('Network response not ok');
                    }

                    if(this.dataOfOrderedCartItems==null) {
                        const response1a = await fetch('http://localhost:8029/getDataOfManyShoppingCartItems', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                ids: orderedItemIds
                            })
                        });
                        if(!response1a.ok) {
                            throw new Error('Network response not ok');
                        }
                        const dataOfOrderedCartItems = await response1a.json();
                        this.dataOfOrderedCartItems = dataOfOrderedCartItems;
                    }

                    const response1b = await fetch('http://localhost:8029/deleteManyItemsFromShoppingCart', {
                        method: 'DELETE',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            ids: orderedItemIds
                        })
                    });
                    if(!response1b.ok) {
                        throw new Error('Network response not ok');
                    }

                    localStorage.setItem("selectedCartItems", null);
                }
                else {
                    const response = await fetch(`http://localhost:8036/cancelPlacedOrders/${this.orderId}`, {
                        method: 'PATCH'
                    });
                    if(!response.ok) {
                        const responseData = await response.json();
                        if('numIndividualOrdersTooLateToCancel' in responseData) {
                            this.displayOrderCancelErrorMessage = true;
                            this.orderCancelErrorMessage = `${responseData.numIndividualOrdersTooLateToCancel} orders couldn't be cancelled because they were already at or past the shipping-stage.`;
                            //in a later iteration perhaps work on the frontend for this(i.e actually creating DOM for the error-message with v-if="displayOrderCancelErrorMessage" and {{ orderCancelErrorMessage }})
                            return;
                        }
                    }
                    this.orderId = "";

                    const response1 = await fetch('http://localhost:8029/addManyShoppingCartItems', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            listOfCartItemsToAdd: this.dataOfOrderedCartItems
                        })
                    });
                    if(!response1.ok) {
                        throw new Error('Network response not ok');
                    }
                    
                    localStorage.setItem("selectedCartItems", JSON.stringify({
                        fetchDateTime: this.selectedCartItems.fetchDateTime,
                        data: this.selectedCartItems.data
                    }));
                }

                this.orderHasBeenPlaced = orderHasBeenPlaced;

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

                for(let i=0; i< this.arrivalTextHeaderToItemListMappings[arrivalTextHeaderOfItem].length; i++) {
                    const product = this.arrivalTextHeaderToItemListMappings[arrivalTextHeaderOfItem][i];
                    if(product.id==idOfItem) {
                        const differenceInQuantities = newQuantityOfItem-product.quantity;
                        if (newQuantityOfItem==0) {
                            this.arrivalTextHeaderToItemListMappings[arrivalTextHeaderOfItem].splice(i, 1);
                            if(this.arrivalTextHeaderToItemListMappings[arrivalTextHeaderOfItem].length==0) {
                                this.arrivalTextHeaders.splice(this.arrivalTextHeaders.indexOf(arrivalTextHeaderOfItem), 1);
                            }
                        }
                        product.quantity = newQuantityOfItem;

                        const currentCurrency = this.countryCurrencyMap[this.deliveryAreaCountry];

                        this.quantityTotal+=differenceInQuantities;

                        let itemsSubtotal = parseFloat(this.itemsSubtotal.substring(currentCurrency.length));
                        itemsSubtotal+=differenceInQuantities*parseFloat(product.productPrice.substring(currentCurrency.length));
                        this.itemsSubtotal = currentCurrency+itemsSubtotal.toFixed(2);

                        let shippingHandlingAndDeliverySubtotal = parseFloat(this.shippingHandlingAndDeliverySubtotal.substring(currentCurrency.length));
                        shippingHandlingAndDeliverySubtotal+=differenceInQuantities*parseFloat(product.shippingAndHandlingPrice.substring(currentCurrency.length));
                        this.shippingHandlingAndDeliverySubtotal = currentCurrency+shippingHandlingAndDeliverySubtotal.toFixed(2);

                        let taxSubtotal = parseFloat(this.taxSubtotal.substring(currentCurrency.length));
                        taxSubtotal+=differenceInQuantities*parseFloat(product.tax.substring(currentCurrency.length));
                        this.taxSubtotal = currentCurrency+taxSubtotal.toFixed(2);
                        
                        if(this.hasPremium) {
                            let shippingAndHandlingFeesSavedWithPremium = parseFloat(this.shippingAndHandlingFeesSavedWithPremium.substring(currentCurrency.length));
                            shippingAndHandlingFeesSavedWithPremium+=differenceInQuantities*parseFloat(product.shdPriceSavedWithPremium.substring(currentCurrency.length));
                            this.shippingAndHandlingFeesSavedWithPremium = currentCurrency+shippingAndHandlingFeesSavedWithPremium.toFixed(2);
                        }

                        if('deliveryDate' in product) {
                            let priceDiffForProduct = product.deliveryDate[2]
                            priceDiffForProduct = parseFloat(priceDiffForProduct.substring);
                            let priceDifferencesFromSchedulingLater = parseFloat(this.priceDifferencesFromSchedulingLater.substring(currentCurrency.length));
                            priceDifferencesFromSchedulingLater+=differenceInQuantities*priceDiffForProduct;
                            this.priceDifferencesFromSchedulingLater = currentCurrency+priceDifferencesFromSchedulingLater.toFixed(2);
                        }

                        this.orderSubtotal = this.getTotal(
                            this.itemsSubtotal,
                            this.shippingHandlingAndDeliverySubtotal,
                            this.taxSubtotal,
                            this.shippingAndHandlingFeesSavedWithPremium,
                            this.totalItemDiscounts,
                            this.priceDifferencesFromSchedulingLater
                        );

                        if(product.deals.length>0) {
                            const currentCurrency = this.countryCurrencyMap[this.deliveryAreaCountry];
                            let originalAmountSaved = 0;

                            if(product.deals[0].prices.length==3) {
                                if((this.hasPremium==false && product.deals[0].requirement==='PREMIUM')==false) {
                                    originalAmountSaved = parseFloat(product.deals[0].prices[2].substring(currentCurrency.length));
                                }
                            }

                            if(product.quantity==0) {
                                let totalItemDiscounts = this.totalItemDiscounts;
                                totalItemDiscounts = parseFloat(totalItemDiscounts.substring(currentCurrency.length));
                                totalItemDiscounts-=originalAmountSaved;
                                this.totalItemDiscounts = currentCurrency + totalItemDiscounts.toFixed(2);

                                let orderSubtotal = this.orderSubtotal;
                                orderSubtotal = parseFloat(orderSubtotal.substring(currentCurrency.length));
                                orderSubtotal+=originalAmountSaved;
                                this.orderSubtotal = currentCurrency + orderSubtotal.toFixed(2);

                                this.orderSubtotal = this.getTotal(
                                    this.itemsSubtotal,
                                    this.shippingHandlingAndDeliverySubtotal,
                                    this.taxSubtotal,
                                    this.shippingAndHandlingFeesSavedWithPremium,
                                    this.totalItemDiscounts,
                                    this.priceDifferencesFromSchedulingLater
                                );
                                return;
                            }

                            for(let deal of product.deals) {
                                deal.prices= this.getPricesAsResultOfDeal(deal.discount, product.quantity, parseFloat(product.productPrice.substring(currentCurrency.length)), currentCurrency);
                            }
                            product.deals = this.applyBestDealToProduct(product, originalAmountSaved);
                        }

                        return;
                    }
                }
            },

            applyBestDealToProduct(product, originalAmountSaved) {
                const currentCurrency = this.countryCurrencyMap[this.deliveryAreaCountry];
                const productDeals = product.deals;
                let bestDeal = productDeals[0];
                let indexOfBestDeal = 0;
                let amountSavedFromBestDeal = 0;
                if(bestDeal.prices.length==3) {
                    if((this.hasPremium==false && bestDeal.requirement==='PREMIUM')==false) {
                        amountSavedFromBestDeal = parseFloat(bestDeal.prices[2].substring(currentCurrency.length));
                    }
                }

                for(let i=1; i<productDeals.length; i++) {
                    const deal = productDeals[i];
                    if((this.hasPremium==false && deal.requirement==='PREMIUM')) {
                        continue;
                    }
                    const prices = deal.prices;
                    if(prices.length==3) {
                        const amountSavedFromDeal = parseFloat(prices[2].substring(currentCurrency.length));
                        if(amountSavedFromDeal>amountSavedFromBestDeal) {
                            bestDeal = deal;
                            indexOfBestDeal = i;
                            amountSavedFromBestDeal = amountSavedFromDeal;
                        }
                    }
                }

                if(productDeals[indexOfBestDeal].requirement==='PREMIUM' && this.hasPremium==false) {
                    return;
                }
                const differenceInAmountSaved = amountSavedFromBestDeal - originalAmountSaved;
                    
                let totalItemDiscounts = this.totalItemDiscounts;
                totalItemDiscounts = parseFloat(totalItemDiscounts.substring(currentCurrency.length));
                totalItemDiscounts+=differenceInAmountSaved;
                this.totalItemDiscounts = currentCurrency + totalItemDiscounts.toFixed(2);

                let orderSubtotal = this.orderSubtotal;
                orderSubtotal = parseFloat(orderSubtotal.substring(currentCurrency.length));
                orderSubtotal+=originalAmountSaved;
                orderSubtotal-=amountSavedFromBestDeal;
                this.orderSubtotal = currentCurrency + orderSubtotal.toFixed(2);

                let output = productDeals;
                if(indexOfBestDeal>0) {
                    output = output.filter((_, index)=>index!==indexOfBestDeal);
                    output.splice(0,0,bestDeal);
                }
                return output;
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
                const currentCurrency = this.countryCurrencyMap[this.deliveryAreaCountry];

                for(let i=0; i<this.arrivalTextHeaderToItemListMappings[arrivalTextHeaderOfItem].length; i++) {
                    const product = this.arrivalTextHeaderToItemListMappings[arrivalTextHeaderOfItem][i];
                    if(product.id==idOfItem) {
                        let originalAmountSaved = 0;
                        if(product.deals[0].prices.length==3) {
                            if((this.hasPremium==false && product.deals[0]==='PREMIUM')==false) {
                                originalAmountSaved = parseFloat(product.deals[0].prices[2].substring(currentCurrency.length));
                            }
                        }
                        for(let j=1; j<product.deals.length; j++) {
                            const currentProductDeal = product.deals[j];
                            if(this.formatProductDealText(currentProductDeal)===newlySelectedProductDeal) {
                                if(this.hasPremium==false && currentProductDeal.requirement==='PREMIUM') {
                                    return;
                                }
                                let amountSavedFromNewlySelectedDeal = 0;
                                if(currentProductDeal.prices.length==3) {
                                    amountSavedFromNewlySelectedDeal = parseFloat(currentProductDeal.prices[2].substring(currentCurrency.length));
                                }
                                product.deals.splice(j,1);
                                product.deals.splice(0, 0, currentProductDeal);

                                let totalItemDiscounts = this.totalItemDiscounts;
                                totalItemDiscounts = parseFloat(totalItemDiscounts.substring(currentCurrency.length));
                                totalItemDiscounts+=(amountSavedFromNewlySelectedDeal-originalAmountSaved);
                                this.totalItemDiscounts = currentCurrency+totalItemDiscounts.toFixed(2);
                                
                                let orderSubtotal = this.orderSubtotal;
                                orderSubtotal = parseFloat(orderSubtotal.substring(currentCurrency.length));
                                orderSubtotal+=originalAmountSaved;
                                orderSubtotal-=amountSavedFromNewlySelectedDeal;
                                this.orderSubtotal = currentCurrency + orderSubtotal.toFixed(2);
                                
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

                const currentCurrency = this.countryCurrencyMap[this.deliveryAreaCountry];

                for(let arrivalTextHeader of Object.keys(this.arrivalTextHeaders)) {
                    for(let i=0; i<this.arrivalTextHeaderToItemListMappings[arrivalTextHeader].length; i++) {
                        const product = this.arrivalTextHeaderToItemListMappings[arrivalTextHeader][i];
                        if(product.status==='Available' && product.productId in productIdToPromoCodeDiscountMappings) {
                            let originalAmountSaved = 0;
                            if(product.deals.length>0 && product.deals[0].prices.length==3) {
                                if((this.hasPremium==false && product.deals[0].requirement==='PREMIUM')==false) {
                                    originalAmountSaved = parseFloat(product.deals[0].prices[2].substring(currentCurrency.length));
                                }
                            }
                            for(let promoCodeDiscount of productIdToPromoCodeDiscountMappings[product.productId]) {
                                product.deals.push({
                                    discount: promoCodeDiscount,
                                    prices: this.getPricesAsResultOfDeal(promoCodeDiscount, product.quantity, parseFloat(product.productPrice.substring(currentCurrency.length)), currentCurrency),
                                    requirement: `PROMO-CODE=${promoCode}`
                                });
                            }
                            product.deals = this.applyBestDealToProduct(product, originalAmountSaved);
                        }
                    }
                }
            },

            //the method below returns either an empty list or a list of 3 elems.
            //the list is empty if the discount doesn't save any money(i.e it is a Buy 1 get 1 free but the user only purchased 1)
            //if the user does save money then the list will contain the following elems: ["Total Undiscounted Price", "Total Price after Discount", "Money Saved"]. i.e ["$45", "$40", "$5"]
            getPricesAsResultOfDeal(discount, productQuantity, productPrice, currentCurrency) {
                const totalUndiscountedPrice = productQuantity * productPrice;

                let discountedPrice = totalUndiscountedPrice;

                if (discount.includes('% off')) {
                    // Percentage-based discount
                    const percentOff = parseFloat(discount.match(/([\d.]+)% off/)[1]);
                    discountedPrice = totalUndiscountedPrice * (1 - percentOff / 100);
                } else if (discount.includes('for')) {
                    // Quantity-based discount (e.g., "5 for 3")
                    const [buy, pay] = discount.match(/(\d+) for (\d+)/).slice(1).map(Number);
                    const effectiveSets = Math.floor(productQuantity / buy);
                    const remainingItems = productQuantity % buy;
                    discountedPrice = effectiveSets * pay * productPrice + remainingItems * productPrice;
                } else if (discount.includes('Buy') && discount.includes('get')) {
                    // Mixed offers (e.g., "Buy 2, get 3rd one 75% off")
                    //still buggy
                    const [buy, get, percentOff] = discount.match(/Buy (\d+), get (\d+)(?:th|rd|st|nd) one (\d+)% off/).slice(1).map(Number);
                    const sets = Math.floor(productQuantity / (buy + get));
                    const remainingItems = productQuantity % (buy + get);
                    discountedPrice = sets * (buy * productPrice + get * productPrice * (1 - percentOff / 100)) + remainingItems * productPrice;
                }

                const moneySaved = totalUndiscountedPrice - discountedPrice;

                if (moneySaved > 0) {
                    return [
                        currentCurrency+totalUndiscountedPrice.toFixed(2),
                        currentCurrency+discountedPrice.toFixed(2),
                        currentCurrency+moneySaved.toFixed(2),
                    ];
                } else {
                    return [];
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
                this.selectedDeliveryAddress = null;
                this.deliveryAreaCountry = newlySetPickupLocation.country;
                this.deliveryZipcode = newlySetPickupLocation.zipCode;
                this.displaySelectPickupLocationPopup = false;
                this.displayDarkScreen = false;
                this.selectedDestination = {
                    type: 'pickup',
                    data: this.selectedPickupLocation
                };
                this.updateDataForSelectedDeliveryAddressOrPickupLocation();
            },

            unselectPickupLocation() {
                this.selectedDestination = {
                    type: null,
                    data: null
                };
                this.selectedPickupLocation = null;
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
            },

            updateProductDeliveryDate(info) {
                const arrivalTextHeader = info.arrivalTextHeader;
                const itemIdNotProductId = info.itemIdNotProductId;
                const newWeekday = info.newWeekday;
                const newMonthAndDay = info.newMonthAndDay;
                const newPriceDifference = info.newPriceDifference;
                const newYear = info.newYear;
                const newSHDPriceDifference = info.newSHDPriceDifference;
                const newTaxDifference = info.newTaxDifference;
                const newSHDPriceSavedForPremiumDifference = info.newSHDPriceSavedForPremiumDifference;
                const newFactoryAddress = info.newFactoryAddress;

                for(let i=0; i<this.arrivalTextHeaderToItemListMappings[arrivalTextHeader].length; i++) {
                    const product = this.arrivalTextHeaderToItemListMappings[arrivalTextHeader][i];
                    if(product.id==itemIdNotProductId) {
                        const currentCurrency = this.countryCurrencyMap[this.deliveryAreaCountry];

                        let orderSubtotal = this.orderSubtotal;
                        orderSubtotal = parseFloat(orderSubtotal.substring(currentCurrency.length));
                        
                        let priceDifferencesFromSchedulingLater = this.priceDifferencesFromSchedulingLater;
                        priceDifferencesFromSchedulingLater = parseFloat(priceDifferencesFromSchedulingLater.substring(currentCurrency.length));
                        
                        if('deliveryDate' in product) {
                            let originalPriceDifference = product.deliveryDate[2];
                            if(originalPriceDifference[0]==='-') {
                                originalPriceDifference = parseFloat(originalPriceDifference.substring(1))*product.quantity;
                                priceDifferencesFromSchedulingLater+=originalPriceDifference;
                                orderSubtotal+=originalPriceDifference;
                            }
                            else {
                                originalPriceDifference = parseFloat(originalPriceDifference.substring(1))*product.quantity;
                                priceDifferencesFromSchedulingLater-=originalPriceDifference;
                                orderSubtotal-=originalPriceDifference;
                            }
                        }

                        if(newPriceDifference[0]==='-') {
                            priceDifferencesFromSchedulingLater-=parseFloat(newPriceDifference.substring(1))*product.quantity;
                            orderSubtotal-=parseFloat(newPriceDifference.substring(1))*product.quantity;
                        }
                        else {
                            priceDifferencesFromSchedulingLater+=parseFloat(newPriceDifference.substring(1))*product.quantity;
                            orderSubtotal+=parseFloat(newPriceDifference.substring(1))*product.quantity;
                        }

                        this.priceDifferencesFromSchedulingLater = currentCurrency + priceDifferencesFromSchedulingLater.toFixed(2);
                        this.orderSubtotal = currentCurrency + orderSubtotal.toFixed(2);
                        product.deliveryDate = [newWeekday, newMonthAndDay, newPriceDifference, newYear, newSHDPriceDifference, newTaxDifference, newSHDPriceSavedForPremiumDifference, newFactoryAddress];
                        return;
                    }
                }
            },

            areDictsEqual(dict1, dict2) {
                const keys1 = Object.keys(dict1);
                const keys2 = Object.keys(dict2);

                if (keys1.length !== keys2.length) {
                    return false;
                }

                for (const key of keys1) {
                    if (dict1[key] !== dict2[key]) {
                    return false;
                    }
                }

                return true;
            },

            receiveStripeCustomerId(stripeCustomerId) {
                this.stripeCustomerId = stripeCustomerId;
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
                if(newVal==null || this.orderSubtotal==="") {
                    return;
                }
                let currentCurrency = this.orderSubtotal[0];
                if(currentCurrency==="A") {
                    currentCurrency+="$";
                }
                else if(currentCurrency==="M") {
                    currentCurrency+="X$";
                }
                else if(currentCurrency==="C") {
                    if(this.orderSubtotal[1]==="$") {
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
