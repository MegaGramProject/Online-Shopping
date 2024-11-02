import trashCan from '../assets/trashCan.webp';

function SingleAddressInAddressesPopup({id, address, isSelected, notifyParentToSelectAddress, notifyParentToUnselectAddress,
notifyParentToDeleteAddress}) {

    function selectAddress() {
        notifyParentToSelectAddress(id);
    }

    function unselectAddress() {
        notifyParentToUnselectAddress(id);
    }

    function deleteAddress(event) {
        notifyParentToDeleteAddress(id);
    }


    return (
        <>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5em 1em', marginBottom: '-1em'}}>
                    <p style={{ maxWidth: '85%', whiteSpace: 'pre-wrap' }}>{address}</p>

                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5em'}}>
                        <img onClick={deleteAddress} src={trashCan} style={{height: '0.7em', width: '0.7em', cursor: 'pointer'}}></img>
                        {isSelected &&
                            <button onClick={unselectAddress} style={{color: 'white', backgroundColor: 'black', cursor: 'pointer', borderRadius: '1em', border: 'none', padding: '0.35em 0.8em'}}>Unselect</button>
                        }
                        {!isSelected &&
                            <button onClick={selectAddress} style={{color: 'white', backgroundColor: 'black', cursor: 'pointer', borderRadius: '1em', border: 'none', padding: '0.35em 0.8em'}}>Select</button>
                        }
                    </div>
            </div>
        </>
    )
}

export default SingleAddressInAddressesPopup;