import { useState } from 'react';
import thinGrayXIcon from '../assets/thinGrayXIcon.png';

function ChooseYourLocationPopup({closePopup, showAddressesPopup}) {
    const [zipcodeTextareaValue, setZipcodeTextareaValue] = useState("");
    const [displayInvalidZipCodeMessage, setDisplayInvalidZipCodeMessage] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("");

    function onClickingDone() {
        if(selectedCountry.length==0) {
            closePopup([null, null]);
        }
        else {
            closePopup([null, selectedCountry]);
        }
    }

    async function onClickingApplyZipCode() {
        if(isValidUSZipCode(zipcodeTextareaValue)) {
            const response = await fetch(`https://api.zippopotam.us/us/${zipcodeTextareaValue}`);
            if (!response.ok) {
                setDisplayInvalidZipCodeMessage(true);
            }
            else {
                const data = await response.json();
                const placeName = data.places[0]['place name'];
                setDisplayInvalidZipCodeMessage(false);
                closePopup([`${placeName}, ${zipcodeTextareaValue}`, null]);
            }
        }
        else {
            setDisplayInvalidZipCodeMessage(true);
        }
    }
    
    function isValidUSZipCode(zip) {
        const zipCodePattern = /^\d{5}$/;
        return zipCodePattern.test(zip);
    }

    function updateZipcodeTextareaValue(event) {
        setZipcodeTextareaValue(event.target.value);
    }

    function handleSelectionChange(event) {
        setZipcodeTextareaValue("");
        setSelectedCountry(event.target.value);
    }

    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                closePopup([`${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°E`, null]); //this is a temporary solution; later, convert to zip-code using api
            },
            (error) => {
                console.error(`Error: ${error.message}`);
            }
            );
        } else {
            console.error("Geolocation is not supported by your browser.");
        }
    }

    return (
        <>
            <div style={{position: 'absolute', top: '25%', left: '40%', backgroundColor: 'white', zIndex: '10', display: 'flex',
            flexDirection: 'column', alignItems: 'center', width: '25%', height: '45%', borderRadius: '0.5em'}}>

                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8em 1.5em', backgroundColor: '#e8e8e8',
                width: '89%', borderRadius: '0.5em'}}>
                    <b>Choose your location</b>
                    <img onClick={() => closePopup([null, null])} src={thinGrayXIcon} style={{cursor: 'pointer', height: '1.5em', width: '1.5em'}}></img>
                </div>

                <p style={{fontSize: 'small', marginLeft: '2em', maxWidth: '85%'}}>Delivery options and delivery speeds may vary for different locations</p>

                <button onClick={getUserLocation} style={{backgroundColor: '#ffb700', color: 'black', border: 'none',
                borderRadius: '1em', padding: '0.5em 1em', width: '80%', textAlign: 'center', cursor: 'pointer', marginBottom: '0.9em'}}>
                    Use your current location
                </button>


                <button onClick={showAddressesPopup} style={{backgroundColor: '#f2c961', color: 'black', border: 'none',
                borderRadius: '1em', padding: '0.5em 1em', width: '80%', textAlign: 'center', cursor: 'pointer'}}>
                    Select or add/remove an address
                </button>

                <p style={{textAlign: 'center', fontSize: '0.85em'}}>
                    <span style={{marginRight: '0.55em', userSelect: 'none', fontSize: '0.65em', color: 'lightgray'}}>––––––––––––––</span> or enter a US zip code <span style={{marginLeft: '0.55em', userSelect: 'none', fontSize: '0.75em', color: 'lightgray'}}>––––––––––––––</span>
                </p>

                <div style={{display: 'flex', width: '73%', alignItems: 'center', gap: '0.4em', justifyContent: 'center'}}>
                    <textarea value={zipcodeTextareaValue} onChange={updateZipcodeTextareaValue} style={{fontFamily: 'Arial', padding: '0.5em 1em', resize: 'none', outline: 'none', height: '1em', width: '65%'}}></textarea>
                    <button onClick={onClickingApplyZipCode} style={{borderRadius: '1em', padding: '0.5em 1em', cursor: 'pointer', borderColor: 'darkgray', borderWidth: '0.01em', backgroundColor: 'white', color: 'black'}}>Apply</button>
                </div>

                {displayInvalidZipCodeMessage &&
                    <p style={{color: 'red', textAlign: 'center', fontSize: '0.9em'}}>Please enter a valid US zip code</p>
                }

                <p style={{textAlign: 'center', fontSize: '0.85em'}}>
                    <span style={{marginRight: '0.55em', userSelect: 'none', fontSize: '0.65em', color: 'lightgray'}}>––––––––––––––</span> or ship outside the US <span style={{marginLeft: '0.55em', userSelect: 'none', fontSize: '0.75em', color: 'lightgray'}}>––––––––––––––</span>
                </p>

                
                <select onChange={handleSelectionChange} style={{backgroundColor: '#ebebeb', paddingLeft: '1em', width: '70%', height: '2em'}}>
                    <option value="">Choose</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                    <option value="China">China</option>
                    <option value="Germany">Germany</option>
                    <option value="India">India</option>
                    <option value="Japan">Japan</option>
                    <option value="Mexico">Mexico</option>
                    <option value="United Kingdom">United Kingdom</option>
                </select>

                <br></br>

                <div style={{display: 'flex', width: '73%', justifyContent: 'flex-end'}}>
                    <button onClick={onClickingDone} style={{backgroundColor: 'navy', color: 'white', border: 'none',
                    borderRadius: '1em', padding: '0.5em 1em', textAlign: 'center', cursor: 'pointer'}}>
                        Done
                    </button>
                </div>
            

            </div>
        </>
    )
}

export default ChooseYourLocationPopup;