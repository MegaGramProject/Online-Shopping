<template>

    <div :style="{borderStyle: 'solid', borderColor: 'lightgray', borderWidth: '0.08em', height: '15em', width: '98.65%',
    display: 'flex', paddingTop: '1.5em', paddingLeft: '0.3em', borderTop: 'none', borderLeft: 'none', borderRight: 'none',
    gap: '1em'}">

        <img :src="productImage" :style="{height: '80%', width: '13em', cursor: 'pointer'}"/>

        <div :style="{display: 'flex', flexDirection: 'column', width: '45em'}">
            <a :style="{fontWeight: 'bold', cursor: 'pointer',
            fontSize: '1.1em', color:'#496dba'}">{{ productName }}</a>
            <small v-if="inStock" :style="{color: 'green', marginTop: '0.5em'}">In Stock</small>
            <small v-else :style="{color: '#e02636', marginTop: '0.5em'}">Out of Stock</small>
            <button @click="addBuyAgainItemToCart" class="darkenOnHover" :style="{backgroundColor: 'white', cursor: 'pointer', padding: '0.5em 1em',
            fontSize: '0.7em', borderRadius: '2em', width: '9em', marginTop:'0.5em', borderWidth:'0.1em'}">Add to Cart</button>
        </div>

        <b :style="{fontSize: '1.16em', color: '#e02636', marginLeft:'0.5em'}">{{ productPrice }}</b>

    </div>

</template>

<script>

    export default {
        props: {
            productId: String,
            productImage: String,
            productName: String,
            inStock: Boolean,
            productPrice: String
        },

        methods: {
            addBuyAgainItemToCart() {
                this.$emit("addBuyAgainItemToCart", {
                    productId: this.productId,
                    productImage: this.productImage,
                    productName: this.productName,
                    inStock: this.inStock,
                    productPrice: this.productPrice
                });
            }
        }
    };

</script>