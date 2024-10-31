import { useEffect, useState } from 'react';
import fourStarReview from '../assets/4StarReview.png';
import macAndCheeseCheetos from '../assets/cheetosMac&Cheese.jpg';
import leftArrow from '../assets/leftArrow.png';

function SimilarCustomerProductsSection({deliveryAreaCountry}) {
    const [currPageInDiv1, setCurrPageInDiv1] = useState(1);
    const [currPageInDiv2, setCurrPageInDiv2] = useState(1);
    const [div1Prices, setDiv1Prices] = useState([['$5.52', '$0.59'], ['$6.52', '$0.59'], ['$8.52', '$0.59'], ['$2.52', '$0.59'], ['$1.52', '$0.59'], ['$0.52', '$0.05']]);
    const [div2Prices, setDiv2Prices] = useState([['$12', '$3.75'], ['$16.52', '$0.59'], ['$28.52', '$0.59'], ['$2.52', '$0.12'], ['$0.90', '$0.59'], ['$8.18', '$0.85']]);

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
        "¥ (CNY)": 7.1198,   // CNY - Chinese Yuan (for China)
        "MX$": 19.86,      // MXN - Mexican Peso (for Mexico)
        "£": 0.7709          // GBP - British Pound (for United Kingdom)
    };
    

    useEffect(() => {
        updateCurrencies();
    }, [deliveryAreaCountry]);


    function goToNextPageInDiv1() {
        if(currPageInDiv1==4) {
            setCurrPageInDiv1(1);
        }
        else {
            setCurrPageInDiv1(currPageInDiv1+1);
        }
    }

    function goToPreviousPageInDiv1() {
        if(currPageInDiv1==1) {
            setCurrPageInDiv1(4);
        }
        else {
            setCurrPageInDiv1(currPageInDiv1-1);
        }
    }

    function goToNextPageInDiv2() {
        if(currPageInDiv2==4) {
            setCurrPageInDiv2(1);
        }
        else {
            setCurrPageInDiv2(currPageInDiv2+1);
        }
    }

    function goToPreviousPageInDiv2() {
        if(currPageInDiv2==1) {
            setCurrPageInDiv2(4);
        }
        else {
            setCurrPageInDiv2(currPageInDiv2-1);
        }
    }

    function updateCurrencies() {
        let currCurrency = "";
        if(div1Prices.length>0) {
            currCurrency = div1Prices[0][0][0];
        }
        else if(div2Prices.length>0) {
            currCurrency = div2Prices[0][0][0];
        }
        else {
            return;
        }
        if(currCurrency==="M"||currCurrency==="A"||currCurrency==="C") {
            currCurrency+="$";
        }
        const newCurrency = countryCurrencyMap[deliveryAreaCountry];

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

        //same code as above but for div2Prices instead of div1Prices
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
            <div style={{width: '100%', height: '56em', backgroundColor: 'white', marginTop: '2.5em', display: 'flex',
            flexDirection: 'column', padding: '1em 2em'}}>

                <div id="div1" style={{width: '100%', borderStyle: 'solid', borderLeft: 'none', borderRight: 'none', borderColor: 'lightgray', height: '47%',
                borderWidth:'0.07em', display: 'flex', flexDirection: 'column', padding: '0.5em 1em'}}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '96.5%'}}>
                        <b style={{marginLeft: '4em'}}>Recommended for you based on your history of searches, purchases, and reviews</b>
                        <small>{`Page ${currPageInDiv1} of 4`}</small>
                    </div>

                    <div style={{display: 'flex', alignItems: 'center', height: '80%', width: '98%', gap: '0.5em', justifyContent: 'space-between'}}>

                        <div onClick={goToPreviousPageInDiv1} style={{backgroundColor: 'white', height: '2em', width: '2em', borderRadius: '0.75em',
                        cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderWidth: '0.03em'}}>
                            <img src={leftArrow} style={{height: '1.2em', width: '1.2em'}}></img>
                        </div>

                        <div style={{height: '23em', width: '13.67%', display: 'flex',
                        flexDirection: 'column', alignItems: 'start', marginTop: '5em', paddingLeft: '3em'}}>
                            <img onClick={() => window.location.href="http://localhost:8024/shoppingProductPage/idOfMacAndCheeseCheetos"} src={macAndCheeseCheetos} style={{height: '9em', width: '9em', cursor: 'pointer'}}></img>
                            <a href="http://localhost:8024/shoppingProductPage/idOfMacAndCheeseCheetos" style={{fontSize: '0.8em', maxWidth: '70%', textDecoration: 'none', color: '#1c78a3', cursor: 'pointer'}}>Mac N Cheetos Bold & Cheesy, 2.32oz Cups (4 Pack)</a>
                            
                            <div onClick={()=>window.location.href="http://localhost:8024/shoppingProductReviews/idOfMacAndCheeseCheetos"} style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                <img src={fourStarReview} style={{height: '1.6em', width: '6em', objectFit: 'contain'}}></img>
                                <p style={{fontSize: '0.8em', color: '#1c78a3'}}>236</p>
                            </div>

                            <p style={{fontSize: '0.75em', marginTop: '-0.1em'}}>600+ viewed in past month</p>
                            <p style={{maxWidth: '75%', lineHeight: '1.25', marginTop: '-0.1em'}}><span style={{color: 'white', backgroundColor: 'navy', padding: '0.1em 0.5em'}}>Megagram's Choice</span> in <a href="http://localhost:8024/shopFoods" style={{color: '#1c78a3', cursor: 'pointer', textDecoration: 'none'}}>Food</a></p>
                            <p style={{marginTop: '-0.5em'}}>{div1Prices[0][0]} <small>({div1Prices[0][1]}/Ounce)</small></p>
                            <p style={{fontSize: '0.8em', maxWidth: '75%', marginTop: '-0.3em'}}>Get it as soon as <b>Monday, Oct 28</b></p>
                        </div>

                        <div style={{height: '23em', width: '13.67%', display: 'flex',
                        flexDirection: 'column', alignItems: 'start', marginTop: '5em', paddingLeft: '3em'}}>
                            <img onClick={() => window.location.href="http://localhost:8024/shoppingProductPage/idOfMacAndCheeseCheetos"} src={macAndCheeseCheetos} style={{height: '9em', width: '9em', cursor: 'pointer'}}></img>
                            <a href="http://localhost:8024/shoppingProductPage/idOfMacAndCheeseCheetos" style={{fontSize: '0.8em', maxWidth: '70%', textDecoration: 'none', color: '#1c78a3', cursor: 'pointer'}}>Mac N Cheetos Bold & Cheesy, 2.32oz Cups (4 Pack)</a>
                            
                            <div onClick={()=>window.location.href="http://localhost:8024/shoppingProductReviews/idOfMacAndCheeseCheetos"} style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                <img src={fourStarReview} style={{height: '1.6em', width: '6em', objectFit: 'contain'}}></img>
                                <p style={{fontSize: '0.8em', color: '#1c78a3'}}>236</p>
                            </div>

                            <p style={{fontSize: '0.75em', marginTop: '-0.1em'}}>600+ viewed in past month</p>
                            <p style={{maxWidth: '75%', lineHeight: '1.25', marginTop: '-0.1em'}}><span style={{color: 'white', backgroundColor: 'navy', padding: '0.1em 0.5em'}}>Megagram's Choice</span> in <a href="http://localhost:8024/shopFoods" style={{color: '#1c78a3', cursor: 'pointer', textDecoration: 'none'}}>Food</a></p>
                            <p style={{marginTop: '-0.5em'}}>{div1Prices[1][0]} <small>({div1Prices[1][1]}/Ounce)</small></p>
                            <p style={{fontSize: '0.8em', maxWidth: '75%', marginTop: '-0.3em'}}>Get it as soon as <b>Monday, Oct 28</b></p>
                        </div>

                        <div style={{height: '23em', width: '13.67%', display: 'flex',
                        flexDirection: 'column', alignItems: 'start', marginTop: '5em', paddingLeft: '3em'}}>
                            <img onClick={() => window.location.href="http://localhost:8024/shoppingProductPage/idOfMacAndCheeseCheetos"} src={macAndCheeseCheetos} style={{height: '9em', width: '9em', cursor: 'pointer'}}></img>
                            <a href="http://localhost:8024/shoppingProductPage/idOfMacAndCheeseCheetos" style={{fontSize: '0.8em', maxWidth: '70%', textDecoration: 'none', color: '#1c78a3', cursor: 'pointer'}}>Mac N Cheetos Bold & Cheesy, 2.32oz Cups (4 Pack)</a>
                            
                            <div onClick={()=>window.location.href="http://localhost:8024/shoppingProductReviews/idOfMacAndCheeseCheetos"} style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                <img src={fourStarReview} style={{height: '1.6em', width: '6em', objectFit: 'contain'}}></img>
                                <p style={{fontSize: '0.8em', color: '#1c78a3'}}>236</p>
                            </div>

                            <p style={{fontSize: '0.75em', marginTop: '-0.1em'}}>600+ viewed in past month</p>
                            <p style={{maxWidth: '75%', lineHeight: '1.25', marginTop: '-0.1em'}}><span style={{color: 'white', backgroundColor: 'navy', padding: '0.1em 0.5em'}}>Megagram's Choice</span> in <a href="http://localhost:8024/shopFoods" style={{color: '#1c78a3', cursor: 'pointer', textDecoration: 'none'}}>Food</a></p>
                            <p style={{marginTop: '-0.5em'}}>{div1Prices[2][0]} <small>({div1Prices[2][1]}/Ounce)</small></p>
                            <p style={{fontSize: '0.8em', maxWidth: '75%', marginTop: '-0.3em'}}>Get it as soon as <b>Monday, Oct 28</b></p>
                        </div>

                        <div style={{height: '23em', width: '13.67%', display: 'flex',
                        flexDirection: 'column', alignItems: 'start', marginTop: '5em', paddingLeft: '3em'}}>
                            <img onClick={() => window.location.href="http://localhost:8024/shoppingProductPage/idOfMacAndCheeseCheetos"} src={macAndCheeseCheetos} style={{height: '9em', width: '9em', cursor: 'pointer'}}></img>
                            <a href="http://localhost:8024/shoppingProductPage/idOfMacAndCheeseCheetos" style={{fontSize: '0.8em', maxWidth: '70%', textDecoration: 'none', color: '#1c78a3', cursor: 'pointer'}}>Mac N Cheetos Bold & Cheesy, 2.32oz Cups (4 Pack)</a>
                            
                            <div onClick={()=>window.location.href="http://localhost:8024/shoppingProductReviews/idOfMacAndCheeseCheetos"} style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                <img src={fourStarReview} style={{height: '1.6em', width: '6em', objectFit: 'contain'}}></img>
                                <p style={{fontSize: '0.8em', color: '#1c78a3'}}>236</p>
                            </div>

                            <p style={{fontSize: '0.75em', marginTop: '-0.1em'}}>600+ viewed in past month</p>
                            <p style={{maxWidth: '75%', lineHeight: '1.25', marginTop: '-0.1em'}}><span style={{color: 'white', backgroundColor: 'navy', padding: '0.1em 0.5em'}}>Megagram's Choice</span> in <a href="http://localhost:8024/shopFoods" style={{color: '#1c78a3', cursor: 'pointer', textDecoration: 'none'}}>Food</a></p>
                            <p style={{marginTop: '-0.5em'}}>{div1Prices[3][0]} <small>({div1Prices[3][1]}/Ounce)</small></p>
                            <p style={{fontSize: '0.8em', maxWidth: '75%', marginTop: '-0.3em'}}>Get it as soon as <b>Monday, Oct 28</b></p>
                        </div>

                        <div style={{height: '23em', width: '13.67%', display: 'flex',
                        flexDirection: 'column', alignItems: 'start', marginTop: '5em', paddingLeft: '3em'}}>
                            <img onClick={() => window.location.href="http://localhost:8024/shoppingProductPage/idOfMacAndCheeseCheetos"} src={macAndCheeseCheetos} style={{height: '9em', width: '9em', cursor: 'pointer'}}></img>
                            <a href="http://localhost:8024/shoppingProductPage/idOfMacAndCheeseCheetos" style={{fontSize: '0.8em', maxWidth: '70%', textDecoration: 'none', color: '#1c78a3', cursor: 'pointer'}}>Mac N Cheetos Bold & Cheesy, 2.32oz Cups (4 Pack)</a>
                            
                            <div onClick={()=>window.location.href="http://localhost:8024/shoppingProductReviews/idOfMacAndCheeseCheetos"} style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                <img src={fourStarReview} style={{height: '1.6em', width: '6em', objectFit: 'contain'}}></img>
                                <p style={{fontSize: '0.8em', color: '#1c78a3'}}>236</p>
                            </div>

                            <p style={{fontSize: '0.75em', marginTop: '-0.1em'}}>600+ viewed in past month</p>
                            <p style={{maxWidth: '75%', lineHeight: '1.25', marginTop: '-0.1em'}}><span style={{color: 'white', backgroundColor: 'navy', padding: '0.1em 0.5em'}}>Megagram's Choice</span> in <a href="http://localhost:8024/shopFoods" style={{color: '#1c78a3', cursor: 'pointer', textDecoration: 'none'}}>Food</a></p>
                            <p style={{marginTop: '-0.5em'}}>{div1Prices[4][0]} <small>({div1Prices[4][1]}/Ounce)</small></p>
                            <p style={{fontSize: '0.8em', maxWidth: '75%', marginTop: '-0.3em'}}>Get it as soon as <b>Monday, Oct 28</b></p>
                        </div>

                        <div style={{height: '23em', width: '13.67%', display: 'flex',
                        flexDirection: 'column', alignItems: 'start', marginTop: '5em', paddingLeft: '3em'}}>
                            <img onClick={() => window.location.href="http://localhost:8024/shoppingProductPage/idOfMacAndCheeseCheetos"} src={macAndCheeseCheetos} style={{height: '9em', width: '9em', cursor: 'pointer'}}></img>
                            <a href="http://localhost:8024/shoppingProductPage/idOfMacAndCheeseCheetos" style={{fontSize: '0.8em', maxWidth: '70%', textDecoration: 'none', color: '#1c78a3', cursor: 'pointer'}}>Mac N Cheetos Bold & Cheesy, 2.32oz Cups (4 Pack)</a>
                            
                            <div onClick={()=>window.location.href="http://localhost:8024/shoppingProductReviews/idOfMacAndCheeseCheetos"} style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                <img src={fourStarReview} style={{height: '1.6em', width: '6em', objectFit: 'contain'}}></img>
                                <p style={{fontSize: '0.8em', color: '#1c78a3'}}>236</p>
                            </div>

                            <p style={{fontSize: '0.75em', marginTop: '-0.1em'}}>600+ viewed in past month</p>
                            <p style={{maxWidth: '75%', lineHeight: '1.25', marginTop: '-0.1em'}}><span style={{color: 'white', backgroundColor: 'navy', padding: '0.1em 0.5em'}}>Megagram's Choice</span> in <a href="http://localhost:8024/shopFoods" style={{color: '#1c78a3', cursor: 'pointer', textDecoration: 'none'}}>Food</a></p>
                            <p style={{marginTop: '-0.5em'}}>{div1Prices[5][0]} <small>({div1Prices[5][1]}/Ounce)</small></p>
                            <p style={{fontSize: '0.8em', maxWidth: '75%', marginTop: '-0.3em'}}>Get it as soon as <b>Monday, Oct 28</b></p>
                        </div>

                        <div onClick={goToNextPageInDiv1} style={{backgroundColor: 'white', height: '2em', width: '2em', borderRadius: '0.75em',
                        cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderWidth: '0.03em'}}>
                            <img src={leftArrow} style={{height: '1.2em', width: '1.2em', transform: 'scaleX(-1)'}}></img>
                        </div>

                        
                        

                    </div>
                </div>

                <div id="div2" style={{width: '100%', borderStyle: 'solid', borderLeft: 'none', borderRight: 'none', borderColor: 'lightgray', height: '47%',
                borderWidth:'0.07em', display: 'flex', flexDirection: 'column', padding: '0.5em 1em'}}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '96.5%'}}>
                        <b style={{marginLeft: '4em'}}>Customers who bought items in your purchasing history also bought</b>
                        <small>{`Page ${currPageInDiv2} of 4`}</small>
                    </div>

                    <div style={{display: 'flex', alignItems: 'center', height: '80%', width: '98%', gap: '0.5em', justifyContent: 'space-between'}}>

                        <div onClick={goToPreviousPageInDiv2} style={{backgroundColor: 'white', height: '2em', width: '2em', borderRadius: '0.75em',
                        cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderWidth: '0.03em'}}>
                            <img src={leftArrow} style={{height: '1.2em', width: '1.2em'}}></img>
                        </div>

                        <div style={{height: '23em', width: '13.67%', display: 'flex',
                        flexDirection: 'column', alignItems: 'start', marginTop: '5em', paddingLeft: '3em'}}>
                            <img onClick={() => window.location.href="http://localhost:8024/shoppingProductPage/idOfMacAndCheeseCheetos"} src={macAndCheeseCheetos} style={{height: '9em', width: '9em', cursor: 'pointer'}}></img>
                            <a href="http://localhost:8024/shoppingProductPage/idOfMacAndCheeseCheetos" style={{fontSize: '0.8em', maxWidth: '70%', textDecoration: 'none', color: '#1c78a3', cursor: 'pointer'}}>Mac N Cheetos Bold & Cheesy, 2.32oz Cups (4 Pack)</a>
                            
                            <div onClick={()=>window.location.href="http://localhost:8024/shoppingProductReviews/idOfMacAndCheeseCheetos"} style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                <img src={fourStarReview} style={{height: '1.6em', width: '6em', objectFit: 'contain'}}></img>
                                <p style={{fontSize: '0.8em', color: '#1c78a3'}}>236</p>
                            </div>

                            <p style={{fontSize: '0.75em', marginTop: '-0.1em'}}>600+ viewed in past month</p>
                            <p style={{maxWidth: '75%', lineHeight: '1.25', marginTop: '-0.1em'}}><span style={{color: 'white', backgroundColor: 'navy', padding: '0.1em 0.5em'}}>Megagram's Choice</span> in <a href="http://localhost:8024/shopFoods" style={{color: '#1c78a3', cursor: 'pointer', textDecoration: 'none'}}>Food</a></p>
                            <p style={{marginTop: '-0.5em'}}>{div2Prices[0][0]} <small>({div2Prices[0][1]}/Ounce)</small></p>
                            <p style={{fontSize: '0.8em', maxWidth: '75%', marginTop: '-0.3em'}}>Get it as soon as <b>Monday, Oct 28</b></p>
                        </div>

                        <div style={{height: '23em', width: '13.67%', display: 'flex',
                        flexDirection: 'column', alignItems: 'start', marginTop: '5em', paddingLeft: '3em'}}>
                            <img onClick={() => window.location.href="http://localhost:8024/shoppingProductPage/idOfMacAndCheeseCheetos"} src={macAndCheeseCheetos} style={{height: '9em', width: '9em', cursor: 'pointer'}}></img>
                            <a href="http://localhost:8024/shoppingProductPage/idOfMacAndCheeseCheetos" style={{fontSize: '0.8em', maxWidth: '70%', textDecoration: 'none', color: '#1c78a3', cursor: 'pointer'}}>Mac N Cheetos Bold & Cheesy, 2.32oz Cups (4 Pack)</a>
                            
                            <div onClick={()=>window.location.href="http://localhost:8024/shoppingProductReviews/idOfMacAndCheeseCheetos"} style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                <img src={fourStarReview} style={{height: '1.6em', width: '6em', objectFit: 'contain'}}></img>
                                <p style={{fontSize: '0.8em', color: '#1c78a3'}}>236</p>
                            </div>

                            <p style={{fontSize: '0.75em', marginTop: '-0.1em'}}>600+ viewed in past month</p>
                            <p style={{maxWidth: '75%', lineHeight: '1.25', marginTop: '-0.1em'}}><span style={{color: 'white', backgroundColor: 'navy', padding: '0.1em 0.5em'}}>Megagram's Choice</span> in <a href="http://localhost:8024/shopFoods" style={{color: '#1c78a3', cursor: 'pointer', textDecoration: 'none'}}>Food</a></p>
                            <p style={{marginTop: '-0.5em'}}>{div2Prices[1][0]} <small>({div2Prices[1][1]}/Ounce)</small></p>
                            <p style={{fontSize: '0.8em', maxWidth: '75%', marginTop: '-0.3em'}}>Get it as soon as <b>Monday, Oct 28</b></p>
                        </div>

                        <div style={{height: '23em', width: '13.67%', display: 'flex',
                        flexDirection: 'column', alignItems: 'start', marginTop: '5em', paddingLeft: '3em'}}>
                            <img onClick={() => window.location.href="http://localhost:8024/shoppingProductPage/idOfMacAndCheeseCheetos"} src={macAndCheeseCheetos} style={{height: '9em', width: '9em', cursor: 'pointer'}}></img>
                            <a href="http://localhost:8024/shoppingProductPage/idOfMacAndCheeseCheetos" style={{fontSize: '0.8em', maxWidth: '70%', textDecoration: 'none', color: '#1c78a3', cursor: 'pointer'}}>Mac N Cheetos Bold & Cheesy, 2.32oz Cups (4 Pack)</a>
                            
                            <div onClick={()=>window.location.href="http://localhost:8024/shoppingProductReviews/idOfMacAndCheeseCheetos"} style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                <img src={fourStarReview} style={{height: '1.6em', width: '6em', objectFit: 'contain'}}></img>
                                <p style={{fontSize: '0.8em', color: '#1c78a3'}}>236</p>
                            </div>

                            <p style={{fontSize: '0.75em', marginTop: '-0.1em'}}>600+ viewed in past month</p>
                            <p style={{maxWidth: '75%', lineHeight: '1.25', marginTop: '-0.1em'}}><span style={{color: 'white', backgroundColor: 'navy', padding: '0.1em 0.5em'}}>Megagram's Choice</span> in <a href="http://localhost:8024/shopFoods" style={{color: '#1c78a3', cursor: 'pointer', textDecoration: 'none'}}>Food</a></p>
                            <p style={{marginTop: '-0.5em'}}>{div2Prices[2][0]} <small>({div2Prices[2][1]}/Ounce)</small></p>
                            <p style={{fontSize: '0.8em', maxWidth: '75%', marginTop: '-0.3em'}}>Get it as soon as <b>Monday, Oct 28</b></p>
                        </div>

                        <div style={{height: '23em', width: '13.67%', display: 'flex',
                        flexDirection: 'column', alignItems: 'start', marginTop: '5em', paddingLeft: '3em'}}>
                            <img onClick={() => window.location.href="http://localhost:8024/shoppingProductPage/idOfMacAndCheeseCheetos"} src={macAndCheeseCheetos} style={{height: '9em', width: '9em', cursor: 'pointer'}}></img>
                            <a href="http://localhost:8024/shoppingProductPage/idOfMacAndCheeseCheetos" style={{fontSize: '0.8em', maxWidth: '70%', textDecoration: 'none', color: '#1c78a3', cursor: 'pointer'}}>Mac N Cheetos Bold & Cheesy, 2.32oz Cups (4 Pack)</a>
                            
                            <div onClick={()=>window.location.href="http://localhost:8024/shoppingProductReviews/idOfMacAndCheeseCheetos"} style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                <img src={fourStarReview} style={{height: '1.6em', width: '6em', objectFit: 'contain'}}></img>
                                <p style={{fontSize: '0.8em', color: '#1c78a3'}}>236</p>
                            </div>

                            <p style={{fontSize: '0.75em', marginTop: '-0.1em'}}>600+ viewed in past month</p>
                            <p style={{maxWidth: '75%', lineHeight: '1.25', marginTop: '-0.1em'}}><span style={{color: 'white', backgroundColor: 'navy', padding: '0.1em 0.5em'}}>Megagram's Choice</span> in <a href="http://localhost:8024/shopFoods" style={{color: '#1c78a3', cursor: 'pointer', textDecoration: 'none'}}>Food</a></p>
                            <p style={{marginTop: '-0.5em'}}>{div2Prices[3][0]} <small>({div2Prices[3][1]}/Ounce)</small></p>
                            <p style={{fontSize: '0.8em', maxWidth: '75%', marginTop: '-0.3em'}}>Get it as soon as <b>Monday, Oct 28</b></p>
                        </div>

                        <div style={{height: '23em', width: '13.67%', display: 'flex',
                        flexDirection: 'column', alignItems: 'start', marginTop: '5em', paddingLeft: '3em'}}>
                            <img onClick={() => window.location.href="http://localhost:8024/shoppingProductPage/idOfMacAndCheeseCheetos"} src={macAndCheeseCheetos} style={{height: '9em', width: '9em', cursor: 'pointer'}}></img>
                            <a href="http://localhost:8024/shoppingProductPage/idOfMacAndCheeseCheetos" style={{fontSize: '0.8em', maxWidth: '70%', textDecoration: 'none', color: '#1c78a3', cursor: 'pointer'}}>Mac N Cheetos Bold & Cheesy, 2.32oz Cups (4 Pack)</a>
                            
                            <div onClick={()=>window.location.href="http://localhost:8024/shoppingProductReviews/idOfMacAndCheeseCheetos"} style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                <img src={fourStarReview} style={{height: '1.6em', width: '6em', objectFit: 'contain'}}></img>
                                <p style={{fontSize: '0.8em', color: '#1c78a3'}}>236</p>
                            </div>

                            <p style={{fontSize: '0.75em', marginTop: '-0.1em'}}>600+ viewed in past month</p>
                            <p style={{maxWidth: '75%', lineHeight: '1.25', marginTop: '-0.1em'}}><span style={{color: 'white', backgroundColor: 'navy', padding: '0.1em 0.5em'}}>Megagram's Choice</span> in <a href="http://localhost:8024/shopFoods" style={{color: '#1c78a3', cursor: 'pointer', textDecoration: 'none'}}>Food</a></p>
                            <p style={{marginTop: '-0.5em'}}>{div2Prices[4][0]} <small>({div2Prices[4][1]}/Ounce)</small></p>
                            <p style={{fontSize: '0.8em', maxWidth: '75%', marginTop: '-0.3em'}}>Get it as soon as <b>Monday, Oct 28</b></p>
                        </div>

                        <div style={{height: '23em', width: '13.67%', display: 'flex',
                        flexDirection: 'column', alignItems: 'start', marginTop: '5em', paddingLeft: '3em'}}>
                            <img onClick={() => window.location.href="http://localhost:8024/shoppingProductPage/idOfMacAndCheeseCheetos"} src={macAndCheeseCheetos} style={{height: '9em', width: '9em', cursor: 'pointer'}}></img>
                            <a href="http://localhost:8024/shoppingProductPage/idOfMacAndCheeseCheetos" style={{fontSize: '0.8em', maxWidth: '70%', textDecoration: 'none', color: '#1c78a3', cursor: 'pointer'}}>Mac N Cheetos Bold & Cheesy, 2.32oz Cups (4 Pack)</a>
                            
                            <div onClick={()=>window.location.href="http://localhost:8024/shoppingProductReviews/idOfMacAndCheeseCheetos"} style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                <img src={fourStarReview} style={{height: '1.6em', width: '6em', objectFit: 'contain'}}></img>
                                <p style={{fontSize: '0.8em', color: '#1c78a3'}}>236</p>
                            </div>

                            <p style={{fontSize: '0.75em', marginTop: '-0.1em'}}>600+ viewed in past month</p>
                            <p style={{maxWidth: '75%', lineHeight: '1.25', marginTop: '-0.1em'}}><span style={{color: 'white', backgroundColor: 'navy', padding: '0.1em 0.5em'}}>Megagram's Choice</span> in <a href="http://localhost:8024/shopFoods" style={{color: '#1c78a3', cursor: 'pointer', textDecoration: 'none'}}>Food</a></p>
                            <p style={{marginTop: '-0.5em'}}>{div2Prices[5][0]} <small>({div2Prices[5][1]}/Ounce)</small></p>
                            <p style={{fontSize: '0.8em', maxWidth: '75%', marginTop: '-0.3em'}}>Get it as soon as <b>Monday, Oct 28</b></p>
                        </div>

                        <div onClick={goToNextPageInDiv2} style={{backgroundColor: 'white', height: '2em', width: '2em', borderRadius: '0.75em',
                        cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderWidth: '0.03em'}}>
                            <img src={leftArrow} style={{height: '1.2em', width: '1.2em', transform: 'scaleX(-1)'}}></img>
                        </div>

                        
                        

                    </div>
                </div>

            


            </div>
        </>
    )
}

export default SimilarCustomerProductsSection;