import blueHeadset from '../assets/blueHeadset.jpg';
import keyboard from '../assets/keyboard.jpg';
import computerMouse from '../assets/computerMouse.jpg';
import gamingChair from '../assets/gamingChair.jpg';
import cleaningTools from '../assets/cleaningTools.jpg';
import homeStorage from '../assets/homeStorage.jpg';
import homeDecor from '../assets/homeDecor.jpg';
import bedding from '../assets/bedding.jpg';
import jeans from '../assets/jeans.jpg';
import tops from '../assets/tops.jpg';
import dresses from '../assets/dresses.jpg';
import shoes from '../assets/shoes.jpg';
import kitchenVessel from '../assets/kitchenVessel.jpg';
import redPaintCans from '../assets/redPaintCans.jpg';
import homeDecor2 from '../assets/homeDecor2.jpg';
import bluePatternedPillow from '../assets/bluePatternedPillow.jpg';
import cooker from '../assets/cooker.jpg';
import coffeeMaker from '../assets/coffeeMaker.jpg';
import potsAndPans from '../assets/potsAndPans.jpg';
import toaster from '../assets/toaster.jpg';
import dining from '../assets/dining.jpg';
import homeStuff from '../assets/homeStuff.jpg';
import kitchenware from '../assets/kitchenware.jpg';
import food from '../assets/food.jpg';


function ProductPromotionSquare({productCategory})  {
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
            names: ['Jeans under $50', 'Tops under $25', 'Dresses under $30', 'Shoes under $50'],
            images: [jeans, tops, dresses, shoes],
            imageLinks: ["http://localhost:8024/shopFashion/jeans?maxPrice=50", "http://localhost:8024/shopFashion/tops?maxPrice=25", "http://localhost:8024/shopFashion/dresses?maxPrice=30", "http://localhost:8024/shopFashion/shoes?maxPrice=50"],
            mainLink: ["See all deals", "http://localhost:8024/shopFashionDeals"]
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
        }
    };

    return (
        <>
        <div style={{width: '25em', height: '100%', backgroundColor: 'white', padding: '1em 1em', display: 'flex',
        flexDirection: 'column'}}>
            <b>{productCategory}</b>
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

