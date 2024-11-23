<template>
    <div :style="{width: '49em', backgroundColor: 'white', display: 'flex',
    flexDirection: 'column', padding: '1.7em 1.5em'}">

        <template v-if="!isMinimized">
            <h3>Payment method</h3>

            <div :style="{display: 'flex', flexDirection: 'column', borderStyle: 'solid', borderColor: 'lightgray',
            padding: '1em 1em', gap: '1em'}">
                <h4>Your credit and debit cards</h4>
                <div :style="{display: 'flex', width: '100%', justifyContent: 'end', gap: '22%',
                color: 'gray', fontSize:'0.9em', marginTop:'-1em'}">
                    <p>Name on card</p>
                    <p :style="{marginRight:'1em'}">Expires on</p>
                </div>
                <SelectCard v-for="(card, index) in cardsOfUser" :key="card.id" :index="index"
                :cardType="card.cardType" :last4Digits="card.last4Digits" :fullNameOnCard="card.fullNameOnCard"
                :cardExpiration="card.cardExpiration" :isSelected="index==0 && card.isSelected==true"
                @toggleSelectCard="toggleSelectCard" :cardCompany="card.cardCompany"
                />
                <div :style="{display: 'flex', alignItems: 'center', paddingLeft: '1em', gap: '1em'}">
                    <img @click="showAddPaymentCardPopup" :src="plusIcon" :style="{height: '1.2em', width: '1.2em', cursor: 'pointer'}">
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
                <p v-if="invalidPromoCode" :style="{color: 'maroon'}">**Invalid promo-code</p>

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
                isMinimized: false,
                invalidPromoCode: false,
                promoCodeInput: "",
                promoCodeMatches: [],
                promoCodesAlreadyApplied: new Set()
            }
        },

        mounted() {
            if(this.authenticatedUsername.length>0) {
                this.fetchCardsOfUser();
            }
        },

        methods: {
            async fetchCardsOfUser() {
                //make API-request to get cards of user
                let cardsOfUser = [
                    {
                        id: 0,
                        cardCompany: "DasherDirect",
                        cardType: "Prepaid",
                        last4Digits: "3506",
                        fullNameOnCard: "Rishav Ray",
                        cardExpiration: "05/2025",
                        isSelected: true
                    },
                    {
                        id: 1,
                        cardCompany: "Visa",
                        cardType: "Credit",
                        last4Digits: "4800",
                        fullNameOnCard: "Rishav Ray",
                        cardExpiration: "07/2026"
                    },
                    {
                        id: 2,
                        cardCompany: "Discover",
                        cardType: "Debit",
                        last4Digits: "1155",
                        fullNameOnCard: "Rishav Ray",
                        cardExpiration: "01/2026"
                    }
                ];
                this.cardsOfUser = cardsOfUser;
                this.$emit("notifyParentOfSelectedCard", this.cardsOfUser[0]);
            },

            toggleSelectCard(indexOfCardToToggle) {
                if(indexOfCardToToggle==0) {
                    this.cardsOfUser[0].isSelected = !this.cardsOfUser[0].isSelected;
                    if(this.cardsOfUser[0].isSelected) {
                        this.$emit("notifyParentOfSelectedCard", this.cardsOfUser[0]);
                    }
                    else {
                        this.$emit("notifyParentOfSelectedCard", null);
                    }
                }
                else {
                    delete this.cardsOfUser[0].isSelected;
                    const newlySelectedCard = this.cardsOfUser[indexOfCardToToggle];
                    newlySelectedCard.isSelected = true;
                    this.cardsOfUser.splice(indexOfCardToToggle, 1);
                    this.cardsOfUser.splice(0, 0, newlySelectedCard);
                    this.$emit("notifyParentOfSelectedCard", newlySelectedCard);
                }
            },

            toggleIsMinimized() {
                this.isMinimized = !this.isMinimized;
            },

            showAddPaymentCardPopup() {
                this.$emit("showAddPaymentCardPopup");
            },

            applyPromoCode() {
                if(this.promoCodeInput in this.promoCodes) {
                    this.promoCodeMatches = this.promoCodes[this.promoCodeInput];
                    this.invalidPromoCode = false;
                    if(!this.promoCodesAlreadyApplied.has(this.promoCodeInput)) {
                        this.$emit("applyPromoCode", this.promoCodeInput);
                    }
                    this.promoCodesAlreadyApplied.add(this.promoCodeInput);
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