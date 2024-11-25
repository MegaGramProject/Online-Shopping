<template>

    <div :style="{width: '65em', padding: '1em 1em', backgroundColor: 'white', display: 'flex',
    flexDirection: 'column'}">

        <div :style="{display: 'flex', alignItems: 'center', gap: '0.6em'}">
            <img :src="checkmarkInGreenCircle" :style="{height: '1.7em', width: '1.7em', pointerEvents: 'none'}"/>
            <h4 :style="{color: '#18784a'}">Order placed, thanks!</h4>
        </div>

        <p>Confirmation will be sent to your email.</p>
        <p v-if="selectedDeliveryAddress!==null"><b>Shipping to {{ selectedDeliveryAddress.fullName }}, </b>{{ selectedDeliveryAddress.addressText }}</p>
        <template v-if="selectedPickupLocation!==null">
            <p><b>Shipping to {{ selectedPickupLocation.pickupLocationAddress }}</b> for pick-up</p>
            <p :style="{marginLeft:'3em', marginBottom:'0.5em'}">{{ selectedPickupLocation.pickupDirections }}</p>
            <p v-for="weekDays in Object.keys(selectedPickupLocation.openingHours)" :style="{marginLeft: '3em', marginBottom: '-0.5em'}" :key="weekDays">{{ weekDays }}: {{ selectedPickupLocation.openingHours[weekDays] }}</p>
            <br/>
            <br/>
        </template>
        <p>Paid via <b>{{ selectedPaymentCard.cardCompany + " (" + selectedPaymentCard.cardType + ") " + selectedPaymentCard.last4Digits }}</b></p>
        <p v-if="wasAnyShippingAndHandlingFeesSavedWithPremium()">You saved <b>{{ shippingAndHandlingFeesSavedWithPremium }}</b> in shipping and handling fees on this order with Premium.</p>
        <p v-if="wasTotalItemDiscountsGreaterThan0()">In addition, you saved <b>{{ totalItemDiscounts }}</b> with discounts on items on this order.</p>

        <a :style="{cursor: 'pointer', color: '#2f6da3', marginTop:'1em'}">Review or edit your recent orders</a>
        <a @click="cancelPlacingOrder" :style="{cursor: 'pointer', color: '#2f6da3', marginTop:'0.5em'}">Cancel this order</a>

    </div>

</template>

<script>
import checkmarkInGreenCircle from '@/assets/images/checkmarkInGreenCircle.webp';

    export default {

        props: {
            selectedDeliveryAddress: Object,
            selectedPaymentCard: Object,
            shippingAndHandlingFeesSavedWithPremium: String,
            totalItemDiscounts: String,
            selectedPickupLocation: Object
        },

        data() {
            return {
                checkmarkInGreenCircle
            }
        },

        methods: {
            cancelPlacingOrder() {
                this.$emit("cancelPlacingOrder");
            },

            wasAnyShippingAndHandlingFeesSavedWithPremium() {
                let currentCurrency = this.shippingAndHandlingFeesSavedWithPremium[0];
                if(currentCurrency==="A") {
                    currentCurrency+="$";
                }
                else if(currentCurrency==="M") {
                    currentCurrency+="X$";
                }
                else if(currentCurrency==="C") {
                    if(this.shippingAndHandlingFeesSavedWithPremium[1]==="$") {
                        currentCurrency="C$";
                    }
                    else {
                        currentCurrency="CN¥";
                    }
                }
                return parseFloat(this.shippingAndHandlingFeesSavedWithPremium.substring(currentCurrency.length))>0
            },

            wasTotalItemDiscountsGreaterThan0() {
                let currentCurrency = this.shippingAndHandlingFeesSavedWithPremium[0];
                if(currentCurrency==="A") {
                    currentCurrency+="$";
                }
                else if(currentCurrency==="M") {
                    currentCurrency+="X$";
                }
                else if(currentCurrency==="C") {
                    if(this.shippingAndHandlingFeesSavedWithPremium[1]==="$") {
                        currentCurrency="C$";
                    }
                    else {
                        currentCurrency="CN¥";
                    }
                }
                return parseFloat(this.totalItemDiscounts.substring(currentCurrency.length))>0
            }
        }
    };

</script>