<template>
        <div id="topmostSection" :style="{display: 'flex', alignItems: 'center', width: '100%', backgroundColor: '#020b1f', padding: '0.5em 0.5em',
        position: 'relative', height: '6.6%'}">

            <div @click="takeUserToShoppingMainPage" :style="{ display: 'flex', flexDirection: 'column', alignItems: 'start',
            paddingTop: '0.5em', marginLeft: '2em', marginRight: '2em', cursor: 'pointer' }">
                <b :style="{ fontFamily: 'Billabong', color: 'white', fontSize: '1.8em' }">Megagram</b>
                <div v-if="hasPremium" :style="{ display: 'flex', alignItems: 'center', marginLeft: '-1em', marginTop: '-0.4em' }">
                    <img :src="smileyArrow" :style="{ height: '2.7em', width: '5.8em', pointerEvents: 'none' }" />
                    <b :style="{ color: 'silver', fontSize: '0.8em', marginLeft: '-0.7em' }">premium</b>
                </div>
                <img v-else :src="smileyArrow" :style="{ height: '2.7em', width: '9.2em', pointerEvents: 'none', marginLeft: '-1.5em', marginTop: '-0.4em' }" />
            </div>

            <div @click="notifyParentToShowChooseYourLocationPopup" @mouseenter="toggleIsHoveringOnDeliverToDiv" @mouseleave="toggleIsHoveringOnDeliverToDiv"
            :style="{display: 'flex', flexDirection: 'column', borderStyle: isHoveringOnDeliverToDiv ? 'solid' : 'none',
            borderColor: 'white', padding: '0.1em 0.4em', cursor: 'pointer', borderWidth: '0.07em'}">
                <small :style="{ color: '#ebebeb' }">Deliver to</small>
                <div :style="{ display: 'flex', alignItems: 'end' }">
                    <img :src="mapPinIcon" :style="{ height: '2em', width: '2em', pointerEvents: 'none' }" />
                    <b :style="{ color: 'white' }">{{ deliveryArea }}</b>
                </div>
            </div>

            <div :style="{marginLeft: '5em', display: 'flex', alignItems: 'start', gap: '0em',  width: '51%', height: '3.8em'}">
                <select v-model="selectedCategoryForSearch" :style="{backgroundColor: '#ebebeb', paddingLeft: '1em', width: '5.5em', height: '4.2em'}">
                    <option value="">All</option>
                    <option value="Arts & Crafts">Arts & Crafts</option>
                    <option value="Books">Books</option>
                    <option value="Cell Phones & Accessories">Cell Phones and Accessories</option>
                    <option value="Clothing & Shoes">Clothing & Shoes</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Food">Food</option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                    <option value="Toys for Kids">Toys for Kids</option>
                    <option value="Smart Home">Smart Home</option>
                    <option value="Sports & Outdoors">Sports & Outdoors</option>
                </select>
                <div ref="textareaDivRef" :style="{display: 'flex', flexDirection: 'column', width: '95%'}">
                    <textarea v-model="searchTextareaValue" placeholder="Search Megagram Shop"
                    :style="{fontFamily: 'Arial', paddingTop: '1em', paddingLeft: '1em', fontSize: '1em', resize: 'none'}">
                    </textarea>
                    <div v-if="displaySearchResults" :style="{padding: '0.5em 1em', backgroundColor: 'white', zIndex: '10'}">
                        <p>Search Results</p>
                        <p>Search Results</p>
                        <p>Search Results</p>
                        <p>Search Results</p>
                        <p>Search Results</p>
                        <p>Search Results</p>
                    </div>
                </div>
                <img @click="submitSearch" :src="orangeSearchButton" :style="{height: '3.6em', width: '3.5em', cursor: 'pointer'}">
            </div>

            <div @mouseenter="toggleIsHoveringOnListsDiv" @mouseleave="toggleIsHoveringOnListsDiv"
            :style="{display: 'flex', alignItems: 'start', cursor: 'pointer', borderStyle: isHoveringOnListsDiv ? 'solid' : 'none',
            borderColor: 'white', padding: '0.5em 1em', gap: '0.2em', width: '3.5em', marginLeft: '6em'}">
                <b :style="{color: 'white'}">Lists</b>
                <img :src="downwardTriangle" :style="{height: '1em', width: '1em', pointerEvents: 'none'}"/>
            </div>

            <div class="popup" v-if="isHoveringOnListsDiv || isHoveringOnListsPopupDiv" @mouseenter="toggleIsHoveringOnListsPopupDiv" @mouseleave="toggleIsHoveringOnListsPopupDiv"
                :style="{position: 'absolute', left:'76%', top: '81%', backgroundColor: 'white', width: '18em', height: '30em',
                display: 'flex', flexDirection: 'column', padding: '0.5em 1em', zIndex: '10'}">
                    <div :style="{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid',
                    borderColor: 'lightgray', borderTop: 'none', borderLeft: 'none', borderRight: 'none'}">
                        <h3>Explore Lists</h3>
                    </div>
                    <br/>
                    <div :style="{display: 'flex', width: '100%', height: '100%', justifyContent: 'space-between', gap: '1em', overflowY: 'scroll'}">
                        <div :style="{width: '50%', height: '100%', borderStyle: 'solid', borderColor: 'lightgray', borderTop: 'none',
                        borderLeft: 'none', borderBottom: 'none', borderWidth: '0.05em'}">
                            <h4>Make a List</h4>
                            <small @click="takeUserToCreateList" :style="{cursor: 'pointer', fontFamily: 'Roboto'}">Create a List</small>
                        </div>
                        <div :style="{width: '50%', height: '100%'}">
                            <h4>Find a List</h4>
                            <p @click="takeUserToViewList('GROCERIES!')" :style="{cursor: 'pointer', fontFamily: 'Roboto', color: 'gray'}">GROCERIES!</p>
                            <p @click="takeUserToViewList('my wishlist')" :style="{cursor: 'pointer', fontFamily: 'Roboto', color: 'gray'}">my wishlist</p>
                            <p @click="takeUserToViewList('vacation supplies')" :style="{cursor: 'pointer', fontFamily: 'Roboto', color: 'gray'}">vacation supplies</p>
                        </div>
                    </div>
            </div>

            <div @click="takeUserToReturnsAndOrdersPage" @mouseenter="toggleIsHoveringOnReturnsAndOrdersDiv" @mouseleave="toggleIsHoveringOnReturnsAndOrdersDiv"
            :style="{display: 'flex', flexDirection: 'column', cursor: 'pointer', borderStyle: isHoveringOnReturnsAndOrdersDiv ? 'solid' : 'none', borderColor: 'white',
            padding: '0.1em 0.4em'}">
                <small :style="{color: 'white'}">Returns</small>
                <b :style="{color: 'white'}">& Orders</b>
            </div>

            <div @mouseenter="toggleIsHoveringOnCartDiv" @mouseleave="toggleIsHoveringOnCartDiv"
            :style="{display: 'flex', alignItems: 'end',
            borderStyle: isHoveringOnCartDiv ? 'solid' : 'none', borderColor: 'white', padding: '0.1em 0.4em', gap: '0.6em'}">
                <img :src="cartIcon" :style="{height: '3em', width: '3em', pointerEvents: 'none'}"/>
                <div :style="{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2em'}">
                    <b v-if="numItemsInCart<100" :style="{color: 'orange'}">({{numItemsInCart}})</b>
                    <b v-else :style="{color: 'orange'}">(100+)</b>
                    <b :style="{color: 'white'}">Cart</b>
                </div>
            </div>
        

        </div>
</template>


<script>
import cartIcon from '@/assets/images/cartIcon.png';
import downwardTriangle from '@/assets/images/downwardTriangle.png';
import mapPinIcon from '@/assets/images/mapPinIcon.png';
import orangeSearchButton from '@/assets/images/orangeSearchButton.png';
import smileyArrow from '@/assets/images/smileyArrow.png';

    export default {
        props: {
            hasPremium: Boolean,
            authenticatedUsername: String,
            deliveryArea: String,
            numItemsInCart: Number
        },

        data() {
            return {
                smileyArrow,
                mapPinIcon,
                orangeSearchButton,
                downwardTriangle,
                cartIcon,
                categoryToPagePathSegmentMappings: {
                    '': 'shopAllItems',
                    'Arts & Crafts': 'shopArts&Crafts',
                    'Books': 'shopBooks',
                    'Cell Phones & Accessories': 'shopCellPhones&Accessories',
                    'Clothing & Shoes': 'shopFashion',
                    'Electronics': 'shopElectronics',
                    'Food': 'shopFood',
                    'Home & Kitchen': 'shopHome&Kitchen',
                    'Toys for Kids': 'shopToysForKids',
                    'Smart Home': 'shopSmartHomeProducts',
                    'Sports & Outdoors': 'shopSports&Outdoors'
                },
                isHoveringOnDeliverToDiv: false,
                selectedCategoryForSearch: "",
                searchTextareaValue: "",
                displaySearchResults: false,
                isHoveringOnListsDiv: false,
                isHoveringOnListsPopupDiv: false,
                isHoveringOnReturnsAndOrdersDiv: false,
                isHoveringOnCartDiv: false
            }
        },

        mounted() {
            document.addEventListener('click', this.handleClick);
        },

        methods: {
            takeUserToShoppingMainPage() {
                window.location.href = "http://localhost:8024/onlineShopping/"+this.authenticatedUsername
            },

            toggleIsHoveringOnDeliverToDiv() {
                this.isHoveringOnDeliverToDiv = !this.isHoveringOnDeliverToDiv;
            },

            toggleIsHoveringOnListsDiv() {
                if(!this.isHoveringOnListsDiv) {
                    this.isHoveringOnListsDiv = true;
                    this.$emit("showDarkScreen1");
                }
                else {
                    setTimeout(() => {
                        if(!this.isHoveringOnListsPopupDiv) {
                            this.$emit("hideDarkScreen1");
                        }
                        this.isHoveringOnListsDiv = false;
                    }, 50);
                }
            },

            toggleIsHoveringOnListsPopupDiv() {
                if(this.isHoveringOnListsPopupDiv) {
                    this.isHoveringOnListsPopupDiv = false;
                    this.$emit("hideDarkScreen1");
                    
                }
                else {
                    this.isHoveringOnListsPopupDiv = true;
                }
            },

            toggleIsHoveringOnReturnsAndOrdersDiv() {
                this.isHoveringOnReturnsAndOrdersDiv = !this.isHoveringOnReturnsAndOrdersDiv;
            },

            toggleIsHoveringOnCartDiv() {
                this.isHoveringOnCartDiv = !this.isHoveringOnCartDiv;
            },

            notifyParentToShowChooseYourLocationPopup() {
                this.$emit("showChooseYourLocationPopup");
            },

            async submitSearch() {
                /*
                const response = await fetch(`http://localhost:8025/addShopSearch/${this.authenticatedUsername}`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        search: this.searchTextareaValue,
                        searchCategory: this.selectedCategoryForSearch,
                        dateTime: (new Date()).toISOString()
                    })
                });
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                */
                window.location.href = `http://localhost:8024/${this.categoryToPagePathSegmentMappings[this.selectedCategoryForSearch]}/${this.searchTextareaValue}/${this.authenticatedUsername}`;
            },

            handleClick(event) {
                const textareaDivRef = this.$refs.textareaDivRef;
                if(!textareaDivRef) {
                    return;
                }
                
                if(this.displaySearchResults) {
                    if(!textareaDivRef.contains(event.target)) {
                        this.$emit("hideDarkScreen1");
                        this.displaySearchResults = false;
                    }
                }
                else if(textareaDivRef.contains(event.target)) {
                    this.$emit("showDarkScreen1");
                    this.displaySearchResults = true;
                }
            },

            takeUserToReturnsAndOrdersPage() {
                window.location.href = "http://localhost:8024/shoppingReturnsAndOrders/"+this.authenticatedUsername;
            },

            takeUserToViewList(listName) {
                window.location.href = `http://location:8024/shoppingViewList/${listName}/${this.authenticatedUsername}`;
            },

            takeUserToCreateList() {
                window.location.href = `http://location:8024/shoppingCreateList/${this.authenticatedUsername}`;
            }
        }

    };

</script>