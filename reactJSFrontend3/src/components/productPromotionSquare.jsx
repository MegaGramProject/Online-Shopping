import { useEffect, useState } from 'react';
import backpack from '../assets/backpack.jpg';
import bedding from '../assets/bedding.jpg';
import blueHeadset from '../assets/blueHeadset.jpg';
import bluePatternedPillow from '../assets/bluePatternedPillow.jpg';
import boysWatch from '../assets/boysWatch.jpg';
import buildingToy from '../assets/buildingToy.jpg';
import cleaningTools from '../assets/cleaningTools.jpg';
import coffeeMaker from '../assets/coffeeMaker.jpg';
import computerMouse from '../assets/computerMouse.jpg';
import cooker from '../assets/cooker.jpg';
import cycling from '../assets/cycling.jpg';
import dining from '../assets/dining.jpg';
import doll from '../assets/doll.jpg';
import dresses from '../assets/dresses.jpg';
import exercisingAndFitness from '../assets/exercise&Fitness.jpg';
import food from '../assets/food.jpg';
import gamingChair from '../assets/gamingChair.jpg';
import girlsWatch from '../assets/girlsWatch.jpg';
import golf from '../assets/golf.jpg';
import handBag from '../assets/handBag.jpg';
import homeDecor from '../assets/homeDecor.jpg';
import homeDecor2 from '../assets/homeDecor2.jpg';
import homeStorage from '../assets/homeStorage.jpg';
import homeStuff from '../assets/homeStuff.jpg';
import inflatablePool from '../assets/inflatablePool.jpg';
import jeans from '../assets/jeans.jpg';
import keyboard from '../assets/keyboard.jpg';
import kitchenVessel from '../assets/kitchenVessel.jpg';
import kitchenware from '../assets/kitchenware.jpg';
import mensWatch from '../assets/mensWatch.jpg';
import potsAndPans from '../assets/potsAndPans.jpg';
import redPaintCans from '../assets/redPaintCans.jpg';
import rideOn from '../assets/rideOn.jpg';
import running from '../assets/running.jpg';
import shoes from '../assets/shoes.jpg';
import toaster from '../assets/toaster.jpg';
import tops from '../assets/tops.jpg';
import travelAccessories from '../assets/travelAccessories.jpg';
import travelBag from '../assets/travelBag.jpg';
import womensWatch from '../assets/womensWatch.jpg';


function ProductPromotionSquare({productCategory, deliveryAreaCountry})  {
    const [textToUseForTitle, setTextToUseForTitle] = useState("");

    const productInfo = {
        'Gaming accessories': {
            names: ['Headsets', 'Keyboards', 'Computer Mice', 'Chairs'],
            images: [blueHeadset, keyboard, computerMouse, gamingChair],
            imageLinks: ["http://localhost:8024/shopElectronics/headsets", "http://localhost:8024/shopElectronics/keyboards", "http://localhost:8024/shopElectronics/computer%20mice", "http://localhost:8024/shopElectronics/shopHome&Kitchen/gaming%20chairs"],
            mainLink: ["See more", "http://localhost:8024/shopGamingEssentials"]
        },
        'Shop for your home essentials':{
            names: ['Cleaning Tools', 'Home Storage', 'Home Decor', 'Bedding'],
            images: [cleaningTools, homeStorage, homeDecor, bedding],
            imageLinks: ["http://localhost:8024/shopHome&Kitchen/cleaning%20tools", "http://localhost:8024/shopHome&Kitchen/home%20storage", "http://localhost:8024/shopHome&Kitchen/home%20decor", "http://localhost:8024/shopHome&Kitchen/bedding"],
            mainLink: ["Discover more in Home", "http://localhost:8024/shopHome&Kitchen"]
        },
        'Shop deals in Fashion': {
            names: ['Jeans', 'Tops', 'Dresses', 'Shoes'],
            images: [jeans, tops, dresses, shoes],
            imageLinks: ["http://localhost:8024/shopFashion/jeans?maxPrice=50", "http://localhost:8024/shopFashion/tops?maxPrice=25", "http://localhost:8024/shopFashion/dresses?maxPrice=30", "http://localhost:8024/shopFashion/shoes?maxPrice=50"],
            mainLink: ["See all deals", "http://localhost:8024/shopFashion?discount=true"]
        },
        'New home arrivals under $50': {
            names: ['Kitchen & Dining', 'Home Improvement', 'Décor', 'Bedding & bath'],
            images: [kitchenVessel, redPaintCans, homeDecor2, bluePatternedPillow],
            imageLinks: ["http://localhost:8024/shopHome&Kitchen/kitchen%20dining?maxPrice=50", "http://localhost:8024/shopHome&Kitchen/home%20improvement?maxPrice=50", "http://localhost:8024/shopHome&Kitchen/décor?maxPrice=50", "http://localhost:8024/shopHome&Kitchen/bedding%20&%20bath?maxPrice=50"],
            mainLink: ['Shop the latest from home', "http://localhost:8024/shopHome&Kitchen?maxWeeks=1&maxPrice=50"]
        },
        'Top categories in Kitchen appliances': {
            names: ['Cooker', 'Coffeemakers', 'Pots and Pans', 'Toasters'],
            images: [cooker, coffeeMaker, potsAndPans, toaster],
            imageLinks: ["http://localhost:8024/shopHome&Kitchen/cooker", "http://localhost:8024/shopHome&Kitchen/coffee", "http://localhost:8024/shopHome&Kitchen/pots%20and%20pans", "http://localhost:8024/shopHome&Kitchen/toasters"],
            mainLink: ['Explore all products in Kitchen', "http://localhost:8024/shopHome&Kitchen/kitchen"]
        },
        'Refresh your space': {
            names: ['Dining', 'Home', 'Kitchen', 'Food'],
            images: [dining, homeStuff, kitchenware, food],
            imageLinks: ["http://localhost:8024/shopHome&Kitchen/dining", "http://localhost:8024/shopHome&Kitchen/home", "http://localhost:8024/shopHome&Kitchen/kitchenware", "http://localhost:8024/shopFood"],
            mainLink: ['See more', "http://localhost:8024/shopAllItems/healthAndBeauty"]
        },
        'Toys for the Youngsters': {
            names: ['Ride on\'s', 'Building & construction', 'Dolls & Doll houses', 'Swimming pools'],
            images: [rideOn, buildingToy, doll, inflatablePool],
            imageLinks: ["http://localhost:8024/shopToysForKids/ride%20ons", "http://localhost:8024/shopToysForKids/buildable%20toys", "http://localhost:8024/shopToysForKids/dolls%20&%20doll%20houses", "http://localhost:8024/shopToysForKids/swimming%20pools"],
            mainLink: ['See all', "http://localhost:8024/shopToysForKids"]
        },
        'Most-loved travel essentials': {
            names: ['Backpacks', 'Suitcases', 'Accessories', 'Handbags'],
            images: [backpack, travelBag, travelAccessories, handBag],
            imageLinks: ["http://localhost:8024/shopAllItems/backpacks", "http://localhost:8024/shopAllItems/travel%20bags", "http://localhost:8024/shopAllItems/travel%20accessories", "http://localhost:8024/shopAllItems/handbags"],
            mainLink: ['Discover more', "http://localhost:8024/shopAllItems/travel%20essentials"]
        },
        'Most-loved watches': {
            names: ['Women', 'Men', 'Girls', 'Boys'],
            images: [womensWatch, mensWatch, girlsWatch, boysWatch],
            imageLinks: ["http://localhost:8024/shopAllItems/womens%20watch", "http://localhost:8024/shopAllItems/mens%20watch", "http://localhost:8024/shopAllItems/girls%20watch", "http://localhost:8024/shopAllItems/boys%20watch"],
            mainLink: ['Discover more', 'http://localhost:8024/shopAllItems/watches']
        },
        'Explore more in Sports': {
            names: ['Cycling', 'Running', 'Exercising & Fitness', 'Golf'],
            images: [cycling, running, exercisingAndFitness, golf],
            imageLinks: ["http://localhost:8024/shopSports&Outdoors/cycling", "http://localhost:8024/shopSports&Outdoors/running", "http://localhost:8024/shopSports&Outdoors/exercising%20&%20fitness", "http://localhost:8024/shopSports&Outdoors/golf"],
            mainLink: ["Explore more", "http://localhost:8024/shopSports&Outdoors"]
        }
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
        "¥ (CNY)": 7.1198,   // CNY - Chinese Yuan (for China)
        "MX$": 19.86,      // MXN - Mexican Peso (for Mexico)
        "£": 0.7709          // GBP - British Pound (for United Kingdom)
    };

    useEffect(() => {
        if(productCategory!=='New home arrivals under $50') {
            setTextToUseForTitle(productCategory);
        }
    }, [productCategory]);

    useEffect(() => {
        if(productCategory.startsWith('New home arrivals under '))  {
            updateTitleTextToUse();
        }
    }, [deliveryAreaCountry]);

    function updateTitleTextToUse() {
        if(deliveryAreaCountry.length==0) {
            setTextToUseForTitle(`New home arrivals under $50`);
        }
        let newCurrency = countryCurrencyMap[deliveryAreaCountry];
        let price = 50;
        price = price*currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
        setTextToUseForTitle(`New home arrivals under ${newCurrency}${price.toFixed(2)}`);
    }

    return (
        <>
        <div className="productPromotionSquare" style={{width: '25em', height: '100%', backgroundColor: 'white', padding: '1em 1em', display: 'flex',
        flexDirection: 'column'}}>
            <b>{textToUseForTitle}</b>
            <br></br>
            <div style={{display: 'flex', alignItems: 'center', gap: '1.5em'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <img onClick={() => window.location.href=productInfo[productCategory]['imageLinks'][0]} src={productInfo[productCategory]['images'][0]} style={{height: '5em', width: '44%%', cursor: 'pointer'}}></img>
                    <p style={{fontSize: '0.7em'}}>{productInfo[productCategory]['names'][0]}</p>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <img onClick={() => window.location.href=productInfo[productCategory]['imageLinks'][1]} src={productInfo[productCategory]['images'][1]} style={{height: '5em', width: '44%%', cursor: 'pointer'}}></img>
                    <p style={{fontSize: '0.7em'}}>{productInfo[productCategory]['names'][1]}</p>
                </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '1.5em'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <img onClick={() => window.location.href=productInfo[productCategory]['imageLinks'][2]} src={productInfo[productCategory]['images'][2]} style={{height: '5em', width: '44%%', cursor: 'pointer'}}></img>
                    <p style={{fontSize: '0.7em'}}>{productInfo[productCategory]['names'][2]}</p>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <img onClick={() => window.location.href=productInfo[productCategory]['imageLinks'][3]} src={productInfo[productCategory]['images'][3]} style={{height: '5em', width: '44%%', cursor: 'pointer'}}></img>
                    <p style={{fontSize: '0.7em'}}>{productInfo[productCategory]['names'][3]}</p>
                </div>
            </div>
            
            <br></br>
            <br></br>

            <a style={{color: '#589dc4', fontSize: '0.73em', cursor: 'pointer', textDecoration: 'none'}} href={productInfo[productCategory]['mainLink'][1]}>{productInfo[productCategory]['mainLink'][0]}</a>
        </div>
        </>
    )

}

export default ProductPromotionSquare;

