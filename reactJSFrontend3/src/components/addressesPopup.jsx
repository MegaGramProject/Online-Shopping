import { useEffect, useState } from 'react';
import plusIcon from '../assets/plusIcon.png';
import thinGrayXIcon from '../assets/thinGrayXIcon.png';
import SingleAddressInAddressesPopup from './singleAddressInAddressesPopup';


function AddressesPopup({closePopup, listOfAddresses, updateListOfAddresses}) {
    const [newAddressTextareaValue, setNewAddressTextareaValue] = useState("");
    const [listOfAddressElems, setListOfAddressElems] = useState([]);
    const [isNewAddressEmpty, setIsNewAddressEmpty] = useState(true);
    const [isAddressFormatInvalid, setIsAddressFormatInvalid] = useState(false);


    function updateNewAddressTextareaValue(event) {
        setNewAddressTextareaValue(event.target.value);
        if(event.target.value.length==0) {
            setIsNewAddressEmpty(true);
        }
        else if(isNewAddressEmpty) {
            setIsNewAddressEmpty(false);
        }
    }

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

    function isValidAddress(address) {
        //later use real API
        const addressRegex = /^[0-9]+\s+([A-Za-z.\s]+?)\s+([A-Za-z\s]+),\s+[A-Z]{2}\s+\d{5}?$/;
        return addressRegex.test(address);
    }
    

    function addNewAddress() {
        if(!isValidAddress(newAddressTextareaValue)) {
            setIsAddressFormatInvalid(true);
        }
        else {
            setIsAddressFormatInvalid(false);
    
            const newListOfAddresses = [...listOfAddresses];
            newListOfAddresses.push([listOfAddresses.length, newAddressTextareaValue]);
            updateListOfAddresses(newListOfAddresses);

            setNewAddressTextareaValue("");
            setIsNewAddressEmpty(true);
        }
    }

    async function selectAddress(idOfAddressToSelect) {
        let newListOfAddresses = [...listOfAddresses];
        let newlySelectedAddressZipCode = "";
        let newlySelectedAddressPlaceName = "";
        newListOfAddresses.map(addressInfo=>{
            if(addressInfo[2]===true) {
                addressInfo[2] = false;
            }
            else if(addressInfo[0]===idOfAddressToSelect) {
                newlySelectedAddressZipCode = addressInfo[1].slice(-5);
                addressInfo[2] = true;
            }
            return addressInfo;
        });
        const response = await fetch(`https://api.zippopotam.us/us/${newlySelectedAddressZipCode}`);
        if (!response.ok) {
            throw new Error('Network response not ok');
        }
        else {
            const data = await response.json();
            newlySelectedAddressPlaceName = data.places[0]['place name'];
        }
        updateListOfAddresses(newListOfAddresses);
        closePopup(`${newlySelectedAddressPlaceName}, ${newlySelectedAddressZipCode}`);
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


    return (
        <>
            <div style={{position: 'absolute', top: '25%', left: '40%', backgroundColor: 'white', zIndex: '10', display: 'flex',
            flexDirection: 'column', alignItems: 'center', width: '25%', height: '46%', borderRadius: '0.5em', paddingBottom: '0.6em'}}>

                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8em 1.5em', backgroundColor: '#e8e8e8',
                    width: '89%', borderRadius: '0.5em'}}>
                        <b>Addresses</b>
                        <img onClick={() => closePopup(null)} src={thinGrayXIcon} style={{cursor: 'pointer', height: '1.5em', width: '1.5em'}}></img>
                    </div>

                    <div style={{width: '100%', height: '68%', overflowY: 'scroll', borderStyle: 'solid', borderTop: 'none', borderLeft: 'none', borderRight: 'none',
                    borderColor: 'lightgray'}}>
                        {listOfAddressElems}
                    </div>

                    <br></br>

                    <div style={{width: '100%', height: '17%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5em'}}>
                        <textarea value={newAddressTextareaValue} onChange={updateNewAddressTextareaValue} placeholder="Add a new address..." style={{resize: 'none', outline: 'none', paddingLeft: '1em', paddingTop: '1em',
                        fontFamily: 'Arial', width: '65%'}}></textarea>
                        <img onClick={isNewAddressEmpty ? null : addNewAddress} src={plusIcon} style={{height: '1.5em', width: '1.5em', opacity: isNewAddressEmpty ? '0.3' : '1', cursor: isNewAddressEmpty ? 'auto' : 'pointer'}}></img>
                    </div>
                    {isAddressFormatInvalid &&
                        <small style={{color: 'red', textAlign: 'center'}}>Invalid format</small>
                    }

            </div>
        </>
    )
}

export default AddressesPopup;