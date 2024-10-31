import PropTypes from 'prop-types';
import reportAProblemIcon from '../assets/reportAProblemIcon.png';
import saveIcon from '../assets/saveIcon.png';
import settingsIcon from '../assets/settingsIcon.png';
import yourActivityIcon from '../assets/yourActivityIcon.png';
import '../styles.css';

function LeftSidebarPopup({authenticatedUsername}) {

    LeftSidebarPopup.propTypes = {
        authenticatedUsername: PropTypes.string
    };


    async function logoutUser() {
        /*
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username': authenticatedUsername}),
            credentials: 'include'
        };
        const response = await fetch('http://localhost:8003/cookies/removeTokens', options);
        if(!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.text();
        if(responseData === "Successfully logged out") {
            window.location.href = 'http://localhost:8000/login';
        }
        else {
            console.log(responseData);
        }
        */
    }

    function takeUserToLogin() {
        window.location.href = "http://localhost:8000/login";
    }

    function takeUserToSeeTheirSavedPosts() {
        window.location.href = "http://localhost:8019/saves/"+authenticatedUsername;
    }

    return (
    <>
        <div className="popup" style={{width: '15em', height:'20em', borderRadius:'0.4em', paddingTop: '1em', backgroundColor: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
                <div className="sidebarElement" style={{display:'flex', justifyContent:'start', alignItems:'center', marginLeft:'0.9em', width:'14em'}}>
                    <img src={settingsIcon} style={{height:'2em', width:'2em', pointerEvents:'none', objectFit:'contain'}}/>
                    <p style={{fontSize:'0.89em', marginLeft:'0.4em'}}>Settings</p>
                </div>
                <div className="sidebarElement" style={{display:'flex', justifyContent:'start', alignItems:'center', marginLeft:'0.9em', width:'14em'}}>
                    <img src={yourActivityIcon} style={{height:'2em', width:'2em', pointerEvents:'none', objectFit:'contain'}}/>
                    <p style={{fontSize:'0.89em', marginLeft:'0.4em'}}>Activity</p>
                </div>
                <div onClick={takeUserToSeeTheirSavedPosts} className="sidebarElement" style={{display:'flex', justifyContent:'start', alignItems:'center', marginLeft:'0.9em', width:'14em'}}>
                    <img src={saveIcon} style={{height:'2em', width:'2em', pointerEvents:'none', objectFit:'contain'}}/>
                    <p style={{fontSize:'0.89em', marginLeft:'0.4em'}}>Saved</p>
                </div>
                <div className="sidebarElement" style={{display:'flex', justifyContent:'start', alignItems:'center', marginLeft:'0.9em', width:'14em'}}>
                    <img src={reportAProblemIcon} style={{height:'2em', width:'2em', pointerEvents:'none', objectFit:'contain'}}/>
                    <p style={{fontSize:'0.89em', marginLeft:'0.4em'}}>Report a problem</p>
                </div>
                <div id="leftSideBarPopupGap" style={{width:'15em', height:'0.9em', backgroundColor:'#f7f7f7'}}></div>
                
                <div onClick={takeUserToLogin} className="sidebarElement" style={{display:'flex', justifyContent:'start', alignItems:'center', marginLeft:'0.9em', width:'14em'}}>
                    <p style={{fontSize:'0.89em', marginLeft:'0.4em'}}>Switch accounts</p>
                </div>
                <div onClick={logoutUser} className="sidebarElement" style={{display:'flex', justifyContent:'start', alignItems:'center', marginLeft:'0.9em', width:'14em'}}>
                    <p style={{fontSize:'0.89em', marginLeft:'0.4em'}}>Log out</p>
                </div>
        </div>
    </>
    )
}

export default LeftSidebarPopup
