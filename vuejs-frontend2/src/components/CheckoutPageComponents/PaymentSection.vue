<template>
    <div class="miniSection" :style="{width: '49em', backgroundColor: 'white', display: 'flex',
    flexDirection: 'column', padding: '1.7em 1.5em'}">

        <template v-if="!isMinimized">
            <h3>Payment method</h3>

            <div :style="{display: 'flex', flexDirection: 'column', borderStyle: 'solid', borderColor: 'lightgray',
            padding: '1em 1em', gap: '1em'}">
                <h4>Your credit and debit cards</h4>
                <div v-if="cardsOfUser.length>0" :style="{display: 'flex', width: '100%', justifyContent: 'end', gap: '22%',
                color: 'gray', fontSize:'0.9em', marginTop:'-1em'}">
                    <p>Name on card</p>
                    <p :style="{marginRight:'1em'}">Expires on</p>
                </div>
                <SelectCard v-for="(card, index) in cardsOfUser" :key="card.id" :index="index"
                :cardType="card.cardType" :last4Digits="card.last4Digits" :fullNameOnCard="card.fullNameOnCard"
                :cardExpiration="card.cardExpiration" :isSelected="index==0 && card.isSelected==true"
                @toggleSelectCard="toggleSelectCard" :cardCompany="card.cardCompany" @removeThisCard="removeCard"
                />
                <div :style="{display: 'flex', alignItems: 'center', paddingLeft: '1em', gap: '1em'}">
                    <img @click="showAddPaymentCardPopup" :src="plusIcon" class="iconToBeAdjustedForDarkMode" :style="{height: '1.2em', width: '1.2em', cursor: 'pointer'}">
                    <img :src="defaultPaymentCard" :style="{height: '2.5em', width: '2.5em', objectFit: 'contain', cursor: 'pointer'}">
                    <a @click="showAddPaymentCardPopup" :style="{cursor: 'pointer', color: '#2f6da3', fontSize: '0.9em'}">Add a credit or debit card</a>
                    <small :style="{color: 'gray'}">Megagram accepts all major debit & credit cards</small>
                </div>

                <h4>Promotional Code</h4>
                <hr :style="{width: '100%', color: '#f0f1f2', marginTop: '-1.5em'}">
                <b :style="{fontSize:'0.9em'}">Enter a valid promo-code</b>
                <div :style="{display: 'flex', alignItems: 'center', gap: '1em'}">
                    <textarea v-model="promoCodeInput" spellcheck="false" placeholder="Enter Code" :style="{fontFamily: 'Arial',
                    resize: 'none', width: '40%', fontSize:'0.9em', paddingLeft:'0.5em', paddingTop:'0.5em'}"></textarea>
                    <button @click="applyPromoCode" :style="{borderStyle: 'solid', borderRadius: '2em', padding: '0.5em 1em', backgroundColor: 'white',
                    cursor: 'pointer', borderWidth:'0.1em'}">Apply</button>
                </div>
                <p v-if="invalidPromoCode" :style="{color: '#bf2a40'}">**Invalid promo-code</p>

                <small v-if="promoCodeMatches.length>0" :style="{color: 'darkgreen'}">Promo-codes successfully applied.</small>
                <div v-for="(promoCodeMatch, index) in promoCodeMatches" :key="index"
                :style="{display: 'flex', alignItems: 'center', gap:'1.45em'}">
                    <p>{{ promoCodeMatch[1] }}:</p>
                    <p>{{ promoCodeMatch[2] }}</p>
                </div>

            </div>

            <button @click="toggleIsMinimized" :style="{border: 'none', padding: '0.7em 1.2em', cursor: 'pointer', borderRadius: '2em', marginTop:'2em',
            backgroundColor:'#ffe359', width: '14em'}">Use this payment method</button>
        </template>

        <template v-if="isMinimized">
            <div :style="{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}">
                <h3 v-if="cardsOfUser.length>0 && cardsOfUser[0].isSelected==true">Paying with {{ cardsOfUser[0].cardCompany + ' ' + cardsOfUser[0].last4Digits }}</h3>
                <h3 v-if="cardsOfUser.length==0 || cardsOfUser[0].isSelected==false">You haven't selected a payment-card yet</h3>
                <a @click="toggleIsMinimized" :style="{color: '#2f6da3', cursor: 'pointer'}">Change</a>
            </div>
            <a @click="toggleIsMinimized" v-if="cardsOfUser.length>0 && cardsOfUser[0].isSelected==true" :style="{color: '#2f6da3', cursor: 'pointer'}">Use a promo-code</a>
        </template>

    </div>

</template>

<script>
import defaultPaymentCard from '@/assets/images/defaultPaymentCard.gif';
import plusIcon from '@/assets/images/plusIcon.png';
import SelectCard from './SelectCard.vue';

    export default {
        props: {
            authenticatedUsername: String,
            newCardOfUser: Object,
            promoCodes: Object
        },

        components: {
            SelectCard
        },

        data() {
            return {
                plusIcon,
                defaultPaymentCard,
                cardsOfUser: [],
                isMinimized: true,
                invalidPromoCode: false,
                promoCodeInput: "",
                promoCodeMatches: [],
                promoCodesAlreadyApplied: new Set(),
                stripeCustomerId: null,
                paymentMethods: []
            }
        },

        mounted() {
            if(this.authenticatedUsername.length>0) {
                this.fetchCardsOfUser();
            }
        },

        methods: {
            async fetchCardsOfUser() {
                const response = await fetch(`http://localhost:8036/listStripePaymentMethodsOfUser?username=${this.authenticatedUsername}`);
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                const stripeInfoOfUser = await response.json();
                this.stripeCustomerId = stripeInfoOfUser.customerId;
                this.$emit('giveParentTheStripeCustomerId', this.stripeCustomerId);
                this.paymentMethods = stripeInfoOfUser.paymentMethods;

                const cardBrandMappings = {
                    visa: 'Visa',
                    mastercard: 'Mastercard',
                    amex: 'Amex',
                    discover: 'Discover',
                    jcb: 'Jcb',
                    diners_club: 'Diners Club',
                    unionpay: 'UnionPay',
                    unknown: 'Unknown'
                };

                let cardsOfUser = [];
                let indexOfSelectedCard = -1;
                for(let i=0; i<this.paymentMethods.length; i++) {
                    const paymentMethod = this.paymentMethods[i];
                    if(paymentMethod.isDefault==true) {
                        indexOfSelectedCard = i;
                    }
                    cardsOfUser.push({
                        id: paymentMethod.id,
                        cardCompany: cardBrandMappings[paymentMethod.card.brand],
                        cardType: paymentMethod.card.funding.charAt(0).toUpperCase() + paymentMethod.card.funding.slice(1),
                        last4Digits: paymentMethod.card.last4,
                        fullNameOnCard: paymentMethod.billing_details.name,
                        cardExpiration: `${paymentMethod.card.exp_month}/${paymentMethod.card.exp_year}`,
                        isSelected: paymentMethod.isDefault
                    })
                }

                if(indexOfSelectedCard>0) {
                    const selectedCard = cardsOfUser[indexOfSelectedCard];
                    cardsOfUser.splice(indexOfSelectedCard, 1);
                    cardsOfUser.splice(0, 0, selectedCard);
                }
                this.cardsOfUser = [...cardsOfUser];
                if(indexOfSelectedCard>-1) {
                    this.$emit("notifyParentOfSelectedCard", this.cardsOfUser[indexOfSelectedCard]);
                }
            },

            async toggleSelectCard(indexOfCardToToggle) {
                if(indexOfCardToToggle==0) {
                    if(this.cardsOfUser[0].isSelected==false) {
                        const response = await fetch('http://localhost:8036/setDefaultPayment', {
                            method: 'PATCH',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                customerId: this.stripeCustomerId,
                                paymentMethodID: this.cardsOfUser[indexOfCardToToggle].id
                            })
                        });
                        if(!response.ok) {
                            throw new Error('Network response not ok');
                        }
                        this.cardsOfUser[0].isSelected = true;
                        this.$emit("notifyParentOfSelectedCard", this.cardsOfUser[0]);
                    }
                    else {
                        const response = await fetch('http://localhost:8036/setDefaultPayment', {
                            method: 'PATCH',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                customerId: this.stripeCustomerId,
                                paymentMethodID: null
                            })
                        });
                        if(!response.ok) {
                            throw new Error('Network response not ok');
                        }
                        this.cardsOfUser[0].isSelected = false;
                        this.$emit("notifyParentOfSelectedCard", null);
                    }
                }
                else {
                    const response = await fetch('http://localhost:8036/setDefaultPayment', {
                        method: 'PATCH',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            customerId: this.stripeCustomerId,
                            paymentMethodID: this.cardsOfUser[indexOfCardToToggle].id
                        })
                    });
                    if(!response.ok) {
                        throw new Error('Network response not ok');
                    }
                    this.cardsOfUser[0].isSelected = false;
                    const newlySelectedCard = this.cardsOfUser[indexOfCardToToggle];
                    newlySelectedCard.isSelected = true;
                    this.cardsOfUser.splice(indexOfCardToToggle, 1);
                    this.cardsOfUser.splice(0, 0, newlySelectedCard);
                    this.$emit("notifyParentOfSelectedCard", newlySelectedCard);
                }

            },

            async removeCard(indexOfCardToRemove) {
                const cardToRemove = this.cardsOfUser[indexOfCardToRemove];
                const paymentMethodId = cardToRemove.id;
                
                const response = await fetch('http://localhost:8036/removePaymentMethod', {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        paymentMethodId: paymentMethodId
                    })
                });
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                this.cardsOfUser.splice(indexOfCardToRemove, 1);
            },

            toggleIsMinimized() {
                this.isMinimized = !this.isMinimized;
            },

            showAddPaymentCardPopup() {
                this.$emit("showAddPaymentCardPopup");
            },

            applyPromoCode() {
                if(this.promoCodeInput in this.promoCodes) {
                    this.invalidPromoCode = false;
                    this.promoCodeMatches = this.promoCodes[this.promoCodeInput];
                    if(!this.promoCodesAlreadyApplied.has(this.promoCodeInput)) {
                        this.$emit("applyPromoCode", this.promoCodeInput);
                        this.promoCodesAlreadyApplied.add(this.promoCodeInput);
                    }
                }
                else {
                    this.promoCodeMatches = [];
                    this.invalidPromoCode = true;
                }
            }
        },

        watch: {
            authenticatedUsername(newVal) {
                if(newVal.length>0) {
                    this.fetchCardsOfUser();
                }
            },

            newCardOfUser(newVal) {
                if(newVal!==null) {
                    this.cardsOfUser = [...this.cardsOfUser, newVal];
                }
            }
        }
    }

</script>