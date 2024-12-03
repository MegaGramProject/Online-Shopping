<template>
    <div v-if="orderSubtotal.length>0" class="miniSection" :style="{display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '1.5em 1em', gap: '1em'}">
        <button @click="placeOrder" :style="{border: 'none', padding: '0.7em 1.2em', cursor: (this.selectedDeliveryAddress==null && this.selectedPickupLocation==null) || this.selectedPaymentCard==null ? 'auto' : 'pointer', borderRadius: '2em',
        backgroundColor:'#ffe359', opacity: (this.selectedDeliveryAddress==null && this.selectedPickupLocation==null) || this.selectedPaymentCard==null ? '0.3' : '1'}">Place your order</button>

        <div :style="{display: 'flex', flexDirection: 'column'}">
            <b>Order total: {{ orderSubtotal }}</b>
            <small>By placing your order, you agree to Amazon's privacy notice and conditions of use.</small>
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            orderSubtotal: String,
            selectedDeliveryAddress: Object,
            selectedPaymentCard: Object,
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