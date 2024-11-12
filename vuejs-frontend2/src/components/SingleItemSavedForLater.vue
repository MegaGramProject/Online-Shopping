<template>

    <div :style="{borderStyle: 'solid', borderColor: 'lightgray', width: '25%', height: '33em',
    display: 'flex', flexDirection: 'column', padding: '1em 1em'}">
        <img :src="productImage" :style="{height: '44%', width: '100%', cursor: 'pointer'}">
        <p :style="{fontSize: '1.05em', cursor: 'pointer'}">{{ productName }}</p>
        <b :style="{fontSize: '1.1em'}">{{ productPrice }}</b>
        <small :style="{marginTop: '0.5em'}">{{ numBuyersInPastMonth }} bought in past month</small>
        <small v-if="inStock" :style="{color: 'green', marginTop: '0.5em'}">In Stock</small>
        <small v-else :style="{color: 'red', marginTop: '0.5em'}">Out of Stock</small>
        <div v-if="hasPremium" :style="{display: 'flex', alignItems: 'center', fontSize: '0.9em', marginTop: '0.7em', marginBottom:'0.5em'}">
            <img :src="checkmark" :style="{height: '1em', width: '1em', objectFit:'contain', pointerEvents:'none'}">
            <b :style="{color:'#2d9aed'}">premium</b>
        </div>
        <p v-for="(optionKey, index) in Object.keys(options)" :style="{color: 'gray', fontSize: '0.9em', marginTop: '0em'}"
        :key="index">
            <b :style="{color: 'black'}">{{ optionKey }}:</b> {{ options[optionKey] }}
        </p>
        <button class="darkenOnHover" :style="{backgroundColor: 'white', borderRadius: '2em', padding: '0.5em 1em', borderWidth: '0.07em', cursor: 'pointer'}">
            Move to cart
        </button>
        <a :style="{textDecoration: 'none', fontSize: 'small', color:'#4180b0', marginTop:'1em', cursor: 'pointer'}">Delete</a>
    </div>

</template>

<script>
import checkmark from '@/assets/images/checkmark.png';

    export default {
        props: {
            productId: String,
            productImage: String,
            productName: String,
            productPrice: String,
            inStock: Boolean,
            hasPremium: Boolean,
            options: Object,
            numBuyersInPastMonth: Number
        },

        data() {
            return {
                checkmark
            }
        }
    };

</script>
