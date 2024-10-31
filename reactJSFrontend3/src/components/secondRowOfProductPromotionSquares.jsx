import ProductPromotionSquare from './productPromotionSquare';
import  ProductPromotionSquare2 from './productPromotionSquare2';

function SecondRowOfProductPromotionSquares({deliveryAreaCountry}) {
    return (
        <>
            <div style={{width: '70%', height: '32em', position: 'relative', marginTop: '4em'}}>
    
                    <div style={{position: 'absolute', top: '10%', left: '-2%', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: '1em', width: '105%', height: '65%'}}>
                        <ProductPromotionSquare productCategory="Top categories in Kitchen appliances"></ProductPromotionSquare>

                        <ProductPromotionSquare productCategory="Refresh your space"></ProductPromotionSquare>

                        <ProductPromotionSquare2 title="Get your game on" deliveryAreaCountry={deliveryAreaCountry}></ProductPromotionSquare2>

                        <ProductPromotionSquare2 title="Toys under $25" deliveryAreaCountry={deliveryAreaCountry}></ProductPromotionSquare2>
                    </div>
            </div>
        </>
    )
}
export default SecondRowOfProductPromotionSquares;