import { useEffect, useRef, useState } from 'react';
import smileyArrow from '../assets/amazonLogoSmileyArrow.png';
import cartIcon from '../assets/cartIcon.png';
import downwardTriangle from '../assets/downwardTriangle.png';
import mapPinIcon from '../assets/mapPinIcon.png';
import orangeSearchButton from '../assets/orangeSearchButton.png';
import '../styles.css';
import SearchResults from './searchResults';

function TopMostSection({authenticatedUsername, showDarkScreen, hideDarkScreen,
    showChooseYourLocationPopup, deliveryArea, hasPremium, numItemsInCart}) {
    const [isHoveringOnDeliverToDiv, setIsHoveringOnDeliverToDiv] = useState(false);
    const [isHoveringOnListsDiv, setIsHoveringOnListsDiv] = useState(false);
    const [isHoveringOnReturnsAndOrdersDiv, setIsHoveringOnReturnsAndOrdersDiv] = useState(false);
    const [isHoveringOnCartDiv, setIsHoveringOnCartDiv] = useState(false);
    const [selectedCategoryForSearch, setSelectedCategoryForSearch] = useState('');
    const [displaySearchResults, setDisplaySearchResults] = useState(false);
    const [textareaValue, setTextareaValue] = useState('');
    const [isHoveringOnListsPopupDiv, setIsHoveringOnListsPopupDiv] = useState(false);
    const textareaDivRef = useRef(null);
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

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [displaySearchResults]);

    function toggleIsHoveringOnDeliverToDiv() {
        setIsHoveringOnDeliverToDiv(!isHoveringOnDeliverToDiv);
    }

    function toggleIsHoveringOnListsDiv() {
        if(!isHoveringOnListsDiv) {
            setIsHoveringOnListsDiv(true);
            showDarkScreen();
        }
        else {
            setIsHoveringOnListsDiv(false);
            hideDarkScreen();
        }
    }

    function toggleIsHoveringOnReturnsAndOrdersDiv() {
        setIsHoveringOnReturnsAndOrdersDiv(!isHoveringOnReturnsAndOrdersDiv);
    }

    function toggleIsHoveringOnCartDiv() {
        setIsHoveringOnCartDiv(!isHoveringOnCartDiv);
    }

    function handleSelectionChange(event) {
        setSelectedCategoryForSearch(event.target.value);
    };

    function handleClick(event) {
        if (textareaDivRef.current && displaySearchResults && !textareaDivRef.current.contains(event.target)) {
            hideDarkScreen();
            setDisplaySearchResults(false);
        }
        else if(textareaDivRef.current && !displaySearchResults && textareaDivRef.current.contains(event.target)) {
            showDarkScreen();
            setDisplaySearchResults(true);
        }
    };

    function handleTextareaChange(event) {
        setTextareaValue(event.target.value);
    }

    function takeUserToShoppingCartPage() {
        window.location.href = "http://localhost:8024/shoppingCart";
    }

    function takeUserToReturnsAndOrdersPage() {
        window.location.href = "http://localhost:8024/shoppingReturnsAndOrders";
    }

    async function submitSearch() {
        const response = await fetch(`http://localhost:8025/addShopSearch/${authenticatedUsername}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                search: textareaValue,
                searchCategory: selectedCategoryForSearch,
                dateTime: (new Date()).toISOString()
            })
        });
        if(!response.ok) {
            throw new Error('Network response not ok');
        }
        window.location.href = `http://localhost:8024/${categoryToPagePathSegmentMappings[selectedCategoryForSearch]}/${textareaValue}`;
    }

    function takeUserToCreateList() {
        window.location.href = "http://location:8024/shoppingCreateList";
    }

    function takeUserToViewList(listName) {
        window.location.href = `http://location:8024/shoppingViewList/${listName}`;
    }

    function toggleIsHoveringOnListsPopupDiv() {
        if(isHoveringOnListsPopupDiv) {
            hideDarkScreen();
        }
        else {
            showDarkScreen();
        }
        setIsHoveringOnListsPopupDiv(!isHoveringOnListsPopupDiv);
    }

    return (
    <>
        <div id="topmostSection" style={{display: "flex", alignItems: "center", width: "100%", backgroundColor: "#020b1f", paddingTop: "0.2em", padding: '0.5em 0.5em',
        position: 'relative'}}>
            
            <div style={{display: "flex", flexDirection: "column", alignItems: "start", paddingTop: '0.5em', marginLeft:'1em', marginRight: '2em'}}>
                <b style={{fontFamily: "Billabong", color: "white", fontSize: "1.8em"}}>Megagram</b>
                {hasPremium &&
                    <div style={{display: 'flex', alignItems: 'center', marginLeft: '-1em', marginTop: "-0.4em"}}>
                        <img src={smileyArrow} style={{height: "2.7em", width: "5.8em", pointerEvents: "none"}}></img>
                        <b style={{color: 'silver', fontSize: '0.8em', marginLeft: '-0.7em'}}>premium</b>
                    </div>
                }
                {!hasPremium &&
                    <img src={smileyArrow} style={{height: "2.7em", width: "9.2em", pointerEvents: "none", marginLeft: "-1.5em", marginTop: "-0.4em"}}></img>
                }
            </div>

            <div onClick={showChooseYourLocationPopup} onMouseEnter={toggleIsHoveringOnDeliverToDiv} onMouseLeave={toggleIsHoveringOnDeliverToDiv} style={{display: "flex", flexDirection: "column", alignItems: "start", borderStyle: isHoveringOnDeliverToDiv ? "solid" : "none", borderColor: "white", padding: "0.1em 0.4em", cursor: "pointer",
            borderWidth: '0.07em'}}>
                <small style={{color: "#ebebeb"}}>Deliver to</small>
                <div style={{display: "flex", alignItems: "end"}}>
                    <img src={mapPinIcon} style={{height: "2em", width: "2em", pointerEvents: "none"}}></img>
                    <b style={{color: "white"}}>{deliveryArea}</b>
                </div>
            </div>

            <div style={{marginLeft: "5em", display: "flex", alignItems: 'start', gap: "0em",  width: "51%", height: '3.8em'}}>
                <select onChange={handleSelectionChange} style={{backgroundColor: '#ebebeb', paddingLeft: '1em', width: '5.5em', height: '4.2em'}}>
                    <option value="">All</option>
                    <option value="Arts & Crafts">Arts & Crafts</option>
                    <option value="Books">Books</option>
                    <option value="Cell Phones & Accessories">Cell Phones and Accessories</option>
                    <option value="Clothing & Shoes">Clothing & Shoes</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Food">Food</option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                    <option value="Toys for Kids">Toys for Kids</option>
                    <option value="Smart Home">Smart Home</option>
                    <option value="Sports & Outdoors">Sports & Outdoors</option>
                </select>
                <div ref={textareaDivRef}  style={{display: 'flex', flexDirection: 'column', width: '95%'}}>
                    <textarea value={textareaValue} onChange={handleTextareaChange} placeholder="Search Megagram Shop" style={{fontFamily: "Arial", paddingTop: "1em", paddingLeft: "1em", fontSize: "1em",
                    resize: 'none'}}></textarea>
                    {displaySearchResults && <SearchResults authenticatedUsername={authenticatedUsername} search={textareaValue}
                    searchCategory={selectedCategoryForSearch}></SearchResults>}
                </div>
                <img onClick={submitSearch} src={orangeSearchButton} style={{height: "3.6em", width: "3.5em", cursor: 'pointer'}}></img>
            </div>

            <div onMouseEnter={toggleIsHoveringOnListsDiv} onMouseLeave={toggleIsHoveringOnListsDiv} style={{display: 'flex', alignItems: 'start', cursor: 'pointer', borderStyle: isHoveringOnListsDiv ? 'solid' : 'none',
            borderColor: 'white', padding: "0.5em 1em", gap: '0.2em', width: '3.5em', position: 'absolute', left: '77%', top: '33%'}}>
                <b style={{color: 'white'}}>Lists</b>
                <img src={downwardTriangle} style={{height: "1em", width: "1em", pointerEvents: "none"}}></img>
            </div>

            {(isHoveringOnListsDiv || isHoveringOnListsPopupDiv) &&
                <div onMouseEnter={toggleIsHoveringOnListsPopupDiv} onMouseLeave={toggleIsHoveringOnListsPopupDiv} style={{position: 'absolute', left:'77%', top: '82%', backgroundColor: 'white', width: '20em', height: '30em',
                display: 'flex', flexDirection: 'column', padding: '0.5em 1em', zIndex: '10'}}>
                    <div style={{width: "100%", display: "flex", justifyContent: 'center', alignItems: 'center', borderStyle: 'solid',
                    borderColor: 'lightgray', borderTop: 'none', borderLeft: 'none', borderRight: 'none'}}>
                        <h3>Explore Lists</h3>
                    </div>
                    <br></br>
                    <div style={{display: 'flex', width: '100%', height: '100%', justifyContent: 'space-between', gap: '1em', overflowY: 'scroll'}}>
                        <div style={{width: '50%', height: '100%', borderStyle: 'solid', borderColor: 'lightgray', borderTop: 'none',
                        borderLeft: 'none', borderBottom: 'none', borderWidth: '0.05em'}}>
                            <h4>Make a List</h4>
                            <small onClick={takeUserToCreateList} style={{cursor: 'pointer', fontFamily: 'Roboto'}}>Create a List</small>
                        </div>
                        <div style={{width: '50%', height: '100%'}}>
                            <h4>Find a List</h4>
                            <p onClick={() => takeUserToViewList('GROCERIES!')} style={{cursor: 'pointer', fontFamily: 'Roboto', color: 'gray'}}>GROCERIES!</p>
                            <p onClick={() => takeUserToViewList('my wishlist')} style={{cursor: 'pointer', fontFamily: 'Roboto', color: 'gray'}}>my wishlist</p>
                            <p onClick={() => takeUserToViewList('vacation supplies')} style={{cursor: 'pointer', fontFamily: 'Roboto', color: 'gray'}}>vacation supplies</p>
                        </div>
                    </div>
                </div>
            }

        
            <div onClick={takeUserToReturnsAndOrdersPage} onMouseEnter={toggleIsHoveringOnReturnsAndOrdersDiv} onMouseLeave={toggleIsHoveringOnReturnsAndOrdersDiv} style={{display: 'flex', flexDirection: 'column', cursor: 'pointer', position: 'absolute', top: '33%', left: '84%', borderStyle: isHoveringOnReturnsAndOrdersDiv ? 'solid' : 'none', borderColor: 'white', padding: "0.1em 0.4em"}}>
                <small style={{color: 'white'}}>Returns</small>
                <b style={{color: 'white'}}>& Orders</b>
            </div>

            <div onClick={takeUserToShoppingCartPage} onMouseEnter={toggleIsHoveringOnCartDiv} onMouseLeave={toggleIsHoveringOnCartDiv} style={{display: 'flex', alignItems: 'end', cursor: 'pointer', position: 'absolute', top: '20%', left: '90.5%', borderStyle: isHoveringOnCartDiv ? 'solid' : 'none', borderColor: 'white', padding: "0.1em 0.4em", gap: '0.6em'}}>
                <img src={cartIcon} style={{height: "3em", width: "3em", pointerEvents: "none"}}></img>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2em'}}>
                    {numItemsInCart<100 &&
                        <b style={{color: 'orange'}}>({numItemsInCart})</b>
                    }
                    {numItemsInCart>=100 &&
                        <b style={{color: 'orange'}}>(100+)</b>
                    }
                    <b style={{color: 'white'}}>Cart</b>
                </div>
            </div>

        </div>
    </>
    )
}

export default TopMostSection
