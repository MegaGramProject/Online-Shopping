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
                    @addBuyAgainItemToCart="addBuyAgainItemToCart"/>

                    <p :style="{fontSize: '0.8em', maxWidth: '100%'}">The price and availability of items at Amazon.com are subject to change. The Cart is a temporary place to store a list of your items and reflects each item's most recent price.</p>
                    <p :style="{fontSize: '0.8em', maxWidth: '100%', marginTop:'-1.5em'}">Do you have a gift card or promotional code? We'll ask you to enter your claim code when it's time to pay.</p>
                </div>

                <div :style="{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '17%', gap: '1em'}">
                    <SubtotalAndProceedToCheckout :numSelectedCartItems="numSelectedCartItems" :selectedCartItemsPriceSubtotal="selectedCartItemsPriceSubtotal"
                    :deliveryAreaCountry="deliveryAreaCountry"/>
                    <PairWithCart :hasPremium="hasPremium" @addItemToCart="addItemToCart"
                    :deliveryAreaCountry="deliveryAreaCountry"/>
                </div>

            </div>

            <img v-if="displayDarkScreen1" :src="blackScreen" :style="{height: '100%', width: '100%', opacity: '0.7',
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
import LeftSidebar from './components/LeftSidebar.vue';
import TopMostSection from './components/TopMostSection.vue';
import SecondTopMostSection from './components/SecondTopMostSection.vue';
import ImportantMessages from './components/ImportantMessages.vue';
import CartItems from './components/CartItems.vue';
import SubtotalAndProceedToCheckout from './components/Subtotal&ProceedToCheckout.vue';
import PairWithCart from './components/PairWithCart.vue';
import toys from '@/assets/images/toys.jpg';
import YourItems from './components/YourItems.vue';
import showerCurtains from '@/assets/images/showerCurtains.jpg';
import ledLightStrips from '@/assets/images/ledLightStrips.jpg';
import blueCologne from '@/assets/images/blueCologne.jpg';
import redCologne from '@/assets/images/redCologne.jpg';
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
            YourItems
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
                console.log("X!");
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
                
                
                /*
                const response1  = await fetch('http://localhost:8029/graphql',{
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        query: `query {
                        getAllShoppingCartItemsOfUser(username:"${this.authenticatedUsername}") {
                            username
                            productId
                            optionsChosen
                        }
                    }
                    `
                    })
                });
                if(!response1.ok) {
                    throw new Error('Network response not ok');
                }
                let shoppingCartItemsOfUser = await response1.json();
                shoppingCartItemsOfUser = shoppingCartItemsOfUser.data.getAllShoppingCartItemsOfUser;
                */
            
                this.itemsOfCart = [
                    {
                        id: 0,
                        productId: "0",
                        productImage: toys,
                        productName: "Gibelle Grey Marble Shower Curtain Set, Abstract Silver Marble Gold Stripes Fabric Shower Curtain, Modern Ink Art Decor Waterproof Shower Curtain for Bathroom Decor, 71x71",
                        inStock: true,
                        options: {
                            Color: 'Grey',
                            Size: '71W x 71L (Pack of 1)'
                        },
                        productPrice: "$19.99",
                        getItAsSoonAs: "Wed, Nov 7",
                        quantity: 2,
                        dealsAvailable: true,
                        megagramChoiceCategory: 'Everything',
                        numberOneBestSeller: null,
                        isSelected: false,
                        hasBeenRemoved: false,
                        hasBeenSavedForLater: false
                    }
                ];
                this.numItemsInCart = 2;
                this.cartPriceSubtotal = '$39.98';

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

                /*
                const response3 = await fetch(`http://localhost:8026/getSelectedAddressOfUser/${this.authenticatedUsername}`);
                if(!response3.ok){
                    this.selectedAddressOfUser = "";
                }
                else {
                    let selectedAddressOfUser = await response3.json();

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

                this.selectedAddressOfUser = "";

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

            toggleLeftSidebar() {
                this.displayLeftSidebar = !this.displayLeftSidebar;
            },

            addItemToCart(itemInfo) {
                this.numItemsInCart++;
                this.cartPriceSubtotal = this.getNewCartPriceSubtotal(itemInfo.productPrice);
                this.itemsOfCart.push({
                    id: itemInfo.id,
                    productId: itemInfo.productId,
                    productImage: itemInfo.productImage,
                    productName: itemInfo.productName,
                    inStock: true,
                    options: { //later use API to fetch
                        Color: 'Grey',
                        Size: '71W x 71L (Pack of 1)'
                    },
                    productPrice: itemInfo.productPrice,
                    getItAsSoonAs: "Wed, Nov 22", //later use API to fetch
                    quantity: 1,
                    dealsAvailable: false, //later use API to fetch
                    megagramChoiceCategory: null, //later use API to fetch
                    numberOneBestSeller: null, //later use API to fetch
                    isSelected: false,
                    hasBeenRemoved: false,
                    hasBeenSavedForLater: false
                });

            },

            getNewCartPriceSubtotal(priceOfNewlyAddedItem) {
                const currentCurrency = this.countryCurrencyMap[this.deliveryAreaCountry];
                return currentCurrency +
                ( parseFloat(this.cartPriceSubtotal.substring(currentCurrency.length)) + parseFloat(priceOfNewlyAddedItem.substring(currentCurrency.length)) )
                .toFixed(2);
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

            removeCartItem(indexOfCartItemToRemove) {
                this.itemsOfCart[indexOfCartItemToRemove].hasBeenRemoved = true;
            },

            updateCartItemQuantity(info) {
                this.itemsOfCart[info.index].quantity = info.newQuantity;
            },

            saveCartItemForLater(indexOfCartItemToSaveForLater) {
                const cartItemToSaveForLater = this.itemsOfCart[indexOfCartItemToSaveForLater];
                this.itemsOfCart[indexOfCartItemToSaveForLater].hasBeenSavedForLater = true;
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
                            numberOneBestSeller: 'Everything', //later fetch
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
                    numberOneBestSeller: 'Everything', //later fetch
                    isSelected: false,
                    hasBeenRemoved: false,
                    hasBeenSavedForLater: false
                });
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
                if(this.itemsOfCart.length==0 || newVal.length==0) {
                    return;
                }
                let currentCurrency = this.itemsOfCart[0].productPrice[0];
                if(currentCurrency==="A") {
                    currentCurrency+="$";
                }
                else if(currentCurrency==="M") {
                    currentCurrency+="X$";
                }
                else if(currentCurrency==="C") {
                    if(this.itemsOfCart[0].productPrice[1]==="$") {
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
                let currentCurrency = this.itemsOfCart[0].productPrice[0];
                if(currentCurrency==="A") {
                    currentCurrency+="$";
                }
                else if(currentCurrency==="M") {
                    currentCurrency+="X$";
                }
                else if(currentCurrency==="C") {
                    if(this.itemsOfCart[0].productPrice[1]==="$") {
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

