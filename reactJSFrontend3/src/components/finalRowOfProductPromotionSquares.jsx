import ProductPromotionSquare from './productPromotionSquare';
import  ProductPromotionSquare2 from './productPromotionSquare2';

function FinalRowOfProductPromotionSquares() {
    return (
        <>
            <div style={{width: '70%', height: '32em', position: 'relative', marginTop: '-7em'}}>
    
                    <div style={{position: 'absolute', top: '10%', left: '-2%', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: '1em', width: '105%', height: '65%'}}>
                        <ProductPromotionSquare productCategory="Toys for the Youngsters"></ProductPromotionSquare>

                        <ProductPromotionSquare productCategory="Most-loved travel essentials"></ProductPromotionSquare>

                        <ProductPromotionSquare productCategory="Most-loved watches"></ProductPromotionSquare>

                        <ProductPromotionSquare productCategory="Explore more in Sports"></ProductPromotionSquare>
                    </div>
            </div>
        </>
    )
}
export default FinalRowOfProductPromotionSquares;