import { useEffect, useRef, useState } from 'react';
import smileyArrow from '../assets/amazonLogoSmileyArrow.png';
import cartIcon from '../assets/cartIcon.png';
import downwardTriangle from '../assets/downwardTriangle.png';
import mapPinIcon from '../assets/mapPinIcon.png';
import orangeSearchButton from '../assets/orangeSearchButton.png';
import '../styles.css';
import SearchResults from './searchResults';

function TopMostSection({authenticatedUsername}) {
    const [isHoveringOnDeliverToDiv, setIsHoveringOnDeliverToDiv] = useState(false);
    const [isHoveringOnListsDiv, setIsHoveringOnListsDiv] = useState(false);
    const [isHoveringOnReturnsAndOrdersDiv, setIsHoveringOnReturnsAndOrdersDiv] = useState(false);
    const [isHoveringOnCartDiv, setIsHoveringOnCartDiv] = useState(false);
    const [selectedCategoryForSearch, setSelectedCategoryForSearch] = useState('');
    const [displaySearchResults, setDisplaySearchResults] = useState(false);
    const [textareaValue, setTextareaValue] = useState('');
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
        setIsHoveringOnListsDiv(!isHoveringOnListsDiv);
    }

    function toggleIsHoveringOnReturnsAndOrdersDiv() {
        setIsHoveringOnReturnsAndOrdersDiv(!isHoveringOnReturnsAndOrdersDiv);
    }

    function toggleIsHoveringOnCartDiv() {
        setIsHoveringOnCartDiv(!isHoveringOnCartDiv);
    }

    function handleChange(event) {
        setSelectedCategoryForSearch(event.target.value);
    };

    function handleClick(event) {
        if (textareaDivRef.current && displaySearchResults && !textareaDivRef.current.contains(event.target)) {
            setDisplaySearchResults(false);
        }
        else if(textareaDivRef.current && !displaySearchResults && textareaDivRef.current.contains(event.target)) {
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

    function submitSearch() {
        window.location.href = `http://localhost:8024/${categoryToPagePathSegmentMappings[selectedCategoryForSearch]}/${textareaValue}`;
    }

    return (
    <>
        <div style={{display: "flex", alignItems: "center", width: "98.2%", backgroundColor: "#020b1f", paddingTop: "0.2em", paddingLeft: "2em", paddingBottom: "0.2em",
        position: 'relative'}}>
            
            <div style={{display: "flex", flexDirection: "column", alignItems: "start", paddingTop: '0.5em'}}>
                <b style={{fontFamily: "Billabong", color: "white", fontSize: "1.8em"}}>Megagram</b>
                <img src={smileyArrow} style={{height: "2.7em", width: "9.2em", pointerEvents: "none", marginLeft: "-1.5em", marginTop: "-0.4em"}}></img>
            </div>

            <div onMouseEnter={toggleIsHoveringOnDeliverToDiv} onMouseLeave={toggleIsHoveringOnDeliverToDiv} style={{display: "flex", flexDirection: "column", alignItems: "start", borderStyle: isHoveringOnDeliverToDiv ? "solid" : "none", borderColor: "white", padding: "0.1em 0.4em", cursor: "pointer",
            borderWidth: '0.07em'}}>
                <small style={{color: "#ebebeb"}}>Deliver to</small>
                <div style={{display: "flex", alignItems: "end"}}>
                    <img src={mapPinIcon} style={{height: "2em", width: "2em", pointerEvents: "none"}}></img>
                    <b style={{color: "white"}}>Verona, 53593</b>
                </div>
            </div>

            <div style={{marginLeft: "5em", display: "flex", alignItems: 'start', gap: "0em",  width: "51%", height: '3.8em'}}>
                <select onChange={handleChange} style={{backgroundColor: '#ebebeb', paddingLeft: '1em', width: '5.5em', height: '4.2em'}}>
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
                    <textarea onChange={handleTextareaChange} placeholder="Search Megagram Shop" style={{fontFamily: "Arial", paddingTop: "1em", paddingLeft: "1em", fontSize: "1em",
                    resize: 'none'}}></textarea>
                    {displaySearchResults && <SearchResults authenticatedUsername={authenticatedUsername} search={textareaValue}></SearchResults>}
                </div>
                <img onClick={submitSearch} src={orangeSearchButton} style={{height: "3.6em", width: "3.2em", cursor: 'pointer'}}></img>
            </div>

            <div onMouseEnter={toggleIsHoveringOnListsDiv} onMouseLeave={toggleIsHoveringOnListsDiv} style={{display: 'flex', alignItems: 'start', cursor: 'pointer', position: 'absolute', top: '35%', left: '78%',
            borderStyle: isHoveringOnListsDiv ? 'solid' : 'none', borderColor: 'white', padding: "0.5em 1em", gap: '0.2em'}}>
                <b style={{color: 'white'}}>Lists</b>
                <img src={downwardTriangle} style={{height: "1em", width: "1em", pointerEvents: "none"}}></img>
            </div>

            <div onClick={takeUserToReturnsAndOrdersPage} onMouseEnter={toggleIsHoveringOnReturnsAndOrdersDiv} onMouseLeave={toggleIsHoveringOnReturnsAndOrdersDiv} style={{display: 'flex', flexDirection: 'column', cursor: 'pointer', position: 'absolute', top: '33%', left: '84%', borderStyle: isHoveringOnReturnsAndOrdersDiv ? 'solid' : 'none', borderColor: 'white', padding: "0.1em 0.4em"}}>
                <small style={{color: 'white'}}>Returns</small>
                <b style={{color: 'white'}}>& Orders</b>
            </div>

            <div onClick={takeUserToShoppingCartPage} onMouseEnter={toggleIsHoveringOnCartDiv} onMouseLeave={toggleIsHoveringOnCartDiv} style={{display: 'flex', alignItems: 'end', cursor: 'pointer', position: 'absolute', top: '20%', left: '90.5%', borderStyle: isHoveringOnCartDiv ? 'solid' : 'none', borderColor: 'white', padding: "0.1em 0.4em", gap: '0.6em'}}>
                <img src={cartIcon} style={{height: "3em", width: "3em", pointerEvents: "none"}}></img>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2em'}}>
                    <b style={{color: 'orange'}}>(100+)</b>
                    <b style={{color: 'white'}}>Cart</b>
                </div>
            </div>

        </div>
    </>
    )
}

export default TopMostSection
