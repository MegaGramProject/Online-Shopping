<template>
    <div class="popup" :style="{backgroundColor: 'white', position: 'absolute', top: '66%', left: '25%', width: '50em',
    display: 'flex', flexDirection: 'column', borderRadius:'0.8em', height: '22em', gap: '1em'}">

        <div class="popupHeader" :style="{backgroundColor: '#ededed', padding: '1.5em 1.5em', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderStyle: 'solid', borderColor: 'lightgray', borderRadius: '0.8em 0.8em 0em 0em',
        borderTop: 'none', borderLeft: 'none', borderRight: 'none'}">
            <b :style="{fontSize:'1.1em'}">Add a credit or debit card</b>
            <img @click="closePopup" :src="thinGrayXIcon" class="iconToBeAdjustedForDarkMode" :style="{cursor: 'pointer', height: '1.4em', width: '1.4em'}"/>
        </div>

        <div id="cardElement" :style="{width: '80%', marginLeft: '2em'}">
        </div>

        <div :style="{display: 'flex', alignItems: 'center', gap: '2em', position: 'relative', marginLeft: '2em', width: '80%'}">
            <b>Name on card</b>
            <textarea v-model="nameOnCard"
            :style="{fontFamily: 'Arial', resize: 'none', paddingLeft: '1em', paddingTop: '0.7em', width: '100%'}"></textarea>
        </div>

        <div :style="{display: 'flex', flexDirection: 'column', gap: '0.75em', fontSize: '0.9em', alignItems: 'center'}">
            <p :style="{maxWidth:'18em'}">Megagram accepts all major credit and debit cards:</p>
            <div :style="{display: 'flex', alignItems: 'center', gap:'0.85em', width: '18em', marginBottom:'0em', marginTop:'-1em'}">
                <img :src="amexCard" :style="{height: '5.5em', width: '19%', objectFit: 'contain', pointerEvents:'none'}"/>
                <img :src="chaseCard" :style="{height: '5.5em', width: '19%', objectFit: 'contain', pointerEvents:'none'}"/>
                <img :src="discoverCard" :style="{height: '5.5em', width: '19%', objectFit: 'contain', pointerEvents:'none'}"/>
                <img :src="mastercard" :style="{height: '5.5em', width: '19%', objectFit: 'contain', pointerEvents:'none'}"/>
                <img :src="visaCard" :style="{height: '5.5em', width: '19%', objectFit: 'contain', pointerEvents:'none'}"/>
            </div>
            <p :style="{marginTop:'-1em'}">& more!</p>
        </div>

        <div class="popupHeader" :style="{backgroundColor: '#ededed', marginTop:'-1em', borderRadius: '0em 0em 0.8em 0.8em',
        padding: '1em 1em', display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
        gap: '1em'}">
            <button @click="closePopup" :style="{padding: '0.5em 1em', backgroundColor: 'white', cursor: 'pointer',
            borderRadius:'2em', borderWidth:'0.07em'}">Cancel</button>
            <button @click="addYourCard" :style="{border: 'none', padding: '0.7em 1.2em', cursor: 'pointer', borderRadius: '2em',
            backgroundColor:'#ffe359'}">Add your card</button>
        </div>

    </div>

</template>

<script>
import amexCard from '@/assets/images/amexCard.png';
import chaseCard from '@/assets/images/chaseCard.png';
import discoverCard from '@/assets/images/discoverCard.avif';
import mastercard from '@/assets/images/mastercard.png';
import thinGrayXIcon from '@/assets/images/thinGrayXIcon.png';
import visaCard from '@/assets/images/visaCard.png';

    export default {

        props: {
            stripeCustomerId: String
        },

        data() {
            return {
                thinGrayXIcon,
                amexCard,
                chaseCard,
                discoverCard,
                visaCard,
                mastercard,
                cardNumber: "",
                nameOnCard: "",
                cardExpirationMonth: "",
                cardExpirationYear: "",
                stripe: null,
                cardElement: null,
                addYourCardMethodIsRunning: false
            }
        },

        mounted() {
            /* global Stripe */
            this.stripe = Stripe('pk_test_51QTEYTEAJQccq0qD0jJ7bdyFvNWWIr4tN7Z1Q2FMmGWRP3Qs3XequpT0YoeqnI4xr3MdazAsWODlW4LfruaShaYD00ydVl1AkC'); //no security concerns here, since this is the publishable key!
            const elements = this.stripe.elements();
            this.cardElement = elements.create('card');
            this.cardElement.mount('#cardElement');
        },

        methods: {
            closePopup() {
                this.$emit("closePopup");
            },

            onChangeOfCardNumberTextarea() {
                const cardNumberWithoutSpaces = this.cardNumber.replaceAll(" ", "");
                if(cardNumberWithoutSpaces.length%4==0) {
                    this.cardNumber+=" ";
                }
            },

            isValidCardNumber() {
                const cardNumberWithoutSpaces = this.cardNumber.replaceAll(" ", "");

                if (!/^\d+$/.test(cardNumberWithoutSpaces) || cardNumberWithoutSpaces.length < 13 || cardNumberWithoutSpaces.length > 19) {
                    return false;
                }

                let sum = 0;
                let shouldDouble = false;

                for (let i = cardNumberWithoutSpaces.length - 1; i >= 0; i--) {
                    let digit = parseInt(cardNumberWithoutSpaces.charAt(i), 10);

                    if (shouldDouble) {
                        digit *= 2;
                        if (digit > 9) {
                            digit -= 9;
                        }
                    }

                    sum += digit;
                    shouldDouble = !shouldDouble;
                }

                return sum % 10 === 0;
            },

            isValidCardName() {
                const trimmedName = this.nameOnCard;

                if (trimmedName.length < 3 || trimmedName.length > 26) {
                    return false; // Invalid length
                }

                const nameRegex = /^[A-Za-z\s'-]+$/;

                if (!nameRegex.test(trimmedName)) {
                    return false;
                }

                if (/ {2,}/.test(trimmedName)) {
                    return false;
                }

                return true
            },

            cardIsNotExpired() {
                if(this.cardExpirationYear==="" || this.cardExpirationMonth==="") {
                    return false;
                }
                const currentDate = new Date();
                
                const expirationDate = new Date(parseInt(this.cardExpirationYear), parseInt(this.cardExpirationMonth), 0);
                
                return currentDate < expirationDate;
            },


            fieldsAreValidated() {
                return this.isValidCardNumber() && this.isValidCardName() && this.cardIsNotExpired();
            },

            getCardCompany() {
                const cardCompanies = {
                    Visa: /^4/,
                    MasterCard: /^(5[1-5]|2[2-7])/,
                    "American Express": /^3[47]/,
                    Discover: /^(6011|65|64[4-9]|622(12[6-9]|1[3-9]|[2-8][0-9]|9[0-5]))/,
                    JCB: /^35(2[8-9]|[3-8][0-9])/,
                    "Diners Club": /^(30[0-5]|36|38|39)/
                };

                for (const [company, pattern] of Object.entries(cardCompanies)) {
                    if (pattern.test(this.cardNumber)) {
                        return company;
                    }
                }

                return "Lesser Known Card Company";
            },

            async addYourCard() {
                if(this.addYourCardMethodIsRunning==true) {
                    false;
                }

                this.addYourCardMethodIsRunning = true;
                const response = await fetch(`http://localhost:8036/createSetupIntent`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        customerId: this.stripeCustomerId
                    })
                });
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                const { clientSecret } = await response.json();

                const {paymentMethod, error: paymentMethodError} = await this.stripe.createPaymentMethod({
                    type: 'card',
                    card: this.cardElement,
                    billing_details: {
                        name: this.nameOnCard
                    }
                });

                if (paymentMethodError) {
                    console.error(paymentMethodError.message);
                    return;
                }

                const newPaymentMethod = paymentMethod;

                const { _, error } = await this.stripe.confirmSetupIntent(clientSecret, {
                    payment_method: newPaymentMethod.id
                });

                _;
                if(error) {
                    console.error(error.message);
                    return;
                }

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

                const newCardOfUser = {
                    id: newPaymentMethod.id,
                    cardCompany: cardBrandMappings[newPaymentMethod.card.brand],
                    cardType: newPaymentMethod.card.funding.charAt(0).toUpperCase() + newPaymentMethod.card.funding.slice(1),
                    last4Digits: newPaymentMethod.card.last4,
                    fullNameOnCard: newPaymentMethod.billing_details.name,
                    cardExpiration: `${newPaymentMethod.card.exp_month}/${newPaymentMethod.card.exp_year}`,
                    isSelected: false
                };

                this.nameOnCard = "";
                this.$emit("addPaymentCard", newCardOfUser);
                this.addYourCardMethodIsRunning = false;
            }
        }

    };

</script>