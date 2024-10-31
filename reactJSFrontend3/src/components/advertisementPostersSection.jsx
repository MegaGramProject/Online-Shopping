import { useState } from 'react';
import booksAdPoster from '../assets/booksAdPoster.jpg';
import gamingStoreAdPoster from '../assets/gamingStoreAdPoster.jpg';
import kitchenAdPoster from '../assets/kitchenAdPoster.jpg';
import leftArrow from '../assets/leftArrow.png';
import toysAdPoster from '../assets/toysAdPoster.jpg';
import ProductPromotionSquare from './productPromotionSquare';



function AdvertisementPostersSection({deliveryAreaCountry}) {
    const [listOfPosterImages, setListOfPosterImages] = useState([
        gamingStoreAdPoster,
        booksAdPoster,
        kitchenAdPoster,
        toysAdPoster
    ]);
    const [listOfURLsForPosterImages, setListOfURLsForPosterImages] = useState([
        "http://localhost:8024/shopElectronics/gaming",
        "http://localhost:8024/shopBooks",
        "http://localhost:8024/shopHome&Kitchen/kitchen?maxPrice=50",
        "http://localhost:8024/shopToysForKids?maxWeeks=1"
    ]);
    const [currPosterIdx, setCurrPosterIdx] = useState(0);

    function goToNextPoster() {
        if(currPosterIdx===listOfPosterImages.length-1) {
            setCurrPosterIdx(0);
        }
        else {
            setCurrPosterIdx(currPosterIdx+1);
        }
        /*
        clearInterval(intervalId);
        intervalId = setInterval(goToNextPoster, 3000);
        */
    }

    function goToPreviousPoster() {
        if(currPosterIdx==0) {
            setCurrPosterIdx(listOfPosterImages.length-1);
        }
        else {
            setCurrPosterIdx(currPosterIdx-1);
        }
        /*
        clearInterval(intervalId);
        intervalId = setInterval(goToNextPoster, 3000);
        */
    }

    function takeUserToWebsite() {
        window.location.href = listOfURLsForPosterImages[currPosterIdx];
    }

    function goToNextPosterAutomatically() {
        if(currPosterIdx===listOfPosterImages.length-1) {
            setCurrPosterIdx(0);
        }
        else {
            setCurrPosterIdx(currPosterIdx+1);
        }
    }

    //let intervalId = setInterval(goToNextPosterAutomatically, 3000);

    return (
        <>
            <div style={{width: '70%', height: '32em', position: 'relative'}}>
                <img onClick={takeUserToWebsite} src={listOfPosterImages[currPosterIdx]} style={{position: 'absolute', top: '0%', left: '0%', height: '100%', width: '100%', cursor: 'pointer'}}></img>
                
                <img onClick={goToPreviousPoster} src={leftArrow} style={{height: '3em', width: '3em', objectFit: 'contain', position: 'absolute',
                top: '16%', left: '3%', cursor: 'pointer'}}></img>

                <img onClick={goToNextPoster} src={leftArrow} style={{height: '3em', width: '3em', objectFit: 'contain', position: 'absolute',
                top: '16%', left: '93%', transform: 'scaleX(-1)', cursor: 'pointer'}}></img>
                
                <div style={{position: 'absolute', top: '43%', left: '-2%', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: '1em', width: '105%', height: '65%'}}>

                        <ProductPromotionSquare productCategory="Gaming accessories" deliveryAreaCountry={deliveryAreaCountry}></ProductPromotionSquare>

                        <ProductPromotionSquare productCategory="Shop for your home essentials" deliveryAreaCountry={deliveryAreaCountry}></ProductPromotionSquare>

                        <ProductPromotionSquare productCategory="Shop deals in Fashion" deliveryAreaCountry={deliveryAreaCountry}></ProductPromotionSquare>

                        <ProductPromotionSquare productCategory="New home arrivals under $50" deliveryAreaCountry={deliveryAreaCountry}></ProductPromotionSquare>
                </div>
            </div>
        </>
    )
}

export default AdvertisementPostersSection;