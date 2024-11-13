<template>

    <div>
            <div v-if="!hasBeenRemoved && !hasBeenSavedForLater" :style="{height: '18em', width: '100%', borderStyle: 'solid', borderColor: 'lightgray', borderTop: 'none',
        borderLeft: 'none', borderRight: 'none', borderWidth: '0.07em', display: 'flex', alignItems: 'center',
        gap: '2em', paddingBottom: '3em'}">

                <input v-model="mutableIsSelected" type="checkbox" :style="{height: '1.2em', width: '1.2em'}"/>

                <div :style="{display: 'flex', height: '83%', width: '100%', justifyContent: 'space-between',
                alignItems: 'start'}">
                    <div :style="{display: 'flex', height: '100%', width: '85%', gap: '1.5em'}">
                        <img :src="productImage" :style="{height: '100%', width: '15.5em', cursor: 'pointer'}"/>
                        <div :style="{display: 'flex', flexDirection: 'column', marginTop: '-1em'}">
                            <p :style="{fontSize:'1.15em', cursor: 'pointer'}">{{ productName }}</p>
                            <p v-if="megagramChoiceCategory!==null" :style="{fontSize: '0.8em', marginTop: '-0.5em', color: 'gray'}">
                                <b :style="{padding: '0.2em 0.6em', color: 'white', backgroundColor: '#143f85', marginRight:'0.3em', fontSize: '1.1em'}">Megagram's Choice</b> in {{ megagramChoiceCategory }}
                            </p>
                            <p v-if="numberOneBestSeller!==null" :style="{fontSize: '0.8em', marginTop: '-0.2em', color: 'gray'}">
                                <b :style="{padding: '0.2em 0.6em', color: 'white', backgroundColor: '#d96404', marginRight:'0.3em', fontSize: '1.1em'}">#1 Best Seller</b> in {{ numberOneBestSeller }}
                            </p>
                            <small v-if="inStock" :style="{color: 'green'}">In Stock</small>
                            <small v-else :style="{color: 'maroon'}">Out of Stock</small>
                            <div v-if="hasPremium" :style="{display: 'flex', alignItems: 'center', fontSize: '0.9em', marginTop:'0.4em'}">
                                <img :src="checkmark" :style="{height: '1em', width: '1em', objectFit:'contain', pointerEvents:'none'}">
                                <b :style="{color:'#2d9aed'}">premium</b>
                            </div>
                            <p :style="{fontSize:'0.9em', marginTop:'0.5em'}">Get it as soon as <b>{{ getItAsSoonAs }}</b></p>
                            <p v-for="(optionKey, index) in Object.keys(options)" :style="{fontSize:'0.75em', marginTop:'-0.75em'}"
                            :key="index">
                                <b>{{ optionKey }}</b>: {{ options[optionKey] }}
                            </p>
                            <div :style="{display: 'flex', alignItems: 'center', gap: '0em'}">
                                <div :style="{position: 'relative', height: '2.3em', width: '8em'}">
                                    <button :style="{fontWeight: 'bold', borderRadius: '2em', height: '100%',
                                    backgroundColor: 'white', borderWidth: '0.06em', width: '100%'}">
                                        {{ quantity }}
                                    </button>
                                    <img v-if="quantity==1" :src="trash" @click="removeItemFromCart" :style="{position: 'absolute', left: '5%', top: '20%', cursor: 'pointer',
                                    height: '1.5em', width: '1.5em', objectFit: 'contain'}"/>
                                    <img v-if="quantity>1" :src="minusIcon" @click="decrementQuantity" :style="{position: 'absolute', left: '5%', top: '20%', cursor: 'pointer',
                                    height: '1.5em', width: '1.5em', objectFit: 'contain'}"/>
                                    <img :src="plusIcon" @click="incrementQuantity" :style="{position: 'absolute', left: '80%', top: '15%', cursor: 'pointer',
                                    height: '1.5em', width: '1.5em', objectFit: 'contain'}"/>
                                </div>
                                <div class="vertical-line"></div>
                                <small @click="removeItemFromCart" :style="{color:'#4180b0', cursor: 'pointer'}">Delete</small>
                                <div class="vertical-line"></div>
                                <small @click="saveItemForLater" :style="{color:'#4180b0', cursor: 'pointer'}">Save for later</small>
                            </div>
                        </div>
                    </div>

                    <div :style="{display: 'flex', flexDirection: 'column', gap: '1em'}">
                        <b v-if="dealsAvailable" :style="{color: 'white', padding: '0.5em 0.5em', backgroundColor: '#e02636', fontSize: '0.85em'}">Deals available</b>
                        <b>{{ productPrice }}</b>
                    </div>

                </div>

            </div>

        <div v-if="hasBeenRemoved" :style="{height: '4em', width: '100%', borderStyle: 'solid', borderColor: 'lightgray', borderTop: 'none',
        borderLeft: 'none', borderRight: 'none', borderWidth: '0.07em', display: 'flex', alignItems: 'center', justifyContent: 'start', paddingLeft: '3em'}">
            <a :style="{color:'#4180b0', cursor: 'pointer', marginRight:'0.3em'}">{{ productName.length<55 ? productName.substring(0, 55) :  productName.substring(0, 55) + "..."}}</a> has been removed from your Shopping Cart.
        </div>

        <div v-if="hasBeenSavedForLater" :style="{height: '4em', width: '100%', borderStyle: 'solid', borderColor: 'lightgray', borderTop: 'none',
        borderLeft: 'none', borderRight: 'none', borderWidth: '0.07em', display: 'flex', alignItems: 'center', justifyContent: 'start', paddingLeft: '3em'}">
            <a :style="{color:'#4180b0', cursor: 'pointer', marginRight:'0.3em'}">{{ productName.length<55 ? productName.substring(0, 55) :  productName.substring(0, 55) + "..."}}</a> has been Saved for Later.
        </div>
    </div>

</template>

<script>
import checkmark from '@/assets/images/checkmark.png';
import trash from '@/assets/images/trashIcon.png';
import plusIcon from '@/assets/images/plusIcon.png';
import minusIcon from '@/assets/images/minusIcon.png';

    export default {
        props: {
            id: Number,
            index: Number,
            productId: String,
            productImage: String,
            productName: String,
            inStock: Boolean,
            hasPremium: Boolean,
            options: Object,
            getItAsSoonAs: String,
            quantity: Number,
            productPrice: String,
            dealsAvailable: Boolean,
            numberOneBestSeller: String,
            megagramChoiceCategory: String,
            isSelected: Boolean,
            hasBeenRemoved: Boolean,
            hasBeenSavedForLater: Boolean
        },

        data() {
            return {
                checkmark,
                trash,
                plusIcon,
                minusIcon,
                mutableIsSelected: false
            }
        },

        mounted() {
            this.mutableIsSelected = this.isSelected;
        },

        methods: {
            incrementQuantity() {
                this.$emit('updateQuantity', {
                    index: this.index,
                    newQuantity: this.quantity+1,
                    isSelected: this.isSelected,
                    id: this.id
                });
            },

            decrementQuantity() {
                this.$emit('updateQuantity', {
                    index: this.index,
                    newQuantity: this.quantity-1,
                    isSelected: this.isSelected,
                    id: this.id
                });
            },

            removeItemFromCart() {
                this.$emit("removeItem", {
                    index: this.index,
                    isSelected: this.isSelected,
                    id: this.id
                });
            },

            saveItemForLater() {
                this.$emit("saveItemForLater", {
                    index: this.index,
                    isSelected: this.isSelected,
                    id: this.id
                });
            }
        },

        watch: {
            isSelected(newVal) {
                this.mutableIsSelected = newVal;
            },

            mutableIsSelected(newVal) {
                if(newVal==true) {
                    this.$emit('selectItem', this.index);
                }
                else {
                    this.$emit('unselectItem', this.index);
                }
            }
        }
    };
</script>