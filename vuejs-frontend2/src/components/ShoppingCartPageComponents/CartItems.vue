<template>
    <div class="miniSection" :style="{backgroundColor: 'white', width: '100%', paddingLeft: '1.5em', paddingRight: '1.5em',
    paddingBottom: '2.4em', display: 'flex', flexDirection: 'column'}">
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
        :getItAsSoonAs="item.getItAsSoonAs" :quantity="item.quantity" :productPrice="item.productPrice" :productPricePerUnit="item.productPricePerUnit"
        :dealsAvailable="item.dealsAvailable" :megagramChoiceCategory="item.megagramChoiceCategory" @removeItem="removeItem"
        @selectItem="selectItem" @unselectItem="unselectItem" @updateQuantity="updateQuantity"
        :isSelected="item.isSelected" :hasBeenRemoved="item.hasBeenRemoved" :hasBeenSavedForLater="item.hasBeenSavedForLater"
        @saveItemForLater="saveItemForLater"/>

    </div>

</template>

<script>
import SingleItemInCart from './SingleItemInCart.vue';

    export default {
        props: {
            hasPremium: Boolean,
            items: Array
        },

        components: {
            SingleItemInCart
        },

        data() {
            return {
                selectedItems: [],
            }
        },

        methods: {
            selectAllItems() {
                this.$emit("selectAllCartItems");
            },

            deselectAllItems() {
                this.$emit("deselectAllCartItems");
            },

            selectItem(indexOfCartItemToSelect) {
                this.$emit("selectCartItem", indexOfCartItemToSelect);
                const cartItemToSelect = this.items[indexOfCartItemToSelect];
                this.selectedItems.push({
                    id: cartItemToSelect.id,
                    productPrice: cartItemToSelect.productPrice,
                    quantity: cartItemToSelect.quantity
                });
                this.$emit('updateSelectedCartItems', this.selectedItems);
            },

            unselectItem(indexOfCartItemToUnselect) {
                this.$emit("unselectCartItem", indexOfCartItemToUnselect);
                const idOfCartItemToUnselect = this.items[indexOfCartItemToUnselect].id;
                this.selectedItems = this.selectedItems.filter((selectedItem) => idOfCartItemToUnselect!==selectedItem.id);
                this.$emit('updateSelectedCartItems', this.selectedItems);
            },

            removeItem(info) {
                this.$emit("removeCartItem", info);
                if(info.isSelected==true) {
                    this.selectedItems = this.selectedItems.filter(selectedItem=> {
                        return selectedItem.id!==info.id;
                    });
                    this.$emit('updateSelectedCartItems', this.selectedItems);
                }
            },

            updateQuantity(info) {
                this.$emit("updateCartItemQuantity", info);
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
                this.$emit("saveCartItemForLater", info);
                if(info.isSelected==true) {
                    this.selectedItems = this.selectedItems.filter(selectedItem=> {
                        return selectedItem.id!==info.id;
                    });
                    this.$emit('updateSelectedCartItems', this.selectedItems);
                }
            }
        }
    }

</script>