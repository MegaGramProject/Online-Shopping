<template>

    <div class="miniSection" :style="{backgroundColor: 'white', width: '101%', paddingLeft: '1.5em', paddingRight: '1em',
    paddingBottom: '2.4em', display: 'flex', flexDirection: 'column'}">
        <h2>Your Items</h2>

        <div :style="{display: 'flex', alignItems: 'center', gap: '1.5em'}">
            <p @click="showSavedItems"
            :style="{color: currentSection==='saved-items' ? '#3c8bb5' : '', cursor: 'pointer',
            fontWeight: currentSection==='saved-items' ? 'bold' : '', fontSize: currentSection==='saved-items' ? '0.93em' : '0.85em',
            textDecoration: currentSection==='saved-items' ? 'underline' : ''}">
                Saved for later ({{itemsSavedForLater.length}} items)
            </p>
            <p @click="showItemsToBuyAgain"
            :style="{color: currentSection==='buy-again' ? '#3c8bb5' : '', cursor: 'pointer',
            fontWeight: currentSection==='buy-again' ? 'bold' : '', fontSize: currentSection==='buy-again' ? '0.93em' : '0.85em',
            textDecoration: currentSection==='buy-again' ? 'underline' : ''}">
                Buy Again {{ numItemsToBuyAgainText }}
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
                    @deleteSavedItem="deleteSavedItem" @moveSavedItemToCart="moveSavedItemToCart" :productPricePerUnit="itemsSavedForLater[rowStartIndex].productPricePerUnit"
                    />
                    <SingleItemSavedForLater v-if="rowStartIndex+1<itemsSavedForLater.length && (currentCategoryOfSavedItems.length==0 || itemsSavedForLater[rowStartIndex+1].category===currentCategoryOfSavedItems)"
                    :productId="itemsSavedForLater[rowStartIndex+1].productId" :productImage="itemsSavedForLater[rowStartIndex+1].productImage"
                    :productName="itemsSavedForLater[rowStartIndex+1].productName" :inStock="itemsSavedForLater[rowStartIndex+1].inStock"
                    :hasPremium="hasPremium" :options="itemsSavedForLater[rowStartIndex+1].options" :numBuyersInPastMonth="itemsSavedForLater[rowStartIndex+1].numBuyersInPastMonth"
                    :productPrice="itemsSavedForLater[rowStartIndex+1].productPrice" :id="itemsSavedForLater[rowStartIndex+1].id"
                    @deleteSavedItem="deleteSavedItem" @moveSavedItemToCart="moveSavedItemToCart" :productPricePerUnit="itemsSavedForLater[rowStartIndex+1].productPricePerUnit"
                    />
                    <SingleItemSavedForLater v-if="rowStartIndex+2<itemsSavedForLater.length && (currentCategoryOfSavedItems.length==0 || itemsSavedForLater[rowStartIndex+2].category===currentCategoryOfSavedItems)"
                    :productId="itemsSavedForLater[rowStartIndex+2].productId" :productImage="itemsSavedForLater[rowStartIndex+2].productImage"
                    :productName="itemsSavedForLater[rowStartIndex+2].productName" :inStock="itemsSavedForLater[rowStartIndex+2].inStock"
                    :hasPremium="hasPremium" :options="itemsSavedForLater[rowStartIndex+2].options" :numBuyersInPastMonth="itemsSavedForLater[rowStartIndex+2].numBuyersInPastMonth"
                    :productPrice="itemsSavedForLater[rowStartIndex+2].productPrice" :id="itemsSavedForLater[rowStartIndex+2].id"
                    @deleteSavedItem="deleteSavedItem" @moveSavedItemToCart="moveSavedItemToCart" :productPricePerUnit="itemsSavedForLater[rowStartIndex+2].productPricePerUnit"
                    />
                    <SingleItemSavedForLater v-if="rowStartIndex+3<itemsSavedForLater.length && (currentCategoryOfSavedItems.length==0 || itemsSavedForLater[rowStartIndex+3].category===currentCategoryOfSavedItems)"
                    :productId="itemsSavedForLater[rowStartIndex+3].productId" :productImage="itemsSavedForLater[rowStartIndex+3].productImage"
                    :productName="itemsSavedForLater[rowStartIndex+3].productName" :inStock="itemsSavedForLater[rowStartIndex+3].inStock"
                    :hasPremium="hasPremium" :options="itemsSavedForLater[rowStartIndex+3].options" :numBuyersInPastMonth="itemsSavedForLater[rowStartIndex+3].numBuyersInPastMonth"
                    :productPrice="itemsSavedForLater[rowStartIndex+3].productPrice" :id="itemsSavedForLater[rowStartIndex+3].id"
                    @deleteSavedItem="deleteSavedItem" @moveSavedItemToCart="moveSavedItemToCart" :productPricePerUnit="itemsSavedForLater[rowStartIndex+3].productPricePerUnit"
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
                        @deleteSavedItem="deleteSavedItem" @moveSavedItemToCart="moveSavedItemToCart" :productPricePerUnit="itemsSavedForLater[rowStartIndex].productPricePerUnit"
                        />
                        <SingleItemSavedForLater v-if="rowStartIndex+1<itemsSavedForLater.length && itemsSavedForLater[rowStartIndex+1].category!==currentCategoryOfSavedItems"
                        :productId="itemsSavedForLater[rowStartIndex+1].productId" :productImage="itemsSavedForLater[rowStartIndex+1].productImage"
                        :productName="itemsSavedForLater[rowStartIndex+1].productName" :inStock="itemsSavedForLater[rowStartIndex+1].inStock"
                        :hasPremium="hasPremium" :options="itemsSavedForLater[rowStartIndex+1].options" :numBuyersInPastMonth="itemsSavedForLater[rowStartIndex+1].numBuyersInPastMonth"
                        :productPrice="itemsSavedForLater[rowStartIndex+1].productPrice" :id="itemsSavedForLater[rowStartIndex+1].id"
                        @deleteSavedItem="deleteSavedItem" @moveSavedItemToCart="moveSavedItemToCart" :productPricePerUnit="itemsSavedForLater[rowStartIndex+1].productPricePerUnit"
                        />
                        <SingleItemSavedForLater v-if="rowStartIndex+2<itemsSavedForLater.length && itemsSavedForLater[rowStartIndex+2].category!==currentCategoryOfSavedItems"
                        :productId="itemsSavedForLater[rowStartIndex+2].productId" :productImage="itemsSavedForLater[rowStartIndex+2].productImage"
                        :productName="itemsSavedForLater[rowStartIndex+2].productName" :inStock="itemsSavedForLater[rowStartIndex+2].inStock"
                        :hasPremium="hasPremium" :options="itemsSavedForLater[rowStartIndex+2].options" :numBuyersInPastMonth="itemsSavedForLater[rowStartIndex+2].numBuyersInPastMonth"
                        :productPrice="itemsSavedForLater[rowStartIndex+2].productPrice" :id="itemsSavedForLater[rowStartIndex+2].id"
                        @deleteSavedItem="deleteSavedItem" @moveSavedItemToCart="moveSavedItemToCart" :productPricePerUnit="itemsSavedForLater[rowStartIndex+2].productPricePerUnit"
                        />
                        <SingleItemSavedForLater v-if="rowStartIndex+3<itemsSavedForLater.length && itemsSavedForLater[rowStartIndex+3].category!==currentCategoryOfSavedItems"
                        :productId="itemsSavedForLater[rowStartIndex+3].productId" :productImage="itemsSavedForLater[rowStartIndex+3].productImage"
                        :productName="itemsSavedForLater[rowStartIndex+3].productName" :inStock="itemsSavedForLater[rowStartIndex+3].inStock"
                        :hasPremium="hasPremium" :options="itemsSavedForLater[rowStartIndex+3].options" :numBuyersInPastMonth="itemsSavedForLater[rowStartIndex+3].numBuyersInPastMonth"
                        :productPrice="itemsSavedForLater[rowStartIndex+3].productPrice" :id="itemsSavedForLater[rowStartIndex+3].id"
                        @deleteSavedItem="deleteSavedItem" @moveSavedItemToCart="moveSavedItemToCart" :productPricePerUnit="itemsSavedForLater[rowStartIndex+3].productPricePerUnit"
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
import deodorantSpray from '@/assets/images/deodorantSpray.jpg';
import milano from '@/assets/images/milano.jpg';
import socks from '@/assets/images/socks.jpg';
import SingleItemInBuyAgainSection from './SingleItemInBuyAgainSection.vue';
import SingleItemSavedForLater from './SingleItemSavedForLater.vue';

    export default {
        props: {
            itemsSavedForLater: Array,
            hasPremium: Boolean,
            deliveryAreaCountry: String,
            authenticatedUsername: String
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
                haveFetchedItemsAlreadyBought: false,
                numItemsToBuyAgainText: ""
            }
        },

        methods: {
            showSavedItems() {
                this.currentSection = "saved-items";
            },

            async showItemsToBuyAgain() {
                this.currentSection = "buy-again";
                if(!this.haveFetchedItemsAlreadyBought) {
                    this.haveFetchedItemsAlreadyBought = true;

                    const response = await fetch(`http://localhost:8028/getProductIdsOfPastOrdersOfUserInOrder/${this.authenticatedUsername}`);
                    if(!response.ok) {
                        throw new Error('Network response not ok');
                    }
                    const productIdsOfPastOrdersInOrder = await response.json();

                    if(productIdsOfPastOrdersInOrder.length>0) {
                        const response1 = await fetch('http://localhost:8022/getNamesAndPricesOfListOfProducts', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                productIds: productIdsOfPastOrdersInOrder
                            })
                        });
                        if(!response1.ok) {
                            throw new Error('Network response not ok');
                        }
                        const namesAndPricesOfListOfProducts = await response1.json();
                        /*
                            above is a dict where keys are productIds in productIdsOfPastOrdersInOrder and
                            values are lists of 2 or 4 elements:
                            first is the product-name, second is the price of the product with
                            all the default options, and third & fourth(these two are missing for certain products)
                            are the price per unit of the product with all the default options.

                            an examples of 2 values of this dict are:
                            ["Product-Name", "$35"], &
                            ["Product-Name", "$20", "$2" "oz"]
                            
                        */

                        const response2a = await fetch('http://localhost:8026/getNumProductsLeftForListOfProducts', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(productIdsOfPastOrdersInOrder)
                        });
                        if(!response2a.ok) {
                            throw new Error('Network response not ok');
                        }
                        const numProductsLeftForListOfProducts = await response2a.json();

                        const response2b = await fetch('http://localhost:8030/getProductIdsOfThoseInStock', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                numProductsLeftForListOfProducts: numProductsLeftForListOfProducts
                            })
                        });
                        if(!response2b.ok) {
                            throw new Error('Network response not ok');
                        }
                        let productIdsOfThoseInStock = await response2b.json();
                        productIdsOfThoseInStock = new Set(productIdsOfThoseInStock);

                        const response3 = await fetch('http://localhost:8031/getMainProductImagesOfProducts',  {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(productIdsOfPastOrdersInOrder)
                        });
                        if(!response3.ok) {
                            throw new Error('Network response not ok');
                        }
                        const productIdToMainImageMappings = await response3.json();

                        this.itemsAlreadyBought = productIdsOfPastOrdersInOrder.map(productId => {
                            return {
                                productId: productId,
                                productImage: `data:image/jpeg;base64,${productIdToMainImageMappings[productId]}`,
                                productName: namesAndPricesOfListOfProducts[productId][0],
                                productPrice: namesAndPricesOfListOfProducts[productId][1],
                                inStock: productIdsOfThoseInStock.has(productId)
                            }
                        });
                    }


                    let numItemsToBuyAgainText = "(" + this.itemsAlreadyBought.length;
                    if(this.itemsAlreadyBought.length==1) {
                        numItemsToBuyAgainText+= " item)";
                    }
                    else {
                        numItemsToBuyAgainText+= " items)";
                    }
                    this.numItemsToBuyAgainText = numItemsToBuyAgainText;
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
                if(newVal==null) {
                    return;
                }
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
