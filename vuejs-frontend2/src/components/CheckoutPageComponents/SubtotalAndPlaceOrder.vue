<template>
    <div :style="{width: '17em', backgroundColor: 'white', padding: '1.5em 1.5em', display: 'flex',
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
            <div :style="{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
            fontSize: '0.8em', marginBottom:'0em'}">
                <p>S/H/D discounts</p>
                <p>-{{ shippingAndHandlingFeesSavedWithPremium }}</p>
            </div>
            <div :style="{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
            fontSize: '0.8em', marginBottom:'0em'}">
                <p>Item discounts</p>
                <p>-{{ totalItemDiscounts }}</p>
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
            itemsSubtotal: String,
            shippingHandlingAndDeliverySubtotal: String,
            taxSubtotal: String,
            orderSubtotal: String,
            shippingAndHandlingFeesSavedWithPremium: String,
            totalItemDiscounts: String,
            selectedDeliveryAddress: Object,
            selectedPaymentCard: Object,
            quantityTotal: Number,
            selectedPickupLocation: Object
        },

        methods: {
            placeOrder() {
                if((this.selectedDeliveryAddress!==null || this.selectedPickupLocation!==null) && this.selectedPaymentCard!==null) {
                    this.$emit("placeOrder");
                }
            }
        }
    }

</script>