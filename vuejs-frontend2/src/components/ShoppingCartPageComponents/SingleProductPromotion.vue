<template>

    <div :style="{display: 'flex', flexDirection: 'column', width: '16%', height: '99%', marginRight:'-1.5em'}">
        <img :src="productImage" :style="{height: '10em', width: '11em', marginTop: '-1em', marginBottom:'0.5em', cursor: 'pointer'}"/>
        <a :style="{color: '#4180b0', cursor: 'pointer', fontSize: '0.85em', maxWidth: '60%'}">
            {{ productName }}
        </a>
        <div :style="{display: 'flex', alignItems: 'center', gap: '0.5em', marginTop:'0.6em'}">
            <img :src="getStarsForRating(avgRating)" :style="{height: '1em', width: '5em', cursor: 'pointer'}"/>
            <a :style="{fontSize: '0.9em', color:'#4180b0'}">{{ numRatings }}</a>
        </div>
        <p v-if="megagramsChoiceCategory!==null" :style="{fontSize: '0.8em', color: 'gray', marginBottom: '0em',
        maxWidth:'90%', lineHeight:'1.5'}">
            <span :style="{padding: '0.2em 0.6em', color: 'white', backgroundColor: 'navy', marginRight:'0.3em', fontSize: '1.1em',  clipPath: 'polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%)'}">Megagram's <span :style="{color:'orange'}">Choice</span></span> in {{ megagramsChoiceCategory }}
        </p>
        <p v-if="bestsellerCategory!==null" :style="{fontSize: '0.8em', color: 'gray', marginBottom:'0em',
        maxWidth:'90%', lineHeight:'1.5'}">
            <b :style="{padding: '0.2em 0.6em', color: 'white', backgroundColor: '#d96404', marginRight:'0.3em', fontSize: '1.1em'}">#1 Best Seller</b> in {{ bestsellerCategory }}
        </p>
        <p :style="{marginTop: '0.5em'}"><b>{{ productPrice }}</b> <small :style="{color: 'gray'}">{{ productPricePerUnit }}</small></p>
        <div v-if="hasPremium" :style="{display: 'flex', alignItems: 'center', marginTop:'-0.5em'}">
            <img :src="checkmark" :style="{height: '1em', width: '1em', objectFit: 'contain', pointerEvents: 'none'}">
            <b :style="{color:'#2d9aed'}">premium</b>
        </div>
        <p :style="{fontSize:'0.88em', marginTop:'0.5em'}">Get it as soon as <b>{{ getItAsSoonAs }}</b></p>
    </div>

</template>

<script>
import onePoint5StarRating from '@/assets/images/1.5StarRating.png';
import oneStarRating from '@/assets/images/1StarRating.png';
import twoPoint5StarRating from '@/assets/images/2.5StarRating.png';
import twoStarRating from '@/assets/images/2StarRating.png';
import threePoint5StarRating from '@/assets/images/3.5StarRating.png';
import threeStarRating from '@/assets/images/3StarRating.png';
import fourPoint5StarRating from '@/assets/images/4.5StarRating.png';
import fourStarRating from '@/assets/images/4StarRating.png';
import fiveStarRating from '@/assets/images/5StarRating.png';
import checkmark from '@/assets/images/checkmark.png';

    export default {

        props: {
            productId: String,
            productImage: String,
            productName: String,
            getItAsSoonAs: String,
            hasPremium: Boolean,
            productPrice: String,
            productPricePerUnit: String,
            avgRating: Number,
            numRatings: Number,
            megagramsChoiceCategory: String,
            bestsellerCategory: String
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
                checkmark
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
        }
    };

</script>