import { useEffect, useState } from 'react';
import LeftSidebar from './components/leftSidebar';
import TopMostSection from './components/topMostSection';
import SecondTopMostSection from './components/secondTopMostSection';
import blackScreen from './assets/blackScreen.png'


function App({params}) {
    const [authenticatedUsername, setAuthenticatedUsername] = useState("");
    const [displayLeftSidebar, setDisplayLeftSidebar] = useState(false);
    const [displayDarkScreen, setDisplayDarkScreen] = useState(false);

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

    return (
    <>
        {displayLeftSidebar && <div style={{height: "100%", width: "14%", position: "absolute", top: "0%", left: "0%"}}>
            <LeftSidebar authenticatedUsername={authenticatedUsername}></LeftSidebar>
        </div>}

        <div style={{height: "100%", width: displayLeftSidebar ? "86%" : "100%", position: "absolute", top: "0%", left: displayLeftSidebar ? "14%" : "0%", display: "flex",
        flexDirection: "column"}}>
            <TopMostSection authenticatedUsername={authenticatedUsername}></TopMostSection>
            <SecondTopMostSection isLeftSidebarDisplayed={displayLeftSidebar} notifyParentToToggleLeftSidebar={toggleLeftSidebar} toggleDarkScreen={toggleDarkScreen}></SecondTopMostSection>
            
            {displayDarkScreen &&
                <img src={blackScreen} style={{height: '100%', width: '100%', pointerEvents: 'none', opacity: '0.7'}}></img>
            }
        </div>

    </>
        )
    }

export default App
