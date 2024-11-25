<template>
    <div :style="{backgroundColor: 'white', position: 'absolute', top: '66%', left: '25%', width: '50em',
    display: 'flex', flexDirection: 'column', borderRadius:'0.8em', height: '22em', gap: '1em'}">

        <div :style="{backgroundColor: '#ededed', padding: '1.5em 1.5em', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderStyle: 'solid', borderColor: 'lightgray', borderRadius: '0.8em 0.8em 0em 0em',
        borderTop: 'none', borderLeft: 'none', borderRight: 'none'}">
            <b :style="{fontSize:'1.1em'}">Add a credit or debit card</b>
            <img @click="closePopup" :src="thinGrayXIcon" :style="{cursor: 'pointer', height: '1.4em', width: '1.4em'}"/>
        </div>


        <div :style="{display: 'flex', borderStyle: 'solid', borderColor: 'lightgray', borderTop: 'none', borderLeft: 'none',
        borderRight: 'none', paddingBottom:'3em', justifyContent: 'center', alignItems: 'start', gap: '1em'}">

            <div :style="{display: 'flex', flexDirection: 'column', gap: '0.6em', borderStyle: 'solid', borderTop: 'none',
            borderLeft: 'none', borderBottom: 'none', borderColor: 'lightgray', paddingRight:'5em', borderWidth:'0.08em'}">
                <div :style="{display: 'flex', alignItems: 'center', gap: '1em', position: 'relative'}">
                    <b>Card number</b>
                    <textarea @input="onChangeOfCardNumberTextarea" v-model="cardNumber"
                    :style="{fontFamily: 'Arial', resize: 'none', paddingLeft: '1em', paddingTop: '0.7em'}"></textarea>
                </div>
                <div :style="{display: 'flex', alignItems: 'center', gap: '1em', position: 'relative', marginLeft: '-0.4em'}">
                    <b>Name on card</b>
                    <textarea v-model="nameOnCard"
                    :style="{fontFamily: 'Arial', resize: 'none', paddingLeft: '1em', paddingTop: '0.7em'}"></textarea>
                </div>
                <div :style="{display: 'flex', alignItems: 'center', gap: '1em', position: 'relative', marginLeft: '-1em'}">
                    <b>Expiration date</b>
                    <select v-model="cardExpirationMonth" :style="{backgroundColor: '#ededed', padding: '0.3em 0.3em', cursor: 'pointer'}">
                        <option value="">Month</option>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>

                    <select v-model="cardExpirationYear" :style="{backgroundColor: '#ededed', padding: '0.3em 0.3em', cursor: 'pointer'}">
                        <option value="">Year</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                        <option value="2031">2031</option>
                        <option value="2032">2032</option>
                        <option value="2033">2033</option>
                        <option value="2034">2034</option>
                        <option value="2035">2035</option>
                        <option value="2036">2036</option>
                        <option value="2037">2037</option>
                        <option value="2038">2038</option>
                        <option value="2039">2039</option>
                        <option value="2040">2040</option>
                        <option value="2041">2041</option>
                        <option value="2042">2042</option>
                        <option value="2043">2043</option>
                        <option value="2044">2044</option>
                    </select>

                </div>
            </div>

            <div :style="{display: 'flex', flexDirection: 'column', gap: '0.75em', fontSize: '0.9em'}">
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

        </div>

        <div :style="{backgroundColor: '#ededed', marginTop:'-1em', borderRadius: '0em 0em 0.8em 0.8em',
        padding: '1em 1em', display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
        gap: '1em'}">
            <button @click="closePopup" :style="{padding: '0.5em 1em', backgroundColor: 'white', cursor: 'pointer',
            borderRadius:'2em', borderWidth:'0.07em'}">Cancel</button>
            <button v-if="fieldsAreValidated()" @click="addYourCard" :style="{border: 'none', padding: '0.7em 1.2em', cursor: 'pointer', borderRadius: '2em',
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
                cardExpirationYear: ""
            }
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

                return "Unknown Card Company";
            },

            async addYourCard() {
                const cardNumberWithoutSpaces = this.cardNumber.replaceAll(" ", "");
                const newCardOfUser = {
                    id: Math.floor(Math.random()*5000)+123,
                    cardCompany: this.getCardCompany(),
                    cardType: ["Debit", "Credit", "Prepaid"][Math.floor(Math.random()*3)],
                    last4Digits: cardNumberWithoutSpaces.slice(-4),
                    fullNameOnCard: this.nameOnCard,
                    cardExpiration: `${this.cardExpirationMonth}/${this.cardExpirationYear}`
                };

                this.cardNumber = "";
                this.nameOnCard = "";
                this.cardExpirationMonth = "";
                this.cardExpirationYear = "";

                this.$emit("addPaymentCard", newCardOfUser);
            }
        }

    };

</script>