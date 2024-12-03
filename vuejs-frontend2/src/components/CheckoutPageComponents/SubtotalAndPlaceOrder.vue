<template>
    <div v-if="orderSubtotal.length>0" class="miniSection" :style="{width: '17em', backgroundColor: 'white', padding: '1.5em 1.5em', display: 'flex',
    flexDirection: 'column'}">
        <button @click="placeOrder" :style="{border: 'none', padding: '0.7em 1.2em', cursor: (this.selectedDeliveryAddress==null && this.selectedPickupLocation==null) || this.selectedPaymentCard==null ? 'auto' : 'pointer', borderRadius: '2em',
        backgroundColor:'#ffe359', opacity: (this.selectedDeliveryAddress==null && this.selectedPickupLocation==null) || this.selectedPaymentCard==null ? '0.3' : '1'}">Place your order</button>
        <p :style="{fontSize:'0.8em'}">By placing your order, you agree to Megagram's privacy notice and conditions of use.</p>
        
        <div :style="{display: 'flex', flexDirection: 'column', borderStyle: 'solid', borderColor: 'lightgray',
        borderLeft: 'none', borderRight: 'none', borderBottom: 'none'}">
            <div :style="{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
            fontSize: '0.8em', marginBottom:'-1em'}">
                <p>Items ({{ quantityTotal }}):</p>
                <p>{{ itemsSubtotal }}</p>
            </div>
            <div :style="{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
            fontSize: '0.8em', marginBottom:'0em'}">
                <p>Shipping, handling, and delivery</p>
                <p>{{ shippingHandlingAndDeliverySubtotal }}</p>
            </div>
            <div :style="{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
            fontSize: '0.8em', marginBottom:'0em'}">
                <p>Estimated tax to be collected:</p>
                <p>{{ taxSubtotal }}</p>
            </div>
            <div v-if="hasPremium" :style="{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
            fontSize: '0.8em', marginBottom:'0em'}">
                <p>S/H/D discounts from Premium</p>
                <p>-{{ shippingAndHandlingFeesSavedWithPremium }}</p>
            </div>
            <div :style="{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
            fontSize: '0.8em', marginBottom:'0em'}">
                <p>Item discounts</p>
                <p>-{{ totalItemDiscounts }}</p>
            </div>
            <div v-if="isThereAnyPriceDifferenceFromSchedulingLater()" :style="{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
            fontSize: '0.8em', marginBottom:'1.5em'}">
                <p>Scheduling Later</p>
                <p>{{ priceDifferencesFromSchedulingLater }}</p>
            </div>
            <div :style="{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
            fontSize: '1.2em'}">
                <b>Order total:</b>
                <b>{{ orderSubtotal }}</b>
            </div>
        </div>

    </div>

</template>

<script>

    export default {
        props: {
            hasPremium: Boolean,
            itemsSubtotal: String,
            shippingHandlingAndDeliverySubtotal: String,
            taxSubtotal: String,
            orderSubtotal: String,
            shippingAndHandlingFeesSavedWithPremium: String,
            totalItemDiscounts: String,
            selectedDeliveryAddress: Object,
            selectedPaymentCard: Object,
            quantityTotal: Number,
            selectedPickupLocation: Object,
            priceDifferencesFromSchedulingLater: String
        },

        methods: {
            placeOrder() {
                if((this.selectedDeliveryAddress!==null || this.selectedPickupLocation!==null) && this.selectedPaymentCard!==null) {
                    this.$emit("placeOrder");
                }
            },

            isThereAnyPriceDifferenceFromSchedulingLater() {
                if(this.priceDifferencesFromSchedulingLater.length==0) {
                    return false;
                }
                let currentCurrency = this.priceDifferencesFromSchedulingLater[0];
                if(currentCurrency==="A") {
                    currentCurrency+="$";
                }
                else if(currentCurrency==="M") {
                    currentCurrency+="X$";
                }
                else if(currentCurrency==="C") {
                    if(this.priceDifferencesFromSchedulingLater[1]==="$") {
                        currentCurrency="C$";
                    }
                    else {
                        currentCurrency="CN¥";
                    }
                }
                return parseFloat(this.priceDifferencesFromSchedulingLater.substring(currentCurrency.length))!==0;
            }
        }
    }

</script>