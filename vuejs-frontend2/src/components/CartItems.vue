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
    </div>

</template>

<script>

    export default {
        data() {
            return {
                selectedItems: [{}, {}],
                items: [
                    {
                        productId: "0",
                        productPrice: "$19"
                    },
                    {
                        productId: "0",
                        productPrice: "$39.12"
                    }
                ]
            }
        },

        methods: {
            selectAllItems() {
                this.selectedItems = this.items;
                this.$emit('updateSelectedCartItems', this.selectedItems);
            },

            deselectAllItems() {
                this.selectedItems = [];
                this.$emit('updateSelectedCartItems', this.selectedItems);
            }
        }
    }

</script>