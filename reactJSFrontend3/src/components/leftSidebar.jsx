import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import createIcon from '../assets/createIcon.png';
import exploreIcon from '../assets/exploreIcon.png';
import homeIcon from '../assets/homeIcon.png';
import messagesIcon from '../assets/messagesIcon.png';
import moreIcon from '../assets/moreIcon.png';
import notifsIcon from '../assets/notificationsIcon.png';
import reelsIcon from '../assets/reelsIcon.png';
import searchIcon from '../assets/searchIcon.png';
import shopIcon from '../assets/shopIcon.png';
import '../styles.css';
import LeftSidebarPopup from './leftSidebarPopup';

function LeftSidebar({authenticatedUsername}) {

    LeftSidebar.propTypes = {
        authenticatedUsername: PropTypes.string.isRequired
    };

    let [profilePhotoString, SetProfilePhotoString] = useState("");
    let [displayLeftSidebarPopup, SetDisplayLeftSidebarPopup] = useState(false);

    function takeUserHome() {
        window.location.href = "http://localhost:3100/"+authenticatedUsername;
    }

    function takeUserToSearch() {
        window.location.href = "http://localhost:8019/search/"+authenticatedUsername;
    }

    function takeUserToOwnProfile() {
        window.location.href = "http://localhost:8019/profilePage/"+authenticatedUsername+"/"+authenticatedUsername;
    }

    function takeUserToMessages() {
        window.location.href = "http://localhost:8011/directMessaging/"+authenticatedUsername;
    }

    function takeUserToNotifications() {
        window.location.href = "http://localhost:8019/notifications/"+authenticatedUsername;
    }
    
    function toggleLeftSidebarPopup() {
        SetDisplayLeftSidebarPopup(!displayLeftSidebarPopup);
    }

    useEffect(() => {
        async function getProfilePhotoOfAuthUser() {
            const response = await fetch('http://localhost:8003/getProfilePhoto/'+authenticatedUsername);
            if(!response.ok) {
                throw new Error('Network response not ok');
            }
            let profilePhotoBlob = await response.blob();
            SetProfilePhotoString(URL.createObjectURL(profilePhotoBlob));
        }

        if(authenticatedUsername.length>0) {
            getProfilePhotoOfAuthUser();
        }
    }, [authenticatedUsername]);

    return (
    <>
        <div id="leftSidebar" style={{width:'100%', height:'100%', borderStyle:'solid', borderColor:'lightgray',  borderWidth: '0px 0.01em 0px 0em', position: 'relative', overflow:'scroll'}}>
            <h1 className="headerMegagram" style={{fontFamily:'Billabong', fontSize:'1.9em', marginLeft:'1em', marginTop:'1em', fontWeight: '100'}}><span style={{cursor:"pointer"}}>Megagram</span></h1>
            <div onClick={takeUserHome} className="sidebarElement" style={{display:'flex', justifyContent:'start', alignItems:'center', marginLeft:'1.2em'}}>
                <img className="iconToBeAdjustedForDarkMode" src={homeIcon} style={{height:'1.9em', width:'1.9em', pointerEvents:'none', objectFit:'contain'}}/>
                <p style={{fontSize:'1em', marginLeft:'0.4em'}}>Home</p>
            </div>
            <div onClick={takeUserToSearch} className="sidebarElement" style={{display:'flex', justifyContent:'start', alignItems:'center', marginLeft:'0.9em'}}>
                <img className="iconToBeAdjustedForDarkMode" src={searchIcon} style={{height:'1.8em', width:'2.3em', pointerEvents:'none', objectFit:'contain'}}/>
                <p style={{fontSize:'1em', marginLeft:'0.4em'}}>Search</p>
            </div>
            <div className="sidebarElement" style={{display:'flex', justifyContent:'start', alignItems:'center', marginLeft:'0.9em'}}>
                <img className="iconToBeAdjustedForDarkMode" src={exploreIcon} style={{height:'2.5em', width:'2.5em', pointerEvents:'none', objectFit:'contain'}}/>
                <p style={{fontSize:'1em', marginLeft:'0.4em'}}>Explore</p>
            </div>
            <div className="sidebarElement" style={{display:'flex', justifyContent:'start', alignItems:'center', marginLeft:'0.9em'}}>
                <img className="iconToBeAdjustedForDarkMode" src={reelsIcon} style={{height:'2.4em', width:'2.4em', pointerEvents:'none', objectFit:'contain'}}/>
                <p style={{fontSize:'1em', marginLeft:'0.4em'}}>Reels</p>
            </div>
            <div onClick={takeUserToMessages} className="sidebarElement" style={{display:'flex', justifyContent:'start', alignItems:'center', marginLeft:'0.9em'}}>
                <img className="iconToBeAdjustedForDarkMode"  src={messagesIcon} style={{height:'2.5em', width:'2.5em', pointerEvents:'none', objectFit:'contain'}}/>
                <p style={{fontSize:'1em', marginLeft:'0.4em'}}>Messages</p>
            </div>
            <div onClick={takeUserToNotifications} className="sidebarElement" style={{display:'flex', justifyContent:'start', alignItems:'center', marginLeft:'0.9em'}}>
                <img className="iconToBeAdjustedForDarkMode" src={notifsIcon} style={{height:'2.5em', width:'2.5em', pointerEvents:'none', objectFit:'contain'}}/>
                <p style={{fontSize:'1em', marginLeft:'0.4em'}}>Notifications</p>
            </div>
            <div className="sidebarElement" style={{display:'flex', justifyContent:'start', alignItems:'center', marginLeft:'0.9em'}}>
                <img className="iconToBeAdjustedForDarkMode" src={createIcon} style={{height:'2.5em', width:'2.5em', pointerEvents:'none', objectFit:'contain'}}/>
                <p style={{fontSize:'1em', marginLeft:'0.4em'}}>Create</p>
            </div>
            <div className="sidebarElement" style={{display:'flex', justifyContent:'start', alignItems:'center', marginLeft:'0.9em'}}>
                <img className="iconToBeAdjustedForDarkMode" src={shopIcon} style={{height:'2.1em', width:'2.1em', pointerEvents:'none', objectFit:'contain', marginRight: '0.3em'}}/>
                <p style={{fontWeight: 'bold', fontSize:'1em', marginLeft:'0.4em'}}>Shop</p>
            </div>
            <div onClick={takeUserToOwnProfile} className="sidebarElement" style={{display:'flex', justifyContent:'start', alignItems:'center', marginLeft:'0.9em'}}>
                <img className="iconToBeAdjustedForDarkMode" src={profilePhotoString} style={{height:'2em', width:'2em', pointerEvents:'none', objectFit:'contain'}}/>
                <p style={{fontSize:'1em', marginLeft:'1em'}}>Profile</p>
            </div>

            {displayLeftSidebarPopup && <div style={{position: 'absolute', top: '50%', left: '5%'}}>
                <LeftSidebarPopup authenticatedUsername={authenticatedUsername}/>
            </div>}

            <div onClick={toggleLeftSidebarPopup} className="sidebarElement" style={{display:'flex', justifyContent:'start', alignItems:'center', marginLeft:'0.9em', position:'absolute', top: '91%'}}>
                <img className="iconToBeAdjustedForDarkMode" src={moreIcon} style={{height:'2.5em', width:'2.5em', pointerEvents:'none', objectFit:'contain'}}/>
                {!displayLeftSidebarPopup &&  <p style={{fontSize:'1em', marginLeft:'0.4em'}}>More</p>}
                {displayLeftSidebarPopup &&  <p style={{fontSize:'1em', marginLeft:'0.4em'}}>Less</p>}
            </div>
        </div>
    </>
    )
}

export default LeftSidebar
