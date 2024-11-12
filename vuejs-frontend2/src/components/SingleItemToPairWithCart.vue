<template>
    <div :style="{display: 'flex', height: '9em', width: '100%', alignItems: 'start', gap: '0.4em', marginBottom: '1em'}">
        <img :src="productImage" :style="{height: '95%', width: '44%', cursor: 'pointer'}">
        <div :style="{display: 'flex', flexDirection: 'column'}">
            <a href="" :style="{marginTop: '0em', fontSize: '0.9em', color:'#4180b0'}">{{ productName }}</a>
            <div v-if="numRatings>0" :style="{display: 'flex', alignItems: 'center', gap: '0.5em', marginTop:'0.6em'}">
                <img v-if="ratingsImg!==null" :src="ratingsImg" :style="{height: '1em', width: '5em', cursor: 'pointer'}"/>
                <a href="" :style="{fontSize: '0.9em', color:'#4180b0'}">{{ numRatings.toLocaleString() }}</a>
            </div>
            <p :style="{color: 'maroon'}">{{ productPrice }}</p>
            <div v-if="hasPremium" :style="{display: 'flex', alignItems: 'center', fontSize: '0.8em', marginTop: '-1em', marginBottom:'0.5em'}">
                <img :src="checkmark" :style="{height: '1em', width: '1em', objectFit:'contain', pointerEvents:'none'}">
                <b :style="{color:'#2d9aed'}">premium</b>
            </div>
            <button @click="addItemToCart" :style="{backgroundColor: '#f2cb30', width: '6em', borderRadius:'1em', border: 'none',
            outline: 'none', cursor: 'pointer', fontSize: '0.7em', padding: '0.4em 0.5em'}">Add to cart</button>
        </div>
    </div>

</template>

<script>
import oneStarRating from '@/assets/images/1StarRating.png';
import onePoint5StarRating from '@/assets/images/1.5StarRating.png';
import twoStarRating from '@/assets/images/2StarRating.png';
import twoPoint5StarRating from '@/assets/images/2.5StarRating.png';
import threeStarRating from '@/assets/images/3StarRating.png';
import threePoint5StarRating from '@/assets/images/3.5StarRating.png';
import fourStarRating from '@/assets/images/4StarRating.png';
import fourPoint5StarRating from '@/assets/images/4.5StarRating.png';
import fiveStarRating from '@/assets/images/5StarRating.png';
import checkmark from '@/assets/images/checkmark.png';

    export default {
        props: {
            productId: String,
            productImage: String,
            productName: String,
            productPrice: String,
            avgRating: Number,
            numRatings: Number,
            hasPremium: Boolean
        },

        mounted() {
            if(this.numRatings>0) {
                this.ratingsImg = this.getStarsForRating(this.avgRating);
            }
        },

        data() {
            return {
                oneStarRating,
                onePoint5StarRating,
                twoStarRating,
                twoPoint5StarRating,
                threeStarRating,
                threePoint5StarRating,
                fourStarRating,
                fourPoint5StarRating,
                fiveStarRating,
                checkmark,
                possibleRatings: {
                    1: oneStarRating,
                    1.5: onePoint5StarRating,
                    2: twoStarRating,
                    2.5: twoPoint5StarRating,
                    3: threeStarRating,
                    3.5: threePoint5StarRating,
                    4: fourStarRating,
                    4.5: fourPoint5StarRating,
                    5: fiveStarRating
                },
                ratingsImg: null
            }
        },

        methods: {
            getStarsForRating(ratingValue) {
                const decimalPartOfRating = ratingValue%1;
                const integerPartOfRating = ratingValue-decimalPartOfRating;

                if(decimalPartOfRating==0 || decimalPartOfRating<0.25) {
                    return this.possibleRatings[integerPartOfRating];
                }
                else {
                    if(decimalPartOfRating<0.5 || decimalPartOfRating<0.75) {
                        return this.possibleRatings[integerPartOfRating+0.5];
                    }
                    else {
                        return this.possibleRatings[integerPartOfRating+1];
                    }
                }
            },

            addItemToCart() {
                this.$emit("addItemToCart", {
                    productId: this.productId,
                    productImage: this.productImage,
                    productName: this.productName,
                    productPrice: this.productPrice,
                    avgRating: this.avgRating,
                    numRatings: this.numRatings,
                    hasPremium: this.hasPremium
                });
            }
        }
    }

</script>