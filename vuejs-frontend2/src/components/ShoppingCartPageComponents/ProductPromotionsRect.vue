<template>

    <div class="miniSection" :style="{height: '50em', width: '98%', backgroundColor: 'white', paddingLeft: '2em', paddingTop: '1em',
    paddingRight: '1em', marginTop: '2em', display: 'flex', flexDirection: 'column', gap: '1em', paddingBottom: '1.5em',
    borderStyle: 'solid', borderColor: 'lightgray', borderLeft: 'none', borderRight: 'none', borderTop: 'none'}">

        <div :style="{display: 'flex', justifyContent: 'space-between', width: '96%', paddingLeft: '1.5em'}">
            <b :style="{fontSize:'1.3em'}">Recommended based on your Shopping Trends & Browsing History</b>
            <small>Page {{ currPageDiv1 }} of {{ maxPageDiv1 }}</small>
        </div>

        <div id="div1" :style="{display: 'flex', alignItems: 'center', width: '100%', height: '45%',
        paddingLeft: '2em', paddingRight: '2em', marginTop:'1em'}">
            <div v-if="maxPageDiv1>1" @click="goToPrevPageInDiv1" :style="{height: '2em', width: '2em', borderRadius: '0.75em',
            cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderWidth: '0.03em',
            marginRight:'2em'}">
                <img :src="leftArrow" :style="{height: '1.2em', width: '1.2em'}"/>
            </div>

            <SingleProductPromotion v-for="(div1Product, index) in div1Products.slice(currPageDiv1*6-6, currPageDiv1*6)" :key="index" :productId="div1Product.productId" :productName="div1Product.productName"
            :productImage="div1Product.productImage" :productPrice="div1Product.productPrice" :productPricePerUnit="div1Product.productPricePerUnit" :getItAsSoonAs="div1Product.getItAsSoonAs"
            :megagramsChoiceCategory="div1Product.megagramsChoiceCategory" :avgRating="div1Product.avgRating" :numRatings="div1Product.numRatings"
            :hasPremium="hasPremium"
            />

            <div v-if="maxPageDiv1>1" @click="goToNextPageInDiv1" :style="{height: '2em', width: '2em', borderRadius: '0.75em',
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
            <div v-if="maxPageDiv2>1" @click="goToPrevPageInDiv2" :style="{height: '2em', width: '2em', borderRadius: '0.75em',
            cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderWidth: '0.03em',
            marginRight:'2em'}">
                <img :src="leftArrow" :style="{height: '1.2em', width: '1.2em'}"/>
            </div>

            <SingleProductPromotion v-for="(div2Product, index) in div2Products.slice(currPageDiv2*6-6, currPageDiv2*6)" :key="index" :productId="div2Product.productId" :productName="div2Product.productName"
            :productImage="div2Product.productImage" :productPrice="div2Product.productPrice" :productPricePerUnit="div2Product.productPricePerUnit" :getItAsSoonAs="div2Product.getItAsSoonAs"
            :megagramsChoiceCategory="div2Product.megagramsChoiceCategory" :avgRating="div2Product.avgRating" :numRatings="div2Product.numRatings"
            :hasPremium="hasPremium"
            />

            <div v-if="maxPageDiv2>1" @click="goToNextPageInDiv2" :style="{height: '2em', width: '2em', borderRadius: '0.75em',
            cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderWidth: '0.03em'}">
                <img :src="leftArrow" :style="{height: '1.2em', width: '1.2em', transform: 'scaleX(-1)'}"/>
            </div>
        </div>

    </div>

</template>

<script>
import blueCologne from '@/assets/images/blueCologne.jpg';
import leftArrow from '@/assets/images/leftArrow.png';
import milano from '@/assets/images/milano.jpg';
import SingleProductPromotion from './SingleProductPromotion.vue';

    export default {

        props: {
            deliveryAreaCountry: String,
            hasPremium: Boolean,
            idsOfProductsAvailableToUser: Array,
            idsOfUserBoughtProducts: Array,
            browsingHistoryOfUser: Array,
            selectedAddressOfUser: String,
            authenticatedUsername: String
        },

        components: {
            SingleProductPromotion
        },

        data() {
            return {
                leftArrow,
                blueCologne,
                milano,
                countryCurrencyMap: {
                    "the United States": "$", // USD - US Dollar
                    "Australia": "A$",     // AUD - Australian Dollar
                    "Canada": "C$",        // CAD - Canadian Dollar
                    "China": "CN¥",          // CNY - Chinese Yuan
                    "Germany": "€",        // EUR - Euro
                    "India": "₹",          // INR - Indian Rupee
                    "Japan": "¥",          // JPY - Japanese Yen
                    "Mexico": "MX$",         // MXN - Mexican Peso
                    "United Kingdom": "£"  // GBP - British Pound
                },
                currencyToDollarMap: {
                    "$": 1,            // USD - United States
                    "A$": 1.5063,        // AUD - Australian Dollar
                    "C$": 1.3855,        // CAD - Canadian Dollar
                    "¥": 151.88,       // JPY - Japanese Yen (for Japan)
                    "₹": 84.079,        // INR - Indian Rupee (for India)
                    "€": 0.9240,         // EUR - Euro (for Germany)
                    "CN¥": 7.1198,   // CNY - Chinese Yuan (for China)
                    "MX$": 19.86,      // MXN - Mexican Peso (for Mexico)
                    "£": 0.7709          // GBP - British Pound (for United Kingdom)
                },
                currPageDiv1: 1,
                maxPageDiv1: 1,
                currPageDiv2: 1,
                maxPageDiv2: 1,
                div1Products: [],
                div2Products: [],
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

            updateCurrencies(currentCurrency, newCurrency) {
                for(let i=0; i<this.div1Products.length; i++) {
                    let currItemPrice = this.div1Products[i].productPrice;
                    currItemPrice = parseFloat(currItemPrice.substring(currentCurrency.length));
                    currItemPrice/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                    currItemPrice*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                    this.div1Products[i].productPrice = newCurrency+currItemPrice.toFixed(2);

                    if(this.div1Products[i].productPricePerUnit==null) {
                        continue;
                    }
                    const indexOfPricePerOptionSeparator =  this.div1Products[i].productPricePerUnit.indexOf("/");
                    let currItemPricePerOption = this.div1Products[i].productPricePerUnit.substring(0, indexOfPricePerOptionSeparator);
                    currItemPricePerOption = parseFloat(currItemPricePerOption.substring(currentCurrency.length));
                    currItemPricePerOption/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                    currItemPricePerOption*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                    this.div1Products[i].productPricePerUnit =  newCurrency + currItemPricePerOption.toFixed(2) + this.div1Products[i].productPricePerUnit.substring(indexOfPricePerOptionSeparator);
                }

                for(let i=0; i<this.div2Products.length; i++) {
                    let currItemPrice = this.div2Products[i].productPrice;
                    currItemPrice = parseFloat(currItemPrice.substring(currentCurrency.length));
                    currItemPrice/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                    currItemPrice*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                    this.div2Products[i].productPrice = newCurrency+currItemPrice.toFixed(2);

                    if(this.div2Products[i].productPricePerUnit==null) {
                        continue;
                    }
                    const indexOfPricePerOptionSeparator =  this.div2Products[i].productPricePerUnit.indexOf("/");
                    let currItemPricePerOption = this.div2Products[i].productPricePerUnit.substring(0, indexOfPricePerOptionSeparator);
                    currItemPricePerOption = parseFloat(currItemPricePerOption.substring(currentCurrency.length));
                    currItemPricePerOption/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                    currItemPricePerOption*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                    this.div2Products[i].productPricePerUnit =  newCurrency + currItemPricePerOption.toFixed(2) + this.div2Products[i].productPricePerUnit.substring(indexOfPricePerOptionSeparator);


                }
            },
            
            formatDeliveryArrivalText(numHours) {
                const now = new Date();
                const deliveryDate = new Date(now.getTime() + numHours * 60 * 60 * 1000);
            
                const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                const months = ["January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"];
            
                if (deliveryDate.toDateString() === now.toDateString()) {
                    return `Today, in ${numHours} hours`;
                }
            
                const tomorrow = new Date(now);
                tomorrow.setDate(now.getDate() + 1);
                if (deliveryDate.toDateString() === tomorrow.toDateString()) {
                    return `Tomorrow, ${months[deliveryDate.getMonth()]} ${deliveryDate.getDate()}`;
                }
            
                const dayOfWeek = daysOfWeek[deliveryDate.getDay()];
                const month = months[deliveryDate.getMonth()];
                const day = deliveryDate.getDate();
            
                return `${dayOfWeek}, ${month} ${day}`;
            },
    

            getDictForAvgAndNumRatingsOfProducts(listOfAvgRatingsAndNumRatingsOfProducts) {
                const output = {};
                for (let productRatingInfo of listOfAvgRatingsAndNumRatingsOfProducts) {
                    output[productRatingInfo.product_id] = [productRatingInfo.avgRating, productRatingInfo.numRatings];
                }
                return output;
            },

            getBayesianAverageRatings(listOfAvgRatingsAndNumRatingsOfProducts) {
                const output = {}; // dict where each key is productId and value is Bayesian avg rating of product
                let totalWeightedRating = 0;
                let totalNumberOfRatingsAcrossAllProducts = 0;

                for (let productRatingInfo of listOfAvgRatingsAndNumRatingsOfProducts) {
                    totalWeightedRating += productRatingInfo.avgRating * productRatingInfo.numRatings;
                    totalNumberOfRatingsAcrossAllProducts += productRatingInfo.numRatings;
                }

                let globalAvgRatingAcrossProducts = totalWeightedRating / totalNumberOfRatingsAcrossAllProducts;
                let avgNumberOfRatingsAcrossAllProducts = totalNumberOfRatingsAcrossAllProducts / listOfAvgRatingsAndNumRatingsOfProducts.length;

                for (let productRatingInfo of listOfAvgRatingsAndNumRatingsOfProducts) {
                    output[productRatingInfo.product_id] =
                        (productRatingInfo.avgRating * productRatingInfo.numRatings +
                        globalAvgRatingAcrossProducts * avgNumberOfRatingsAcrossAllProducts) /
                        (productRatingInfo.numRatings + avgNumberOfRatingsAcrossAllProducts);
                }


                let totalBayesianAvgRatingAcrossAllProducts = 0;
                for (let productId of Object.keys(output)) {
                    totalBayesianAvgRatingAcrossAllProducts += output[productId];
                }

                output['avgBayesianAvgRatingAcrossAllProducts'] = totalBayesianAvgRatingAcrossAllProducts / listOfAvgRatingsAndNumRatingsOfProducts.length;

                return output;
            },

            computeScoreForProduct(productInfo) {
                let score = 1;
                score*=productInfo.bayesianAvgRating;
                if(productInfo.megagramsChoice) {
                    score*=2;
                }
                score*=productInfo.numViewersInPastMonth;
                score/=productInfo.fastestDeliveryTimeInHours;
                if(productInfo.discountsAvailable) {
                    score*=1.5;
                }
                return score;
            },

            //Recommended based on your Shopping Trends & Browsing History
            async fetchDiv1Products() {
                const response = await fetch(`http://localhost:8028/getPurchasesOfUserWithNoOr4PlusRating/${this.authenticatedUsername}`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        idsOfUserBoughtProducts: this.idsOfUserBoughtProducts
                    })
                });
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                const idsOfUserBoughtProductsWithNoOr4PlusRating = await response.json();

                const idsOfProductsInBrowsingHistoryOfUser = this.browsingHistoryOfUser.map(x=>x.productId);

                let idsOfProductsToFindSimilarOnesOf = [...idsOfUserBoughtProductsWithNoOr4PlusRating, ...idsOfProductsInBrowsingHistoryOfUser]
                idsOfProductsToFindSimilarOnesOf = new Set(idsOfProductsToFindSimilarOnesOf);
                idsOfProductsToFindSimilarOnesOf = [...idsOfProductsToFindSimilarOnesOf];

                
                const response1 = await fetch('http://localhost:8025/getAllPSTsAsDict');
                if(!response1.ok) {
                    throw new Error('Network response not ok');
                }
                const allProductIdToSearchTagMappings = await response1.json();
                /*
                above is a dict where keys are productIds of every product, and
                values are the list of search tags for the product.
                */

                const response2 = await fetch('http://localhost:8022/findSimilarProducts', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json',
                    body: JSON.stringify({
                        idsToInclude: this.idsOfProductsAvailableToUser,
                        idsToExclude: this.idsOfUserBoughtProducts,
                        allProductIdToSearchTagMappings: allProductIdToSearchTagMappings,
                        productIds: idsOfProductsToFindSimilarOnesOf
                    })}
                });
                if(!response2.ok) {
                    throw new Error('Network response not ok');
                }
                const idsOfPotentialDiv1Products = await response2.json();

                if(idsOfPotentialDiv1Products.length>0) {
                    const response3 = await fetch('http://localhost:8028/avgAndNumRatingsOfProductsInList', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            country: 'all',
                            productIds: idsOfPotentialDiv1Products
                        })
                    });
                    if(!response3.ok) {
                        throw new Error('Network response not ok');
                    }
                    const listOfAvgRatingsAndNumRatingsOfProducts = await response3.json();
                    const dictOfAvgRatingsAndNumRatingsOfProducts = this.getDictForAvgAndNumRatingsOfProducts(listOfAvgRatingsAndNumRatingsOfProducts);
                    /*
                    above is a dict where each key is a productId from idsOfPotentialDiv1Products, and each value
                    is a list of two elems: the avgRating and numRatings of that product in that order.
                    */
                    const bayesianAvgRatings = this.getBayesianAverageRatings(listOfAvgRatingsAndNumRatingsOfProducts);
                    /*
                    above is a dict where each key is a productId from idsOfPotentialDiv1Products, and value is bayesian avg rating of product.
                    one of the keys, however, one of the keys is the avgBayesianAvgRatingOfAllProducts, which will be used for those
                    products who have no ratings
                    */

                    const response4 = await fetch('http://localhost:8029/getFastestDeliveryTimesForProducts', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            hasPremium: this.hasPremium,
                            address: this.selectedAddressOfUser,
                            productIds: idsOfPotentialDiv1Products
                        })
                    });
                    if(!response4.ok){
                        throw new Error('Network response not ok');
                    }
                    const deliveryTimesOfPotentialDiv1Products = await response4.json();
                    /*
                    above is a dict where keys are productIds in idsOfPotentialDiv1Products, whereas values are the fastest
                    delivery times of these products in hours.
                    */

                    const response5 = await fetch('http://localhost:8030/checkIfDealsAreAvailableForProducts', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            productIds: idsOfPotentialDiv1Products,
                            hasPremium: this.hasPremium
                        })
                    });
                    if(!response5.ok) {
                        throw new Error('Network response not ok');
                    }
                    const productIdToDealAvailableMappings = await response5.json();
                    /*
                    above is a dict where the keys are productIds in idsOfPotentialDiv1Products, whereas values
                    are booleans: true if product has deal available, false otherwise
                    */

                    const response6 = await fetch('http://localhost:8032/api/checkForMegagramProductChoicesAndGetNumViewsInPastMonth', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            productIds: idsOfPotentialDiv1Products
                        })
                    });
                    if(!response6.ok) {
                        throw new Error('Network response not ok');
                    }
                    const productIdToProductChoiceAndNumViewsInPastMonthMappings = await response6.json();
                    /*
                    above is a dict where the keys are productIds in idsOfPotentialDiv1Products, whereas values
                    are lists with two elems: the first being a string of the choiceCategory of the product if it is a Megagram-Product-Choice, null
                    otherwise. the second one is an integer representing the number of views the product-page has received
                    in the past month
                    */

                    let scoresOfPotentialDiv1Products = [];
                    for(let productId of idsOfPotentialDiv1Products) {
                        const productInfo = {
                            bayesianAvgRating: bayesianAvgRatings[productId] ?? bayesianAvgRatings['avgBayesianAvgRatingAcrossAllProducts'],
                            megagramsChoice: productIdToProductChoiceAndNumViewsInPastMonthMappings[productId][0]!==null,
                            numViewersInPastMonth: productIdToProductChoiceAndNumViewsInPastMonthMappings[productId][1],
                            fastestDeliveryTimeInHours: deliveryTimesOfPotentialDiv1Products[productId],
                            discountsAvailable: productIdToDealAvailableMappings[productId]
                        };
                        const scoreOfProduct = this.computeScoreForProduct(productInfo); //the higher the score, the more left it will be placed in div1.
                        //the products whose scores are in the top 24 will be selected in div1Products
                        scoresOfPotentialDiv1Products.push({
                            id: productId,
                            score: scoreOfProduct
                        });
                    }

                    scoresOfPotentialDiv1Products.sort((a,b) => b.score - a.score);
                    scoresOfPotentialDiv1Products = scoresOfPotentialDiv1Products.slice(0, 24);

                    const newDiv1Products = scoresOfPotentialDiv1Products.map(x=>x.id);
                    const numDiv1Products = newDiv1Products.length;
                    if((numDiv1Products/6)%1>0) {
                        this.maxPageDiv1 = Math.floor(numDiv1Products/6)+1;
                    }
                    else {
                        this.maxPageDiv1 = numDiv1Products/6;
                    }

                    const response9 = await fetch('http://localhost:8022/getNamesAndPricesOfListOfProducts', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            productIds: newDiv1Products
                        })
                    });
                    if(!response9.ok) {
                        throw new Error('Network response not ok');
                    }
                    const dictOfNamesAndPricesOfNewDiv1Products = await response9.json();
                    /*
                    above is a dict where keys are productIds in newDiv1Products and
                    values are lists of 2 or 4 elements: first is the product-name,
                    second is the price of the product with all the default options,
                    and third and fourth(these two are missing for certain products)
                    is the price per unit of the product with all default options.

                    an example of a value of this dict is below.
                    ["Product-Name", "$20", "$2" "oz"]
                    */

                    const response10 = await fetch('http://localhost:8031/getMainProductImagesOfProducts', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(newDiv1Products)
                    });
                    if(!response10.ok) {
                        throw new Error('Network response not ok');
                    }
                    const mainImagesOfProducts = await response10.json();
                    /*
                    above is a dict where each key is productId and each value is the
                    fetched base-64-string of the main photo of product
                    */
                
                    for(let i=0; i<newDiv1Products.length; i++) {
                        const currProductId = newDiv1Products[i];
                        const currProductName = dictOfNamesAndPricesOfNewDiv1Products[currProductId][0];
                        let currProductPricePerUnit = null;
                        if(dictOfNamesAndPricesOfNewDiv1Products[currProductId].length==4) {
                            currProductPricePerUnit = `${dictOfNamesAndPricesOfNewDiv1Products[currProductId][2]}/${dictOfNamesAndPricesOfNewDiv1Products[currProductId][3]}`
                        }
                        newDiv1Products[i] = {
                            productId: currProductId,
                            productName: currProductName,
                            avgRating: currProductId in dictOfAvgRatingsAndNumRatingsOfProducts ? dictOfAvgRatingsAndNumRatingsOfProducts[currProductId][0] : 0,
                            numRatings: currProductId in dictOfAvgRatingsAndNumRatingsOfProducts ? dictOfAvgRatingsAndNumRatingsOfProducts[currProductId][1] : 0,
                            productImage: `data:image/jpeg;base64,${mainImagesOfProducts[currProductId]}`,
                            megagramsChoiceCategory: productIdToProductChoiceAndNumViewsInPastMonthMappings[currProductId][0],
                            getItAsSoonAs: this.formatDeliveryArrivalText(deliveryTimesOfPotentialDiv1Products[currProductId]),
                            productPrice: dictOfNamesAndPricesOfNewDiv1Products[currProductId][1],
                            productPricePerUnit: currProductPricePerUnit
                        };
                    }

                    this.div1Products = [...newDiv1Products];
                }
                else {
                    this.currPageDiv1 = 0;
                    this.maxPageDiv1 = 0;
                }
                
            },

            //Customers who viewed items in your browsing history also viewed
            async fetchDiv2Products() {
                const response = await fetch(`http://localhost:8034/getIdsOfProductsMostViewedByCustomersWhoAlsoViewed/${this.authenticatedUsername}`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        idsToInclude: this.idsOfProductsAvailableToUser,
                    //    idsToExclude: this.idsOfUserBoughtProducts,
                        //productIdsViewed: this.browsingHistoryOfUser.map(x=>x.productId)
                        idsToExclude: [],
                        productIdsViewed: this.idsOfProductsAvailableToUser.slice(0,5)
                    })
                });
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                let idsOfDiv2Products = await response.json();

                if(idsOfDiv2Products.length>0) {
                    idsOfDiv2Products = idsOfDiv2Products.slice(0, 24);

                    const newDiv2Products = idsOfDiv2Products
                    const numDiv2Products = newDiv2Products.length;
                    if((numDiv2Products/6)%1>0) {
                        this.maxPageDiv2 = Math.floor(numDiv2Products/6)+1;
                    }
                    else {
                        this.maxPageDiv2 = numDiv2Products/6;
                    }

                    const response1 = await fetch('http://localhost:8028/avgAndNumRatingsOfProductsInList', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            country: 'all',
                            productIds: newDiv2Products
                        })
                    });
                    if(!response1.ok) {
                        throw new Error('Network response not ok');
                    }
                    const listOfAvgRatingsAndNumRatingsOfProducts = await response1.json();
                    const dictOfAvgRatingsAndNumRatingsOfProducts = this.getDictForAvgAndNumRatingsOfProducts(listOfAvgRatingsAndNumRatingsOfProducts);
                    /*
                    above is a dict where each key is a productId from newDiv2Products, and each value
                    is a list of two elems: the avgRating and numRatings of that product in that order.
                    */

                    const response2 = await fetch('http://localhost:8029/getFastestDeliveryTimesForProducts', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            hasPremium: this.hasPremium,
                            address: this.selectedAddressOfUser,
                            productIds: newDiv2Products
                        })
                    });
                    if(!response2.ok){
                        throw new Error('Network response not ok');
                    }
                    const deliveryTimesOfPotentialDiv2Products = await response2.json();
                    /*
                    above is a dict where keys are productIds in newDiv2Products, whereas values are the fastest
                    delivery times of these products in hours.
                    */

                    const response3 = await fetch('http://localhost:8032/api/checkForMegagramProductChoicesAndGetNumViewsInPastMonth', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            productIds: newDiv2Products
                        })
                    });
                    if(!response3.ok) {
                        throw new Error('Network response not ok');
                    }
                    const productIdToProductChoiceAndNumViewsInPastMonthMappings = await response3.json();
                    /*
                    above is a dict where the keys are productIds in newDiv2Products, whereas values
                    are lists with two elems: the first being a string of the choiceCategory of the product if it is a Megagram-Product-Choice, null
                    otherwise. the second one is an integer representing the number of views the product-page has received
                    in the past month
                    */

                    const response4 = await fetch('http://localhost:8022/getNamesAndPricesOfListOfProducts', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            productIds: newDiv2Products
                        })
                    });
                    if(!response4.ok) {
                        throw new Error('Network response not ok');
                    }
                    const dictOfNamesAndPricesOfNewDiv2Products = await response4.json();
                    /*
                    above is a dict where keys are productIds in newDiv2Products and
                    values are lists of 2 or 4 elements: first is the product-name,
                    second is the price of the product with all the default options,
                    and third and fourth(these two are missing for certain products)
                    is the price per unit of the product with all default options.

                    an example of a value of this dict is below.
                    ["Product-Name", "$20", "$2" "oz"]
                    */

                    const response5 = await fetch('http://localhost:8031/getMainProductImagesOfProducts', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(newDiv2Products)
                    });
                    if(!response5.ok) {
                        throw new Error('Network response not ok');
                    }
                    const mainImagesOfProducts = await response5.json();
                    /*
                    above is a dict where each key is productId and each value is the
                    fetched base-64-string of the main photo of product
                    */
                
                    for(let i=0; i<newDiv2Products.length; i++) {
                        const currProductId = newDiv2Products[i];
                        const currProductName = dictOfNamesAndPricesOfNewDiv2Products[currProductId][0];
                        let currProductPricePerUnit = null;
                        if(dictOfNamesAndPricesOfNewDiv2Products[currProductId].length==4) {
                            currProductPricePerUnit = `${dictOfNamesAndPricesOfNewDiv2Products[currProductId][2]}/${dictOfNamesAndPricesOfNewDiv2Products[currProductId][3]}`
                        }
                        newDiv2Products[i] = {
                            productId: currProductId,
                            productName: currProductName,
                            avgRating: currProductId in dictOfAvgRatingsAndNumRatingsOfProducts ? dictOfAvgRatingsAndNumRatingsOfProducts[currProductId][0] : 0,
                            numRatings: currProductId in dictOfAvgRatingsAndNumRatingsOfProducts ? dictOfAvgRatingsAndNumRatingsOfProducts[currProductId][1] : 0,
                            productImage: `data:image/jpeg;base64,${mainImagesOfProducts[currProductId]}`,
                            megagramsChoiceCategory: productIdToProductChoiceAndNumViewsInPastMonthMappings[currProductId][0],
                            getItAsSoonAs: this.formatDeliveryArrivalText(deliveryTimesOfPotentialDiv2Products[currProductId]),
                            productPrice: dictOfNamesAndPricesOfNewDiv2Products[currProductId][1],
                            productPricePerUnit: currProductPricePerUnit
                        };
                    }

                    this.div2Products = [...newDiv2Products];
                }
                else {
                    this.currPageDiv2 = 0;
                    this.maxPageDiv2 = 0;
                }
            },

        },

        watch: {
            deliveryAreaCountry(newVal) {
                if(newVal.length==0 || (this.div1Products.length==0 && this.div2Products.length==0)) {
                    return;
                }
                let currentCurrency;
                let secondChar;
                if(this.div1Products.length>0) {
                    currentCurrency = this.div1Products[0].productPrice[0];
                    secondChar = this.div1Products[0].productPrice[1];
                }
                else {
                    currentCurrency = this.div2Products[0].productPrice[0];
                    secondChar = this.div2Products[0].productPrice[1];
                }
                if(currentCurrency==="A") {
                    currentCurrency+="$";
                }
                else if(currentCurrency==="M") {
                    currentCurrency+="X$";
                }
                else if(currentCurrency==="C") {
                    if(secondChar==="$") {
                        currentCurrency="C$";
                    }
                    else {
                        currentCurrency="CN¥";
                    }
                }
                const newCurrency = this.countryCurrencyMap[newVal];
                if(currentCurrency!==newCurrency) {
                    this.updateCurrencies(currentCurrency, newCurrency);
                }
            },

            div1Products(newVal) {
                if(newVal.length==0 || this.deliveryAreaCountry.length==0) {
                    return;
                }
                let currentCurrency = this.div1Products[0].productPrice[0];
                if(currentCurrency==="A") {
                    currentCurrency+="$";
                }
                else if(currentCurrency==="M") {
                    currentCurrency+="X$";
                }
                else if(currentCurrency==="C") {
                    if(this.div1Products[0].productPrice[1]==="$") {
                        currentCurrency="C$";
                    }
                    else {
                        currentCurrency="CN¥";
                    }
                }
                const newCurrency = this.countryCurrencyMap[newVal];
                if(currentCurrency!==newCurrency) {
                    this.updateCurrencies(currentCurrency, newCurrency);
                }
            },

            div2Products(newVal) {
                if(newVal.length==0 || this.deliveryAreaCountry.length==0) {
                    return;
                }
                let currentCurrency = this.div2Products[0].productPrice[0];
                if(currentCurrency==="A") {
                    currentCurrency+="$";
                }
                else if(currentCurrency==="M") {
                    currentCurrency+="X$";
                }
                else if(currentCurrency==="C") {
                    if(this.div2Products[0].productPrice[1]==="$") {
                        currentCurrency="C$";
                    }
                    else {
                        currentCurrency="CN¥";
                    }
                }
                const newCurrency = this.countryCurrencyMap[newVal];
                if(currentCurrency!==newCurrency) {
                    this.updateCurrencies(currentCurrency, newCurrency);
                }
            },
            browsingHistoryOfUser(newVal) {
                if(newVal!==null) {
                    this.fetchDiv1Products();
                    this.fetchDiv2Products();
                }
            }
        }
    };

</script>