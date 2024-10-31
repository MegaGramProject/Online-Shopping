import { useEffect, useState } from 'react';
import plusIcon from '../assets/plusIcon.png';
import thinGrayXIcon from '../assets/thinGrayXIcon.png';
import SingleAddressInAddressesPopup from './singleAddressInAddressesPopup';


function AddressesPopup({closePopup, listOfAddresses, updateListOfAddresses}) {
    const [houseOrBuildingNumberTextareaValue, setHouseOrBuildingNumberTextareaValue] = useState("");
    const [streetNameTextareaValue, setStreetNameTextareaValue] = useState("");
    const [apartmentOrSuiteTextareaValue, setApartmentOrSuiteTextareaValue] = useState("");
    const [townOrCityTextareaValue, setTownOrCityTextareaValue] = useState("");
    const [stateOrProvinceTextareaValue, setStateOrProvinceTextareaValue] = useState("");
    const [zipCodeTextareaValue, setZipCodeTextareaValue] = useState("");
    const [countryTextareaValue, setCountryTextareaValue] = useState("");
    const [listOfAddressElems, setListOfAddressElems] = useState([]);
    const [isNewAddressAddable, setIsNewAddressAddable] = useState(false);
    const [isAddressFormatInvalid, setIsAddressFormatInvalid] = useState(false);



    useEffect(() => {
        const newListOfAddressesElems = [];
        for(let i=0; i<listOfAddresses.length; i++) {
            const currAddressInfo = listOfAddresses[i];
            newListOfAddressesElems.push(
                <SingleAddressInAddressesPopup key={i} id={currAddressInfo[0]}
                address={currAddressInfo[1]} isSelected={currAddressInfo[2]} notifyParentToSelectAddress={selectAddress} notifyParentToDeleteAddress={deleteAddress}
                notifyParentToUnselectAddress={unselectAddress}></SingleAddressInAddressesPopup>
            );
        }
        setListOfAddressElems(newListOfAddressesElems);
    }, [listOfAddresses]);
    

    function addNewAddress() {
        let addressText = "";
        if(apartmentOrSuiteTextareaValue.length>0){
            addressText = `${houseOrBuildingNumberTextareaValue} ${streetNameTextareaValue}\n${apartmentOrSuiteTextareaValue}\n${townOrCityTextareaValue}, ${stateOrProvinceTextareaValue} ${zipCodeTextareaValue},\n${countryTextareaValue==='the United States' ? 'USA' : countryTextareaValue}`;
        }
        else {
            addressText = `${houseOrBuildingNumberTextareaValue} ${streetNameTextareaValue}\n${townOrCityTextareaValue}, ${stateOrProvinceTextareaValue} ${zipCodeTextareaValue},\n${countryTextareaValue==='the United States' ? 'USA' : countryTextareaValue}`;
        }
        /*
        if(!addressIsValid(addressText)) {
            //use API to check if address maps to a real place
            setIsAddressFormatInvalid(true);
            return;
        }
         */
        setIsAddressFormatInvalid(false);
        const newListOfAddresses = [...listOfAddresses];
        newListOfAddresses.push([listOfAddresses.length, addressText, false, `${townOrCityTextareaValue}, ${zipCodeTextareaValue}`, countryTextareaValue]);
        updateListOfAddresses(newListOfAddresses);
        setHouseOrBuildingNumberTextareaValue("");
        setStreetNameTextareaValue("");
        setApartmentOrSuiteTextareaValue("");
        setTownOrCityTextareaValue("");
        setStateOrProvinceTextareaValue("");
        setZipCodeTextareaValue("");
        setCountryTextareaValue("");
        setIsNewAddressAddable(false);
    }

    async function selectAddress(idOfAddressToSelect) {
        let newListOfAddresses = [...listOfAddresses];
        let newlySelectedAddressArea = "";
        let newlySelectedAddressCountry = "";
        newListOfAddresses.map(addressInfo=>{
            if(addressInfo[2]===true) {
                addressInfo[2] = false;
            }
            else if(addressInfo[0]===idOfAddressToSelect) {
                newlySelectedAddressArea=`${addressInfo[3]}`;
                newlySelectedAddressCountry=`${addressInfo[4]}`;
                addressInfo[2] = true;
            }
            return addressInfo;
        });
        
        updateListOfAddresses(newListOfAddresses);
        closePopup([newlySelectedAddressArea, newlySelectedAddressCountry]);
    }

    function unselectAddress(idOfAddressToUnselect) {
        let newListOfAddresses = [...listOfAddresses];
        for(let i=0; i<newListOfAddresses.length; i++) {
            if(newListOfAddresses[i][0]===idOfAddressToUnselect) {
                newListOfAddresses[i][2] = false;
                updateListOfAddresses(newListOfAddresses);
                return;
            }
        }
    }

    function deleteAddress(idOfAddressToDelete) {
        let newListOfAddresses = [...listOfAddresses];
        newListOfAddresses = newListOfAddresses.filter(x=>x[0]!==idOfAddressToDelete);
        updateListOfAddresses(newListOfAddresses);
    }

    function onChangeTextarea1(event) {
        setHouseOrBuildingNumberTextareaValue(event.target.value);
        if(event.target.value.length>0 && streetNameTextareaValue.length>0 &&
        townOrCityTextareaValue.length>0 && stateOrProvinceTextareaValue.length>0 &&
        zipCodeTextareaValue.length>0 && countryTextareaValue.length>0) {
            setIsNewAddressAddable(true);
        }
        else {
            setIsNewAddressAddable(false);
        }
    }

    function onChangeTextarea2(event) {
        setStreetNameTextareaValue(event.target.value);
        if(houseOrBuildingNumberTextareaValue.length>0 && event.target.value.length>0 &&
        townOrCityTextareaValue.length>0 && stateOrProvinceTextareaValue.length>0 &&
        zipCodeTextareaValue.length>0 && countryTextareaValue.length>0) {
            setIsNewAddressAddable(true);
        }
        else {
            setIsNewAddressAddable(false);
        }
    }

    function onChangeTextarea3(event) {
        setApartmentOrSuiteTextareaValue(event.target.value);
    }

    function onChangeTextarea4(event) {
        setTownOrCityTextareaValue(event.target.value);
        if(houseOrBuildingNumberTextareaValue.length>0 && streetNameTextareaValue.length>0 &&
        event.target.value.length>0 && stateOrProvinceTextareaValue.length>0 &&
        zipCodeTextareaValue.length>0 && countryTextareaValue.length>0) {
            setIsNewAddressAddable(true);
        }
        else {
            setIsNewAddressAddable(false);
        }
    }

    function onChangeTextarea5(event) {
        setStateOrProvinceTextareaValue(event.target.value);
        if(houseOrBuildingNumberTextareaValue.length>0 && streetNameTextareaValue.length>0 &&
        townOrCityTextareaValue.length>0 && event.target.value.length>0 &&
        zipCodeTextareaValue.length>0 && countryTextareaValue.length>0) {
            setIsNewAddressAddable(true);
        }
        else {
            setIsNewAddressAddable(false);
        }
    }

    function onChangeTextarea6(event) {
        setZipCodeTextareaValue(event.target.value);
        if(houseOrBuildingNumberTextareaValue.length>0 && streetNameTextareaValue.length>0 &&
        townOrCityTextareaValue.length>0 && stateOrProvinceTextareaValue.length>0 &&
        event.target.value.length>0 && countryTextareaValue.length>0) {
            setIsNewAddressAddable(true);
        }
        else {
            setIsNewAddressAddable(false);
        }
    }

    function handleCountrySelectionChange(event) {
        console.log(event.target.value);
        setCountryTextareaValue(event.target.value);
        if(houseOrBuildingNumberTextareaValue.length>0 && streetNameTextareaValue.length>0 &&
        townOrCityTextareaValue.length>0 && stateOrProvinceTextareaValue.length>0 &&
        zipCodeTextareaValue.length>0 && event.target.value.length>0) {
            setIsNewAddressAddable(true);
        }
        else {
            setIsNewAddressAddable(false);
        }
    }

    return (
        <>
            <div style={{position: 'absolute', top: '2%', left: '25%', backgroundColor: 'white', zIndex: '10', display: 'flex',
            flexDirection: 'column', alignItems: 'center', width: '55%', height: '95%', borderRadius: '0.5em', paddingBottom: '0.6em', overflowY: 'scroll'}}>

                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8em 1.5em', backgroundColor: '#e8e8e8',
                    width: '95%', borderRadius: '0.5em'}}>
                        <b>Addresses</b>
                        <img onClick={() => closePopup([null, null])} src={thinGrayXIcon} style={{cursor: 'pointer', height: '1.5em', width: '1.5em'}}></img>
                    </div>

                    <div style={{width: '100%', height: '68%', overflowY: 'scroll', borderStyle: 'solid', borderTop: 'none', borderLeft: 'none', borderRight: 'none',
                    borderColor: 'lightgray'}}>
                        {listOfAddressElems}
                    </div>

                    <br></br>

                    <b style={{fontSize: '0.9em'}}>Add a new address</b>

                    <br></br>

                    <div style={{width: '100%', padding: '0.5em 1em', display: 'flex', flexDirection: 'column', gap: '1.5em', alignItems: 'center'}}>
                        <textarea value={houseOrBuildingNumberTextareaValue} onChange={onChangeTextarea1} placeholder="House/Building Number" style={{resize: 'none', outline: 'none', paddingLeft: '1em', paddingTop: '1em',
                        fontFamily: 'Arial', width: '80%'}}></textarea>

                        <textarea value={streetNameTextareaValue} onChange={onChangeTextarea2} placeholder="Street Name" style={{resize: 'none', outline: 'none', paddingLeft: '1em', paddingTop: '1em',
                        fontFamily: 'Arial', width: '80%'}}></textarea>

                        <textarea value={apartmentOrSuiteTextareaValue} onChange={onChangeTextarea3} placeholder="Apartment, suite, etc (optional)" style={{resize: 'none', outline: 'none', paddingLeft: '1em', paddingTop: '1em',
                        fontFamily: 'Arial', width: '80%'}}></textarea>

                        <textarea value={townOrCityTextareaValue} onChange={onChangeTextarea4} placeholder="Town/City" style={{resize: 'none', outline: 'none', paddingLeft: '1em', paddingTop: '1em',
                        fontFamily: 'Arial', width: '80%'}}></textarea>

                        <textarea value={stateOrProvinceTextareaValue} onChange={onChangeTextarea5} placeholder="State/Province" style={{resize: 'none', outline: 'none', paddingLeft: '1em', paddingTop: '1em',
                        fontFamily: 'Arial', width: '80%'}}></textarea>

                        <textarea value={zipCodeTextareaValue} onChange={onChangeTextarea6} placeholder="Zip-code" style={{resize: 'none', outline: 'none', paddingLeft: '1em', paddingTop: '1em',
                        fontFamily: 'Arial', width: '80%'}}></textarea>

                        <select onChange={handleCountrySelectionChange} style={{borderStyle: 'solid', borderColor: 'black', paddingLeft: '1em', height: '2em',
                        color: 'gray', width: '83%', fontSize: '0.85em', borderWidth: '0.09em'}}>
                            <option value="">Country</option>
                            <option value="the United States">United States</option>
                            <option value="Australia">Australia</option>
                            <option value="Canada">Canada</option>
                            <option value="China">China</option>
                            <option value="Germany">Germany</option>
                            <option value="India">India</option>
                            <option value="Japan">Japan</option>
                            <option value="Mexico">Mexico</option>
                            <option value="United Kingdom">United Kingdom</option>
                        </select>
                        
                        <img onClick={!isNewAddressAddable ? null : addNewAddress} src={plusIcon} style={{height: '1.5em', width: '1.5em', opacity: !isNewAddressAddable ? '0.3' : '1', cursor: !isNewAddressAddable ? 'auto' : 'pointer'}}></img>
                    </div>
                    {isAddressFormatInvalid &&
                        <small style={{color: 'red', textAlign: 'center'}}>Invalid format</small>
                    }

            </div>
        </>
    )
}

export default AddressesPopup;