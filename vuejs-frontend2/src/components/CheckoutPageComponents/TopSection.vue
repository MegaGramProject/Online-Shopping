<template>
    <div :style="{background: 'linear-gradient(to right, #0d3d35, #008255)', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginLeft:'-0.5em', height: '4em', color: 'white', paddingTop: '0.35em', paddingLeft: '1.6em', paddingRight: '1.6m', marginTop:'-0.5em', paddingBottom:'0.5em'}">
        
        <div @click="takeUserToShoppingMainPage" @mouseenter="toggleIsHoveringOnMegagramDiv" @mouseleave="toggleIsHoveringOnMegagramDiv"
        :style="{ display: 'flex', flexDirection: 'column', alignItems: 'start',
        cursor: 'pointer', marginBottom:'-0.5em', borderStyle: isHoveringOnMegagramDiv ? 'solid' : '', padding: '0em 0.5em'}">
            <b :style="{ fontFamily: 'Billabong', color: 'white', fontSize: '1.88em' }">Megagram</b>
            <div v-if="hasPremium" :style="{ display: 'flex', alignItems: 'center', marginLeft: '-1em', marginTop: '-0.4em' }">
                <img :src="smileyArrow" :style="{ height: '2.7em', width: '6.9em', pointerEvents: 'none' }" />
                <b :style="{fontSize: '0.95em', marginLeft: '-1em', marginTop:'-0.7em' }">premium</b>
            </div>
            <img v-else :src="smileyArrow" :style="{ height: '2.7em', width: '9.2em', pointerEvents: 'none', marginLeft: '-1.5em', marginTop: '-0.4em' }" />
        </div>

        <div :style="{display: 'flex', position: 'relative', alignItems: 'center',gap: '0.5em'}">
            <p @click="toggleSecureCheckoutMiniPopup" :style="{fontSize:'1.8em', cursor: 'pointer'}">Secure Checkout</p>
            <img :src="downwardTriangle" @click="toggleSecureCheckoutMiniPopup" :style="{height: '1.2em', width: '1.2em', cursor: 'pointer'}"/>
            <div v-if="showSecureCheckoutMiniPopup" :style="{backgroundColor: 'white', color: 'black', position: 'absolute',
            top: '98%', left: '-50%', padding: '1em 1.5em', width: '28em', borderRadius: '0.7em', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'}">
                <p :style="{maxWidth:'86%'}">We secure your payment and personal information when you share or save it with us. We don't share payment details with third-party sellers. We don't sell your information to others.</p>
            </div>
            <img v-if="showSecureCheckoutMiniPopup" @click="toggleSecureCheckoutMiniPopup" :src="thinGrayXIcon" :style="{height: '1em', width: '1em', cursor: 'pointer', position: 'absolute', top: '110%', left: '138%'}"/>
        </div>

        <div @click="takeUserToCartPage"  @mouseenter="toggleIsHoveringOnCartDiv" @mouseleave="toggleIsHoveringOnCartDiv"
        :style="{display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '0.2em', marginRight: '2em',
        borderStyle: isHoveringOnCartDiv ? 'solid' : '', padding: '0em 0.5em'}">
            <img :src="cartIcon" :style="{height: '3em', width: '3em', pointerEvents: 'none', objectFit: 'contain'}"/>
            <b :style="{fontSize:'1em', marginBottom:'-1em'}">Cart</b>
        </div>
    
    </div>
</template>

<script>
import smileyArrow from '@/assets/images/smileyArrow.png';
import downwardTriangle from '@/assets/images/downwardTriangle.png';
import cartIcon from '@/assets/images/cartIcon2.png';
import thinGrayXIcon from '@/assets/images/thinGrayXIcon.png';

    export default {
        props: {
            authenticatedUsername: String,
            hasPremium: Boolean
        },

        data() {
            return {
                smileyArrow,
                downwardTriangle,
                cartIcon,
                thinGrayXIcon,
                isHoveringOnMegagramDiv: false,
                isHoveringOnCartDiv: false,
                showSecureCheckoutMiniPopup: false
            }
        },

        methods: {
            takeUserToShoppingMainPage() {
                window.location.href=`http://localhost:8024/onlineShopping/${this.authenticatedUsername}`;
            },

            takeUserToCartPage() {
                window.location.href='http://localhost:8033/onlineShoppingCart';
            },

            toggleIsHoveringOnMegagramDiv() {
                this.isHoveringOnMegagramDiv = !this.isHoveringOnMegagramDiv;
            },

            toggleIsHoveringOnCartDiv() {
                this.isHoveringOnCartDiv = !this.isHoveringOnCartDiv;
            },

            toggleSecureCheckoutMiniPopup() {
                this.showSecureCheckoutMiniPopup = !this.showSecureCheckoutMiniPopup;
            }
        }
    }

</script>