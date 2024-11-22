<template>
    <div :style="{display: 'flex', gap: '1em', alignItems: 'start', padding: '0.5em 1em', position: 'relative'}">
        <input v-model="mutableIsSelected" type="checkbox">
        <img :src="cardImages[cardCompany] ?? defaultPaymentCard" :style="{height: '2.5em', width: '2.5em', pointerEvents: 'none', objectFit: 'contain'}">
        <p :style="{fontSize:'0.9em', marginTop:'0em', maxWidth: '35%'}"><b>{{cardCompany}} {{ cardType }}</b> ending in {{ last4Digits }}</p>
        
        <p :style="{fontSize:'0.9em', marginTop:'0em', maxWidth: '15%', position: 'absolute', left: '55.5%'}">{{ fullNameOnCard }}</p>
        <p :style="{fontSize:'0.9em', marginTop:'0em', maxWidth: '15%', position: 'absolute', left: '89.5%'}">{{cardExpiration}}</p>
    </div>
</template>

<script>
import defaultPaymentCard from '@/assets/images/defaultPaymentCard.gif';
import visaCard from '@/assets/images/visaCard.png';
import mastercard from '@/assets/images/mastercard.png';
import chaseCard from '@/assets/images/chaseCard.png';
import amexCard from '@/assets/images/amexCard.png';
import discoverCard from '@/assets/images/discoverCard.avif';

    export default {
        props: {
            index: Number,
            cardCompany: String,
            cardType: String,
            last4Digits: String,
            fullNameOnCard: String,
            cardExpiration: String,
            isSelected: Boolean
        },

        data() {
            return {
                defaultPaymentCard,
                visaCard,
                mastercard,
                chaseCard,
                amexCard,
                discoverCard,
                cardImages: {
                    "Visa": visaCard,
                    "MasterCard": mastercard,
                    "Chase": chaseCard,
                    "American Express": amexCard,
                    "Discover": discoverCard
                },
                mutableIsSelected: this.isSelected
            }
        },

        watch: {
            isSelected(newVal) {
                this.mutableIsSelected = newVal;
            },

            mutableIsSelected(newVal) {
                if(newVal!==this.isSelected) {
                    this.$emit("toggleSelectCard", this.index);
                }
            }
        }
    }

</script>