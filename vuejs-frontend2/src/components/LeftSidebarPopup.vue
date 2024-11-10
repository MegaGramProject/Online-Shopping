<template>
    <div class="popup" :style="{width: '15em', height:'20em', borderRadius:'0.4em', paddingTop: '1em', backgroundColor: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}">
                <div class="sidebarElement" :style="divStyle">
                    <img :src="settingsIcon" :style="imgStyle"/>
                    <p :style="paragraphStyle">Settings</p>
                </div>
                <div class="sidebarElement" :style="divStyle">
                    <img :src="yourActivityIcon" :style="imgStyle"/>
                    <p :style="paragraphStyle">Activity</p>
                </div>
                <div @click="takeUserToSavedPosts"  class="sidebarElement" :style="divStyle">
                    <img :src="saveIcon" class="iconToBeAdjustedForDarkMode" :style="imgStyle"/>
                    <p :style="paragraphStyle">Saved</p>
                </div>
                <div  class="sidebarElement" :style="divStyle">
                    <img :src="reportAProblemIcon" :style="imgStyle"/>
                    <p :style="paragraphStyle">Report a problem</p>
                </div>
                <div id="leftSideBarPopupGap" :style="{width:'15em', height:'0.9em', backgroundColor:'#f7f7f7'}"></div>
                
                <div @click="takeUserToLogin"  class="sidebarElement" :style="divStyle">
                    <p :style="paragraphStyle">Switch accounts</p>
                </div>
                <div @click="logoutUser"  class="sidebarElement" :style="divStyle">
                    <p :style="paragraphStyle">Log out</p>
                </div>
        </div>
</template>

<script>
import reportAProblemIcon from '@/assets/images/reportAProblemIcon.png';
import saveIcon from '@/assets/images/saveIcon.png';
import settingsIcon from '@/assets/images/settingsIcon.png';
import yourActivityIcon from '@/assets/images/yourActivityIcon.png';

    export default {
        props: {
            authenticatedUsername: String,
        },

        data() {
            return {
                reportAProblemIcon,
                saveIcon,
                settingsIcon,
                yourActivityIcon
            }
        },

        methods: {
            logoutUser() {
                /*
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({'username': this.authenticatedUsername}),
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
            },

            takeUserToLogin() {
                window.location.href = "http://localhost:8000/login";
            },

            takeUserToSavedPosts() {
                window.location.href = "http://localhost:8019/saves/"+this.authenticatedUsername;
            }
        },

        computed: {
            paragraphStyle() {
                return {
                    fontSize: '0.89em',
                    marginLeft: '0.4em',
                };
            },

            divStyle() {
                return {
                    display:'flex',
                    justifyContent:'start',
                    alignItems:'center',
                    marginLeft:'0.9em',
                    width:'14em',
                };
            },

            imgStyle() {
                return {
                    height:'2em',
                    width:'2em',
                    pointerEvents:'none',
                    objectFit:'contain'
                }
            }
        }
    }
</script>