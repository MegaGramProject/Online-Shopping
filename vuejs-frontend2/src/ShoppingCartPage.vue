<template>
    <div :style="{position: 'absolute', top: '0%', left: displayLeftSidebar ? '14%' : '0%', width: displayLeftSidebar ? '86%' : '100%',
    display: 'flex', flexDirection: 'column'}">
        <TopMostSection :authenticatedUsername="authenticatedUsername" :hasPremium="hasPremium"
        :deliveryArea="deliveryArea" @showChooseYourLocationPopup="showChooseYourLocationPopup"
        @showDarkScreen1="showDarkScreen1" @hideDarkScreen1="hideDarkScreen1"
        :numItemsInCart="numItemsInCart" :allPastSearchesOfUser="allPastSearchesOfUser"/>

        <SecondTopMostSection :authenticatedUsername="authenticatedUsername" :hasPremium="hasPremium"
        :isLeftSidebarDisplayed="displayLeftSidebar" @toggleLeftSidebar="toggleLeftSidebar"
        @showDarkScreen1="showDarkScreen1" @hideDarkScreen1="hideDarkScreen1"/>

        <div :style="{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%',
        position: 'relative', paddingTop: '2em'}">
            <ImportantMessages :deliveryAreaCountry="deliveryAreaCountry"/>

            <div :style="{display: 'flex', justifyContent: 'center', alignItems: 'start', width: '100%', gap: '7em',
            marginTop: '2em'}">

                <div :style="{display: 'flex', flexDirection: 'column', gap: '1em', width: '65%'}">
                    <CartItems @updateSelectedCartItems="updateSelectedCartItems" :hasPremium="hasPremium"
                    :items="itemsOfCart" @selectAllCartItems="selectAllCartItems" @deselectAllCartItems="deselectAllCartItems"
                    @selectCartItem="selectCartItem" @unselectCartItem="unselectCartItem" @removeCartItem="removeCartItem"
                    @updateCartItemQuantity="updateCartItemQuantity" @saveCartItemForLater="saveCartItemForLater"/>
                    
                    <YourItems :itemsSavedForLater="itemsSavedForLater" :hasPremium="hasPremium"
                    @deleteSavedItem="deleteSavedItem" @moveSavedItemToCart="moveSavedItemToCart"
                    @addBuyAgainItemToCart="addBuyAgainItemToCart" :deliveryAreaCountry="deliveryAreaCountry"/>

                    <p :style="{fontSize: '0.8em', maxWidth: '100%'}">The price and availability of items at Megagram-Shop are subject to change. The Cart is a temporary place to store a list of your items and reflects each item's most recent price.</p>
                    <p :style="{fontSize: '0.8em', maxWidth: '100%', marginTop:'-1.5em'}">Do you have a gift card or promotional code? We'll ask you to enter your claim code when it's time to pay.</p>
                </div>

                <div :style="{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '17%', gap: '1em'}">
                    <SubtotalAndProceedToCheckout :numSelectedCartItems="numSelectedCartItems" :selectedCartItemsPriceSubtotal="selectedCartItemsPriceSubtotal"
                    :deliveryAreaCountry="deliveryAreaCountry"/>
                    <PairWithCart :hasPremium="hasPremium" @addItemToCart="addPairWithCartItemToCart"
                    :deliveryAreaCountry="deliveryAreaCountry" :authenticatedUsername="authenticatedUsername"/>
                </div>

            </div>

            <ProductPromotionRect :deliveryAreaCountry="deliveryAreaCountry" :hasPremium="hasPremium"/>

            <YourBrowsingHistory :authenticatedUsername="authenticatedUsername"/>

            <FooterSection @updateDeliveryAreaCountry="updateDeliveryAreaCountry"/>

            <img v-if="displayDarkScreen1" :src="blackScreen" :style="{height: '100%', width: '100.5%', opacity: '0.7',
            position: 'absolute', top: '0%', left: '0%', objectFit: 'cover'}">
        </div>

    </div>

    <div v-if="displayLeftSidebar" :style="{width: '14%', position: 'fixed', top: '0%', left: '0%', height: '100%'}">
        <LeftSidebar :authenticatedUsername="authenticatedUsername"/>
    </div>

    <img v-if="displayDarkScreen2" :src="blackScreen" :style="{position: 'absolute',
    top: '0%', left: '0%', height: '100%', width: '100%', opacity: '0.7'}">

    
</template>

<script>
import blackScreen from '@/assets/images/blackScreen.png';
import blueCologne from '@/assets/images/blueCologne.jpg';
import ledLightStrips from '@/assets/images/ledLightStrips.jpg';
import redCologne from '@/assets/images/redCologne.jpg';
import showerCurtains from '@/assets/images/showerCurtains.jpg';
import toys from '@/assets/images/toys.jpg';
import CartItems from './components/ShoppingCartPageComponents/CartItems.vue';
import FooterSection from './components/ShoppingCartPageComponents/FooterSection.vue';
import ImportantMessages from './components/ShoppingCartPageComponents/ImportantMessages.vue';
import LeftSidebar from './components/ShoppingCartPageComponents/LeftSidebar.vue';
import PairWithCart from './components/ShoppingCartPageComponents/PairWithCart.vue';
import ProductPromotionRect from './components/ShoppingCartPageComponents/ProductPromotionsRect.vue';
import SecondTopMostSection from './components/ShoppingCartPageComponents/SecondTopMostSection.vue';
import SubtotalAndProceedToCheckout from './components/ShoppingCartPageComponents/Subtotal&ProceedToCheckout.vue';
import TopMostSection from './components/ShoppingCartPageComponents/TopMostSection.vue';
import YourBrowsingHistory from './components/ShoppingCartPageComponents/YourBrowsingHistory.vue';
import YourItems from './components/ShoppingCartPageComponents/YourItems.vue';
import './styles.css';

    export default {
        data() {
            return  {
            blackScreen,
            toys,
            showerCurtains,
            blueCologne,
            redCologne,
            ledLightStrips,
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
            authenticatedUsername: "",
            displayLeftSidebar: false,
            numTimesRouteParamsWasWatched: 0,
            hasPremium: false,
            deliveryArea: "",
            deliveryAreaCountry: "",
            displayDarkScreen1: false,
            displayDarkScreen2: false,
            numItemsInCart: 0,
            numSelectedCartItems: 0,
            cartPriceSubtotal: "",
            selectedCartItemsPriceSubtotal: "",
            deliveryZipcode: "",
            allPastSearchesOfUser: null,
            selectedAddressOfUser: null,
            itemsOfCart: [],
            itemsSavedForLater: []
            };
        },

        components: {
            LeftSidebar,
            TopMostSection,
            SecondTopMostSection,
            ImportantMessages,
            CartItems,
            SubtotalAndProceedToCheckout,
            PairWithCart,
            YourItems,
            ProductPromotionRect,
            YourBrowsingHistory,
            FooterSection
        },

        mounted() {
            document.title = "Shopping Cart";
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

            showChooseYourLocationPopup() {
            },
            
            showDarkScreen1() {
            this.displayDarkScreen1 = true;
            },

            hideDarkScreen1() {
            this.displayDarkScreen1 = false;
            },

            showDarkScreen2() {
            this.displayDarkScreen2 = true;
            },

            hideDarkScreen2() {
            this.displayDarkScreen2 = false;
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
                

                this.deliveryArea = 'Verona, 53593';
                this.deliveryZipcode = '53593';
                this.deliveryAreaCountry = 'the United States';
                this.hasPremium = true;

                const response1  = await fetch('http://localhost:8029/graphql',{
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        query: `query {
                            getAllShoppingCartItemsOfUser(username:"${this.authenticatedUsername}") {
                                id
                                productId
                                options
                                quantity
                            }
                        }`
                    })
                });
                if(!response1.ok) {
                    throw new Error('Network response not ok');
                }
                let shoppingCartItemsOfUser = await response1.json();
                shoppingCartItemsOfUser = shoppingCartItemsOfUser.data.getAllShoppingCartItemsOfUser;
                
                const cartItemsInfo = {}; //keys are cart-item-ids(not their productIds) and values are dicts that represent relevant info about the cartItem
                let productIdsOfCartItems = new Set();
                let numItemsInCart = 0;
                const productIdToOptionsListMappings = {};
                
                for(let cartItem of shoppingCartItemsOfUser) {
                    const id = cartItem.id;
                    const productId = cartItem.productId;
                    const options = JSON.parse(cartItem.options);
                    const quantity = cartItem.quantity;
                    productIdsOfCartItems.add(productId);
                    numItemsInCart+=quantity;
                    if(!(productId in productIdToOptionsListMappings)) {
                        productIdToOptionsListMappings[productId] = [options]
                    }
                    else {
                        productIdToOptionsListMappings[productId].push(options);
                    }
                    cartItemsInfo[id] = {
                        productId: productId,
                        options: options,
                        quantity: quantity
                    }
                }

                this.numItemsInCart = numItemsInCart;
                productIdsOfCartItems = [...productIdsOfCartItems];

                /*
                const response1b = await fetch(`http://localhost:8026/getSelectedAddressOfUser/${this.authenticatedUsername}`);
                if(!response1b.ok){
                    this.selectedAddressOfUser = "";
                }
                else {
                    let selectedAddressOfUser = await response1b.json();

                    let newSelectedAddress = "";
                    if(selectedAddressOfUser.house_or_building_number!==null) {
                        newSelectedAddress+=selectedAddressOfUser.house_or_building_number + " " + selectedAddressOfUser.street_name+", ";
                    }
                    else {
                        newSelectedAddress+=selectedAddressOfUser.street_name+", ";
                    }
                    if(selectedAddressOfUser.apartment_or_suite!==null) {
                        newSelectedAddress+=selectedAddressOfUser.apartment_or_suite+", ";
                    }
                    newSelectedAddress+=selectedAddressOfUser.town_or_city;
                    if(selectedAddressOfUser.state_or_province!==null) {
                        newSelectedAddress+=" " + selectedAddressOfUser.state_or_province + " " + selectedAddressOfUser.zipcode+", ";
                    }
                    else {
                        newSelectedAddress+=" " + selectedAddressOfUser.zipcode+", ";
                    }

                    newSelectedAddress+=selectedAddressOfUser.country;
                    this.selectedAddressOfUser = newSelectedAddress;
                }
                */
            
                this.selectedAddressOfUser = "(Fake Address) Placeholder";

                if(numItemsInCart>0) {
                    const response2 = await fetch('http://localhost:8022/getNamesAndSpecificPricesOfGivenProducts', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            productIdToOptionsListMappings: productIdToOptionsListMappings
                        })
                    });
                    if(!response2.ok) {
                        throw new Error('Network response not ok');
                    }
                    const dictOfNamesAndPricesOfCartItems = await response2.json();
                    /*
                    above is a dict where keys are productIds of items in cart and
                    values are lists of lists of 3 or 5 elements: first is the options of that product,
                    second is the product-name, third is the price of the product with
                    the given options, and fourth & fifth(these two are missing for certain products)
                    are the price per unit of the product with the given options.

                    an examples of a value of this dict is:
                    [
                        [{Size: 'L', Color: 'green'}, "Product-Name", "$35"],
                        [{Brand: 'Pepsi', 'Sugar Level': 'high'}, "Product-Name", "$20", "$2" "oz"]
                    ]
                    */

                    for(let cartItemIdNotProductId of Object.keys(cartItemsInfo)) {
                        const currentCartItemProductId = cartItemsInfo[cartItemIdNotProductId].productId;
                        const currentCartItemOptions = cartItemsInfo[cartItemIdNotProductId].options;
                        const allNamesAndPricesOfCurrProductId = dictOfNamesAndPricesOfCartItems[currentCartItemProductId];
                        let indexCorrespondingToCurrCartItemOptions = 0;
                        for(let i=0; i<allNamesAndPricesOfCurrProductId.length; i++) {
                            if(this.areDictsEqual(allNamesAndPricesOfCurrProductId[i][0],currentCartItemOptions)) {
                                indexCorrespondingToCurrCartItemOptions = i;
                                break;
                            }
                        }
                        cartItemsInfo[cartItemIdNotProductId].productName = allNamesAndPricesOfCurrProductId[indexCorrespondingToCurrCartItemOptions][1];
                        cartItemsInfo[cartItemIdNotProductId].productPrice =  allNamesAndPricesOfCurrProductId[indexCorrespondingToCurrCartItemOptions][2];
                        if(allNamesAndPricesOfCurrProductId[indexCorrespondingToCurrCartItemOptions].length>3) {
                            cartItemsInfo[cartItemIdNotProductId].productPricePerUnit = allNamesAndPricesOfCurrProductId[indexCorrespondingToCurrCartItemOptions][3]+"/"+allNamesAndPricesOfCurrProductId[indexCorrespondingToCurrCartItemOptions][4];
                        }
                        else {
                            cartItemsInfo[cartItemIdNotProductId].productPricePerUnit = null;
                        }

                    }

                    const response3 = await fetch('http://localhost:8029/getFastestDeliveryTimesForProducts', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            hasPremium: this.hasPremium,
                            address: this.selectedAddressOfUser,
                            productIds: productIdsOfCartItems
                        })
                    });
                    if(!response3.ok){
                        throw new Error('Network response not ok');
                    }
                    const deliveryTimesOfCartItems = await response3.json();
                    /*
                    above is a dict where keys are productIds of cart-item products, whereas values are the fastest
                    delivery times of these products in hours.
                    */

                    for(let cartItemIdNotProductId of Object.keys(cartItemsInfo)) {
                        const productId = cartItemsInfo[cartItemIdNotProductId].productId;
                        const productDeliveryTimeInHours = deliveryTimesOfCartItems[productId];
                        cartItemsInfo[cartItemIdNotProductId].getItAsSoonAs = this.formatDeliveryArrivalText(productDeliveryTimeInHours);
                    }

                    const response4 = await fetch('http://localhost:8032/api/checkForMegagramProductChoices', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            productIds: productIdsOfCartItems
                        })
                    });
                    if(!response4.ok) {
                        throw new Error('Network response not ok');
                    }
                    const productIdToProductChoiceCategoryMappings = await response4.json();
                    /*
                    above is a dict where the keys are productIds in productIdsOfCartItems, whereas values
                    are strings representing the category of the Megagram-Choice that the product is a part of.
                    Only products in productIdsOfCartItems that are Megagram-Choices are in the dict.
                    */

                    for(let cartItemIdNotProductId of Object.keys(cartItemsInfo)) {
                        const productId = cartItemsInfo[cartItemIdNotProductId].productId;
                        cartItemsInfo[cartItemIdNotProductId].megagramChoiceCategory = productIdToProductChoiceCategoryMappings[productId] ?? null;
                    }

                    const response5 = await fetch('http://localhost:8026/getNumProductsLeftForListOfProducts', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(productIdsOfCartItems)
                    });
                    if(!response5.ok) {
                        throw new Error('Network response not ok');
                    }
                    const numProductsLeftForListOfProducts = await response5.json();

                    const response6 = await fetch('http://localhost:8030/getPairsOfProductIdsAndOptionsOfThoseInStock', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            numProductsLeftForListOfProducts: numProductsLeftForListOfProducts,
                            productIdToOptionsListMappings: productIdToOptionsListMappings
                        })
                    });
                    if(!response6.ok) {
                        throw new Error('Network response not ok');
                    }
                    let productIdToInStockOptionsMappings = await response6.json();
                    /*
                    above is a dict where keys are productIds of cart-items and values are
                    lists of options of the product that are in the cart and in-stock.
                    */

                    for(let cartItemIdNotProductId of Object.keys(cartItemsInfo)) {
                        const productId = cartItemsInfo[cartItemIdNotProductId].productId;
                        const options = cartItemsInfo[cartItemIdNotProductId].options;
                        cartItemsInfo[cartItemIdNotProductId].inStock = productIdToInStockOptionsMappings[productId].some(
                            (opts) => this.areDictsEqual(opts, options)
                        );
                    }

                    const response7 = await fetch('http://localhost:8030/checkIfDealsAreAvailableForProducts', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            productIds: productIdsOfCartItems,
                            hasPremium: this.hasPremium
                        })
                    });
                    if(!response7.ok) {
                        throw new Error('Network response not ok');
                    }
                    const productIdToDealAvailableMappings = await response7.json();
                    /*
                    above is a dict where the keys are productIds in productIdsOfCartItems, whereas values
                    are booleans: true if product has deal available, false otherwise
                    */
                    for(let cartItemIdNotProductId of Object.keys(cartItemsInfo)) {
                        const productId = cartItemsInfo[cartItemIdNotProductId].productId;
                        cartItemsInfo[cartItemIdNotProductId].dealsAvailable = productIdToDealAvailableMappings[productId];
                    }

                    const response8a = await fetch("http://localhost:8022/forEachProductIdInListGetNamesOfTheOptionThatHasImages", {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            productIds: productIdsOfCartItems
                        })
                    });
                    if(!response8a.ok) {
                        throw new Error('Network response not ok');
                    }
                    const productIdToImageOptionMappings = await response8a.json();
                    /*
                    above is a dict where keys are productIds of items in cart, whereas
                    values are the option-names that have images.
                    Each productId has either 1 option that has images, or 0(this is for the products
                    who sellers didn't provide any options; i.e there is only 1 version of that product
                    available to buy; these products still have images tho).

                    An example of key-value pair in the dict: "dfe93de6-1eac-4ea7-ba9b-cec5528325a1"-> "Color"
                    */

                    const response8b = await fetch('http://localhost:8031/getSpecificImagesOfProductOptionsForMany', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            productIdToOptionsListMappingsAsJE: productIdToOptionsListMappings,
                            productIdToImageOptionMappings: productIdToImageOptionMappings
                        })
                    });
                    if(!response8b.ok) {
                        throw new Error('Network response not ok');
                    }
                    const specificImagesOfProductOptions = await response8b.json();
                    /*
                    above is a dict where each key is productId and each value a nested-list.
                    each nested-list has two-elements: the first being the specific options of the product,
                    and the second being the fetched base-64-string of the main-photo of those specific options of
                    the product
                    */

                    for(let cartItemIdNotProductId of Object.keys(cartItemsInfo)) {
                        const productId = cartItemsInfo[cartItemIdNotProductId].productId;
                        const options = cartItemsInfo[cartItemIdNotProductId].options;
                        const specificImagesOfCurrProduct = specificImagesOfProductOptions[productId];
                        for(let i=0; i<specificImagesOfCurrProduct.length; i++) {
                            if(this.areDictsEqual(options, specificImagesOfCurrProduct[i][0])) {
                                cartItemsInfo[cartItemIdNotProductId].productImage =  `data:image/jpeg;base64,${specificImagesOfCurrProduct[i][1]}`;
                                break;
                            }
                        }
                    }

                    const response9 = await fetch('http://localhost:8022/getOptionTextsForManyProducts', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            productIds: productIdsOfCartItems
                        })
                    });
                    if(!response9.ok) {
                        throw new Error('Network response not ok');
                    }
                    const productIdToOptionTextsMappings = await response9.json();
                    /*
                        above is a dict where keys are productIds of cart-items and values are
                        the option-texts available for that product.
                        i.e: {
                            "productId0": {
                                "size": ["S", "M", "L", "XL"],
                                "color": ["red", "green", "blue", true]
                            },
                            "productId1": {
                                ...
                            },
                            ...
                        }
                        this dict is important because without it,
                        the options field of cartItemsInfo will be remain as something like
                        {"size": 1, "color": 0} and the user will be confused as to what the options
                        of the product actually are.
                        1 and 0 in this example refer to "M" and "red" respectively
                        (these numbers represent indices, and aren't the texts themselves)
                    */
                
                    for(let cartItemIdNotProductId of Object.keys(cartItemsInfo)) {
                        const productId = cartItemsInfo[cartItemIdNotProductId].productId;
                        const options = cartItemsInfo[cartItemIdNotProductId].options;
                        const optionsForProduct = productIdToOptionTextsMappings[productId];
                        
                        const newOptions = {};
                        for(let option of Object.keys(options)) {
                            newOptions[option] = optionsForProduct[option][options[option]];
                        }
                        cartItemsInfo[cartItemIdNotProductId].options = newOptions;
                    }

                    for(let cartItemIdNotProductId of Object.keys(cartItemsInfo)) {
                        const infoOnCurrentCartItem = cartItemsInfo[cartItemIdNotProductId];
                        this.itemsOfCart.push({
                            id: parseInt(cartItemIdNotProductId),
                            productId: infoOnCurrentCartItem.productId,
                            productImage: infoOnCurrentCartItem.productImage,
                            productName: infoOnCurrentCartItem.productName,
                            inStock: infoOnCurrentCartItem.inStock,
                            options: infoOnCurrentCartItem.options,
                            productPrice: infoOnCurrentCartItem.productPrice,
                            productPricePerUnit: infoOnCurrentCartItem.productPricePerUnit,
                            getItAsSoonAs: infoOnCurrentCartItem.getItAsSoonAs,
                            quantity: infoOnCurrentCartItem.quantity,
                            dealsAvailable: infoOnCurrentCartItem.dealsAvailable,
                            megagramChoiceCategory: infoOnCurrentCartItem.megagramChoiceCategory,
                            isSelected: false,
                            hasBeenRemoved: false,
                            hasBeenSavedForLater: false
                        });
                    }
                }

                /*
                const response2 = await fetch(`http://localhost:8025/getShopSearchesOfUser/${this.authenticatedUsername}`);
                if(!response2.ok) {
                    throw new Error('Network response not ok');
                }
                const fetchedPastSearches = await response2.json();
                let pastSearcallPastSearchesOfUserhesOfUser = [];
                for(let fetchedPastSearch of fetchedPastSearches) {
                allPastSearchesOfUser.push([fetchedPastSearch.search, fetchedPastSearch.searchCategory]);
                }
                this.allPastSearchesOfUser = allPastSearchesOfUser;
                */

                this.allPastSearchesOfUser = [
                    ["hot wheels", "Toys for Kids"],
                    ["hotpockets", "Food"],
                    ["walkie-talkie", ""]
                ];

                //fetch items saved for later
                this.itemsSavedForLater = [
                    {
                        id: 0,
                        productId: "a",
                        productImage: showerCurtains,
                        productName: "Gibelle Grey Marble Shower Curtain Set, Abstract Silver…",
                        category: "Shower curtains",
                        productPrice: "$23.99",
                        numBuyersInPastMonth: 55,
                        inStock: true,
                        options: {
                            Color: 'Grey',
                            Size: '71"W x 71"L (Pack of 1)'
                        }
                    },
                    {
                        id: 1,
                        productId: "b",
                        productImage: ledLightStrips,
                        productName: "Tenmiro 50ft LED Strip Lights, RGB LED Smart Music Sync…",
                        category: "LED strip lights",
                        productPrice: "$14.99",
                        numBuyersInPastMonth: 1024,
                        inStock: true,
                        options: {
                            Size: '50FT',
                        }
                    },
                    {
                        id: 2,
                        productId: "c",
                        productImage: blueCologne,
                        productName: "Davidoff Cool Water Edt Spray for Men, 4.2 oz",
                        category: "Men's cologne",
                        productPrice: "$44.99",
                        numBuyersInPastMonth: 0,
                        inStock: false,
                        options: {}
                    },
                    {
                        id: 3,
                        productId: "d",
                        productImage: redCologne,
                        productName: "RawChemistry For Him, Pheromone Infused Cologne...",
                        category: "Men's cologne",
                        productPrice: "$31.50",
                        numBuyersInPastMonth: 5350,
                        inStock: true,
                        options: {
                            Size: '1 Fl Oz (Pack of 1)'
                        }
                    },
                ];

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

            formatDeliveryArrivalText(numHours) {
                const now = new Date();
                const deliveryDate = new Date(now.getTime() + numHours * 60 * 60 * 1000);
            
                const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                const months = ["January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"];
            
                if (deliveryDate.toDateString() === now.toDateString()) {
                    return `Today, in ${numHours} hours`;
                }
            
                const tomorrow = new Date(now);
                tomorrow.setDate(now.getDate() + 1);
                if (deliveryDate.toDateString() === tomorrow.toDateString()) {
                    return `Tomorrow, ${months[deliveryDate.getMonth()]} ${deliveryDate.getDate()}`;
                }
            
                const dayOfWeek = daysOfWeek[deliveryDate.getDay()];
                const month = months[deliveryDate.getMonth()];
                const day = deliveryDate.getDate();
            
                return `${dayOfWeek}, ${month} ${day}`;
            },

            toggleLeftSidebar() {
                this.displayLeftSidebar = !this.displayLeftSidebar;
            },

            addPairWithCartItemToCart(itemInfo) {
                const getItAsSoonAs = "";
                const dealsAvailable = false;
                const megagramChoiceCategory = null;
                
                this.numItemsInCart++;
                this.itemsOfCart.push({
                    id: itemInfo.id,
                    productId: itemInfo.productId,
                    productImage: itemInfo.productImage,
                    productName: itemInfo.productName,
                    inStock: true,
                    options: itemInfo.options,
                    productPrice: itemInfo.productPrice,
                    getItAsSoonAs: getItAsSoonAs,
                    quantity: 1,
                    dealsAvailable: dealsAvailable,
                    megagramChoiceCategory: megagramChoiceCategory,
                    isSelected: false,
                    hasBeenRemoved: false,
                    hasBeenSavedForLater: false
                });

            },

            updateSelectedCartItems(newSelectedItems) {
                let numSelectedCartItems = 0;
                let selectedCartItemsPriceSubtotal = 0;
                const currentCurrency = this.countryCurrencyMap[this.deliveryAreaCountry];
                for(let selectedItem of newSelectedItems) {
                    selectedCartItemsPriceSubtotal+= parseFloat(selectedItem.productPrice.substring(currentCurrency.length))*selectedItem.quantity;
                    numSelectedCartItems+=selectedItem.quantity;
                }
                this.numSelectedCartItems = numSelectedCartItems;
                this.selectedCartItemsPriceSubtotal =
                currentCurrency + selectedCartItemsPriceSubtotal.toFixed(2).toLocaleString();
            },

            selectAllCartItems() {
                this.itemsOfCart = this.itemsOfCart.map(x=> {
                    if(!x.hasBeenRemoved && !x.hasBeenSavedForLater) {
                        x.isSelected = true;
                    }
                    return x;
                });
            },

            deselectAllCartItems() {
                this.itemsOfCart = this.itemsOfCart.map(x=> {
                    x.isSelected = false;
                    return x;
                });
            },

            selectCartItem(indexOfCartItemToSelect) {
                this.itemsOfCart[indexOfCartItemToSelect].isSelected = true;
            },

            unselectCartItem(indexOfCartItemToUnselect) {
                this.itemsOfCart[indexOfCartItemToUnselect].isSelected = false;
            },

            async removeCartItem(info) {
                const response = await fetch("http://localhost:8029/graphql", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        query: `mutation {
                            deleteShoppingCartItem(id:${info.id})
                        }`
                    })
                });
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                this.numItemsInCart-=this.itemsOfCart[info.index].quantity;
                this.itemsOfCart[info.index].hasBeenRemoved = true;
            },

            async updateCartItemQuantity(info) {
                const response = await fetch("http://localhost:8029/graphql", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        query: `mutation {
                            editShoppingCartItem(id:${info.id}, newQuantity:${info.newQuantity}) {
                                quantity
                            }
                        }`
                    })
                });
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                this.numItemsInCart+=info.newQuantity-this.itemsOfCart[info.index].quantity;
                this.itemsOfCart[info.index].quantity = info.newQuantity;
            },

            async saveCartItemForLater(info) {
                const response = await fetch("http://localhost:8029/graphql", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        query: `mutation {
                            deleteShoppingCartItem(id:${info.id})
                        }`
                    })
                });
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }

                const cartItemToSaveForLater = this.itemsOfCart[info.index];
                this.numItemsInCart-=cartItemToSaveForLater.quantity;
                cartItemToSaveForLater.hasBeenSavedForLater = true;

                this.itemsSavedForLater = [...this.itemsSavedForLater, {
                        id: Math.floor(Math.random()*5000)+140, //later fetch the id of the newly created saved-for-later-item
                        productId: cartItemToSaveForLater.productId,
                        productImage: cartItemToSaveForLater.productImage,
                        productName: cartItemToSaveForLater.productName,
                        category: "Random category", //later fetch
                        productPrice: cartItemToSaveForLater.productPrice,
                        numBuyersInPastMonth: 550, //later fetch
                        inStock: cartItemToSaveForLater.inStock,
                        options: cartItemToSaveForLater.options
                    }];

            },

            updateCurrencies(currentCurrency, newCurrency) {
                for(let i=0; i<this.itemsOfCart.length; i++) {
                    let currItemPrice = this.itemsOfCart[i].productPrice;
                    currItemPrice = parseFloat(currItemPrice.substring(currentCurrency.length));
                    currItemPrice/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                    currItemPrice*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                    this.itemsOfCart[i].productPrice = newCurrency+currItemPrice.toFixed(2);
                }

                for(let i=0; i<this.itemsSavedForLater.length; i++) {
                    let currItemPrice = this.itemsSavedForLater[i].productPrice;
                    currItemPrice = parseFloat(currItemPrice.substring(currentCurrency.length));
                    currItemPrice/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                    currItemPrice*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                    this.itemsSavedForLater[i].productPrice = newCurrency+currItemPrice.toFixed(2);
                }
            },

            deleteSavedItem(idOfSavedItemToDelete) {
                this.itemsSavedForLater = this.itemsSavedForLater.filter(x=> x.id!==idOfSavedItemToDelete);
            },

            moveSavedItemToCart(idOfSavedItemToMoveToCart) {
                this.itemsSavedForLater = this.itemsSavedForLater.filter(savedItem=> {
                    if(savedItem.id==idOfSavedItemToMoveToCart) {
                        this.itemsOfCart.push({
                            id: Math.floor(Math.random()*5000)+140, //later fetch the id of the newly created shopping-cart-item
                            productId: savedItem.productId,
                            productImage: savedItem.productImage,
                            productName: savedItem.productName,
                            inStock: savedItem.inStock,
                            options: savedItem.options,
                            productPrice: savedItem.productPrice,
                            getItAsSoonAs: "Wed, Nov 12", //later fetch
                            quantity: 1,
                            dealsAvailable: true, //later fetch
                            megagramChoiceCategory: null, //later fetch
                            isSelected: false,
                            hasBeenRemoved: false,
                            hasBeenSavedForLater: false
                        });
                        return false;
                    }
                    return true;
                });
            },

            addBuyAgainItemToCart(itemInfo) {
                for(let item of this.itemsOfCart) {
                    if(item.productId===itemInfo.productId) {
                        return;
                    }
                }
                this.itemsOfCart.push({
                    id: Math.floor(Math.random()*5000)+140, //later fetch the id of the newly created shopping-cart-item
                    productId: itemInfo.productId,
                    productImage: itemInfo.productImage,
                    productName: itemInfo.productName,
                    inStock: itemInfo.inStock,
                    options: {}, //later fetch the default options
                    productPrice: itemInfo.productPrice,
                    getItAsSoonAs: "Wed, Nov 18", //later fetch
                    quantity: 1,
                    dealsAvailable: true, //later fetch
                    megagramChoiceCategory: null, //later fetch
                    isSelected: false,
                    hasBeenRemoved: false,
                    hasBeenSavedForLater: false
                });
            },

            async updateDeliveryAreaCountry(newDeliveryAreaCountry) {
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
                this.deliveryArea = null;
                this.deliveryZipcode = null;
                this.deliveryAreaCountry = newDeliveryAreaCountry

                if(this.selectedAddressOfUser!=="") {
                    const response1 = await fetch(`http://localhost:8026/unselectSelectedAddressOfUser/${this.authenticatedUsernameauthenticatedUsername}`, {
                        method: 'PATCH'
                    });
                    if(!response1.ok) {
                        throw new Error('Network response not ok');
                    }
                    this.selectedAddressOfUser = "";
                }
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
                if((this.itemsOfCart.length==0 && this.itemsSavedForLater.length==0) || newVal.length==0) {
                    return;
                }
                let currentCurrency;
                let secondCharacter;
                if(this.itemsOfCart.length>0) {
                    currentCurrency = this.itemsOfCart[0].productPrice[0];
                    secondCharacter = this.itemsOfCart[0].productPrice[1];
                }
                else {
                    currentCurrency = this.itemsSavedForLater[0].productPrice[0];
                    secondCharacter = this.itemsSavedForLater[0].productPrice[1];
                }
                if(currentCurrency==="A") {
                    currentCurrency+="$";
                }
                else if(currentCurrency==="M") {
                    currentCurrency+="X$";
                }
                else if(currentCurrency==="C") {
                    if(secondCharacter==="$") {
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

            itemsOfCart(newVal) {
                if(newVal.length==0 || this.deliveryAreaCountry.length==0) {
                    return;
                }
                let currentCurrency = newVal[0].productPrice[0];
                if(currentCurrency==="A") {
                    currentCurrency+="$";
                }
                else if(currentCurrency==="M") {
                    currentCurrency+="X$";
                }
                else if(currentCurrency==="C") {
                    if(newVal[0].productPrice[1]==="$") {
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
            },

            itemsSavedForLater(newVal) {
                if(newVal.length==0 || this.deliveryAreaCountry.length==0) {
                    return;
                }
                let currentCurrency = newVal[0].productPrice[0];
                if(currentCurrency==="A") {
                    currentCurrency+="$";
                }
                else if(currentCurrency==="M") {
                    currentCurrency+="X$";
                }
                else if(currentCurrency==="C") {
                    if(newVal[0].productPrice[1]==="$") {
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
    };

</script>

