import { useEffect, useState } from 'react';
import blackScreen from './assets/blackScreen.png';
import AddressesPopup from './components/addressesPopup';
import AdvertisementPostersSection from './components/advertisementPostersSection';
import ChooseYourLocationPopup from './components/choseYourLocationPopup';
import LeftSidebar from './components/leftSidebar';
import SecondRowOfProductPromotionSquares from './components/secondRowOfProductPromotionSquares';
import SecondTopMostSection from './components/secondTopMostSection';
import TopMostSection from './components/topMostSection';


function App({params}) {
    const [authenticatedUsername, setAuthenticatedUsername] = useState("");
    const [displayLeftSidebar, setDisplayLeftSidebar] = useState(false);
    const [displayDarkScreen, setDisplayDarkScreen] = useState(false);
    const [displayDarkScreen2, setDisplayDarkScreen2] = useState(false);
    const [displayChooseYourLocationPopup, setDisplayChooseYourLocationPopup] = useState(false);
    const [deliveryArea, setDeliveryArea] = useState("Verona, 53593");
    const [displayAddressesPopup, setDisplayAddressesPopup] = useState(false);
    const [listOfAddresses, setListOfAddresses] = useState([
        [0, "231 Clay Court Zeeland, MI 53593", true],
        [1, "232 Clay Court Zeeland, MI 63101", false],
    ]);

    async function authenticateUser(username) {
        /*
        const response = await fetch('http://localhost:8003/cookies/authenticateUser/'+username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        if(!response.ok) {
            throw new Error('Network response not ok');
        }
        const isAuth = await response.json();
        if(isAuth) {
            localStorage.setItem('authenticatedUsername', username);
            setAuthenticatedUsername(username);
            return;
        }
        else {
            const data = {'username':username};
            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include',
            }
            const response2 = await fetch('http://localhost:8003/cookies/updateAuthToken', options);
            if(!response2.ok) {
                throw new Error('Network response not ok');
            }
            const response2Data = await response2.text();
            if(response2Data === "Cookie updated successfully") {
                const response3 = await fetch('http://localhost:8003/cookies/authenticateUser/'+username, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                if(!response3.ok) {
                    throw new Error('Network response not ok');
                }
                const isAuth = await response.json();
                if(isAuth) {
                    localStorage.setItem('authenticatedUsername', username);
                    setAuthenticatedUsername(username);
                    return;
                }
            }
            else if(response2Data === "Invalid refresh token for username") {
                const response4 = await fetch('http://localhost:8003/cookies/updateRefreshToken', options);
                if(!response4.ok) {
                    throw new Error('Network response not ok');
                }
                const response4Data = await response4.text();
                if(response4Data === "Cookie updated successfully"){
                    const response5 = await fetch('http://localhost:8003/cookies/authenticateUser/'+username, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include'
                    });
                    if(!response5.ok) {
                        throw new Error('Network response not ok');
                    }
                    const isAuth = await response.json();
                    if(isAuth) {
                        localStorage.setItem('authenticatedUsername', username);
                        setAuthenticatedUsername(username);
                        return;
                    }
                }
            }

        }
        window.location.href = "http://location:8000/login";
        */
        localStorage.setItem('authenticatedUsername', username);
        setAuthenticatedUsername(username);
    }

    useEffect(() => {
        async function startUserAuthentication() {
            if (params) {
                await authenticateUser(params.username);
            } else {
                const storedUsername = localStorage.getItem('authenticatedUsername');
                if (storedUsername !== null) {
                    await authenticateUser(storedUsername);
                } else {
                    window.location.href = "http://localhost:8000/login";
                }
            }
        }

    startUserAuthentication();
    }, []);

    function toggleLeftSidebar() {
        setDisplayLeftSidebar(!displayLeftSidebar);
    }

    function showDarkScreen() {
        setDisplayDarkScreen(true);
    }

    function hideDarkScreen() {
        setDisplayDarkScreen(false);
    }

    function toggleDarkScreen() {
        setDisplayDarkScreen(!displayDarkScreen);
    }

    function showChooseYourLocationPopup() {
        setDisplayChooseYourLocationPopup(true);
        setDisplayDarkScreen2(true);
    }

    function closeChooseYourLocationPopup(newLocationInfo) {
        if(newLocationInfo[0]!==null) {
            setDeliveryArea(newLocationInfo[0]);
        }
        else if(newLocationInfo[1]!==null) {
            setDeliveryArea(newLocationInfo[1])
        }
        setDisplayChooseYourLocationPopup(false);
        setDisplayDarkScreen2(false);
    }

    function showAddressesPopup() {
        setDisplayChooseYourLocationPopup(false);
        setDisplayAddressesPopup(true);
    }

    function closeAddressesPopup(newAddressInfo) {
        if(newAddressInfo==null) {
            setDisplayAddressesPopup(false);
            setDisplayChooseYourLocationPopup(true);
        }
        else {
            setDisplayAddressesPopup(false);
            setDisplayDarkScreen2(false);
            setDeliveryArea(newAddressInfo)
        }
    }

    function updateListOfAddresses(newListOfAddresses) {
        setListOfAddresses(newListOfAddresses);
    }

    return (
    <>
        {displayLeftSidebar && <div style={{height: "100%", width: "14%", position: "absolute", top: "0%", left: "0%"}}>
            <LeftSidebar authenticatedUsername={authenticatedUsername}></LeftSidebar>
        </div>}

        <div style={{height: "100%", width: displayLeftSidebar ? "86%" : "100%", position: "absolute", top: "0%", left: displayLeftSidebar ? "14%" : "0%", display: "flex",
        flexDirection: "column"}}>
            <TopMostSection authenticatedUsername={authenticatedUsername} showDarkScreen={showDarkScreen} hideDarkScreen={hideDarkScreen}
            showChooseYourLocationPopup={showChooseYourLocationPopup} deliveryArea={deliveryArea}></TopMostSection>
            <SecondTopMostSection isLeftSidebarDisplayed={displayLeftSidebar} notifyParentToToggleLeftSidebar={toggleLeftSidebar} toggleDarkScreen={toggleDarkScreen}></SecondTopMostSection>

            <div style={{height: '150%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative'}}>
                <AdvertisementPostersSection></AdvertisementPostersSection>
                <SecondRowOfProductPromotionSquares></SecondRowOfProductPromotionSquares>
                {displayDarkScreen &&
                    <img src={blackScreen} style={{position: 'absolute', top: '0%', left: '0%',
                    height: '100%', width: '100%', pointerEvents: 'none', opacity: '0.7'}}></img>
                }
            </div>

        </div>


        {displayChooseYourLocationPopup &&
            <ChooseYourLocationPopup closePopup={closeChooseYourLocationPopup} showAddressesPopup={showAddressesPopup}></ChooseYourLocationPopup>
        }

        {displayAddressesPopup &&
            <AddressesPopup closePopup={closeAddressesPopup} listOfAddresses={listOfAddresses} updateListOfAddresses={updateListOfAddresses}></AddressesPopup>
        }

        {displayDarkScreen2 &&
            <img src={blackScreen} style={{position: 'absolute', top: '0%', left: '0%', height: '100%', width: '100%', pointerEvents: 'none', opacity: '0.7'}}></img>
        }



    </>
        )
    }

export default App
