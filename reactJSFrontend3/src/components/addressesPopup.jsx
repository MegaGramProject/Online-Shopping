import { useEffect, useState } from 'react';
import plusIcon from '../assets/plusIcon.png';
import thinGrayXIcon from '../assets/thinGrayXIcon.png';
import SingleAddressInAddressesPopup from './singleAddressInAddressesPopup';


function AddressesPopup({authenticatedUsername, closePopup}) {
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
    const [listOfAddresses, setListOfAddresses] = useState([]);

    useEffect(() => {
        fetchAddressesOfUser();
    }, [authenticatedUsername]);

    useEffect(() => {
        const newListOfAddressesElems = [];
        for(let i=0; i<listOfAddresses.length; i++) {
            const currAddressInfo = listOfAddresses[i];

            let currAddress = "";
            if(currAddressInfo.house_or_building_number!==null) {
                currAddress+=currAddressInfo.house_or_building_number + " " + currAddressInfo.street_name+"\n";
            }
            else {
                currAddress+=currAddressInfo.street_name+"\n";
            }
            if(currAddressInfo.apartment_or_suite!==null) {
                currAddress+=currAddressInfo.apartment_or_suite+"\n";
            }
            currAddress+=currAddressInfo.town_or_city;
            if(currAddressInfo.state_or_province!==null) {
                currAddress+=" " + currAddressInfo.state_or_province + ", " + currAddressInfo.zipcode+"\n";
            }
            else {
                currAddress+=", " + currAddressInfo.zipcode+"\n";
            }

            currAddress+=currAddressInfo.country;

            newListOfAddressesElems.push(
                <SingleAddressInAddressesPopup key={i} id={currAddressInfo.id}
                address={currAddress} isSelected={currAddressInfo.is_selected} notifyParentToSelectAddress={selectAddress} notifyParentToDeleteAddress={deleteCustomerAddress}
                notifyParentToUnselectAddress={unselectAddress}></SingleAddressInAddressesPopup>
            );
        }
        setListOfAddressElems(newListOfAddressesElems);
    }, [listOfAddresses]);

    async function fetchAddressesOfUser() {
        const response = await fetch(`http://localhost:8026/getAddressesOfUser/${authenticatedUsername}`);
        if(!response.ok){
            throw new Error('Network response not ok');
        }
        let customerAddresses = await response.json();
        setListOfAddresses(customerAddresses);
    }
    

    async function addNewAddress() {
        let addressText = "";
        if(houseOrBuildingNumberTextareaValue!=="") {
            addressText+=houseOrBuildingNumberTextareaValue + " " + streetNameTextareaValue+"\n";
        }
        else {
            addressText+=streetNameTextareaValue+"\n";
        }
        if(apartmentOrSuiteTextareaValue!=="") {
            addressText+=apartmentOrSuiteTextareaValue+"\n";
        }
        addressText+=townOrCityTextareaValue;
        if(stateOrProvinceTextareaValue!==null) {
            addressText+=" " + stateOrProvinceTextareaValue + ", " + zipCodeTextareaValue + "\n";
        }
        else {
            addressText+=", " + zipCodeTextareaValue+"\n";
        }
        addressText+=countryTextareaValue;


        /*
        if(!addressIsValid(addressText)) {
            //use API to check if address maps to a real place
            setIsAddressFormatInvalid(true);
            return;
        }
        */

        const response = await fetch('http://localhost:8026/addNewCustomerAddress', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: authenticatedUsername,
                house_or_building_number: houseOrBuildingNumberTextareaValue.length > 0 ? houseOrBuildingNumberTextareaValue : null,
                street_name: streetNameTextareaValue,
                apartment_or_suite: apartmentOrSuiteTextareaValue.length > 0 ? apartmentOrSuiteTextareaValue : null,
                town_or_city: townOrCityTextareaValue,
                state_or_province: stateOrProvinceTextareaValue.length > 0 ? stateOrProvinceTextareaValue : null,
                zipcode: zipCodeTextareaValue,
                country: countryTextareaValue,
                is_selected: false
            })
        });
        if(!response.ok) {
            throw new Error('Network response not ok');
        }
        const idOfNewlyInsertedAddress = await response.json();

        setIsAddressFormatInvalid(false);
        const newListOfAddresses = [...listOfAddresses];

        newListOfAddresses.push({
            id: idOfNewlyInsertedAddress,
            username: authenticatedUsername,
            house_or_building_number: houseOrBuildingNumberTextareaValue.length > 0 ? houseOrBuildingNumberTextareaValue : null,
            street_name: streetNameTextareaValue,
            apartment_or_suite: apartmentOrSuiteTextareaValue.length > 0 ? apartmentOrSuiteTextareaValue : null,
            town_or_city: townOrCityTextareaValue,
            state_or_province: stateOrProvinceTextareaValue.length > 0 ? stateOrProvinceTextareaValue : null,
            zipcode: zipCodeTextareaValue,
            country: countryTextareaValue,
            is_selected: false
        });
        setListOfAddresses(newListOfAddresses);
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
        for(let i=0; i<newListOfAddresses.length; i++) {
            const currAddressInfo = newListOfAddresses[i];
            if(currAddressInfo.is_selected===true) {
                const response = await fetch(`http://localhost:8026/toggleSelectCustomerAddress/${currAddressInfo.id}`, {
                    method: 'PATCH'
                });
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                newListOfAddresses[i].is_selected = false;
            }
            else if(currAddressInfo.id==idOfAddressToSelect) {
                const response = await fetch(`http://localhost:8026/toggleSelectCustomerAddress/${currAddressInfo.id}`, {
                    method: 'PATCH'
                });
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                newlySelectedAddressArea=currAddressInfo.town_or_city + ", " + currAddressInfo.zipcode;
                newlySelectedAddressCountry=currAddressInfo.country;
                newListOfAddresses[i].is_selected = true;
            }
        }
        setListOfAddresses(newListOfAddresses);
        closePopup([newlySelectedAddressArea, newlySelectedAddressCountry]);
    }

    async function unselectAddress(idOfAddressToUnselect) {
        let newListOfAddresses = [...listOfAddresses];
        for(let i=0; i<newListOfAddresses.length; i++) {
            if(newListOfAddresses[i].id===idOfAddressToUnselect) {
                const response = await fetch(`http://localhost:8026/toggleSelectCustomerAddress/${idOfAddressToUnselect}`, {
                    method: 'PATCH'
                });
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                newListOfAddresses[i].is_selected = false;
                setListOfAddresses(newListOfAddresses);
                return;
            }
        }
    }

    async function deleteCustomerAddress(idOfAddressToDelete) {
        const response = await fetch(`http://localhost:8026/deleteCustomerAddress/${idOfAddressToDelete}`,{
            method: 'DELETE'
        });
        if(!response.ok) {
            throw new Error('Network response not ok');
        }
        let newListOfAddresses = listOfAddresses.filter(x=>x.id!==idOfAddressToDelete);
        setListOfAddresses(newListOfAddresses);
    }

    function onChangeTextarea1(event) {
        setHouseOrBuildingNumberTextareaValue(event.target.value);
    }

    function onChangeTextarea2(event) {
        setStreetNameTextareaValue(event.target.value);
        if(event.target.value.length>0 &&
        townOrCityTextareaValue.length>0 && zipCodeTextareaValue.length>0 && countryTextareaValue.length>0) {
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
        if(event.target.value.length>0 &&
            streetNameTextareaValue.length>0 && zipCodeTextareaValue.length>0 && countryTextareaValue.length>0) {
                setIsNewAddressAddable(true);
            }
        else {
            setIsNewAddressAddable(false);
        }
    }

    function onChangeTextarea5(event) {
        setStateOrProvinceTextareaValue(event.target.value);
    }

    function onChangeTextarea6(event) {
        setZipCodeTextareaValue(event.target.value);
        if(event.target.value.length>0 &&
            townOrCityTextareaValue.length>0 && streetNameTextareaValue.length>0 && countryTextareaValue.length>0) {
                setIsNewAddressAddable(true);
        }
        else {
            setIsNewAddressAddable(false);
        }
        }

    function handleCountrySelectionChange(event) {
        setCountryTextareaValue(event.target.value);
        if(event.target.value.length>0 &&
            townOrCityTextareaValue.length>0 && zipCodeTextareaValue.length>0 && streetNameTextareaValue.length>0) {
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