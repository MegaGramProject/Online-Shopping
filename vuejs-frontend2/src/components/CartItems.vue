<template>
    <div :style="{backgroundColor: 'white', width: '60%', paddingLeft: '1.5em', paddingRight: '1.5em',
    paddingBottom: '2.4em', display: 'flex',
    flexDirection: 'column'}">
        <p :style="{fontSize: '2em'}">Shopping Cart</p>
        <p v-if="selectedItems.length==0 && items.length>0">No items selected. <a @click="selectAllItems" :style="{color: '#4180b0', cursor: 'pointer'}">Select all items</a></p>
        <p v-if="selectedItems.length>0 && selectedItems.length<items.length"><a @click="selectAllItems" :style="{color: '#4180b0', cursor: 'pointer'}">Select all items</a></p>
        <p v-if="items.length>0 && selectedItems.length==items.length"><a @click="deselectAllItems" :style="{color: '#4180b0', cursor: 'pointer'}">Deselect all items</a></p>
        <div :style="{width: '100%', borderStyle: 'solid', borderColor: 'lightgray', display: 'flex',
        justifyContent: 'end', borderTop: 'none', borderLeft: 'none', borderRight: 'none'}">
            <p :style="{marginBottom:'0.2em'}">Price</p>
        </div>

        <SingleItemInCart v-for="(item, index) in items" :key="index" :index="index" :id="item.id" :productId="item.productId" :productImage="item.productImage"
        :productName="item.productName" :inStock="item.inStock" :hasPremium="hasPremium" :options="item.options"
        :getItAsSoonAs="item.getItAsSoonAs" :quantity="item.quantity" :productPrice="item.productPrice" :dealsAvailable="item.dealsAvailable"
        :megagramChoiceCategory="item.megagramChoiceCategory" :numberOneBestSeller="item.numberOneBestSeller" @removeItem="removeItem"
        @selectItem="selectItem" @unselectItem="unselectItem" @updateQuantity="updateQuantity"
        :isSelected="item.isSelected" :hasBeenRemoved="item.hasBeenRemoved" :hasBeenSavedForLater="item.hasBeenSavedForLater"
        @saveItemForLater="saveItemForLater"/>

    </div>

</template>

<script>
import SingleItemInCart from './SingleItemInCart.vue';
import toys from '@/assets/images/toys.jpg';

    export default {
        props: {
            hasPremium: Boolean
        },

        components: {
            SingleItemInCart
        },

        data() {
            return {
                toys,
                selectedItems: [
                    {
                        id: 0,
                        productPrice: "$19.99",
                        quantity: 2,
                    }
                ],
                items: [
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
                        megagramChoiceCategory: 'a',
                        numberOneBestSeller: null,
                        isSelected: true,
                        hasBeenRemoved: false,
                        hasBeenSavedForLater: false
                    }
                ],
            }
        },

        methods: {
            selectAllItems() {
                this.items.map(item=> {
                    if(!item.hasBeenRemoved && !item.hasBeenSavedForLater) {
                        item.isSelected = true;
                    }
                    return item;
                });
            },

            deselectAllItems() {
                this.items.map(item=> {
                    item.isSelected = false;
                    return item;
                })
            },

            selectItem(indexOfCartItemToSelect) {
                const cartItemToSelect = this.items[indexOfCartItemToSelect];
                this.items[indexOfCartItemToSelect].isSelected = true;
                this.selectedItems.push({
                    id: cartItemToSelect.id,
                    productPrice: cartItemToSelect.productPrice,
                    quantity: cartItemToSelect.quantity
                });
                this.$emit('updateSelectedCartItems', this.selectedItems);
            },

            unselectItem(indexOfCartItemToUnselect) {
                const idOfCartItemToUnselect = this.items[indexOfCartItemToUnselect].id;
                this.items[indexOfCartItemToUnselect].isSelected = false;
                this.selectedItems = this.selectedItems.filter((selectedItem) => idOfCartItemToUnselect!==selectedItem.id);
                this.$emit('updateSelectedCartItems', this.selectedItems);
            },

            removeItem(info) {
                this.items[info.index].hasBeenRemoved = true;
                if(info.isSelected==true) {
                    this.selectedItems = this.selectedItems.filter(selectedItem=> {
                        return selectedItem.id!==info.id;
                    });
                    this.$emit('updateSelectedCartItems', this.selectedItems);
                }
            },

            updateQuantity(info) {
                this.items[info.index].quantity = info.newQuantity;
                if(info.isSelected==true) {
                    this.selectedItems = this.selectedItems.map(selectedItem=> {
                        if(selectedItem.id===info.id) {
                            selectedItem.quantity = info.newQuantity;
                        }
                        return selectedItem;
                    });
                    this.$emit('updateSelectedCartItems', this.selectedItems);
                }
            },

            saveItemForLater(info) {
                this.items[info.index].hasBeenSavedForLater = true;
                if(info.isSelected==true) {
                    this.selectedItems = this.selectedItems.filter(selectedItem=> {
                        return selectedItem.id!==info.id;
                    });
                    this.$emit('updateSelectedCartItems', this.selectedItems);
                }
            }
        },
    }

</script>