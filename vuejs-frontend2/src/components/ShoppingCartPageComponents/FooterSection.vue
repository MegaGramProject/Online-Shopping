<template>
    <div :style="{width: '100%', display: 'flex', flexDirection: 'column', marginLeft:'-1.05em'}">
        <div @click='scrollToTop' @mouseenter='toggleIsHoveringOnTopSectionOfFooter' @mouseleave='toggleIsHoveringOnTopSectionOfFooter'
        :style="{width: '100%', backgroundColor: '#2f3a4a', height: '2.5em', color: 'white', padding: '0.5em 0.5em', textAlign: 'center',
        opacity: isHoveringOnTopSectionOfFooter ? '0.8' : '1', cursor: 'pointer', marginTop: '3em'}">
                <p :style="{fontSize: '0.85em'}">Back to the top</p>
        </div>

        <div :style="{width: '100%', height: '20em', backgroundColor: '#294061', borderStyle: 'solid', borderColor: 'gray', borderTop: 'none',
            borderLeft: 'none', borderRight: 'none', borderWidth: '0.03em', padding: '0.5em 0.5em', display: 'flex', justifyContent: 'center', gap: '12%'}">

            <div :style="{display: 'flex', flexDirection: 'column', color: 'white', gap: '0.45em'}">
                <h3>Make Money with Us</h3>
                <a class='linkInFooter' href='http://localhost:8024/sellingStart' :style="{fontSize: '0.85em', cursor: 'pointer', textDecoration:'none'}">Sell on Megagram-Shop</a>
                <a class='linkInFooter' href='http://localhost:8024/sellingProductAdvertisement' :style="{fontSize: '0.85em', cursor: 'pointer', textDecoration:'none'}">Advertise your Products</a>
            </div>

            <div :style="{display: 'flex', flexDirection: 'column', color: 'white', gap: '0.45em'}">
                <h3>Let us help you</h3>
                <a class='linkInFooter' href='http://localhost:8024/shoppingAccount' :style="{fontSize: '0.85em', cursor: 'pointer', textDecoration:'none'}">Your Shopping Account</a>
                <a class='linkInFooter' href='http://localhost:8024/shoppingOrders' :style="{fontSize: '0.85em', cursor: 'pointer', textDecoration:'none'}">Your Orders</a>
                <a class='linkInFooter' href='http://localhost:8024/shoppingGiftCards' :style="{fontSize: '0.85em', cursor: 'pointer', textDecoration:'none'}">Gift Cards</a>
                <a class='linkInFooter' href='http://localhost:8024/shoppingPremium' :style="{fontSize: '0.85em', cursor: 'pointer', textDecoration:'none'}">Premium</a>
                <a class='linkInFooter' href='http://localhost:8024/shoppingReturnsAndReplacements' :style="{fontSize: '0.85em', cursor: 'pointer', textDecoration:'none'}">Returns & Replacements</a>
            </div>
        </div>

        <div :style="{width: '100%', height: '6em', padding: '0.5em 0.5em', backgroundColor: '#294061', display: 'flex', alignItems: 'center', justifyContent: 'center'}">
            <div :style="{display: 'flex', flexDirection: 'column', alignItems: 'start', paddingTop: '0.5em'}">
                    <b :style="{fontFamily: 'Billabong', color: 'white', fontSize: '1.8em'}">Megagram</b>
                    <img :src="smileyArrow" :style="{height: '2.7em', width: '9.2em', pointerEvents: 'none', marginLeft: '-1.5em', marginTop: '-0.4em'}"/>
            </div>

            <select v-model="selectedDeliveryAreaCountry" :style="{borderStyle: 'solid', borderColor: 'white', paddingLeft: '1em', width: '10em', height: '2em', backgroundColor: '#294061',
            color: 'white', fontWeight: 'bold'}">
                <option value=''>Choose</option>
                <option value='the United States'>United States</option>
                <option value='Australia'>Australia</option>
                <option value='Canada'>Canada</option>
                <option value='China'>China</option>
                <option value='Germany'>Germany</option>
                <option value='India'>India</option>
                <option value='Japan'>Japan</option>
                <option value='Mexico'>Mexico</option>
                <option value='United Kingdom'>United Kingdom</option>
            </select>
        </div>

        <div :style="{height: '3em', color: 'white', backgroundColor: '#020b1f', width: '100%', display: 'flex',
        alignItems: 'center', justifyContent: 'center', padding: '0.5em 0.5em'}">
            <p :style="{fontSize: '0.7em', maxWidth: '20%', textAlign: 'center'}">Megagram is a fictional company, created as a personal project by Rishav Ray during the second-half of 2024</p>
        </div>
    </div>
</template>

<script>
import smileyArrow from '@/assets/images/smileyArrow.png';

    export default {

        data() {
            return {
                smileyArrow,
                isHoveringOnTopSectionOfFooter: false,
                selectedDeliveryAreaCountry: ""
            }
        },

        methods: {
            scrollToTop() {
                const element = document.getElementById('topmostSection');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            },

            toggleIsHoveringOnTopSectionOfFooter() {
                this.isHoveringOnTopSectionOfFooter = !this.isHoveringOnTopSectionOfFooter;
            }
        },

        watch: {
            selectedDeliveryAreaCountry() {
                if(this.selectedDeliveryAreaCountry!=="") {
                    this.$emit("updateDeliveryAreaCountry", this.selectedDeliveryAreaCountry);
                }
            }
        }
    };

</script>