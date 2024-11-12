<template>

    <div :style="{backgroundColor: 'white', width: '101%', paddingLeft: '1.5em', paddingRight: '1em',
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
            </template>

            <template v-if="currentSection==='saved-items'">
                <h4>{{ currentCategoryOfSavedItems }}</h4>
                <div v-for="(rowStartIndex, index) in indicesOfRowStartsOfSavedItems" :key="index"
                :style="{display: 'flex', alignItems: 'center', gap: '1em', marginTop:'1em'}">
                    <SingleItemSavedForLater v-if="currentCategoryOfSavedItems.length==0 || itemsSavedForLater[rowStartIndex].category===currentCategoryOfSavedItems" :productId="itemsSavedForLater[rowStartIndex].productId" :productImage="itemsSavedForLater[rowStartIndex].productImage"
                    :productName="itemsSavedForLater[rowStartIndex].productName" :inStock="itemsSavedForLater[rowStartIndex].inStock"
                    :hasPremium="hasPremium" :options="itemsSavedForLater[rowStartIndex].options" :numBuyersInPastMonth="itemsSavedForLater[rowStartIndex].numBuyersInPastMonth"
                    :productPrice="itemsSavedForLater[rowStartIndex].productPrice"
                    />
                    <SingleItemSavedForLater v-if="rowStartIndex+1<itemsSavedForLater.length && (currentCategoryOfSavedItems.length==0 || itemsSavedForLater[rowStartIndex+1].category===currentCategoryOfSavedItems)"
                    :productId="itemsSavedForLater[rowStartIndex+1].productId" :productImage="itemsSavedForLater[rowStartIndex+1].productImage"
                    :productName="itemsSavedForLater[rowStartIndex+1].productName" :inStock="itemsSavedForLater[rowStartIndex+1].inStock"
                    :hasPremium="hasPremium" :options="itemsSavedForLater[rowStartIndex+1].options" :numBuyersInPastMonth="itemsSavedForLater[rowStartIndex+1].numBuyersInPastMonth"
                    :productPrice="itemsSavedForLater[rowStartIndex+1].productPrice"
                    />
                    <SingleItemSavedForLater v-if="rowStartIndex+2<itemsSavedForLater.length && (currentCategoryOfSavedItems.length==0 || itemsSavedForLater[rowStartIndex+2].category===currentCategoryOfSavedItems)"
                    :productId="itemsSavedForLater[rowStartIndex+2].productId" :productImage="itemsSavedForLater[rowStartIndex+2].productImage"
                    :productName="itemsSavedForLater[rowStartIndex+2].productName" :inStock="itemsSavedForLater[rowStartIndex+2].inStock"
                    :hasPremium="hasPremium" :options="itemsSavedForLater[rowStartIndex+2].options" :numBuyersInPastMonth="itemsSavedForLater[rowStartIndex+2].numBuyersInPastMonth"
                    :productPrice="itemsSavedForLater[rowStartIndex+2].productPrice"
                    />
                    <SingleItemSavedForLater v-if="rowStartIndex+3<itemsSavedForLater.length && (currentCategoryOfSavedItems.length==0 || itemsSavedForLater[rowStartIndex+3].category===currentCategoryOfSavedItems)"
                    :productId="itemsSavedForLater[rowStartIndex+3].productId" :productImage="itemsSavedForLater[rowStartIndex+3].productImage"
                    :productName="itemsSavedForLater[rowStartIndex+3].productName" :inStock="itemsSavedForLater[rowStartIndex+3].inStock"
                    :hasPremium="hasPremium" :options="itemsSavedForLater[rowStartIndex+3].options" :numBuyersInPastMonth="itemsSavedForLater[rowStartIndex+3].numBuyersInPastMonth"
                    :productPrice="itemsSavedForLater[rowStartIndex+3].productPrice"
                    />
                </div>

                <h4 v-if="currentCategoryOfSavedItems.length>0">More saved items</h4>
                <template v-if="currentCategoryOfSavedItems.length>0">
                    <div v-for="(rowStartIndex, index) in indicesOfRowStartsOfSavedItems" :key="index"
                    :style="{display: 'flex', alignItems: 'center', gap: '1em', marginTop:'1em'}">
                        <SingleItemSavedForLater v-if="itemsSavedForLater[rowStartIndex].category!==currentCategoryOfSavedItems" :productId="itemsSavedForLater[rowStartIndex].productId" :productImage="itemsSavedForLater[rowStartIndex].productImage"
                        :productName="itemsSavedForLater[rowStartIndex].productName" :inStock="itemsSavedForLater[rowStartIndex].inStock"
                        :hasPremium="hasPremium" :options="itemsSavedForLater[rowStartIndex].options" :numBuyersInPastMonth="itemsSavedForLater[rowStartIndex].numBuyersInPastMonth"
                        :productPrice="itemsSavedForLater[rowStartIndex].productPrice"
                        />
                        <SingleItemSavedForLater v-if="rowStartIndex+1<itemsSavedForLater.length && itemsSavedForLater[rowStartIndex+1].category!==currentCategoryOfSavedItems"
                        :productId="itemsSavedForLater[rowStartIndex+1].productId" :productImage="itemsSavedForLater[rowStartIndex+1].productImage"
                        :productName="itemsSavedForLater[rowStartIndex+1].productName" :inStock="itemsSavedForLater[rowStartIndex+1].inStock"
                        :hasPremium="hasPremium" :options="itemsSavedForLater[rowStartIndex+1].options" :numBuyersInPastMonth="itemsSavedForLater[rowStartIndex+1].numBuyersInPastMonth"
                        :productPrice="itemsSavedForLater[rowStartIndex+1].productPrice"
                        />
                        <SingleItemSavedForLater v-if="rowStartIndex+2<itemsSavedForLater.length && itemsSavedForLater[rowStartIndex+2].category!==currentCategoryOfSavedItems"
                        :productId="itemsSavedForLater[rowStartIndex+2].productId" :productImage="itemsSavedForLater[rowStartIndex+2].productImage"
                        :productName="itemsSavedForLater[rowStartIndex+2].productName" :inStock="itemsSavedForLater[rowStartIndex+2].inStock"
                        :hasPremium="hasPremium" :options="itemsSavedForLater[rowStartIndex+2].options" :numBuyersInPastMonth="itemsSavedForLater[rowStartIndex+2].numBuyersInPastMonth"
                        :productPrice="itemsSavedForLater[rowStartIndex+2].productPrice"
                        />
                        <SingleItemSavedForLater v-if="rowStartIndex+3<itemsSavedForLater.length && itemsSavedForLater[rowStartIndex+3].category!==currentCategoryOfSavedItems"
                        :productId="itemsSavedForLater[rowStartIndex+3].productId" :productImage="itemsSavedForLater[rowStartIndex+3].productImage"
                        :productName="itemsSavedForLater[rowStartIndex+3].productName" :inStock="itemsSavedForLater[rowStartIndex+3].inStock"
                        :hasPremium="hasPremium" :options="itemsSavedForLater[rowStartIndex+3].options" :numBuyersInPastMonth="itemsSavedForLater[rowStartIndex+3].numBuyersInPastMonth"
                        :productPrice="itemsSavedForLater[rowStartIndex+3].productPrice"
                        />
                    </div>
                </template>

            </template>


        </div>

    </div>

</template>

<script>
import SingleItemSavedForLater from './SingleItemSavedForLater.vue'

    export default {
        props: {
            itemsSavedForLater: Array,
            hasPremium: Boolean
        },

        components: {
            SingleItemSavedForLater
        },

        data() {
            return {
                currentSection: "saved-items",
                currentCategoryOfSavedItems: "",
                itemsAlreadyBought: [],
                savedItemCountPerCategory: {},
                indicesOfRowStartsOfSavedItems: []
            }
        },

        methods: {
            showSavedItems() {
                this.currentSection = "saved-items";
            },

            showItemsToBuyAgain() {
                this.currentSection = "buy-again";
            },

            updateCurrentCategoryOfSavedItems(newCategory) {
                if(this.currentCategoryOfSavedItems===newCategory) {
                    this.currentCategoryOfSavedItems = "";
                }
                else {
                    this.currentCategoryOfSavedItems = newCategory;
                }
            }
        },
        
        watch: {
            itemsSavedForLater(newVal) {
                const countsPerCategoryOfSavedItems = {};
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
            }
        }
    };

</script>

<style>
    .darkenOnHover:hover {
        background-color: #f2f2f2 !important;
    }
</style>