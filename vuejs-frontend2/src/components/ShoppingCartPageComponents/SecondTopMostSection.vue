<template>
        <div :style="{display: 'flex', alignItems: 'center', justifyContent:'space-between', width: '99.6%',
        backgroundColor: '#2f3a4a', padding: '0.5em 0.5em', fontSize: '0.9em', height: '2.4%'}">

            <div @click="notifyParentToToggleLeftSidebar" @mouseenter="toggleIsHoveringOnToggleLeftSidebarDiv" @mouseleave="toggleIsHoveringOnToggleLeftSidebarDiv"
            :style="{display: 'flex', alignItems: 'center', borderStyle: isHoveringOnToggleLeftSidebarDiv ? 'solid' : 'none',
            borderColor: 'white', cursor: 'pointer', padding: '0.2em 0.4em', gap: '0.4em'}">
                <img :src="whiteHamburgerMenu" :style="{height: '1em', width: '1em', pointerEvents: 'none'}"/>
                <b v-if="!isLeftSidebarDisplayed" :style="{color: 'white'}">Left-Sidebar</b>
                <b v-else :style="{color: 'white'}">Hide</b>
            </div>

            <SingleOptionInSecondTopMostSection :optionName="'Best Sellers'" :optionURL="'http://localhost:8024/shopBestSellers'"/>

            <div @mouseenter="toggleIsHoveringOnPremiumDiv" @mouseleave="toggleIsHoveringOnPremiumDiv"
            :style="{position: 'relative'}">
                <div @click="takeUserToGetPremiumPage" :style="{borderStyle: isHoveringOnPremiumDiv ? 'solid' : 'none', borderColor: 'white', cursor: 'pointer', display: 'flex',
                alignItems: 'start', gap: '0.4em', padding: '0.2em 0.4em'}">
                        <b :style="{color: 'white'}">Premium</b>
                        <img v-if="!hasPremium" :src="downwardTriangle" :style="{height: '1em', width: '1em', pointerEvents: 'none'}"/>
                </div>
            
                <div v-if="displayPremiumPopup" :style="{position: 'absolute', top: '102%', width: '350%', height: '1600%', zIndex: '10',
                backgroundColor: '#2db9e3', borderStyle: 'solid', borderColor: 'white', borderWidth: '1.2em', display: 'flex', flexDirection: 'column',
                alignItems: 'center', padding: '0.5em 1em', fontFamily: 'lato'}">
                    <b :style="{color: 'white', fontSize: '2.5em'}">premium</b>
                    <img :src="smileyArrow" :style="{height: '5em', width: '14em', pointerEvents: 'none', marginTop: '-1em'}"/>
                    <b style="{color: 'white', fontSize: '1.6em'}">Unwind. You deserve it.</b>
                    <p style="{color: 'white', fontSize: '1.2em', textAlign: 'center', maxWidth: '85%', fontFamily: 'Arial'}">Shopping and entertainment all in one place.</p>

                    <button @click="takeUserToGetPremiumPage" :style="{backgroundColor: 'lightgreen', padding: '0.5em 1em', cursor: 'pointer', color: 'black', fontWeight: 'bold', border: 'none',
                    borderRadius: '1em'}">Try Premium</button>

                    <img :src="getPremiumIcon" :style="{height: '35%', width: '100%', objectFit: 'contain', pointerEvents: 'none'}"/>
                </div>
            </div>

            <SingleOptionInSecondTopMostSection :optionName="'Today\'s deals'" :optionURL="'http://localhost:8024/shopTodaysDeals'"/>

            <SingleOptionInSecondTopMostSection :optionName="'New Releases'" :optionURL="'http://localhost:8024/shopNewReleases'"/>

            <SingleOptionInSecondTopMostSection :optionName="'Food'" :optionURL="'http://localhost:8024/shopFood'"/>

            <div @mouseenter="toggleIsHoveringOnGiftCardsPopup" @mouseleave="toggleIsHoveringOnGiftCardsPopup" :style="{position: 'relative'}">
                <div :style="{borderStyle: isHoveringOnGiftCardsPopup ? 'solid' : 'none', borderColor: 'white', cursor: 'pointer', display: 'flex',
                alignItems: 'start', gap: '0.4em', padding: '0.2em 0.4em'}">
                        <b :style="{color: 'white'}">Gift Cards</b>
                        <img :src="downwardTriangle" :style="{height: '1em', width: '1em', pointerEvents: 'none'}"/>
                </div>
                
                <div v-if="displayGiftCardsPopup" class="popup" :style="{position: 'absolute', top: '102%', backgroundColor: 'white', width: '350%', height: '1600%', zIndex: '10',
                    padding: '0.5em 1em'}">
                    <h3>Explore Gift Cards</h3>

                    <div @click="takeUserToMegagramShopGiftCardsPage" :style="{backgroundColor: '#5664e3', color: 'white', padding: '0.7em 1em', cursor: 'pointer', width: '90%', height: '37%',
                    display: 'flex', flexDirection: 'column', alignItems: 'center'}">
                        <img :src="giftCardsIcon" :style="{height: '80%', width: '80%', objectFit: 'contain'}"/>
                        <p>Megagram-Shop Gift Cards</p>
                    </div>

                    <div @click="takeUserToGiftCardBalancePage" :style="{backgroundColor: '#5664e3', color: 'white', padding: '0.7em 1em', cursor: 'pointer', width: '90%', height: '34%',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '0.5em'}">
                        <img :src="giftCardBalance" :style="{height: '80%', width: '80%', objectFit: 'contain'}"/>
                        <p>Gift Card Balance</p>
                    </div>
                </div>
            </div>

            <SingleOptionInSecondTopMostSection :optionName="'Smart Home'" :optionURL="'http://localhost:8024/shopSmartHomeProducts'"/>

            <SingleOptionInSecondTopMostSection :optionName="'Books'" :optionURL="'http://localhost:8024/shopBooks'"/>

            <SingleOptionInSecondTopMostSection :optionName="'Fashion'" :optionURL="'http://localhost:8024/shopFashion'"/>

        </div>
</template>

<script>
import downwardTriangle from '@/assets/images/downwardTriangle.png';
import getPremiumIcon from '@/assets/images/getPremiumIcon.png';
import giftCardBalance from '@/assets/images/giftCardBalance.png';
import giftCardsIcon from '@/assets/images/giftCardsIcon.png';
import smileyArrow from '@/assets/images/smileyArrow.png';
import whiteHamburgerMenu from '@/assets/images/whiteHamburgerMenu.png';
import SingleOptionInSecondTopMostSection from './SingleOptionInSecondTopMostSection.vue';

    export default {
        props: {
            authenticatedUsername: String,
            hasPremium: Boolean,
            isLeftSidebarDisplayed: Boolean,
        },

        data() {
            return {
                whiteHamburgerMenu,
                downwardTriangle,
                smileyArrow,
                getPremiumIcon,
                giftCardsIcon,
                giftCardBalance,
                isHoveringOnToggleLeftSidebarDiv: false,
                isHoveringOnPremiumDiv: false,
                isHoveringOnGiftCardsPopup: false,
                displayPremiumPopup: false,
                displayGiftCardsPopup: false
            }
        },

        components: {
            SingleOptionInSecondTopMostSection
        },

        methods: {
            notifyParentToToggleLeftSidebar() {
                this.$emit("toggleLeftSidebar");
            },

            toggleIsHoveringOnToggleLeftSidebarDiv() {
                this.isHoveringOnToggleLeftSidebarDiv = !this.isHoveringOnToggleLeftSidebarDiv;
            },

            takeUserToGetPremiumPage() {
                window.location.href = "http://localhost:8024/shoppingPremium/"+this.authenticatedUsername;
            },

            toggleIsHoveringOnPremiumDiv() {
                this.isHoveringOnPremiumDiv = !this.isHoveringOnPremiumDiv;
                if(!this.hasPremium) {
                    this.displayPremiumPopup = this.isHoveringOnPremiumDiv;
                    if(this.displayPremiumPopup) {
                        this.$emit("showDarkScreen1");
                    }
                    else {
                        this.$emit("hideDarkScreen1");
                    }
                }
            },

            toggleIsHoveringOnGiftCardsPopup() {
                this.isHoveringOnGiftCardsPopup = !this.isHoveringOnGiftCardsPopup;
                this.displayGiftCardsPopup = this.isHoveringOnGiftCardsPopup;
                if(this.displayGiftCardsPopup) {
                    this.$emit("showDarkScreen1");
                }
                else {
                    this.$emit("hideDarkScreen1");
                }
            },

            takeUserToMegagramShopGiftCardsPage() {
                window.location.href = "http://localhost:8024/shoppingGiftCards/"+this.authenticatedUsername;
            },

            takeUserToGiftCardBalancePage() {
                window.location.href = "http://localhost:8024/shoppingGiftCardBalance/"+this.authenticatedUsername;
            }
        }
    };

</script>