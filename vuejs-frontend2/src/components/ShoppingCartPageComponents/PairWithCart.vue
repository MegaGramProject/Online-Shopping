<template>
    <div class="miniSection" :style="{backgroundColor: 'white', width: '100%', padding: '0.5em 1em', borderRadius: '0.6em'}">
        <h3>Pair with your cart</h3>

        <SingleItemToPairWithCart v-for="(item, index) in itemsToPairWithCart" :key="index"
        :productId="item.productId" :productImage="item.image" :productName="item.name"
        :productPrice="item.price" :avgRating="item.avgRating" :numRatings="item.numRatings" :hasPremium="hasPremium"
        @addItemToCart="addItemToCart"/>
    </div>

</template>

<script>
import bedding from '@/assets/images/bedding.jpg';
import jeans from '@/assets/images/jeans.jpg';
import SingleItemToPairWithCart from './SingleItemToPairWithCart.vue';

    export default {
        props: {
            authenticatedUsername: String,
            hasPremium: Boolean,
            deliveryAreaCountry: String,
            idsOfProductsAvailableToUser: Array,
            idsOfUserBoughtProducts: Array,
            productIdsOfCartItems: Array
        },

        components: {
            SingleItemToPairWithCart
        },

        data() {
            return {
                bedding,
                jeans,
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
                itemsToPairWithCart: []
            }
        },

        methods: {
            async addItemToCart(itemInfo) {
                const response = await fetch(`http://localhost:8022/getOptionsOfProduct/${itemInfo.productId}`);
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                const optionsOfProduct = await response.json();
                const defaultOptionsOfItem = {};
                for(let option of Object.keys(optionsOfProduct)) {
                    defaultOptionsOfItem[option] = 0;
                }

                const escapedDefaultOptions = JSON.stringify(defaultOptionsOfItem).replace(/"/g, '\\"');

                const response1 = await fetch("http://localhost:8029/graphql", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        query: `mutation {
                            addShoppingCartItem(username: "${this.authenticatedUsername}", productId: "${itemInfo.productId}", quantity: 1, options: "${escapedDefaultOptions}") {
                                id
                            }
                        }`
                    })
                });
                if(!response1.ok) {
                    throw new Error('Network response not ok');
                }
                let newlyAddedShoppingCartItemId = await response1.json();
                newlyAddedShoppingCartItemId = newlyAddedShoppingCartItemId.data.addShoppingCartItem.id;
                itemInfo.id = newlyAddedShoppingCartItemId;
                
                for(let option of Object.keys(optionsOfProduct)) {
                    defaultOptionsOfItem[option] = optionsOfProduct[option][0];
                }
                itemInfo.options = defaultOptionsOfItem;
                this.itemsToPairWithCart = this.itemsToPairWithCart.filter(
                    x=> {
                        return x.productId!==itemInfo.productId;
                    }
                );
                this.$emit("addItemToCart", itemInfo);
            },

            updateCurrencies(currentCurrency, newCurrency) {
                for(let i=0; i<this.itemsToPairWithCart.length; i++) {
                    let currItemPrice = this.itemsToPairWithCart[i].price;
                    currItemPrice = parseFloat(currItemPrice.substring(currentCurrency.length));
                    currItemPrice/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                    currItemPrice*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                    this.itemsToPairWithCart[i].price = newCurrency+currItemPrice.toFixed(2);
                }
            },

            async fetchProductsSimilarToThoseInCart() {
                const response = await fetch('http://localhost:8025/getAllPSTsAsDict');
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                const allProductIdToSearchTagMappings = await response.json();
                /*
                above is a dict where keys are productIds of every product, and
                values are the list of search tags for the product.
                */
            
                let idsToExclude = new Set([...this.idsOfUserBoughtProducts]);
                idsToExclude = [...idsToExclude];

                const response1 = await fetch('http://localhost:8022/findSimilarProducts', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json',
                    body: JSON.stringify({
                        idsToInclude: this.idsOfProductsAvailableToUser,
                        idsToExclude: idsToExclude,
                        allProductIdToSearchTagMappings: allProductIdToSearchTagMappings,
                        productIds: this.productIdsOfCartItems
                    })}
                });
                if(!response1.ok) {
                    throw new Error('Network response not ok');
                }
                const idsOfSimilarProductsToThoseInCart = await response1.json();

                if(idsOfSimilarProductsToThoseInCart.length>0) {
                    const response2 = await fetch('http://localhost:8028/avgAndNumRatingsOfProductsInList', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            country: 'all',
                            productIds: idsOfSimilarProductsToThoseInCart
                        })
                    });
                    if(!response2.ok) {
                        throw new Error('Network response not ok');
                    }
                    const listOfAvgRatingsAndNumRatingsOfProducts = await response2.json();
                    const dictOfAvgRatingsAndNumRatingsOfProducts = this.getDictForAvgAndNumRatingsOfProducts(listOfAvgRatingsAndNumRatingsOfProducts);
                    /*
                    above is a dict where each key is a productId from idsOfSimilarProductsToThoseInCart, and each value
                    is a list of two elems: the avgRating and numRatings of that product in that order.
                    */
                    const bayesianAvgRatings = this.getBayesianAverageRatings(listOfAvgRatingsAndNumRatingsOfProducts);
                    /*
                    above is a dict where each key is a productId from idsOfSimilarProductsToThoseInCart, and value is bayesian avg rating of product.
                    one of the keys, however, one of the keys is the avgBayesianAvgRatingOfAllProducts, which will be used for those
                    products who have no ratings
                    */
        
                    let scoresOfProductsSimilarToThoseInCart = [];
                    for(let productId of idsOfSimilarProductsToThoseInCart) {
                        //the products whose scores are in the top 5 will be selected
                        scoresOfProductsSimilarToThoseInCart.push({
                            id: productId,
                            score:  bayesianAvgRatings[productId] ?? bayesianAvgRatings['avgBayesianAvgRatingAcrossAllProducts'],
                        });
                    }

                    scoresOfProductsSimilarToThoseInCart.sort((a,b) => b.score - a.score);
                    scoresOfProductsSimilarToThoseInCart = scoresOfProductsSimilarToThoseInCart.slice(0, 5);

                    const itemsToPairWithCart = scoresOfProductsSimilarToThoseInCart.map(x=>x.id);
                    const response3 = await fetch('http://localhost:8022/getNamesAndPricesOfListOfProducts', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            productIds: itemsToPairWithCart
                        })
                    });
                    if(!response3.ok) {
                        throw new Error('Network response not ok');
                    }
                    const dictOfNamesAndPricesOfItemsToPairWithCart = await response3.json();
                    /*
                    above is a dict where keys are productIds in itemsToPairWithCart and
                    values are lists of 2 or 4 elements: first is the product-name,
                    second is the price of the product with all the default options,
                    and third and fourth(these two are missing for certain products)
                    is the price per unit of the product with all default options.

                    an example of a value of this dict is below.
                    ["Product-Name", "$20", "$2" "oz"]
                    */

                    const response4 = await fetch('http://localhost:8031/getMainProductImagesOfProducts', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(itemsToPairWithCart)
                    });
                    if(!response4.ok) {
                        throw new Error('Network response not ok');
                    }
                    const mainImagesOfProductsToPairWithCart = await response4.json();
                    /*
                    above is a dict where each key is productId and each value is the
                    fetched base-64-string of the main photo of product
                    */

                    this.itemsToPairWithCart = itemsToPairWithCart.map(productIdOfItemToPairWithCart => {
                        return {
                            productId: productIdOfItemToPairWithCart,
                            image: mainImagesOfProductsToPairWithCart[productIdOfItemToPairWithCart],
                            name: dictOfNamesAndPricesOfItemsToPairWithCart[productIdOfItemToPairWithCart][0],
                            price: dictOfNamesAndPricesOfItemsToPairWithCart[productIdOfItemToPairWithCart][1],
                            avgRating: dictOfAvgRatingsAndNumRatingsOfProducts[productIdOfItemToPairWithCart][0],
                            numRatings: dictOfAvgRatingsAndNumRatingsOfProducts[productIdOfItemToPairWithCart][1],
                        }
                    });
                }
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
            }
        },

        watch: {
            deliveryAreaCountry(newVal) {
                if(this.itemsToPairWithCart.length==0) {
                    return;
                }
                let currentCurrency = this.itemsToPairWithCart[0].price[0];
                if(currentCurrency==="A") {
                    currentCurrency+="$";
                }
                else if(currentCurrency==="M") {
                    currentCurrency+="X$";
                }
                else if(currentCurrency==="C") {
                    if(this.itemsToPairWithCart[0].price[1]==="$") {
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

            idsOfProductsAvailableToUser(newVal) {
                if(newVal!==null && this.idsOfUserBoughtProducts!==null && this.productIdsOfCartItems!==null) {
                    this.fetchProductsSimilarToThoseInCart();
                }
            },

            idsOfUserBoughtProducts(newVal) {
                if(newVal!==null && this.idsOfProductsAvailableToUser!==null && this.productIdsOfCartItems!==null) {
                    this.fetchProductsSimilarToThoseInCart();
                }
            },

            productIdsOfCartItems(newVal) {
                if(newVal!==null && this.idsOfProductsAvailableToUser!==null && this.idsOfUserBoughtProducts!==null) {
                    this.fetchProductsSimilarToThoseInCart();
                }
            }
        }
    };
</script>