import React, { useRef, useState } from 'react';
import dining from '../assets/dining.jpg';
import homeStuff from '../assets/homeStuff.jpg';
import kitchenware from '../assets/kitchenware.jpg';
import leftArrow from '../assets/leftArrow.png';
import potsAndPans from '../assets/potsAndPans.jpg';
import toaster from '../assets/toaster.jpg';
import toys from '../assets/toys.jpg';

function ProductPromotionRectangle({title}) {
    const [isUserHoveringOnThis, setIsUserHoveringOnThis] = useState(false);
    const [canGoLeft, setCanGoLeft] = useState(false);
    const [canGoRight, setCanGoRight] = useState(true);
    const scrollableDivRef = useRef(null);
    

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
                <h3>{title}</h3>

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

                <div ref={scrollableDivRef} onScroll={onScrollingScrollableDiv} onMouseEnter={setIsUserHoveringOnThisToTrue} onMouseLeave={setIsUserHoveringOnThisToFalse} style={{display: 'flex', alignItems: 'center', height: '65%', width: '100%', backgroundColor: 'steelblue', overflowX: 'scroll'}}>
                    <img src={toys} style={{height: '100%', width: '16.67%', cursor: 'pointer'}}></img>
                    <img src={potsAndPans} style={{height: '100%', width: '16.67%', cursor: 'pointer'}}></img>
                    <img src={toaster} style={{height: '100%', width: '16.67%', cursor: 'pointer'}}></img>
                    <img src={dining} style={{height: '100%', width: '16.67%', cursor: 'pointer'}}></img>
                    <img src={homeStuff} style={{height: '100%', width: '16.67%', cursor: 'pointer'}}></img>
                    <img src={kitchenware} style={{height: '100%', width: '16.67%', cursor: 'pointer'}}></img>
                    <img src={toys} style={{height: '100%', width: '16.67%', cursor: 'pointer'}}></img>
                    <img src={potsAndPans} style={{height: '100%', width: '16.67%', cursor: 'pointer'}}></img>
                    <img src={toaster} style={{height: '100%', width: '16.67%', cursor: 'pointer'}}></img>
                    <img src={dining} style={{height: '100%', width: '16.67%', cursor: 'pointer'}}></img>
                    <img src={homeStuff} style={{height: '100%', width: '16.67%', cursor: 'pointer'}}></img>
                    <img src={kitchenware} style={{height: '100%', width: '16.67%', cursor: 'pointer'}}></img>
                    <img src={toys} style={{height: '100%', width: '16.67%', cursor: 'pointer'}}></img>
                    <img src={potsAndPans} style={{height: '100%', width: '16.67%', cursor: 'pointer'}}></img>
                    <img src={toaster} style={{height: '100%', width: '16.67%', cursor: 'pointer'}}></img>
                    <img src={dining} style={{height: '100%', width: '16.67%', cursor: 'pointer'}}></img>
                    <img src={homeStuff} style={{height: '100%', width: '16.67%', cursor: 'pointer'}}></img>
                    <img src={kitchenware} style={{height: '100%', width: '16.67%', cursor: 'pointer'}}></img>
                </div>
            </div>
            
        </>
    )
}
export default ProductPromotionRectangle;