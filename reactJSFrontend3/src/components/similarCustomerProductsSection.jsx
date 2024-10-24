import leftArrow from '../assets/leftArrow.png';
import macAndCheeseCheetos from '../assets/cheetosMac&Cheese.jpg';
import fourStarReview from '../assets/4StarReview.png';
import { useState } from 'react';

function SimilarCustomerProductsSection() {
    const [currPageInDiv1, setCurrPageInDiv1] = useState(1);
    const [currPageInDiv2, setCurrPageInDiv2] = useState(1);

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

    return (
        <>
            <div style={{width: '100%', height: '56em', backgroundColor: 'white', marginTop: '2.5em', display: 'flex',
            flexDirection: 'column', padding: '1em 2em'}}>

                <div id="div1" style={{width: '100%', borderStyle: 'solid', borderLeft: 'none', borderRight: 'none', borderColor: 'lightgray', height: '47%',
                borderWidth:'0.07em', display: 'flex', flexDirection: 'column', padding: '0.5em 1em'}}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '96.5%'}}>
                        <b>Recommended for you based on your history of searches, purchases, and reviews</b>
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
                            <p style={{marginTop: '-0.5em'}}>$5.52 <small>($0.59/Ounce)</small></p>
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
                            <p style={{marginTop: '-0.5em'}}>$5.52 <small>($0.59/Ounce)</small></p>
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
                            <p style={{marginTop: '-0.5em'}}>$5.52 <small>($0.59/Ounce)</small></p>
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
                            <p style={{marginTop: '-0.5em'}}>$5.52 <small>($0.59/Ounce)</small></p>
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
                            <p style={{marginTop: '-0.5em'}}>$5.52 <small>($0.59/Ounce)</small></p>
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
                            <p style={{marginTop: '-0.5em'}}>$5.52 <small>($0.59/Ounce)</small></p>
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
                        <b>Customers who bought items in your purchasing history also bought</b>
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
                            <p style={{marginTop: '-0.5em'}}>$5.52 <small>($0.59/Ounce)</small></p>
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
                            <p style={{marginTop: '-0.5em'}}>$5.52 <small>($0.59/Ounce)</small></p>
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
                            <p style={{marginTop: '-0.5em'}}>$5.52 <small>($0.59/Ounce)</small></p>
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
                            <p style={{marginTop: '-0.5em'}}>$5.52 <small>($0.59/Ounce)</small></p>
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
                            <p style={{marginTop: '-0.5em'}}>$5.52 <small>($0.59/Ounce)</small></p>
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
                            <p style={{marginTop: '-0.5em'}}>$5.52 <small>($0.59/Ounce)</small></p>
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