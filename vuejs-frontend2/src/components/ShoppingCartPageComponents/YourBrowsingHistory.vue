<template>

    <div class="miniSection" :style="{height: '13em', width: '98%', backgroundColor: 'white', paddingLeft: '3em', paddingTop: '1em',
    display: 'flex', flexDirection: 'column', gap: '1em', paddingBottom: '1.5em',
    borderStyle: 'solid', borderColor: 'lightgray', borderLeft: 'none', borderRight: 'none', borderTop: 'none'}">
        <div :style="{display: 'flex', gap: '1.8em', alignItems: 'center', position: 'relative'}">
            <h2>Your Browsing History</h2>
            <p :style="{fontSize:'0.94em', cursor: 'pointer', color: '#4180b0'}">You can delete items by hovering on them</p>
            <p :style="{position: 'absolute', left: '92%', fontSize:'0.9em'}">Page {{ currPage }} of {{ maxPage }}</p>
        </div>

        <div :style="{display: 'flex', alignItems: 'center', height: '10em', marginTop:'-0.8em',
        width: '98%', gap: '1.6em'}">
            <div v-if="maxPage>1" @click="goToPrevPage" :style="{height: '2em', width: '2em', borderRadius: '0.75em',
            cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderWidth: '0.03em',
            marginRight:'2em'}">
                <img :src="leftArrow" :style="{height: '1.2em', width: '1.2em'}"/>
            </div>

            <template v-if="browsingHistoryOfUser!==null">
                <div v-for="(item, index) in browsingHistoryOfUser.slice(currPage*8-8,currPage*8)" :key="index" @mouseenter="updateCurrentlyHoveredImage(index)" @mouseleave="updateCurrentlyHoveredImage(index)" :style="{position: 'relative', height: '80%', width: '10em'}">
                    <img :src="item.productImage" :style="{height: '100%', width: '100%', cursor: 'pointer', objectFit: 'contain'}"/>
                    <img v-if="currentlyHoveredImage==index" :src="xInCircle" class="iconToBeAdjustedForDarkMode" @click="removeProductFromBrowsingHistory(item.id)" :style="{height: '1.1em', width: '1.2em', cursor: 'pointer', position: 'absolute',
                    top: '-10%', left:'98%'}"/>
                </div>
            </template>

            <div v-if="maxPage>1" @click="goToNextPage" :style="{height: '2em', width: '2em', borderRadius: '0.75em',
            cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderWidth: '0.03em'}">
                <img :src="leftArrow" :style="{height: '1.2em', width: '1.2em', transform: 'scaleX(-1)'}"/>
            </div>

        </div>
    </div>

</template>

<script>
import ledLightStrips from '@/assets/images/ledLightStrips.jpg';
import leftArrow from '@/assets/images/leftArrow.png';
import redCologne from '@/assets/images/redCologne.jpg';
import socks from '@/assets/images/socks.jpg';
import xInCircle from '@/assets/images/x-circle-1.svg';

    export default {

        props: {
            authenticatedUsername: String,
            browsingHistoryOfUser: Array
        },

        data() {
            return {
                leftArrow,
                redCologne,
                socks,
                xInCircle,
                ledLightStrips,
                currentlyHoveredImage: -1,
                currPage: 1,
                maxPage: 1
            }
        },

        methods: {
            updateCurrentlyHoveredImage(newImageIdx) {
                if(this.currentlyHoveredImage===newImageIdx) {
                    this.currentlyHoveredImage = -1;
                }
                else {
                    this.currentlyHoveredImage = newImageIdx
                }
            },

            goToNextPage() {
                if(this.currPage===this.maxPage) {
                    this.currPage = 1;
                }
                else {
                    this.currPage++;
                }
            },

            goToPrevPage() {
                if(this.currPage===1) {
                    this.currPage = this.maxPage;
                }
                else {
                    this.currPage--;
                }
            },

            removeProductFromBrowsingHistory(idToRemove) {
                this.$emit("removeProductFromBrowsingHistory", idToRemove);
            }
        },

        watch: {
            browsingHistoryOfUser(newVal) {
                if(newVal==null) {
                    return;
                }
                const numBrowsingHistoryProducts = this.browsingHistoryOfUser.length;
                if((numBrowsingHistoryProducts/8)%1>0) {
                    this.maxPage = Math.floor(numBrowsingHistoryProducts/8)+1;
                }
                else {
                    this.maxPage = numBrowsingHistoryProducts/8;
                }
            }
        }
    };

</script>