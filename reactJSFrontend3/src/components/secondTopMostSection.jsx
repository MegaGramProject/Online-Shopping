import { useState } from 'react';
import smileyArrow from '../assets/amazonLogoSmileyArrow.png';
import downwardTriangle from '../assets/downwardTriangle.png';
import getPremiumIcon from '../assets/getPremiumIcon.png';
import giftCardsIcon from '../assets/giftCardsIcon.png';
import whiteHamburgerMenu from '../assets/whiteHamburgerMenu.png';
import giftCardBalance from '../assets/giftCardBalance.png';
import '../styles.css';
import SingleOptionInSecondTopMostSection from './singleOptionInSecondTopMostSection';


function SecondTopMostSection({isLeftSidebarDisplayed, notifyParentToToggleLeftSidebar, toggleDarkScreen}) {

    const [isHoveringOnAllDiv, setIsHoveringOnAllDiv] = useState(false);
    const [isHoveringOnPremiumPopup, setIsHoveringOnPremiumPopup] = useState(false);
    const [isHoveringOnGiftCardsPopup, setIsHoveringOnGiftCardsPopup] = useState(false);
    const [displayPremiumPopup, setDisplayPremiumPopup] = useState(false);
    const [displayGiftCardsPopup, setDisplayGiftCardsPopup] = useState(false);

    function toggleIsHoveringOnAllDiv() {
        setIsHoveringOnAllDiv(!isHoveringOnAllDiv);
    }

    function togglePremiumPopup() {
        setIsHoveringOnPremiumPopup(!isHoveringOnPremiumPopup);
        setDisplayPremiumPopup(!displayPremiumPopup);
        toggleDarkScreen();
    }

    function toggleGiftCardsPopup() {
        setIsHoveringOnGiftCardsPopup(!isHoveringOnGiftCardsPopup);
        setDisplayGiftCardsPopup(!displayGiftCardsPopup);
        toggleDarkScreen();
    }

    function takeUserToGetPremiumPage() {
        window.location.href = "http://localhost:8024/shopingGetPremium";
    }

    function takeUserToMegagramShopGiftCardsPage() {
        window.location.href = "http://localhost:8024/shoppingGiftCards";
    }

    function takeUserToGiftCardBalancePage() {
        window.location.href = "http://localhost:8024/shoppingGiftCardBalance";
    }


    return (
    <>
        <div style={{display: 'flex', alignItems: 'center', justifyContent:'space-between', width: '98.35%', backgroundColor: '#2f3a4a', padding: '0.5em 1em', fontSize: '0.9em'}}>

            <div onClick={notifyParentToToggleLeftSidebar} onMouseEnter={toggleIsHoveringOnAllDiv} onMouseLeave={toggleIsHoveringOnAllDiv} style={{display: 'flex', alignItems: 'center',
            borderStyle: isHoveringOnAllDiv ? 'solid' : 'none', borderColor: 'white', cursor: 'pointer', padding: '0.2em 0.4em', gap: '0.4em'}}>
                <img src={whiteHamburgerMenu} style={{height: '1em', width: '1em', pointerEvents: 'none'}}></img>
                {!isLeftSidebarDisplayed && <b style={{color: 'white'}}>Left-Sidebar</b>}
                {isLeftSidebarDisplayed && <b style={{color: 'white'}}>Hide</b>}
            </div>

            <SingleOptionInSecondTopMostSection optionName="Best Sellers" optionURL="http://localhost:8024/shopBestSellers"></SingleOptionInSecondTopMostSection>

            <div onMouseEnter={togglePremiumPopup} onMouseLeave={togglePremiumPopup} style={{position: 'relative'}}>
                <div style={{borderStyle: isHoveringOnPremiumPopup ? 'solid' : 'none', borderColor: 'white', cursor: 'pointer', display: 'flex',
                alignItems: 'start', gap: '0.4em', padding: '0.2em 0.4em'}}>
                        <b style={{color: 'white'}}>Premium</b>
                        <img src={downwardTriangle} style={{height: "1em", width: "1em", pointerEvents: "none"}}></img>
                </div>
            
                {displayPremiumPopup &&
                    <div style={{position: 'absolute', top: '102%', backgroundColor: 'white', width: '350%', height: '1600%', zIndex: '10',
                    backgroundColor: '#2db9e3', borderStyle: 'solid', borderColor: 'white', borderWidth: '1.2em', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', padding: '0.5em 1em', fontFamily: 'lato'}}>
                        <b style={{color: 'white', fontSize: '2.5em'}}>premium</b>
                        <img src={smileyArrow} style={{height: "5em", width: "14em", pointerEvents: "none", marginTop: '-1em'}}></img>
                        <b style={{color: 'white', fontSize: '1.6em'}}>Unwind. You deserve it.</b>
                        <p style={{color: 'white', fontSize: '1.2em', textAlign: 'center', maxWidth: '85%', fontFamily: 'Arial'}}>Shopping and entertainment all in one place.</p>

                        <button onClick={takeUserToGetPremiumPage} style={{backgroundColor: 'lightgreen', padding: '0.5em 1em', cursor: 'pointer', color: 'black', fontWeight: 'bold', border: 'none',
                        borderRadius: '1em'}}>Try Premium</button>

                        <img src={getPremiumIcon} style={{height: '35%', width: '100%', objectFit: 'contain', pointerEvents: 'none'}}></img>
                    </div>
                }
            </div>

            <SingleOptionInSecondTopMostSection optionName="Today's Deals" optionURL="http://localhost:8024/shopTodaysDeals"></SingleOptionInSecondTopMostSection>

            <SingleOptionInSecondTopMostSection optionName="New Releases" optionURL="http://localhost:8024/shopNewReleases"></SingleOptionInSecondTopMostSection>

            <SingleOptionInSecondTopMostSection optionName="Food" optionURL="http://localhost:8024/shopFoods"></SingleOptionInSecondTopMostSection>

            
            <div onMouseEnter={toggleGiftCardsPopup} onMouseLeave={toggleGiftCardsPopup} style={{position: 'relative'}}>
                <div style={{borderStyle: isHoveringOnGiftCardsPopup ? 'solid' : 'none', borderColor: 'white', cursor: 'pointer', display: 'flex',
                alignItems: 'start', gap: '0.4em', padding: '0.2em 0.4em'}}>
                        <b style={{color: 'white'}}>Gift Cards</b>
                        <img src={downwardTriangle} style={{height: "1em", width: "1em", pointerEvents: "none"}}></img>
                </div>
                
                {displayGiftCardsPopup &&
                    <div style={{position: 'absolute', top: '102%', backgroundColor: 'white', width: '350%', height: '1600%', zIndex: '10',
                    padding: '0.5em 1em'}}>
                            <h3>Explore Gift Cards</h3>

                            <div onClick={takeUserToMegagramShopGiftCardsPage} style={{backgroundColor: '#5664e3', color: 'white', padding: '0.7em 1em', cursor: 'pointer', width: '90%', height: '37%',
                            display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <img src={giftCardsIcon} style={{height: '80%', width: '80%', objectFit: 'contain'}}></img>
                                <p>Megagram-Shop Gift Cards</p>
                            </div>

                            <div onClick={takeUserToGiftCardBalancePage} style={{backgroundColor: '#5664e3', color: 'white', padding: '0.7em 1em', cursor: 'pointer', width: '90%', height: '34%',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '0.5em'}}>
                                <img src={giftCardBalance} style={{height: '80%', width: '80%', objectFit: 'contain'}}></img>
                                <p>Gift Card Balance</p>
                            </div>
                    </div>
                }
            </div>

            <SingleOptionInSecondTopMostSection optionName="Smart Home" optionURL="http://localhost:8024/shopSmartHomeProducts"></SingleOptionInSecondTopMostSection>

            <SingleOptionInSecondTopMostSection optionName="Books" optionURL="http://localhost:8024/shopBooks"></SingleOptionInSecondTopMostSection>

            <SingleOptionInSecondTopMostSection optionName="Fashion" optionURL="http://localhost:8024/shopFashion"></SingleOptionInSecondTopMostSection>

        </div>
    </>
    )
}

export default SecondTopMostSection
