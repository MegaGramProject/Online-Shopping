import { useEffect, useState } from 'react';
import onePoint5StarRating from '../assets/1.5StarRating.png';
import oneStarRating from '../assets/1StarRating.png';
import twoPoint5StarRating from '../assets/2.5StarRating.png';
import twoStarRating from '../assets/2StarRating.png';
import threePoint5StarRating from '../assets/3.5StarRating.png';
import threeStarRating from '../assets/3StarRating.png';
import fourPoint5StarRating from '../assets/4.5StarRating.png';
import fourStarRating from '../assets/4StarRating.png';
import fiveStarRating from '../assets/5StarRating.png';
import checkmark from '../assets/checkmark.png';
import leftArrow from '../assets/leftArrow.png';

function SimilarCustomerProductsSection({authenticatedUsername, deliveryAreaCountry, allPastSearchesOfUser,
    hasPremium, idsOfProductsAvailableToUser, selectedAddressOfUser}) {
    //div1 refers to the div of products for this section: 'Recommended for you based on your history of searches, purchases, and reviews'
    //div2 refers to the div of products for this section: 'Customers who bought items in your purchasing history also bought'
    const [currPageInDiv1, setCurrPageInDiv1] = useState(1);
    const [maxPageInDiv1, setMaxPageInDiv1] = useState(1);
    const [currPageInDiv2, setCurrPageInDiv2] = useState(1);
    const [maxPageInDiv2, setMaxPageInDiv2] = useState(1);
    const [div1Prices, setDiv1Prices] = useState([]);
    const [div2Prices, setDiv2Prices] = useState([]);
    const [div1Products, setDiv1Products] = useState([]);
    const [div2Products, setDiv2Products] = useState([]);

    const categoryToPagePathSegmentMappings = {
        '': 'shopAllItems',
        'All Items': 'shopAllItems',
        'Arts & Crafts': 'shopArts&Crafts',
        'Books': 'shopBooks',
        'Cell Phones & Accessories': 'shopCellPhones&Accessories',
        'Clothing & Shoes': 'shopFashion',
        'Electronics': 'shopElectronics',
        'Food': 'shopFood',
        'Home & Kitchen': 'shopHome&Kitchen',
        'Toys for Kids': 'shopToysForKids',
        'Smart Home': 'shopSmartHomeProducts',
        'Sports & Outdoors': 'shopSports&Outdoors'
    };
    

    const countryCurrencyMap = {
        "the United States": "$", // USD - US Dollar
        "Australia": "A$",     // AUD - Australian Dollar
        "Canada": "C$",        // CAD - Canadian Dollar
        "China": "¥",          // CNY - Chinese Yuan
        "Germany": "€",        // EUR - Euro
        "India": "₹",          // INR - Indian Rupee
        "Japan": "¥",          // JPY - Japanese Yen
        "Mexico": "MX$",         // MXN - Mexican Peso
        "United Kingdom": "£"  // GBP - British Pound
    };

    const currencyToDollarMap = {
        "$": 1,            // USD - United States
        "A$": 1.5063,        // AUD - Australian Dollar
        "C$": 1.3855,        // CAD - Canadian Dollar
        "¥": 151.88,       // JPY - Japanese Yen (for Japan)
        "₹": 84.079,        // INR - Indian Rupee (for India)
        "€": 0.9240,         // EUR - Euro (for Germany)
        "¥": 7.1198,   // CNY - Chinese Yuan (for China)
        "MX$": 19.86,      // MXN - Mexican Peso (for Mexico)
        "£": 0.7709          // GBP - British Pound (for United Kingdom)
    };

    const possibleRatings = {
        1: oneStarRating,
        1.5: onePoint5StarRating,
        2: twoStarRating,
        2.5: twoPoint5StarRating,
        3: threeStarRating,
        3.5: threePoint5StarRating,
        4: fourStarRating,
        4.5: fourPoint5StarRating,
        5: fiveStarRating
    };

    useEffect(() => {
        if(authenticatedUsername.length>0 && allPastSearchesOfUser!==null
        && selectedAddressOfUser!==null && idsOfProductsAvailableToUser!==null) {
            if(div1Products.length==0) {
                fetchProductsForDiv1();
            }
            if(div2Products.length==0) {
                fetchProductsForDiv2();
            }
        }
    }, [authenticatedUsername, allPastSearchesOfUser,
        selectedAddressOfUser, idsOfProductsAvailableToUser]);
    

    useEffect(() => {
        if(deliveryAreaCountry.length>0) {
            if(div1Prices.length>0) {
                updateCurrenciesForDiv1Prices();
            }
            if(div2Prices.length>0) {
                updateCurrenciesForDiv2Prices();
            }
        }
    }, [deliveryAreaCountry, div1Prices, div2Prices]);


    //Getting Available Products for 'Recommended for you based on your history of searches, purchases, and reviews'
    //No products that have already been purchased by the user will be recommended here.
    async function fetchProductsForDiv1() {
        return;
        const response = await fetch(`http://localhost:8028/getProductIdsPurchasedByUser/${authenticatedUsername}`);
        if(!response.ok) {
            throw new Error('Network response not ok');
        }
        let idsOfUserBoughtProducts = await response.json();

        const response2a = await fetch('http://localhost:8022/getProductIdsForCategoriesInPastSearches', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                idsToExclude: idsOfUserBoughtProducts,
                idsToInclude: idsOfProductsAvailableToUser,
                pastSearches: allPastSearchesOfUser
            })
        });
        if(!response2a.ok) {
            throw new Error('Network response not ok');
        }
        const productIdsForCategoriesInPastSearches = await response2a.json();
        /* above is a dict with keys being the category-name and values being
        lists of productIds for that category-name. only names of categories that
        were in the pastSearches argument are included as keys. one of the keys,
        however, is 'nameMatches', and will contain the list of productIds
        whose searchCategory matches and name starts with the searchValue.
        */

        const nameMatches = productIdsForCategoriesInPastSearches['nameMatches'];

        const response2b = await fetch('http://localhost:8025/getProductSearchTagMatches', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                pastSearches: allPastSearchesOfUser,
                productIdsForCategoriesInPastSearches: productIdsForCategoriesInPastSearches
            })
        });
        if(!response2b.ok) {
            throw new Error('Network response not ok');
        }
        const searchTagMatches = await response2b.json();
        /*
        above is a list of productIds of products who have at-least one tag that corresponds
        to a past-search value and past-search category of a past-search made by authUser.
        */

        const response3 = await fetch(`http://localhost:8028/getPurchasesOfUserWithNoOr4PlusRating/${authenticatedUsername}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                idsToInclude: idsOfProductsAvailableToUser,
                idsOfUserBoughtProducts: idsOfUserBoughtProducts
            })
        });
        if(!response3.ok) {
            throw new Error('Network response not ok');
        }
        const idsOfUserBoughtProductsWithNoOr4PlusRating = await response3.json();
        /*
        above is a list of productIds that the customer purchased with either no-rating or a rating >=4
        */

        const response4a = await fetch('http://localhost:8025/getAllPSTsAsDict');
        if(!response4a.ok) {
            throw new Error('Network response not ok');
        }
        const allProductIdToSearchTagMappings = await response4a.json();
        /*
        above is a dict where keys are productIds of very product, and
        values are the list of search tags for the product.
        */

        const response4b = await fetch('http://localhost:8022/findSimilarProducts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            body: JSON.stringify({
                idsToInclude: idsOfProductsAvailableToUser,
                idsToExclude: [...idsOfUserBoughtProducts, ...nameMatches, ...searchTagMatches],
                allProductIdToSearchTagMappings: allProductIdToSearchTagMappings,
                productIds: idsOfUserBoughtProductsWithNoOr4PlusRating
            })}
        });
        if(!response4b.ok) {
            throw new Error('Network response not ok');
        }
        const idsOfSimilarProductsToThoseWithNoOr4PlusRating = await response4b.json();

        const idsOfPotentialNewDiv1Products = [...nameMatches, ...searchTagMatches, ...idsOfSimilarProductsToThoseWithNoOr4PlusRating];

        if(idsOfPotentialNewDiv1Products.length==0) {
            return;
        }

        const response5 = await fetch('http://localhost:8028/avgAndNumRatingsOfProductsInList', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    country: 'all',
                    productIds: idsOfPotentialNewDiv1Products
                })
            });
        if(!response5.ok) {
            throw new Error('Network response not ok');
        }
        const listOfAvgRatingsAndNumRatingsOfProducts = await response5.json();
        const dictOfAvgRatingsAndNumRatingsOfProducts = getDictForAvgAndNumRatingsOfProducts(listOfAvgRatingsAndNumRatingsOfProducts);
        /*
        above is a dict where each key is a productId from idsOfPotentialNewDiv1Products, and each value
        is a list of two elems: the avgRating and numRatings of that product in that order.
        */
        const bayesianAvgRatings = getBayesianAverageRatings(listOfAvgRatingsAndNumRatingsOfProducts);
        /*
        above is a dict where each key is a productId from idsOfPotentialNewDiv1Products, and value is bayesian avg rating of product.
        one of the keys, however, one of the keys is the avgBayesianAvgRatingOfAllProducts, which will be used for those
        products who have no ratings
        */

        const response6 = await fetch('http://localhost:8029/getFastestDeliveryTimesForProducts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                hasPremium: hasPremium,
                address: selectedAddressOfUser,
                productIds: idsOfPotentialNewDiv1Products
            })
        });
        if(!response6.ok){
            throw new Error('Network response not ok');
        }
        const deliveryTimesOfPotentialDiv1Products = await response6.json();
        /*
        above is a dict where keys are productIds in idsOfPotentialNewDiv1Products, whereas values are the fastest
        delivery times of these products in hours.
        */

        const response7 = await fetch('http://localhost:8030/checkIfDealsAreAvailableForProducts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                productIds: idsOfPotentialNewDiv1Products,
                hasPremium: hasPremium
            })
        });
        if(!response7.ok) {
            throw new Error('Network response not ok');
        }
        const productIdToDealAvailableMappings = await response7.json();
        /*
        above is a dict where the keys are productIds in idsOfPotentialNewDiv1Products, whereas values
        are booleans: true if product has deal available, false otherwise
        */

        const response8 = await fetch('http://localhost:8032/api/checkForMegagramProductChoicesAndGetNumViewsInPastMonth', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                productIds: idsOfPotentialNewDiv1Products
            })
        });
        if(!response8.ok) {
            throw new Error('Network response not ok');
        }
        const productIdToProductChoiceAndNumViewsInPastMonthMappings = await response8.json();
        /*
        above is a dict where the keys are productIds in idsOfPotentialNewDiv1Products, whereas values
        are lists with two elems: the first being a string of the choiceCategory of the product if it is a Megagram-Product-Choice, null
        otherwise. the second one is an integer representing the number of views the product-page has received
        in the past month
        */
    
        let scoresOfPotentialNewDiv1Products = [];
        for(let productId of idsOfPotentialNewDiv1Products) {
            const productInfo = {
                bayesianAvgRating: bayesianAvgRatings[productId] ?? bayesianAvgRatings['avgBayesianAvgRatingAcrossAllProducts'],
                megagramsChoice: productIdToProductChoiceAndNumViewsInPastMonthMappings[productId][0]!==null,
                numViewersInPastMonth: productIdToProductChoiceAndNumViewsInPastMonthMappings[productId][1],
                fastestDeliveryTimeInHours: deliveryTimesOfPotentialDiv1Products[productId],
                discountsAvailable: productIdToDealAvailableMappings[productId]
            };
            const scoreOfProduct = computeScoreForProduct(productInfo); //the higher the score, the more left it will be placed in div1.
            //the products whose scores are in the top 24 will be selected in div1Products
            scoresOfPotentialNewDiv1Products.push({
                id: productId,
                score: scoreOfProduct
            });
        }

        scoresOfPotentialNewDiv1Products.sort((a,b) => b.score - a.score);
        scoresOfPotentialNewDiv1Products = scoresOfPotentialNewDiv1Products.slice(0, 24);
    
        const newDiv1Products = scoresOfPotentialNewDiv1Products.map(x=>x.id);
        const numberOfNewDiv1Products = newDiv1Products.length;
        if(numberOfNewDiv1Products%6==0) {
            setMaxPageInDiv1(numberOfNewDiv1Products/6);
        }
        else {
            setMaxPageInDiv1(Math.floor(numberOfNewDiv1Products/6)+1);
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

        const newDiv1Prices = [];
        for(let i=0; i<newDiv1Products.length; i++) {
            const currProductId = newDiv1Products[i];
            const currProductName = dictOfNamesAndPricesOfNewDiv1Products[currProductId][0];
            newDiv1Products[i] = {
                id: currProductId,
                name: currProductName.length<65 ? currProductName : currProductName.substring(0, 65)+"...",
                avgRating: currProductId in dictOfAvgRatingsAndNumRatingsOfProducts ? dictOfAvgRatingsAndNumRatingsOfProducts[currProductId][0] : 0,
                numRatings: currProductId in dictOfAvgRatingsAndNumRatingsOfProducts ? dictOfAvgRatingsAndNumRatingsOfProducts[currProductId][1] : 0,
                imageSrc: `data:image/jpeg;base64,${mainImagesOfProducts[currProductId]}`,
                megagramsChoice: productIdToProductChoiceAndNumViewsInPastMonthMappings[currProductId][0],
                numViewersInPastMonth: productIdToProductChoiceAndNumViewsInPastMonthMappings[currProductId][1],
                getItAsSoonAs: formatDeliveryArrivalText(deliveryTimesOfPotentialDiv1Products[currProductId]),
                discountsAvailable: productIdToDealAvailableMappings[currProductId]
            };

            newDiv1Prices.push(dictOfNamesAndPricesOfNewDiv1Products[currProductId].slice(1));
        }

        setDiv1Prices(newDiv1Prices);
        setDiv1Products(newDiv1Products);
    }


    //Getting Available Products for 'Customers who bought items in your purchasing history also bought'
    //No products that have already been purchased by the user will be recommended here.
    async function fetchProductsForDiv2() {
        return;
        const response = await fetch(`http://localhost:8028/getProductIdsPurchasedByUser/${authenticatedUsername}`);
        if(!response.ok) {
            throw new Error('Network response not ok');
        }
        let idsOfUserBoughtProducts = await response.json();
        
        const response1 = await fetch(`http://localhost:8028/getIdsOfProductsBoughtByCustomersWhoAlsoBought/${authenticatedUsername}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                productIds: idsOfUserBoughtProducts,
                idsToInclude: idsOfProductsAvailableToUser
            })
        });
        if(!response1.ok) {
            throw new Error('Network response not ok');
        }
        let idsOfPotentialNewDiv2Products = await response1.json();

        const response2 = await fetch('http://localhost:8028/avgAndNumRatingsOfProductsInList', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    country: 'all',
                    productIds: idsOfPotentialNewDiv2Products
                })
            });
        if(!response2.ok) {
            throw new Error('Network response not ok');
        }
        const listOfAvgRatingsAndNumRatingsOfProducts = await response2.json();
        const dictOfAvgRatingsAndNumRatingsOfProducts = getDictForAvgAndNumRatingsOfProducts(listOfAvgRatingsAndNumRatingsOfProducts);
        /*
        above is a dict where each key is a productId from idsOfPotentialNewDiv2Products, and each value
        is a list of two elements: the avgRating and numRatings of that product in that order.
        */
        const bayesianAvgRatings = getBayesianAverageRatings(listOfAvgRatingsAndNumRatingsOfProducts);
        /*
        above is a dict where each key is a productId from idsOfPotentialNewDiv2Products, and value is bayesian avg rating of product.
        one of the keys, however, one of the keys is the avgBayesianAvgRatingOfAllProducts, which will be used for those
        products who have no ratings
        */

        const response3 = await fetch('http://localhost:8029/getFastestDeliveryTimesForProducts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                hasPremium: hasPremium,
                address: selectedAddressOfUser,
                productIds: idsOfPotentialNewDiv2Products
            })
        });
        if(!response3.ok){
            throw new Error('Network response not ok');
        }
        const deliveryTimesOfPotentialDiv2Products = await response3.json();
        /*
        above is a dict where keys are productIds in idsOfPotentialNewDiv2Products, whereas values are the fastest
        delivery times of these products in hours.
        */

        const response4 = await fetch('http://localhost:8030/checkIfDealsAreAvailableForProducts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                productIds: idsOfPotentialNewDiv2Products,
                hasPremium: hasPremium
            })
        });
        if(!response4.ok) {
            throw new Error('Network response not ok');
        }
        const productIdToDealAvailableMappings = await response4.json();
        /*
        above is a dict where the keys are productIds in idsOfPotentialNewDiv2Products, whereas values
        are booleans: true if product has deal available, false otherwise
        */

        const response5 = await fetch('http://localhost:8032/api/checkForMegagramProductChoicesAndGetNumViewsInPastMonth', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                productIds: idsOfPotentialNewDiv2Products
            })
        });
        if(!response5.ok) {
            throw new Error('Network response not ok');
        }
        const productIdToProductChoiceAndNumViewsInPastMonthMappings = await response5.json();
        /*
        above is a dict where the keys are productIds in idsOfPotentialNewDiv2Products, whereas values
        are lists with two elements: the first being a string of the choiceCategory of the product if it is a Megagram-Product-Choice, null
        otherwise. the second one is an integer representing the number of views the product-page has received
        in the past month
        */
    
        let scoresOfPotentialNewDiv2Products = [];
        for(let productId of idsOfPotentialNewDiv2Products) {
            const productInfo = {
                bayesianAvgRating: bayesianAvgRatings[productId] ?? bayesianAvgRatings['avgBayesianAvgRatingAcrossAllProducts'],
                megagramsChoice: productIdToProductChoiceAndNumViewsInPastMonthMappings[productId][0]!==null,
                numViewersInPastMonth: productIdToProductChoiceAndNumViewsInPastMonthMappings[productId][1],
                fastestDeliveryTimeInHours: deliveryTimesOfPotentialDiv2Products[productId],
                discountsAvailable: productIdToDealAvailableMappings[productId]
            };
            const scoreOfProduct = computeScoreForProduct(productInfo); //the higher the score, the more left it will be placed in div1.
            //the products whose scores are in the top 24 will be selected in div1Products
            scoresOfPotentialNewDiv2Products.push({
                id: productId,
                score: scoreOfProduct
            });
        }

        scoresOfPotentialNewDiv2Products.sort((a,b) => b.score - a.score);
        scoresOfPotentialNewDiv2Products = scoresOfPotentialNewDiv2Products.slice(0, 24);

        const newDiv2Products = scoresOfPotentialNewDiv2Products.map(x=>x.id);
        const numberOfNewDiv2Products = newDiv2Products.length;
        if(numberOfNewDiv2Products%6==0) {
            setMaxPageInDiv2(numberOfNewDiv2Products/6);
        }
        else {
            setMaxPageInDiv2(Math.floor(numberOfNewDiv2Products/6)+1);
        }

        const response9 = await fetch('http://localhost:8022/getNamesAndPricesOfListOfProducts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                productIds: newDiv2Products
            })
        });
        if(!response9.ok) {
            throw new Error('Network response not ok');
        }
        const dictOfNamesAndPricesOfNewDiv2Products = await response9.json();
        /*
        above is a dict where keys are productIds in newDiv2Products and
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
            body: JSON.stringify(newDiv2Products)
        });
        if(!response10.ok) {
            throw new Error('Network response not ok');
        }
        const mainImagesOfProducts = await response10.json();
        /*
        above is a dict where each key is productId and each value is the
        fetched base-64-string of the main photo of product
        */

        const newDiv2Prices = [];
        for(let i=0; i<newDiv2Products.length; i++) {
            const currProductId = newDiv2Products[i];
            const currProductName = dictOfNamesAndPricesOfNewDiv2Products[currProductId][0];
            newDiv2Products[i] = {
                id: currProductId,
                name: currProductName.length<65 ? currProductName : currProductName.substring(0, 65)+"...",
                avgRating: currProductId in dictOfAvgRatingsAndNumRatingsOfProducts ? dictOfAvgRatingsAndNumRatingsOfProducts[currProductId][0] : 0,
                numRatings: currProductId in dictOfAvgRatingsAndNumRatingsOfProducts ? dictOfAvgRatingsAndNumRatingsOfProducts[currProductId][1] : 0,
                imageSrc: `data:image/jpeg;base64,${mainImagesOfProducts[currProductId]}`,
                megagramsChoice: productIdToProductChoiceAndNumViewsInPastMonthMappings[currProductId][0],
                numViewersInPastMonth: productIdToProductChoiceAndNumViewsInPastMonthMappings[currProductId][1],
                getItAsSoonAs: formatDeliveryArrivalText(deliveryTimesOfPotentialDiv2Products[currProductId]),
                discountsAvailable: productIdToDealAvailableMappings[currProductId]
            };

            newDiv2Prices.push(dictOfNamesAndPricesOfNewDiv2Products[currProductId].slice(1));
        }
        setDiv2Prices(newDiv2Prices);
        setDiv2Products(newDiv2Products);
    }

    function formatDeliveryArrivalText(numHours) {
        const now = new Date();
        const deliveryDate = new Date(now.getTime() + numHours * 60 * 60 * 1000);
    
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    
        if (deliveryDate.toDateString() === now.toDateString()) {
            return "Today";
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
    }
    

    function getDictForAvgAndNumRatingsOfProducts(listOfAvgRatingsAndNumRatingsOfProducts) {
        const output = {};
        for (let productRatingInfo of listOfAvgRatingsAndNumRatingsOfProducts) {
            output[productRatingInfo.product_id] = [productRatingInfo.avgRating, productRatingInfo.numRatings];
        }
        return output;
    }

    function getBayesianAverageRatings(listOfAvgRatingsAndNumRatingsOfProducts) {
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

    function computeScoreForProduct(productInfo) {
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
    }

    function getStarsForRating(ratingValue) {
        const decimalPartOfRating = ratingValue%1;
        const integerPartOfRating = ratingValue-decimalPartOfRating;

        if(decimalPartOfRating==0 || decimalPartOfRating<0.25) {
            return possibleRatings[integerPartOfRating];
        }
        else {
            if(decimalPartOfRating<0.5 || decimalPartOfRating<0.75) {
                return possibleRatings[integerPartOfRating+0.5];
            }
            else {
                return possibleRatings[integerPartOfRating+1];
            }
        }
    }

    function goToNextPageInDiv1() {
        if(currPageInDiv1==maxPageInDiv1) {
            setCurrPageInDiv1(1);
        }
        else {
            setCurrPageInDiv1(currPageInDiv1+1);
        }
    }

    function goToPreviousPageInDiv1() {
        if(currPageInDiv1==1) {
            setCurrPageInDiv1(maxPageInDiv1);
        }
        else {
            setCurrPageInDiv1(currPageInDiv1-1);
        }
    }

    function goToNextPageInDiv2() {
        if(currPageInDiv2==maxPageInDiv2) {
            setCurrPageInDiv2(1);
        }
        else {
            setCurrPageInDiv2(currPageInDiv2+1);
        }
    }

    function goToPreviousPageInDiv2() {
        if(currPageInDiv2==1) {
            setCurrPageInDiv2(maxPageInDiv2);
        }
        else {
            setCurrPageInDiv2(currPageInDiv2-1);
        }
    }

    function updateCurrenciesForDiv1Prices() {
        let currCurrency = "";
        currCurrency = div1Prices[0][0][0];
        
        if(currCurrency==="M"||currCurrency==="A"||currCurrency==="C") {
            currCurrency+="$";
        }
        const newCurrency = countryCurrencyMap[deliveryAreaCountry];

        if(currCurrency===newCurrency) {
            return;
        }

        const newDiv1Prices = [...div1Prices];
        for(let i=0; i<newDiv1Prices.length; i++) {
            for(let j=0; j<newDiv1Prices[i].length; j++) {
                let price = Number(newDiv1Prices[i][j].substring(currCurrency.length));
                price = price/currencyToDollarMap[currCurrency]; //convert from currCurrency to USD
                price = price*currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                newDiv1Prices[i][j]=`${newCurrency}${price.toFixed(2)}`;
            }
        }
        setDiv1Prices(newDiv1Prices);
    }

    function updateCurrenciesForDiv2Prices() {
        let currCurrency = "";
        currCurrency = div2Prices[0][0][0];
        
        if(currCurrency==="M"||currCurrency==="A"||currCurrency==="C") {
            currCurrency+="$";
        }
        const newCurrency = countryCurrencyMap[deliveryAreaCountry];

        if(currCurrency===newCurrency) {
            return;
        }

        const newDiv2Prices = [...div2Prices];
        for(let i=0; i<newDiv2Prices.length; i++) {
            for(let j=0; j<newDiv2Prices[i].length; j++) {
                let price = Number(newDiv2Prices[i][j].substring(currCurrency.length));
                price = price/currencyToDollarMap[currCurrency];
                price = price*currencyToDollarMap[newCurrency];
                newDiv2Prices[i][j]=`${newCurrency}${price.toFixed(2)}`;
            }
        }
        setDiv2Prices(newDiv2Prices);
    }


    return (
        <>
            <div id="similarCustomerProductsSection" style={{width: '100%', height: '62em', backgroundColor: 'white', marginTop: '2.5em', display: 'flex',
            flexDirection: 'column', padding: '1em 2em'}}>

                <div id="div1" style={{width: '100%', borderStyle: 'solid', borderLeft: 'none', borderRight: 'none', borderColor: 'lightgray', height: '50%',
                borderWidth:'0.07em', display: 'flex', flexDirection: 'column', padding: '0.5em 1em'}}>
                    
                
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '96.5%'}}>
                        <b style={{marginLeft: '4em'}}>Recommended for you based on your history of searches, purchases, and reviews</b>
                        <small>{`Page ${currPageInDiv1} of ${maxPageInDiv1}`}</small>
                    </div>
                    

                    <div style={{display: 'flex', alignItems: 'center', height: '80%', width: '98%', gap: '0.5em', justifyContent: 'space-between', marginTop: '-1.2em'}}>

                        {maxPageInDiv1>1 &&
                            <div onClick={goToPreviousPageInDiv1} style={{backgroundColor: 'white', height: '2em', width: '2em', borderRadius: '0.75em',
                            cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderWidth: '0.03em'}}>
                                <img src={leftArrow} style={{height: '1.2em', width: '1.2em'}}></img>
                            </div>
                        }

                        {div1Products.slice(currPageInDiv1*6-6, 6*currPageInDiv1).map((product, index)=> {
                            const correspondingDiv1Prices = div1Prices.slice(currPageInDiv1*6-6, 6*currPageInDiv1);
                            return (
                                <div key={index} style={{height: '23em', width: '13.67%', display: 'flex',
                                flexDirection: 'column', alignItems: 'start', marginTop: '3em', paddingLeft: '3em'}}>
                                    <img onClick={() => window.location.href=`http://localhost:8024/shoppingProductPage/${product.id}`} src={product.imageSrc} style={{height: '9em', width: '9em', cursor: 'pointer', objectFit: 'contain'}}>
                                    </img>
                                    <p onClick={() => window.location.href=`http://localhost:8024/shoppingProductPage/${product.id}`} style={{fontSize: '0.8em', maxWidth: '70%', color: '#1c78a3', cursor: 'pointer'}}>
                                        {product.name}
                                    </p>
                                    {product.numRatings>0 &&
                                        <div onClick={()=>window.location.href=`http://localhost:8024/shoppingProductReviews/${product.id}`} style={{display: 'flex', alignItems: 'center', cursor: 'pointer', marginTop:'-1em'}}>
                                            <img src={getStarsForRating(product.avgRating)} style={{height: '1.6em', width: '6em', objectFit: 'contain'}}></img>
                                            <p style={{fontSize: '0.8em', color: '#1c78a3'}}>{product.numRatings}</p>
                                        </div>
                                    }
                                    <p style={{fontSize: '0.75em', marginTop: '-0.1em'}}>{product.numViewersInPastMonth} viewed in past month</p>
                                    {product.megagramsChoice!==null &&
                                        <p style={{maxWidth: '75%', lineHeight: '1.25', marginTop: '-0.1em'}}>
                                            <span style={{color: 'white', backgroundColor: 'navy', padding: '0.1em 0.5em'}}>Megagram's Choice</span> in <a href={`http://localhost:8024/${categoryToPagePathSegmentMappings[product.megagramsChoice]}`} style={{color: '#1c78a3', cursor: 'pointer', textDecoration: 'none'}}>{product.megagramsChoice}</a>
                                        </p>
                                    }
                                    <p style={{marginTop: '-0.5em'}}> {correspondingDiv1Prices.length>index && <b>{correspondingDiv1Prices[index][0]}</b>} {correspondingDiv1Prices.length>index && correspondingDiv1Prices[index].length>1 &&
                                        <small>({correspondingDiv1Prices[index][1]}/{correspondingDiv1Prices[index][2]})</small>
                                        }
                                    </p>
                                    <div style={{fontSize: '0.8em', maxWidth: '75%', marginTop: '-0.3em'}}>
                                        {hasPremium &&
                                            <div style={{display: 'flex', alignItems: 'end', gap: '0.2em', marginBottom: '-0.8em'}}>
                                                <img src={checkmark} style={{pointerEvents: 'none', height: '1.1em', width: '1.1em'}}></img>
                                                <b style={{color: '#5693f5', fontSize: '0.88em'}}>premium</b>
                                            </div>
                                        }
                                        <p>Get it as soon as <b>{product.getItAsSoonAs}</b></p>
                                    </div>
                                    {product.discountsAvailable &&
                                        <b style={{color: 'white', backgroundColor: '#b52d34', padding: '0.5em 1em', marginTop: '0em', fontSize: '0.77em'}}>
                                            Deals available
                                        </b>
                                    }
                                </div>
                            )
                        })
                        }

                        {maxPageInDiv1>1 &&
                            <div onClick={goToNextPageInDiv1} style={{backgroundColor: 'white', height: '2em', width: '2em', borderRadius: '0.75em',
                            cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderWidth: '0.03em'}}>
                                <img src={leftArrow} style={{height: '1.2em', width: '1.2em', transform: 'scaleX(-1)'}}></img>
                            </div>
                        }

                    </div>
                </div>

                <div id="div2" style={{width: '100%', borderStyle: 'solid', borderLeft: 'none', borderRight: 'none', borderColor: 'lightgray', height: '50%',
                borderWidth:'0.07em', display: 'flex', flexDirection: 'column', padding: '0.5em 1em'}}>

                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '96.5%'}}>
                        <b style={{marginLeft: '4em'}}>Customers who bought items in your purchasing history also bought</b>
                        <small>{`Page ${currPageInDiv2} of ${maxPageInDiv2}`}</small>
                    </div>

                    <div style={{display: 'flex', alignItems: 'center', height: '80%', width: '98%', gap: '0.5em', justifyContent: 'space-between', marginTop: '-1.2em'}}>

                        {maxPageInDiv2>1 &&
                            <div onClick={goToPreviousPageInDiv2} style={{backgroundColor: 'white', height: '2em', width: '2em', borderRadius: '0.75em',
                            cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderWidth: '0.03em'}}>
                                <img src={leftArrow} style={{height: '1.2em', width: '1.2em'}}></img>
                            </div>
                        }

                        {div2Products.slice(currPageInDiv2*6-6, 6*currPageInDiv2).map((product, index)=> {
                            const correspondingDiv2Prices = div2Prices.slice(currPageInDiv2*6-6, 6*currPageInDiv2);
                            return (
                                <div key={index} style={{height: '23em', width: '13.67%', display: 'flex',
                                flexDirection: 'column', alignItems: 'start', marginTop: '3em', paddingLeft: '3em'}}>
                                    <img onClick={() => window.location.href=`http://localhost:8024/shoppingProductPage/${product.id}`} src={product.imageSrc} style={{height: '9em', width: '9em', cursor: 'pointer', objectFit: 'contain'}}>
                                    </img>
                                    <p onClick={() => window.location.href=`http://localhost:8024/shoppingProductPage/${product.id}`} style={{fontSize: '0.8em', maxWidth: '70%', color: '#1c78a3', cursor: 'pointer'}}>
                                        {product.name}
                                    </p>
                                    {product.numRatings>0 &&
                                        <div onClick={()=>window.location.href=`http://localhost:8024/shoppingProductReviews/${product.id}`} style={{display: 'flex', alignItems: 'center', cursor: 'pointer', marginTop:'-1em'}}>
                                            <img src={getStarsForRating(product.avgRating)} style={{height: '1.6em', width: '6em', objectFit: 'contain'}}></img>
                                            <p style={{fontSize: '0.8em', color: '#1c78a3'}}>{product.numRatings}</p>
                                        </div>
                                    }
                                    <p style={{fontSize: '0.75em', marginTop: '-0.1em'}}>{product.numViewersInPastMonth} viewed in past month</p>
                                    {product.megagramsChoice!==null &&
                                        <p style={{maxWidth: '75%', lineHeight: '1.25', marginTop: '-0.1em'}}>
                                            <span style={{color: 'white', backgroundColor: 'navy', padding: '0.1em 0.5em'}}>Megagram's Choice</span> in <a href={`http://localhost:8024/${categoryToPagePathSegmentMappings[product.megagramsChoice]}`} style={{color: '#1c78a3', cursor: 'pointer', textDecoration: 'none'}}>{product.megagramsChoice}</a>
                                        </p>
                                    }
                                    <p style={{marginTop: '-0.5em'}}> {correspondingDiv2Prices.length>index && <b>{correspondingDiv2Prices[index][0]}</b>} {correspondingDiv2Prices.length>index && correspondingDiv2Prices[index].length>1 &&
                                        <small>({correspondingDiv2Prices[index][1]}/{correspondingDiv2Prices[index][2]})</small>
                                        }
                                    </p>
                                    <div style={{fontSize: '0.8em', maxWidth: '75%', marginTop: '-0.3em'}}>
                                        {hasPremium &&
                                            <div style={{display: 'flex', alignItems: 'end', gap: '0.2em', marginBottom: '-0.8em'}}>
                                                <img src={checkmark} style={{pointerEvents: 'none', height: '1.1em', width: '1.1em'}}></img>
                                                <b style={{color: '#5693f5', fontSize: '0.88em'}}>premium</b>
                                            </div>
                                        }
                                        <p>Get it as soon as <b>{product.getItAsSoonAs}</b></p>
                                    </div>
                                    {product.discountsAvailable &&
                                        <b style={{color: 'white', backgroundColor: '#b52d34', padding: '0.5em 1em', marginTop: '0em', fontSize: '0.77em'}}>
                                            Deals available
                                        </b>
                                    }
                                </div>
                            )
                        })
                        }

                        {maxPageInDiv2>1 &&
                            <div onClick={goToNextPageInDiv2} style={{backgroundColor: 'white', height: '2em', width: '2em', borderRadius: '0.75em',
                            cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderWidth: '0.03em'}}>
                                <img src={leftArrow} style={{height: '1.2em', width: '1.2em', transform: 'scaleX(-1)'}}></img>
                            </div>
                        }

                    </div>

                </div>

            


            </div>
        </>
    )
}

export default SimilarCustomerProductsSection;