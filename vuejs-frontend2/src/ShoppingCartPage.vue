<template>
    <div :style="{position: 'absolute', top: '0%', left: displayLeftSidebar ? '14%' : '0%', width: displayLeftSidebar ? '86%' : '100%', height: '190%',
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
            <div :style="{display: 'flex', justifyContent: 'center', alignItems: 'start', width: '100%', gap: '3em',
            marginTop: '2em'}">
                <CartItems @updateSelectedCartItems="updateSelectedCartItems"/>
                <div :style="{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '17%', gap: '1em'}">
                    <SubtotalAndProceedToCheckout :numSelectedCartItems="numSelectedCartItems" :selectedCartItemsPriceSubtotal="selectedCartItemsPriceSubtotal"
                    :deliveryAreaCountry="deliveryAreaCountry"/>
                    <PairWithCart :hasPremium="hasPremium" @addItemToCart="addItemToCart"
                    :deliveryAreaCountry="deliveryAreaCountry"/>
                </div>
            </div>
            <img v-if="displayDarkScreen1" :src="blackScreen" :style="{height: '100%', width: '100%', opacity: '0.7',
            position: 'absolute', top: '0%', left: '0%'}">
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
import './styles.css';

    export default {
        data() {
            return  {
            blackScreen,
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
            selectedAddressOfUser: null
            };
        },

        components: {
            LeftSidebar,
            TopMostSection,
            SecondTopMostSection,
            ImportantMessages,
            CartItems,
            SubtotalAndProceedToCheckout,
            PairWithCart
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
                this.numItemsInCart = shoppingCartItemsOfUser.length;
                */

                this.numItemsInCart = 2;
                this.cartPriceSubtotal = '$58.12';
                this.numSelectedCartItems = this.numItemsInCart;
                this.selectedCartItemsPriceSubtotal = this.cartPriceSubtotal;

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

            },

            toggleLeftSidebar() {
                this.displayLeftSidebar = !this.displayLeftSidebar;
            },

            addItemToCart(itemInfo) {
                this.numItemsInCart++;
                this.cartPriceSubtotal = this.getNewCartPriceSubtotal(itemInfo.productPrice);
            },

            getNewCartPriceSubtotal(priceOfNewlyAddedItem) {
                return this.cartPriceSubtotal[0] +
                ( parseFloat(this.cartPriceSubtotal.substring(1)) + parseFloat(priceOfNewlyAddedItem.substring(1)) )
                .toFixed(2);
            },

            updateSelectedCartItems(newSelectedItems) {
                this.numSelectedCartItems = newSelectedItems.length;
                let selectedCartItemsPriceSubtotal = 0;
                for(let selectedItem of newSelectedItems) {
                    selectedCartItemsPriceSubtotal+= parseFloat(selectedItem.productPrice.substring(1));
                }
                this.selectedCartItemsPriceSubtotal =
                this.selectedCartItemsPriceSubtotal[0]+ selectedCartItemsPriceSubtotal.toFixed(2);
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
            }
        }
    };

</script>

