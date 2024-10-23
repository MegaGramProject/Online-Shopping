import getYourGameOn from '../assets/getYourGameOn.jpg';
import toys from '../assets/toys.jpg'

function ProductPromotionSquare2({title}) {
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
    return (
        <>
            <div style={{height: '100%', backgroundColor: 'white', padding: '1em 1em', display: 'flex',
            flexDirection: 'column'}}>
                <b>{title}</b>
                <br></br>
                
                <img onClick={()=>window.location.href=productInfo[title]['link'][1]} src={productInfo[title]['img']} style={{height: '70%', width: '17em', cursor: 'pointer'}}></img>

                <br></br>

                <a style={{color: '#589dc4', fontSize: '0.73em', cursor: 'pointer', textDecoration: 'none'}} href={productInfo[title]['link'][1]}>{productInfo[title]['link'][0]}</a>
            </div>
        </>
    )
}
export default ProductPromotionSquare2;