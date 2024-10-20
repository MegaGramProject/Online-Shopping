import { useState } from 'react';
import smileyArrow from '../assets/amazonLogoSmileyArrow.png';
import cartIcon from '../assets/cartIcon.png';
import downwardTriangle from '../assets/downwardTriangle.png';
import mapPinIcon from '../assets/mapPinIcon.png';
import orangeSearchButton from '../assets/orangeSearchButton.png';
import '../styles.css';

function TopMostSection() {
    const [isHoveringOnDeliverToDiv, setIsHoveringOnDeliverToDiv] = useState(false);
    const [isHoveringOnListsDiv, setIsHoveringOnListsDiv] = useState(false);
    const [isHoveringOnReturnsAndOrdersDiv, setIsHoveringOnReturnsAndOrdersDiv] = useState(false);
    const [isHoveringOnCartDiv, setIsHoveringOnCartDiv] = useState(false);
    const [selectedCategoryForSearch, setSelectedCategoryForSearch] = useState('All');

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

    return (
    <>
        <div style={{display: "flex", alignItems: "center", width: "100%", backgroundColor: "#020b1f", paddingTop: "0.2em", paddingLeft: "2em", paddingBottom: "0.2em",
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

            <div style={{marginLeft: "5em", display: "flex", justifyContent: "center", gap: "0em",  width: "51%", height: '3.2em'}}>
                <select onChange={handleChange} style={{backgroundColor: '#ebebeb', paddingLeft: '1em', width: '5.5em'}}>
                    <option value="All">All</option>
                    <option value="Arts & Crafts">Arts & Crafts</option>
                    <option value="Books">Books</option>
                    <option value="Cell Phones & Accessories">Cell Phones and Accessories</option>
                    <option value="Clothing & Shoes">Clothing & Shoes</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Food">Food</option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                    <option value="Toys for Kids">Toys for Kids</option>
                    <option value="Sports & Outdoors">Sports & Outdoors</option>
                </select>
                <textarea placeholder="Search Megagram Shop" style={{fontFamily: "Arial", paddingTop: "1em", paddingLeft: "1em", width: "95%", fontSize: "1em",
                resize: 'none'}}></textarea>
                <img src={orangeSearchButton} style={{height: "3.2em", width: "3.2em", pointerEvents: "none", cursor: 'pointer'}}></img>
            </div>

            <div onMouseEnter={toggleIsHoveringOnListsDiv} onMouseLeave={toggleIsHoveringOnListsDiv} style={{display: 'flex', alignItems: 'end', cursor: 'pointer', position: 'absolute', top: '35%', left: '78%', borderStyle: isHoveringOnListsDiv ? 'solid' : 'none', borderColor: 'white', padding: "0.5em 1em"}}>
                <b style={{color: 'white'}}>Lists</b>
                <img src={downwardTriangle} style={{height: "1em", width: "1em", pointerEvents: "none"}}></img>
            </div>

            <div onMouseEnter={toggleIsHoveringOnReturnsAndOrdersDiv} onMouseLeave={toggleIsHoveringOnReturnsAndOrdersDiv} style={{display: 'flex', flexDirection: 'column', cursor: 'pointer', position: 'absolute', top: '33%', left: '84%', borderStyle: isHoveringOnReturnsAndOrdersDiv ? 'solid' : 'none', borderColor: 'white', padding: "0.1em 0.4em"}}>
                <small style={{color: 'white'}}>Returns</small>
                <b style={{color: 'white'}}>& Orders</b>
            </div>

            <div onMouseEnter={toggleIsHoveringOnCartDiv} onMouseLeave={toggleIsHoveringOnCartDiv} style={{display: 'flex', alignItems: 'end', cursor: 'pointer', position: 'absolute', top: '20%', left: '90.5%', borderStyle: isHoveringOnCartDiv ? 'solid' : 'none', borderColor: 'white', padding: "0.1em 0.4em", gap: '0.6em'}}>
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
