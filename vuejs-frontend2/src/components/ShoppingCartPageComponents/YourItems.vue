<template>

    <div class="miniSection" :style="{backgroundColor: 'white', width: '101%', paddingLeft: '1.5em', paddingRight: '1em',
    paddingBottom: '2.4em', display: 'flex', flexDirection: 'column'}">
        <h2>Your Items</h2>

        <div :style="{display: 'flex', alignItems: 'center', gap: '1.5em'}">
            <p @click="showSavedItems"
            :style="{color: currentSection==='saved-items' ? '#3c8bb5' : '', cursor: 'pointer',
            fontWeight: currentSection==='saved-items' ? 'bold' : '', fontSize: currentSection==='saved-items' ? '0.93em' : '0.85em',
            textDecoration: currentSection==='saved-items' ? 'underline' : ''}">
                Saved for later (4 items)
            </p>
            <p @click="showItemsToBuyAgain"
            :style="{color: currentSection==='buy-again' ? '#3c8bb5' : '', cursor: 'pointer',
            fontWeight: currentSection==='buy-again' ? 'bold' : '', fontSize: currentSection==='buy-again' ? '0.93em' : '0.85em',
            textDecoration: currentSection==='buy-again' ? 'underline' : ''}">
                Buy Again (3 items)
            </p>
        </div>

        <div :style="{width: '97%', borderStyle: 'solid', paddingTop: '1em', paddingLeft: '1em',
        borderWidth:'0.08em', paddingBottom: '2em', paddingRight: '1em'}">

            <template v-if="currentSection==='saved-items'">
                <button class="darkenOnHover" v-for="(category, index) in Object.keys(savedItemCountPerCategory)" :key="index"
                :style="{borderRadius: '0.5em', padding: '0.6em 1em', cursor: 'pointer',
                borderWidth: '0.08em', marginRight: '0.8em', marginBottom: '0.55em', fontWeight: currentCategoryOfSavedItems===category ? 'bold' : '',
                backgroundColor: currentCategoryOfSavedItems===category ? '#c8e6fa' : 'white', fontSize: '0.8em'}"
                @click="updateCurrentCategoryOfSavedItems(category)">{{ category }} ({{ savedItemCountPerCategory[category] }})</button>

                <h4>{{ currentCategoryOfSavedItems }}</h4>
                <div v-for="(rowStartIndex, index) in indicesOfRowStartsOfSavedItems"
                :style="{display: 'flex', alignItems: 'center', gap: '1em', marginTop:'1em'}" :key="index">
                    <SingleItemSavedForLater v-if="currentCategoryOfSavedItems.length==0 || itemsSavedForLater[rowStartIndex].category===currentCategoryOfSavedItems" :productId="itemsSavedForLater[rowStartIndex].productId" :productImage="itemsSavedForLater[rowStartIndex].productImage"
                    :productName="itemsSavedForLater[rowStartIndex].productName" :inStock="itemsSavedForLater[rowStartIndex].inStock"
                    :hasPremium="hasPremium" :options="itemsSavedForLater[rowStartIndex].options" :numBuyersInPastMonth="itemsSavedForLater[rowStartIndex].numBuyersInPastMonth"
                    :productPrice="itemsSavedForLater[rowStartIndex].productPrice" :id="itemsSavedForLater[rowStartIndex].id"
                    @deleteSavedItem="deleteSavedItem" @moveSavedItemToCart="moveSavedItemToCart"
                    />
                    <SingleItemSavedForLater v-if="rowStartIndex+1<itemsSavedForLater.length && (currentCategoryOfSavedItems.length==0 || itemsSavedForLater[rowStartIndex+1].category===currentCategoryOfSavedItems)"
                    :productId="itemsSavedForLater[rowStartIndex+1].productId" :productImage="itemsSavedForLater[rowStartIndex+1].productImage"
                    :productName="itemsSavedForLater[rowStartIndex+1].productName" :inStock="itemsSavedForLater[rowStartIndex+1].inStock"
                    :hasPremium="hasPremium" :options="itemsSavedForLater[rowStartIndex+1].options" :numBuyersInPastMonth="itemsSavedForLater[rowStartIndex+1].numBuyersInPastMonth"
                    :productPrice="itemsSavedForLater[rowStartIndex+1].productPrice" :id="itemsSavedForLater[rowStartIndex+1].id"
                    @deleteSavedItem="deleteSavedItem" @moveSavedItemToCart="moveSavedItemToCart"
                    />
                    <SingleItemSavedForLater v-if="rowStartIndex+2<itemsSavedForLater.length && (currentCategoryOfSavedItems.length==0 || itemsSavedForLater[rowStartIndex+2].category===currentCategoryOfSavedItems)"
                    :productId="itemsSavedForLater[rowStartIndex+2].productId" :productImage="itemsSavedForLater[rowStartIndex+2].productImage"
                    :productName="itemsSavedForLater[rowStartIndex+2].productName" :inStock="itemsSavedForLater[rowStartIndex+2].inStock"
                    :hasPremium="hasPremium" :options="itemsSavedForLater[rowStartIndex+2].options" :numBuyersInPastMonth="itemsSavedForLater[rowStartIndex+2].numBuyersInPastMonth"
                    :productPrice="itemsSavedForLater[rowStartIndex+2].productPrice" :id="itemsSavedForLater[rowStartIndex+2].id"
                    @deleteSavedItem="deleteSavedItem" @moveSavedItemToCart="moveSavedItemToCart"
                    />
                    <SingleItemSavedForLater v-if="rowStartIndex+3<itemsSavedForLater.length && (currentCategoryOfSavedItems.length==0 || itemsSavedForLater[rowStartIndex+3].category===currentCategoryOfSavedItems)"
                    :productId="itemsSavedForLater[rowStartIndex+3].productId" :productImage="itemsSavedForLater[rowStartIndex+3].productImage"
                    :productName="itemsSavedForLater[rowStartIndex+3].productName" :inStock="itemsSavedForLater[rowStartIndex+3].inStock"
                    :hasPremium="hasPremium" :options="itemsSavedForLater[rowStartIndex+3].options" :numBuyersInPastMonth="itemsSavedForLater[rowStartIndex+3].numBuyersInPastMonth"
                    :productPrice="itemsSavedForLater[rowStartIndex+3].productPrice" :id="itemsSavedForLater[rowStartIndex+3].id"
                    @deleteSavedItem="deleteSavedItem" @moveSavedItemToCart="moveSavedItemToCart"
                    />
                </div>

                <h4 v-if="currentCategoryOfSavedItems.length>0">More saved items</h4>
                <template v-if="currentCategoryOfSavedItems.length>0">
                    <div v-for="(rowStartIndex, index) in indicesOfRowStartsOfSavedItems" :key="index"
                    :style="{display: 'flex', alignItems: 'center', gap: '1em', marginTop:'1em'}">
                        <SingleItemSavedForLater v-if="itemsSavedForLater[rowStartIndex].category!==currentCategoryOfSavedItems" :productId="itemsSavedForLater[rowStartIndex].productId" :productImage="itemsSavedForLater[rowStartIndex].productImage"
                        :productName="itemsSavedForLater[rowStartIndex].productName" :inStock="itemsSavedForLater[rowStartIndex].inStock"
                        :hasPremium="hasPremium" :options="itemsSavedForLater[rowStartIndex].options" :numBuyersInPastMonth="itemsSavedForLater[rowStartIndex].numBuyersInPastMonth"
                        :productPrice="itemsSavedForLater[rowStartIndex].productPrice" :id="itemsSavedForLater[rowStartIndex].id"
                        @deleteSavedItem="deleteSavedItem" @moveSavedItemToCart="moveSavedItemToCart"
                        />
                        <SingleItemSavedForLater v-if="rowStartIndex+1<itemsSavedForLater.length && itemsSavedForLater[rowStartIndex+1].category!==currentCategoryOfSavedItems"
                        :productId="itemsSavedForLater[rowStartIndex+1].productId" :productImage="itemsSavedForLater[rowStartIndex+1].productImage"
                        :productName="itemsSavedForLater[rowStartIndex+1].productName" :inStock="itemsSavedForLater[rowStartIndex+1].inStock"
                        :hasPremium="hasPremium" :options="itemsSavedForLater[rowStartIndex+1].options" :numBuyersInPastMonth="itemsSavedForLater[rowStartIndex+1].numBuyersInPastMonth"
                        :productPrice="itemsSavedForLater[rowStartIndex+1].productPrice" :id="itemsSavedForLater[rowStartIndex+1].id"
                        @deleteSavedItem="deleteSavedItem" @moveSavedItemToCart="moveSavedItemToCart"
                        />
                        <SingleItemSavedForLater v-if="rowStartIndex+2<itemsSavedForLater.length && itemsSavedForLater[rowStartIndex+2].category!==currentCategoryOfSavedItems"
                        :productId="itemsSavedForLater[rowStartIndex+2].productId" :productImage="itemsSavedForLater[rowStartIndex+2].productImage"
                        :productName="itemsSavedForLater[rowStartIndex+2].productName" :inStock="itemsSavedForLater[rowStartIndex+2].inStock"
                        :hasPremium="hasPremium" :options="itemsSavedForLater[rowStartIndex+2].options" :numBuyersInPastMonth="itemsSavedForLater[rowStartIndex+2].numBuyersInPastMonth"
                        :productPrice="itemsSavedForLater[rowStartIndex+2].productPrice" :id="itemsSavedForLater[rowStartIndex+2].id"
                        @deleteSavedItem="deleteSavedItem" @moveSavedItemToCart="moveSavedItemToCart"
                        />
                        <SingleItemSavedForLater v-if="rowStartIndex+3<itemsSavedForLater.length && itemsSavedForLater[rowStartIndex+3].category!==currentCategoryOfSavedItems"
                        :productId="itemsSavedForLater[rowStartIndex+3].productId" :productImage="itemsSavedForLater[rowStartIndex+3].productImage"
                        :productName="itemsSavedForLater[rowStartIndex+3].productName" :inStock="itemsSavedForLater[rowStartIndex+3].inStock"
                        :hasPremium="hasPremium" :options="itemsSavedForLater[rowStartIndex+3].options" :numBuyersInPastMonth="itemsSavedForLater[rowStartIndex+3].numBuyersInPastMonth"
                        :productPrice="itemsSavedForLater[rowStartIndex+3].productPrice" :id="itemsSavedForLater[rowStartIndex+3].id"
                        @deleteSavedItem="deleteSavedItem" @moveSavedItemToCart="moveSavedItemToCart"
                        />
                    </div>
                </template>

            </template>

            <template v-if="currentSection==='buy-again'">
                <SingleItemInBuyAgainSection  v-for="(item, index) in itemsAlreadyBought" :key="index"
                :productImage="item.productImage" :productName="item.productName"
                :inStock="item.inStock" :productPrice="item.productPrice" :productId="item.productId"
                @addBuyAgainItemToCart="addBuyAgainItemToCart"/>
            </template>


        </div>

    </div>

</template>

<script>
import SingleItemInBuyAgainSection from './SingleItemInBuyAgainSection.vue';
import SingleItemSavedForLater from './SingleItemSavedForLater.vue';
import deodorantSpray from '@/assets/images/deodorantSpray.jpg';
import milano from '@/assets/images/milano.jpg';
import socks from '@/assets/images/socks.jpg';

    export default {
        props: {
            itemsSavedForLater: Array,
            hasPremium: Boolean,
            deliveryAreaCountry: String
        },

        components: {
            SingleItemSavedForLater,
            SingleItemInBuyAgainSection
        },

        data() {
            return {
                deodorantSpray,
                milano,
                socks,
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
                currentSection: "saved-items",
                currentCategoryOfSavedItems: "",
                itemsAlreadyBought: [],
                savedItemCountPerCategory: {},
                indicesOfRowStartsOfSavedItems: [],
                haveFetchedItemsAlreadyBought: false
            }
        },

        methods: {
            showSavedItems() {
                this.currentSection = "saved-items";
            },

            showItemsToBuyAgain() {
                this.currentSection = "buy-again";
                if(!this.haveFetchedItemsAlreadyBought) {
                    //fetch items already bought by user
                    this.itemsAlreadyBought = [
                        {
                            productId: "deo",
                            productImage: deodorantSpray,
                            productName: "Degree Men Antiperspirant Spray Black + White 3 Count Protects from Deodorant Stains Instantly Dry Spray Deodorant 3.8 oz",
                            productPrice: "$17.34",
                            inStock: true
                        },
                        {
                            productId: "mil",
                            productImage: milano,
                            productName: "Pepperidge Farm Milano Cookies, Mint, 10 Packs, 2 Cookies per Pack",
                            productPrice: "$7.49",
                            inStock: true

                        },
                        {
                            productId: "soc",
                            productImage: socks,
                            productName: "POLO RALPH LAUREN Men's Classic Sport Solid Socks 6 Pair Pack - Cushioned Cotton Comfort, Gray Heather Assorted, 6-12.5",
                            productPrice: "$25.40",
                            inStock: false
                        }
                    ];
                    this.haveFetchedItemsAlreadyBought = true;
                }
            },

            updateCurrentCategoryOfSavedItems(newCategory) {
                if(this.currentCategoryOfSavedItems===newCategory) {
                    this.currentCategoryOfSavedItems = "";
                }
                else {
                    this.currentCategoryOfSavedItems = newCategory;
                }
            },

            deleteSavedItem(idOfSavedItemToDelete) {
                this.$emit("deleteSavedItem", idOfSavedItemToDelete);
            },

            moveSavedItemToCart(idOfSavedItemToMoveToCart) {
                this.$emit("moveSavedItemToCart", idOfSavedItemToMoveToCart);
            },

            addBuyAgainItemToCart(itemInfo) {
                this.$emit("addBuyAgainItemToCart", itemInfo);
            },

            updateCurrencies(currentCurrency, newCurrency) {
                for(let i=0; i<this.itemsAlreadyBought.length; i++) {
                    let currItemPrice = this.itemsAlreadyBought[i].productPrice;
                    currItemPrice = parseFloat(currItemPrice.substring(currentCurrency.length));
                    currItemPrice/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                    currItemPrice*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                    this.itemsAlreadyBought[i].productPrice = newCurrency+currItemPrice.toFixed(2);
                }
            }
        },
        
        watch: {
            itemsSavedForLater(newVal) {
                const countsPerCategoryOfSavedItems = {};
                this.indicesOfRowStartsOfSavedItems = [];
                for(let i=0; i<newVal.length; i++) {
                    const savedItem = newVal[i];
                    if(savedItem.category in countsPerCategoryOfSavedItems) {
                        countsPerCategoryOfSavedItems[savedItem.category]++;
                    }
                    else {
                        countsPerCategoryOfSavedItems[savedItem.category] = 1;
                    }
                    if(i%4==0) {
                        this.indicesOfRowStartsOfSavedItems.push(i);
                    }
                }
                this.savedItemCountPerCategory = countsPerCategoryOfSavedItems;
            },

            deliveryAreaCountry(newVal) {
                if(this.itemsAlreadyBought.length==0 || newVal.length==0) {
                    return;
                }
                let currentCurrency = this.itemsAlreadyBought[0].productPrice[0];
                if(currentCurrency==="A") {
                    currentCurrency+="$";
                }
                else if(currentCurrency==="M") {
                    currentCurrency+="X$";
                }
                else if(currentCurrency==="C") {
                    if(this.itemsAlreadyBought[0].productPrice[1]==="$") {
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

            itemsAlreadyBought(newVal) {
                if(this.deliveryAreaCountry.length==0 || newVal.length==0) {
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
                    if(newVal.productPrice[1]==="$") {
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
