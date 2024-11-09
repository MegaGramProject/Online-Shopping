import { useState } from 'react';
import thinGrayXIcon from '../assets/thinGrayXIcon.png';
import '../styles.css';

function SingleSearchResult({id, authenticatedUsername, result, category, notifyParentToDeleteSearchResult,
    isDeletable, showCategory}) {
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
        notifyParentToDeleteSearchResult(id);
    }

    async function takeUserToPageForResult() {
        const response = await fetch(`http://localhost:8025/addShopSearch/${authenticatedUsername}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                search: result,
                searchCategory: category,
                dateTime: (new Date()).toISOString()
            })
        });
        if(!response.ok) {
            throw new Error('Network response not ok');
        }
        window.location.href = `http://localhost:8024/${categoryToPagePathSegmentMappings[category]}/${result}`;
    }

    return (
    <>
        <div className="hoverableElement singleSearchResult" onClick={takeUserToPageForResult} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.2em 0.4em',
        fontSize: '0.91em', zIndex: '10', backgroundColor: 'white'}}>
            <p><b>{result}</b> {showCategory && category!=="" &&
                <span style={{color: 'gray'}}>in <span style={{fontFamily: 'Roboto', fontSize: '1.2em'}}>{category}</span></span>
            }
            </p>
            {isDeletable &&
                <img onClick={deleteSearchResult} src={thinGrayXIcon} style={{cursor: 'pointer', height: '1.5em', width: '1.5em'}}></img>
            }
        </div>
    </>
    )
}

export default SingleSearchResult
