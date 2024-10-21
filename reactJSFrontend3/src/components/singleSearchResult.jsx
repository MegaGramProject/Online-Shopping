import { useState } from 'react';
import thinGrayXIcon from '../assets/thinGrayXIcon.png';
import '../styles.css';

function SingleSearchResult({id, result, category}) {
    const [count, setCount] = useState(0);
    const [isDeleted, setDeleted] = useState(false);
    const categoryToPagePathSegmentMappings = {
        '': 'shopAllItems',
        'Arts & Crafts': 'shopArts&Crafts',
        'Books': 'shopBooks',
        'Cell Phones & Accessories': 'shopCellPhones&Accessories',
        'Clothing & Shoes': 'shopFashion',
        'Electronics': 'shopElectronics',
        'Food': 'shopFood',
        'Home & Kitchen': 'shopHome&Kitchen',
        'Toys for Kids': 'shopToysForKids',
        'Smart Home': 'shopSmartHomeProducts',
        'Sports & Outdoors': 'shopSports&Outdoors'
    };

    function deleteSearchResult(event) {
        event.stopPropagation();
        setDeleted(true);
    }

    function takeUserToPageForResult() {
        window.location.href = `http://localhost:8024/${categoryToPagePathSegmentMappings[category]}/${result}`;
    }

    return (
    <>
        {!isDeleted &&
        <div className="hoverableElement" onClick={takeUserToPageForResult} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.2em 0.4em',
        fontSize: '0.91em'}}>
            <p><b>{result}</b> {category!=="" &&
                <span style={{color: 'gray'}}>in <span style={{fontFamily: 'Roboto', fontSize: '1.2em'}}>{category}</span></span>
            }
            </p>
            <img onClick={deleteSearchResult} src={thinGrayXIcon} style={{cursor: 'pointer', height: '1.5em', width: '1.5em'}}></img>
        </div>}
    </>
    )
}

export default SingleSearchResult
