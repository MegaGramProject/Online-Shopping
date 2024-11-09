import getYourGameOn from '../assets/getYourGameOn.jpg';
import toys from '../assets/toys.jpg'
import { useEffect, useState } from 'react';

function ProductPromotionSquare2({title, deliveryAreaCountry}) {
    const [textToUseForTitle, setTextToUseForTitle] = useState("");

    const productInfo = {
        'Get your game on': {
            img: getYourGameOn,
            link: ["Shop gaming", "http://localhost:8024/shopAllItems/gaming"]
        },
        'Toys under $25': {
            img: toys,
            link: ["Shop now", "http://localhost:8024/shopToysForKids?maxPrice=25"]
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
        if(title!=='Toys under $25') {}
            setTextToUseForTitle(title);
    }, [title]);

    useEffect(() => {
        if(title.startsWith('Toys under '))  {
            updateTitleTextToUse();
        }
    }, [deliveryAreaCountry]);

    function updateTitleTextToUse() {
        let currCurrency = "$";
        let newCurrency = countryCurrencyMap[deliveryAreaCountry];
        
        let price = 25;
        price = price/currencyToDollarMap[currCurrency]; //convert from currCurrency to USD
        price = price*currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
        setTextToUseForTitle(`Toys under ${newCurrency}${price.toFixed(2)}`);
    }


    return (
        <>
            <div className="productPromotionSquare" style={{height: '100%', backgroundColor: 'white', padding: '1em 1em', display: 'flex',
            flexDirection: 'column'}}>
                <b>{textToUseForTitle}</b>
                <br></br>
                
                <img onClick={()=>window.location.href=productInfo[title]['link'][1]} src={productInfo[title]['img']} style={{height: '70%', width: '17em', cursor: 'pointer'}}></img>

                <br></br>

                <a style={{color: '#589dc4', fontSize: '0.73em', cursor: 'pointer', textDecoration: 'none'}} href={productInfo[title]['link'][1]}>{productInfo[title]['link'][0]}</a>
            </div>
        </>
    )
}
export default ProductPromotionSquare2;