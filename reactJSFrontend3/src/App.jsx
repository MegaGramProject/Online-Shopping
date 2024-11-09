import { useEffect, useState } from 'react';
import blackScreen from './assets/blackScreen.png';
import AddressesPopup from './components/addressesPopup';
import AdvertisementPostersSection from './components/advertisementPostersSection';
import ChooseYourLocationPopup from './components/choseYourLocationPopup';
import FinalRowOfProductPromotionSquares from './components/finalRowOfProductPromotionSquares';
import Footer from './components/footer';
import LeftSidebar from './components/leftSidebar';
import ProductPromotionRectangle from './components/productPromotionRectangle';
import SecondRowOfProductPromotionSquares from './components/secondRowOfProductPromotionSquares';
import SecondTopMostSection from './components/secondTopMostSection';
import SimilarCustomerProductsSection from './components/similarCustomerProductsSection';
import ThirdRowOfProductPromotionSquares from './components/thirdRowOfProductPromotionSquares';
import TopMostSection from './components/topMostSection';
import './styles.css';


//this is for the main page of the shop. i.e http://localhost:8024/onlineShopping/{username}
function App({params}) {
    const [authenticatedUsername, setAuthenticatedUsername] = useState("");
    const [hasPremium, setHasPremium] = useState(null);
    const [displayLeftSidebar, setDisplayLeftSidebar] = useState(false);
    const [displayDarkScreen, setDisplayDarkScreen] = useState(false);
    const [displayDarkScreen2, setDisplayDarkScreen2] = useState(false);
    const [displayChooseYourLocationPopup, setDisplayChooseYourLocationPopup] = useState(false);
    const [deliveryArea, setDeliveryArea] = useState("");
    const [deliveryAreaCountry, setDeliveryAreaCountry] = useState("");
    const [displayAddressesPopup, setDisplayAddressesPopup] = useState(false);
    const [numItemsInCart, setNumItemsInCart] = useState(0);
    const [deliveryZipcode, setDeliveryZipcode] = useState(null);
    const [idsOfProductsAvailableToUser, setIdsOfProductsAvailableToUser] = useState(null);
    const [allPastSearchesOfUser, setAllPastSearchesOfUser] = useState(null);
    const [selectedAddressOfUser, setSelectedAddressOfUser] = useState(null);

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
                fetchRelevantDataAtStart(params.username);
            } else {
                const storedUsername = localStorage.getItem('authenticatedUsername');
                if (storedUsername !== null) {
                    await authenticateUser(storedUsername);
                    fetchRelevantDataAtStart(storedUsername);
                } else {
                    window.location.href = "http://localhost:8000/login";
                }
            }
        }

    startUserAuthentication();
    }, []);

    async function fetchRelevantDataAtStart(authUsername) {
        return;
        /*
        const response = await fetch(`http://localhost:8022/getBasicUserInfo/${authUsername}`);
        if(!response.ok) {
            throw new Error('Network response not ok');
        }
        const basicUserInfo = await response.json();
        if(basicUserInfo.zipCode==null) {
            setDeliveryArea(basicUserInfo.deliveryAreaCountry);
        }
        else {
            setDeliveryArea(`${basicUserInfo.townOrCity}, ${basicUserInfo.zipCode}`);
            setDeliveryZipcode(basicUserInfo.zipCode);
        }
        setDeliveryAreaCountry(basicUserInfo.deliveryAreaCountry);
        setHasPremium(basicUserInfo.hasPremium == 1 ? true : false);
        */
        setDeliveryArea('Verona, 53593');
        setDeliveryZipcode('53593');
        setDeliveryAreaCountry('the United States');
        setHasPremium(true);

        /*
        const response2  = await fetch('http://localhost:8029/graphql',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                query: `query {
                getAllShoppingCartItemsOfUser(username:"${authUsername}") {
                    username
                    productId
                    optionsChosen
                }
            }
            `
            })
        });
        if(!response2.ok) {
            throw new Error('Network response not ok');
        }
        let shoppingCartItemsOfUser = await response2.json();
        shoppingCartItemsOfUser = shoppingCartItemsOfUser.data.getAllShoppingCartItemsOfUser;
        setNumItemsInCart(shoppingCartItemsOfUser.length);
        */
        setNumItemsInCart(25);
        
        const response3 = await fetch(`http://localhost:8025/getShopSearchesOfUser/${authUsername}`);
        if(!response3.ok) {
            throw new Error('Network response not ok');
        }
        const fetchedPastSearches = await response3.json();
        let newPastSearchesOfUser = [];
        for(let fetchedPastSearch of fetchedPastSearches) {
            newPastSearchesOfUser.push([fetchedPastSearch.search, fetchedPastSearch.searchCategory]);
        }
        setAllPastSearchesOfUser(newPastSearchesOfUser);

        const response4 = await fetch(`http://localhost:8026/getSelectedAddressOfUser/${authUsername}`);
        if(!response4.ok){
            setSelectedAddressOfUser("");
        }
        else {
            let selectedAddressOfUser = await response4.json();

            let newSelectedAddress = "";
            if(selectedAddressOfUser.house_or_building_number!==null) {
                newSelectedAddress+=selectedAddressOfUser.house_or_building_number + " " + selectedAddressOfUser.street_name+", ";
            }
            else {
                newSelectedAddress+=selectedAddressOfUser.street_name+", ";
            }
            if(selectedAddressOfUser.apartment_or_suite!==null) {
                newSelectedAddress+=selectedAddressOfUser.apartment_or_suite+", ";
            }
            newSelectedAddress+=selectedAddressOfUser.town_or_city;
            if(selectedAddressOfUser.state_or_province!==null) {
                newSelectedAddress+=" " + selectedAddressOfUser.state_or_province + " " + selectedAddressOfUser.zipcode+", ";
            }
            else {
                newSelectedAddress+=" " + selectedAddressOfUser.zipcode+", ";
            }

            newSelectedAddress+=selectedAddressOfUser.country;
            setSelectedAddressOfUser(newSelectedAddress);
        }

        setIdsOfProductsAvailableToUser([
            "671c4132368a9fb6fe7f7d62",
            "671c474a368a9fb6fe7f7d66",
            "671c49cb368a9fb6fe7f7d69",
            "671c4e33368a9fb6fe7f7d6b",
            "671c5003368a9fb6fe7f7d6d",
            "671c52f4368a9fb6fe7f7d6f",
            "671c54d0368a9fb6fe7f7d72",
            "671c5644368a9fb6fe7f7d73",
            "671c59a0368a9fb6fe7f7d75",
            "671c5bb5f2f337dfead9f20d"
        ]);
        return;

        const response5 = await fetch('http://localhost:8027/api/getProductsThatDeliverToLocation', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                zipcode: '53593',
                country: 'the United States'
            })
        });
        if(!response5.ok) {
            throw new Error('Network response not ok');
        }
        let newIdsOfProductsAvailableToUser = await response5.json();
        newIdsOfProductsAvailableToUser = newIdsOfProductsAvailableToUser.map(x=>x.productId);
        
        const response6 = await fetch('http://localhost:8026/getNumProductsLeftForListOfProducts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newIdsOfProductsAvailableToUser)
        });
        if(!response6.ok) {
            throw new Error('Network response not ok');
        }
        const numProductsLeftForListOfProducts = await response6.json();

        const response7 = await fetch('http://localhost:8030/getProductIdsOfThoseInStock', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                numProductsLeftForListOfProducts: numProductsLeftForListOfProducts
            })
        });
        if(!response7.ok) {
            throw new Error('Network response not ok');
        }

        newIdsOfProductsAvailableToUser = await response7.json();
        setIdsOfProductsAvailableToUser(newIdsOfProductsAvailableToUser);
    }

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

    async function closeChooseYourLocationPopup(newLocationInfo) {
        if(newLocationInfo[0]!==null) {
            if(newLocationInfo[0]!==deliveryArea || newLocationInfo[1]!==deliveryAreaCountry) {
                const response = await fetch(`http://localhost:8022/editBasicUserInfo/${authenticatedUsername}`, {
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        hasPremium: hasPremium,
                        deliveryAreaCountry: newLocationInfo[1],
                        townOrCity: newLocationInfo[0].split(",")[0],
                        zipCode: newLocationInfo[0].split(",")[1].substring(1)
                    })
                });
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                setDeliveryArea(newLocationInfo[0]);
                setDeliveryZipcode(newLocationInfo[0].split(",")[1].substring(1));
                setDeliveryAreaCountry(newLocationInfo[1]);
                if(selectedAddressOfUser!==null && selectedAddressOfUser.length>0) {
                    const response1 = await fetch(`http://localhost:8026/unselectSelectedAddressOfUser/${authenticatedUsername}`, {
                        method: 'PATCH'
                    });
                    if(!response1.ok) {
                        throw new Error('Network response not ok');
                    }
                    setSelectedAddressOfUser("");
                }
            }
        }
        else if(newLocationInfo[1]!==null) {
            if(newLocationInfo[1]!==deliveryAreaCountry) {
                const response = await fetch(`http://localhost:8022/editBasicUserInfo/${authenticatedUsername}`, {
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        hasPremium: hasPremium,
                        deliveryAreaCountry: newLocationInfo[1],
                        townOrCity: null,
                        zipCode: null
                    })
                });
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                setDeliveryArea(newLocationInfo[1]);
                setDeliveryZipcode(null);
                setDeliveryAreaCountry(newLocationInfo[1]);
                if(selectedAddressOfUser!==null && selectedAddressOfUser.length>0) {
                    const response1 = await fetch(`http://localhost:8026/unselectSelectedAddressOfUser/${authenticatedUsername}`, {
                        method: 'PATCH'
                    });
                    if(!response1.ok) {
                        throw new Error('Network response not ok');
                    }
                    setSelectedAddressOfUser("");
                }
            }
        }
        setDisplayChooseYourLocationPopup(false);
        setDisplayDarkScreen2(false);
    }

    function showAddressesPopup() {
        setDisplayChooseYourLocationPopup(false);
        setDisplayAddressesPopup(true);
    }

    async function closeAddressesPopup(newAddressInfo) {
        if(newAddressInfo[0]==null) {
            setDisplayAddressesPopup(false);
            setDisplayChooseYourLocationPopup(true);
        }
        else {
            setDisplayAddressesPopup(false);
            setDisplayDarkScreen2(false);
            if(newAddressInfo[0]!==deliveryArea || newAddressInfo[1]!==deliveryAreaCountry) {
                const response = await fetch(`http://localhost:8022/editBasicUserInfo/${authenticatedUsername}`, {
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        hasPremium: hasPremium,
                        deliveryAreaCountry: newAddressInfo[1],
                        townOrCity: newAddressInfo[0].split(",")[0],
                        zipCode: newAddressInfo[0].split(",")[1].substring(1)
                    })
                });
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                setDeliveryArea(newAddressInfo[0]);
                setDeliveryZipcode(newAddressInfo[0].split(",")[1].substring(1));
                setDeliveryAreaCountry(newAddressInfo[1]);
                if(selectedAddressOfUser!==null && selectedAddressOfUser.length>0) {
                    const response1 = await fetch(`http://localhost:8026/unselectSelectedAddressOfUser/${authenticatedUsername}`, {
                        method: 'PATCH'
                    });
                    if(!response1.ok) {
                        throw new Error('Network response not ok');
                    }
                    setSelectedAddressOfUser("");
                }
            }
        }
    }

    async function updateDeliveryAreaCountryFromFooter(newCountry) {
        if(newCountry===deliveryAreaCountry) {
            return;
        }
        const response = await fetch(`http://localhost:8022/editBasicUserInfo/${authenticatedUsername}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                hasPremium: hasPremium,
                deliveryAreaCountry: newCountry,
                townOrCity: null,
                zipCode: null
            })
        });
        if(!response.ok) {
            throw new Error('Network response not ok');
        }
        setDeliveryArea(newCountry);
        setDeliveryZipcode(null);
        setDeliveryAreaCountry(newCountry);

        if(selectedAddressOfUser!==null && selectedAddressOfUser.length>0) {
            const response1 = await fetch(`http://localhost:8026/unselectSelectedAddressOfUser/${authenticatedUsername}`, {
                method: 'PATCH'
            });
            if(!response1.ok) {
                throw new Error('Network response not ok');
            }
            setSelectedAddressOfUser("");
        }
    }

    return (
    <>
        {displayLeftSidebar && <div style={{height: "100%", width: "14%", position: "absolute", top: "0%", left: "0%"}}>
            <LeftSidebar authenticatedUsername={authenticatedUsername}></LeftSidebar>
        </div>}

        <div style={{height: "100%", width: displayLeftSidebar ? "86%" : "100%", position: "absolute", top: "0%", left: displayLeftSidebar ? "14%" : "0%", display: "flex",
        flexDirection: "column"}}>
            <TopMostSection authenticatedUsername={authenticatedUsername} showDarkScreen={showDarkScreen} hideDarkScreen={hideDarkScreen}
            showChooseYourLocationPopup={showChooseYourLocationPopup} deliveryArea={deliveryArea} hasPremium={hasPremium}
            numItemsInCart={numItemsInCart} allPastSearchesOfUser={allPastSearchesOfUser}></TopMostSection>
            <SecondTopMostSection isLeftSidebarDisplayed={displayLeftSidebar} notifyParentToToggleLeftSidebar={toggleLeftSidebar}
            toggleDarkScreen={toggleDarkScreen} hasPremium={hasPremium}></SecondTopMostSection>

            <div style={{height: '550%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative'}}>
                <AdvertisementPostersSection deliveryAreaCountry={deliveryAreaCountry}></AdvertisementPostersSection>
                <SecondRowOfProductPromotionSquares deliveryAreaCountry={deliveryAreaCountry}></SecondRowOfProductPromotionSquares>
                <ProductPromotionRectangle title="International Bestsellers Available for Your Location"
                idsOfProductsAvailableToUser={idsOfProductsAvailableToUser} deliveryCountry={deliveryAreaCountry}></ProductPromotionRectangle>
                <div style={{height: '7em'}}>
                    {/*Empty div on purpose*/}
                </div>
                <ProductPromotionRectangle title={`Bestsellers in ${deliveryAreaCountry} Available for Your Location`}
                idsOfProductsAvailableToUser={idsOfProductsAvailableToUser} deliveryCountry={deliveryAreaCountry}></ProductPromotionRectangle>
                <ThirdRowOfProductPromotionSquares></ThirdRowOfProductPromotionSquares>
                <FinalRowOfProductPromotionSquares></FinalRowOfProductPromotionSquares>
                <ProductPromotionRectangle title={`International Bestsellers in Sports & Outdoors Available for Your Location`}
                idsOfProductsAvailableToUser={idsOfProductsAvailableToUser} deliveryCountry={deliveryAreaCountry}></ProductPromotionRectangle>
                <div style={{height: '7em'}}>
                    {/*Empty div on purpose*/}
                </div>
                <ProductPromotionRectangle title={`International Bestsellers in Books Available for Your Location`}
                idsOfProductsAvailableToUser={idsOfProductsAvailableToUser} deliveryCountry={deliveryAreaCountry}></ProductPromotionRectangle>
                <div style={{height: '7em'}}>
                    {/*Empty div on purpose*/}
                </div>
                <ProductPromotionRectangle title={`International Bestsellers in Food Available for Your Location`}
                idsOfProductsAvailableToUser={idsOfProductsAvailableToUser} deliveryCountry={deliveryAreaCountry}></ProductPromotionRectangle>

                <SimilarCustomerProductsSection deliveryAreaCountry={deliveryAreaCountry} allPastSearchesOfUser={allPastSearchesOfUser}
                hasPremium={hasPremium} authenticatedUsername={authenticatedUsername} idsOfProductsAvailableToUser={idsOfProductsAvailableToUser}
                selectedAddressOfUser={selectedAddressOfUser}></SimilarCustomerProductsSection>

                <Footer notifyParentToUpdateDeliveryAreaCountry={updateDeliveryAreaCountryFromFooter} deliveryAreaCountry={deliveryAreaCountry}></Footer>

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
            <AddressesPopup closePopup={closeAddressesPopup} authenticatedUsername={authenticatedUsername}></AddressesPopup>
        }

        {displayDarkScreen2 &&
            <img src={blackScreen} style={{position: 'absolute', top: '0%', left: '0%', height: '560%', width: '100%', pointerEvents: 'none', opacity: '0.7'}}></img>
        }



    </>
        )
    }

export default App
