<template>

    <div :style="{width: '50em', padding: '1em 1em', backgroundColor: 'white', display: 'flex',
    flexDirection: 'column', gap: '1em'}">
        <h3>{{ arrivalTextHeader }}</h3>

        <div v-for="product in products" :key="product.id" :style="{display: 'flex', gap: '1.5em'}">

            <div :style="{width: '50%', backgroundColor: '#ededed', padding: '1em 2em', display: 'flex',
            flexDirection: 'column'}">

                <div :style="{display: 'flex', gap: '1.25em'}">
                    <img :src="product.productImage" :style="{height: '8em', width: '8em', objectFit:'contain', pointerEvents: 'none'}"/>
                    <div :style="{display: 'flex', flexDirection: 'column', fontSize:'0.89em', marginTop:'-1em'}">
                        <p :style="{maxWidth:'88%'}">{{ product.productName }}</p>
                        <b :style="{marginTop:'-0.5em'}">{{ product.productPrice }} <span v-if="product.productPricePerUnit!==null">({{ product.productPricePerUnit }})</span></b>
                        <div v-if="hasPremium" :style="{display: 'flex', alignItems: 'end'}">
                            <img :src="checkmark" :style="{height: '1.5em', width: '1.3em', pointerEvents: 'none'}"/>
                            <b :style="{color: '#2d9aed'}">premium</b>
                        </div>
                    </div>
                </div>

                <p :style="{fontSize:'0.88em', marginBottom:'0em'}"><b>Quantity:</b> {{ product.quantity }} <a :style="{color: '#2f6da3', cursor: 'pointer'}">Change</a></p>
                
                <p v-for="optionKey in Object.keys(product.productOptions)" :key="optionKey" :style="{fontSize:'0.88em', marginBottom:'0em'}"><b>{{ optionKey }}:</b> <span :style="{color: 'gray'}">{{ product.productOptions[optionKey] }}</span></p>
            </div>

            <form>
                <input type="radio" name="scheduleDelivery" value="default" :style="{marginBottom:'1em'}"><b>{{ formatArrivalText() }}</b><br>
                <input type="radio" name="scheduleDelivery" value="scheduleAhead">Schedule <b>ahead</b><br>
            </form>

        </div>

    </div>

</template>

<script>
import checkmark from '@/assets/images/checkmark.png';
import showerCurtains from '@/assets/images/showerCurtains.jpg';

    export default {

        props: {
            arrivalTextHeader: String,
            getItAsSoonAs: Number,
            hasPremium: Boolean,
            products: Array,
        },

        data() {
            return {
                showerCurtains,
                checkmark
            }
        },

        methods: {
            formatArrivalText() {
                const currentDate = new Date();
                
                const arrivalDate = new Date(currentDate.getTime() + this.getItAsSoonAs * 60 * 60 * 1000);

                const currentDay = currentDate.toDateString();
                const arrivalDay = arrivalDate.toDateString();

                const dayOptions = { weekday: 'long', month: 'short', day: 'numeric' };

                if (currentDay === arrivalDay) {
                    const hours = Math.floor(this.getItAsSoonAs);
                    const minutes = Math.floor((this.getItAsSoonAs % 1) * 60);
                    return minutes > 0
                        ? `Today in ${hours} hrs ${minutes} mins`
                        : `Today in ${hours} hrs`;
                }

                const tomorrow = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000).toDateString();
                if (arrivalDay === tomorrow) {
                    return `Tomorrow, ${arrivalDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
                }

                return arrivalDate.toLocaleDateString('en-US', dayOptions);
            }


        }

    };
</script>