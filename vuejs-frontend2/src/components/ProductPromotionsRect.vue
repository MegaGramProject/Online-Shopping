<template>

    <div :style="{height: '50em', width: '100%', backgroundColor: 'white', paddingLeft: '2em', paddingTop: '1em',
    paddingRight: '1em', marginTop: '2em', display: 'flex', flexDirection: 'column', gap: '1em', paddingBottom: '1.5em',
    borderStyle: 'solid', borderColor: 'lightgray', borderLeft: 'none', borderRight: 'none', borderTop: 'none'}">

        <div :style="{display: 'flex', justifyContent: 'space-between', width: '96%', paddingLeft: '1.5em'}">
            <b :style="{fontSize:'1.3em'}">Recommended based on your Shopping Trends & Browsing History</b>
            <small>Page {{ currPageDiv1 }} of {{ maxPageDiv1 }}</small>
        </div>

        <div id="div1" :style="{display: 'flex', alignItems: 'center', width: '100%', height: '45%',
        paddingLeft: '2em', paddingRight: '2em', marginTop:'1em'}">
            <div @click="goToPrevPageInDiv1" :style="{height: '2em', width: '2em', borderRadius: '0.75em',
            cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderWidth: '0.03em',
            marginRight:'2em'}">
                <img :src="leftArrow" :style="{height: '1.2em', width: '1.2em'}"/>
            </div>

            <SingleProductPromotion v-for="(div1Product, index) in div1Products.slice(currPageDiv1*6-6, currPageDiv1*6)" :key="index" :productId="div1Product.productId" :productName="div1Product.productName"
            :productImage="div1Product.productImage" :productPrice="div1Product.productPrice" :productPricePerOption="div1Product.productPricePerOption" :getItAsSoonAs="div1Product.getItAsSoonAs"
            :megagramsChoiceCategory="div1Product.megagramsChoiceCategory" :bestsellerCategory="div1Product.bestsellerCategory" :avgRating="div1Product.avgRating" :numRatings="div1Product.numRatings"
            :hasPremium="hasPremium"
            />

            <div @click="goToNextPageInDiv1" :style="{height: '2em', width: '2em', borderRadius: '0.75em',
            cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderWidth: '0.03em'}">
                <img :src="leftArrow" :style="{height: '1.2em', width: '1.2em', transform: 'scaleX(-1)'}"/>
            </div>
        </div>

        <div :style="{display: 'flex', justifyContent: 'space-between', width: '96%', paddingLeft: '1.5em'}">
            <b :style="{fontSize:'1.1em'}">Customers who viewed items in your browsing history also viewed</b>
            <small>Page {{ currPageDiv2 }} of {{ maxPageDiv2 }}</small>
        </div>

        <div id="div2" :style="{display: 'flex', alignItems: 'center', width: '100%', height: '45%',
        paddingLeft: '2em', paddingRight: '2em', marginTop:'1em'}">
            <div @click="goToPrevPageInDiv2" :style="{height: '2em', width: '2em', borderRadius: '0.75em',
            cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderWidth: '0.03em',
            marginRight:'2em'}">
                <img :src="leftArrow" :style="{height: '1.2em', width: '1.2em'}"/>
            </div>

            <SingleProductPromotion v-for="(div2Product, index) in div2Products.slice(currPageDiv2*6-6, currPageDiv2*6)" :key="index" :productId="div2Product.productId" :productName="div2Product.productName"
            :productImage="div2Product.productImage" :productPrice="div2Product.productPrice" :productPricePerOption="div2Product.productPricePerOption" :getItAsSoonAs="div2Product.getItAsSoonAs"
            :megagramsChoiceCategory="div2Product.megagramsChoiceCategory" :bestsellerCategory="div2Product.bestsellerCategory" :avgRating="div2Product.avgRating" :numRatings="div2Product.numRatings"
            :hasPremium="hasPremium"
            />

            <div @click="goToNextPageInDiv2" :style="{height: '2em', width: '2em', borderRadius: '0.75em',
            cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderWidth: '0.03em'}">
                <img :src="leftArrow" :style="{height: '1.2em', width: '1.2em', transform: 'scaleX(-1)'}"/>
            </div>
        </div>

    </div>

</template>

<script>
import leftArrow from '@/assets/images/leftArrow.png';
import SingleProductPromotion from './SingleProductPromotion.vue';
import milano from '@/assets/images/milano.jpg';
import blueCologne from '@/assets/images/blueCologne.jpg';

    export default {

        props: {
            deliveryAreaCountry: String,
            hasPremium: Boolean
        },

        components: {
            SingleProductPromotion
        },

        data() {
            return {
                leftArrow,
                blueCologne,
                milano,
                currPageDiv1: 1,
                maxPageDiv1: 1,
                currPageDiv2: 1,
                maxPageDiv2: 1,
                div1Products: [],
                div2Products: []
            }
        },

        mounted() {
            //fetch data for div1Products & div2Products
            this.div1Products = [
                {
                    productId: "div1Product0",
                    productImage: milano,
                    productName: "Pepperidge Farm Milano Cookies, Mint, 10 Packs, 2 Cookies per Pack",
                    getItAsSoonAs: "Sat, Nov 16",
                    megagramsChoiceCategory: null,
                    bestsellerCategory: null,
                    avgRating: 4.8,
                    numRatings: 1223,
                    productPrice: "$7.49",
                    productPricePerOption: "$1/Cookie"
                },
                {
                    productId: "div1Product1",
                    productImage: milano,
                    productName: "Pepperidge Farm Milano Cookies, Mint, 10 Packs, 2 Cookies per Pack",
                    getItAsSoonAs: "Sat, Nov 16",
                    megagramsChoiceCategory: null,
                    bestsellerCategory: null,
                    avgRating: 4.8,
                    numRatings: 1223,
                    productPrice: "$7.49",
                    productPricePerOption: "$1/Cookie"
                },
                {
                    productId: "div1Product2",
                    productImage: milano,
                    productName: "Pepperidge Farm Milano Cookies, Mint, 10 Packs, 2 Cookies per Pack",
                    getItAsSoonAs: "Sat, Nov 16",
                    megagramsChoiceCategory: null,
                    bestsellerCategory: null,
                    avgRating: 4.8,
                    numRatings: 1223,
                    productPrice: "$7.49",
                    productPricePerOption: "$1/Cookie"
                },
                {
                    productId: "div1Product3",
                    productImage: milano,
                    productName: "Pepperidge Farm Milano Cookies, Mint, 10 Packs, 2 Cookies per Pack",
                    getItAsSoonAs: "Sat, Nov 16",
                    megagramsChoiceCategory: null,
                    bestsellerCategory: null,
                    avgRating: 4.8,
                    numRatings: 1223,
                    productPrice: "$7.49",
                    productPricePerOption: "$1/Cookie"
                },
                {
                    productId: "div1Product4",
                    productImage: milano,
                    productName: "Pepperidge Farm Milano Cookies, Mint, 10 Packs, 2 Cookies per Pack",
                    getItAsSoonAs: "Sat, Nov 16",
                    megagramsChoiceCategory: null,
                    bestsellerCategory: null,
                    avgRating: 4.8,
                    numRatings: 1223,
                    productPrice: "$7.49",
                    productPricePerOption: "$1/Cookie"
                },
                {
                    productId: "div1Product5",
                    productImage: milano,
                    productName: "Pepperidge Farm Milano Cookies, Mint, 10 Packs, 2 Cookies per Pack",
                    getItAsSoonAs: "Sat, Nov 16",
                    megagramsChoiceCategory: null,
                    bestsellerCategory: null,
                    avgRating: 4.8,
                    numRatings: 1223,
                    productPrice: "$7.49",
                    productPricePerOption: "$1/Cookie"
                },
                {
                    productId: "div1Product6",
                    productImage: blueCologne,
                    productName: "Davidoff Cool Water Edt Spray for Men, 4.2 oz",
                    getItAsSoonAs: "Mon, Nov 18",
                    megagramsChoiceCategory: 'Men\'s Colognes',
                    bestsellerCategory: null,
                    avgRating: 3.6,
                    numRatings: 12230,
                    productPrice: "$40.49",
                    productPricePerOption: "$0.02/Spray"
                },
                {
                    productId: "div1Product7",
                    productImage: blueCologne,
                    productName: "Davidoff Cool Water Edt Spray for Men, 4.2 oz",
                    getItAsSoonAs: "Mon, Nov 18",
                    megagramsChoiceCategory: null,
                    bestsellerCategory: 'Scents',
                    avgRating: 3.6,
                    numRatings: 12230,
                    productPrice: "$40.49",
                    productPricePerOption: "$0.02/Spray"
                }
            ];

            const numDiv1Products = this.div1Products.length;
            if((numDiv1Products/6)%1>0) {
                this.maxPageDiv1 = Math.floor(numDiv1Products/6)+1;
            }
            else {
                this.maxPageDiv1 = numDiv1Products/6;
            }

            this.div2Products = this.div1Products;

            let numDiv2Products = this.div2Products.length;
            if((numDiv2Products/6)%1>0) {
                this.maxPageDiv2 = Math.floor(numDiv2Products/6)+1;
            }
            else {
                this.maxPageDiv2 = numDiv2Products/6;
            }
        },

        methods: {
            goToNextPageInDiv1() {
                if(this.currPageDiv1==this.maxPageDiv1) {
                    this.currPageDiv1=1;
                }
                else {
                    this.currPageDiv1++;
                }
            },

            goToPrevPageInDiv1() {
                if(this.currPageDiv1==1) {
                    this.currPageDiv1=this.maxPageDiv1;
                }
                else {
                    this.currPageDiv1--;
                }
            },

            goToNextPageInDiv2() {
                if(this.currPageDiv2==this.maxPageDiv2) {
                    this.currPageDiv2=1;
                }
                else {
                    this.currPageDiv2++;
                }
            },

            goToPrevPageInDiv2() {
                if(this.currPageDiv2==1) {
                    this.currPageDiv2=this.maxPageDiv2;
                }
                else {
                    this.currPageDiv2--;
                }
            },
        }
    };

</script>