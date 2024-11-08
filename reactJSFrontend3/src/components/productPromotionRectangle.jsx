import React, { useEffect, useRef, useState } from 'react';
import leftArrow from '../assets/leftArrow.png';

function ProductPromotionRectangle({title, idsOfProductsAvailableToUser, deliveryCountry}) {
    const [isUserHoveringOnThis, setIsUserHoveringOnThis] = useState(false);
    const [canGoLeft, setCanGoLeft] = useState(false);
    const [canGoRight, setCanGoRight] = useState(true);
    const scrollableDivRef = useRef(null);
    const [promotedProducts, setPromotedProducts] = useState([]);
    
    useEffect(() => {
        fetchTheProductsToPromote(title);
    }, [idsOfProductsAvailableToUser, deliveryCountry]);


    async function fetchTheProductsToPromote(title) {
        return;
        if(idsOfProductsAvailableToUser==null || deliveryCountry.length==0) {
            return;
        }

        let numProductSales = [];
        let listOfAvgRatingsAndNumRatingsOfProducts = [];

        if(title==='International Bestsellers in Sports & Outdoors Available for Your Location') {
            const response2c = await fetch('http://localhost:8022/getIdsOfProductsOfCategoryFromProductIds', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    category: 'Sports & Outdoors',
                    productIds: idsOfProductsAvailableToUser
                })
            });
            if(!response2c.ok) {
                throw new Error('Network response not ok');
            }
            idsOfProductsAvailableToUser = await response2c.json();
        }
        else if(title==='International Bestsellers in Books Available for Your Location') {
            const response2c = await fetch('http://localhost:8022/getIdsOfProductsOfCategoryFromProductIds', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    category: 'Books',
                    productIds: idsOfProductsAvailableToUser
                })
            });
            if(!response2c.ok) {
                throw new Error('Network response not ok');
            }
            idsOfProductsAvailableToUser = await response2c.json();
            
        }
        else if(title==='International Bestsellers in Food Available for Your Location') {
            const response2c = await fetch('http://localhost:8022/getIdsOfProductsOfCategoryFromProductIds', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    category: 'Food',
                    productIds: idsOfProductsAvailableToUser
                })
            });
            if(!response2c.ok) {
                throw new Error('Network response not ok');
            }
            idsOfProductsAvailableToUser = await response2c.json();
        }

        if(title.startsWith('International')) {
            const response3 = await fetch('http://localhost:8028/numSalesOfProductsInList', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    country: 'all',
                    productIds: idsOfProductsAvailableToUser
                })
            });
            if(!response3.ok) {
                throw new Error('Network response not ok');
            }
            numProductSales = await response3.json(); //list of mappings between productId and numSold

            const response4 = await fetch('http://localhost:8028/avgAndNumRatingsOfProductsInList', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    country: 'all',
                    productIds: idsOfProductsAvailableToUser
                })
            });
            if(!response4.ok) {
                throw new Error('Network response not ok');
            }
            listOfAvgRatingsAndNumRatingsOfProducts = await response4.json();
            
        }

        else if(title===`Bestsellers in ${deliveryCountry} Available for Your Location`) {
            const response3 = await fetch('http://localhost:8028/numSalesOfProductsInList', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    country: deliveryCountry,
                    productIds: idsOfProductsAvailableToUser
                })
            });
            if(!response3.ok) {
                throw new Error('Network response not ok');
            }
            numProductSales = await response3.json(); //list of mappings between productId and numSold ordered by numSold DESC

            const response4 = await fetch('http://localhost:8028/avgAndNumRatingsOfProductsInList', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    country: deliveryCountry,
                    productIds: idsOfProductsAvailableToUser
                })
            });
            if(!response4.ok) {
                throw new Error('Network response not ok');
            }
            listOfAvgRatingsAndNumRatingsOfProducts = await response4.json();
        }
        let bayesianAvgRatings = getBayesianAverageRatings(listOfAvgRatingsAndNumRatingsOfProducts);
        /*bayesianAvgRatings is a dict where each key is productId and value is bayesian avg rating of product.
        one of the keys, however, one of the keys is the avgBayesianAvgRatingOfAllProducts, which will be used for those
        products who have no ratings
        */
    
        let productsToPromote = [];
        for(let productNumSalesInfo of numProductSales) {
            if(productNumSalesInfo.productId in bayesianAvgRatings) {
                productsToPromote.push({
                    productId: productNumSalesInfo.productId,
                    bestsellerScore: productNumSalesInfo.numSold * bayesianAvgRatings[productNumSalesInfo.productId]
                });
            }
            else {
                productsToPromote.push({
                    productId: productNumSalesInfo.productId,
                    bestsellerScore: productNumSalesInfo.numSold * bayesianAvgRatings['avgBayesianAvgRatingOfAllProducts']
                });
            }
        }
        productsToPromote = productsToPromote.sort((a,b) => b.bestsellerScore-a.bestsellerScore);
        productsToPromote = productsToPromote.slice(0, 6);
        let idsOfProductsToPromote = productsToPromote.map(x=>x.productId);

        const response5 = await fetch('http://localhost:8031/getMainProductImagesOfProducts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(idsOfProductsToPromote)
        });
        if(!response5.ok) {
            throw new Error('Network response not ok');
        }
        const mainImagesOfProducts = await response5.json(); //dict where each key is productId and each value is the fetched base-64-string of the main photo of product
        productsToPromote = productsToPromote.map(x=>{
            return {
                imageSrc: `data:image/jpeg;base64,${mainImagesOfProducts[x.productId]}`,
                link: `http://localhost:8024/shoppingProductPage/${x.productId}`
            };
        });
        
        setPromotedProducts(productsToPromote);
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

    function setIsUserHoveringOnThisToTrue() {
        setIsUserHoveringOnThis(true);
    }


    function setIsUserHoveringOnThisToFalse() {
        setIsUserHoveringOnThis(false);
    }

    function goLeft() {
        scrollableDivRef.current.scrollBy({
            left: -1330,
            behavior: 'smooth',
        });
    }

    function goRight() {
        scrollableDivRef.current.scrollBy({
            left: 1330,
            behavior: 'smooth',
        });
    }

    function onScrollingScrollableDiv() {
        const { scrollLeft, scrollWidth, clientWidth } = scrollableDivRef.current;
        if(scrollLeft==0) {
            setCanGoLeft(false);
        }
        else {
            setCanGoLeft(true);
        }
        if (scrollLeft + clientWidth >= scrollWidth) {
            setCanGoRight(false);
        }
        else {
            setCanGoRight(true);
        }
    }


    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', backgroundColor: 'white', width: '85em', height: '17.5em',
            padding: '0.1em 0.8em', marginTop: '-5em', position: 'relative'}}>
                <h4>{title}</h4>

                {isUserHoveringOnThis &&
                    <div onClick={goLeft} onMouseEnter={setIsUserHoveringOnThisToTrue} onMouseLeave={setIsUserHoveringOnThisToFalse} style={{position: 'absolute', top: '40%', left: '0%', backgroundColor: 'white', height: '4em', width: '2em', display: 'flex',
                    justifyContent: 'center', alignItems: 'center', cursor: 'pointer', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', opacity: canGoLeft ? '1' : '0.65'}}>
                        <img src={leftArrow} style={{height: '1.5em', width: '1.5em'}}></img>
                    </div>
                }

                {isUserHoveringOnThis &&
                    <div onClick={goRight} onMouseEnter={setIsUserHoveringOnThisToTrue} onMouseLeave={setIsUserHoveringOnThisToFalse} style={{position: 'absolute', top: '40%', left: '97.7%', backgroundColor: 'white', height: '4em', width: '2em', display: 'flex',
                    justifyContent: 'center', alignItems: 'center', cursor: 'pointer', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', opacity: canGoRight ? '1' : '0.65'}}>
                        <img src={leftArrow} style={{height: '1.5em', width: '1.5em', transform: 'scaleX(-1)'}}></img>
                    </div>
                }

                <div ref={scrollableDivRef} onScroll={onScrollingScrollableDiv} onMouseEnter={setIsUserHoveringOnThisToTrue} onMouseLeave={setIsUserHoveringOnThisToFalse} style={{display: 'flex', alignItems: 'center', height: '65%', width: '100%', overflowX: 'scroll'}}>
                    {promotedProducts.map((promotedProductInfo, index) => {
                        return (
                            <img key={index} onClick={() => window.location.href = promotedProductInfo.link} src={promotedProductInfo.imageSrc} style={{height: '100%', width: '16.67%', cursor: 'pointer'}}></img>
                        );
                        })
                    }
                </div>
            </div>
            
        </>
    )
}
export default ProductPromotionRectangle;