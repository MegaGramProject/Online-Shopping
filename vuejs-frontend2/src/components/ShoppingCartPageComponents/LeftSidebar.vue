<template>
    <div id="leftSidebar" :style="{width: '100%', height: '100%', borderStyle: 'solid', borderColor: 'lightgray',
    borderWidth: '0px 0.01em 0px 0em', position: 'relative', overflow: 'scroll', backgroundColor: 'white'}">

        <h1 @click="takeUserHome" class="headerMegagram" :style="headerStyle">
        <span :style="{ cursor: 'pointer' }">Megagram</span>
        </h1>
        
        <div @click="takeUserHome" class="sidebarElement" :style="sidebarElementStyle('1.2em')">
        <img class="iconToBeAdjustedForDarkMode" :src="homeIcon" :style="iconStyle('1.9em', '1.9em')" />
        <p :style="paragraphStyle">Home</p>
        </div>

        <div @click="takeUserToSearch" class="sidebarElement" :style="sidebarElementStyle('0.9em')">
        <img class="iconToBeAdjustedForDarkMode" :src="searchIcon" :style="iconStyle('1.8em', '2.3em')" />
        <p :style="paragraphStyle">Search</p>
        </div>

        <div class="sidebarElement" :style="sidebarElementStyle('0.9em')">
        <img class="iconToBeAdjustedForDarkMode" :src="exploreIcon" :style="iconStyle('2.5em', '2.5em')" />
        <p :style="paragraphStyle">Explore</p>
        </div>

        <div class="sidebarElement" :style="sidebarElementStyle('0.9em')">
        <img class="iconToBeAdjustedForDarkMode" :src="reelsIcon" :style="iconStyle('2.4em', '2.4em')" />
        <p :style="paragraphStyle">Reels</p>
        </div>

        <div @click="takeUserToMessages" class="sidebarElement" :style="sidebarElementStyle('0.9em')">
        <img class="iconToBeAdjustedForDarkMode" :src="messagesIcon" :style="iconStyle('2.5em', '2.5em')" />
        <p :style="paragraphStyle">Messages</p>
        </div>

        <div @click="takeUserToNotifications" class="sidebarElement" :style="sidebarElementStyle('0.9em')">
        <img class="iconToBeAdjustedForDarkMode" :src="notificationsIcon" :style="iconStyle('2.5em', '2.5em')" />
        <p :style="paragraphStyle">Notifications</p>
        </div>

        <div class="sidebarElement" :style="sidebarElementStyle('0.9em')">
        <img class="iconToBeAdjustedForDarkMode" :src="createIcon" :style="iconStyle('2.5em', '2.5em')" />
        <p :style="paragraphStyle">Create</p>
        </div>

        <div class="sidebarElement" :style="sidebarElementStyle('0.9em')">
        <img class="iconToBeAdjustedForDarkMode" :src="shopIcon" :style="iconStyle('2.1em', '2.1em', '0.3em')" />
        <p :style="{ fontWeight: 'bold', fontSize: '1em', marginLeft: '0.4em' }">Shop</p>
        </div>

        <div @click="takeUserToOwnProfile" class="sidebarElement" :style="sidebarElementStyle('0.9em')">
        <img v-if="profilePhotoString!==null" :src="profilePhotoString" :style="iconStyle('2em', '2em', '0.6em')" />
        <p :style="paragraphStyle">Profile</p>
        </div>

        <div v-if="displayLeftSidebarPopup" :style="{position: 'absolute', top: '50%', left: '5%'}">
            <LeftSidebarPopup :authenticatedUsername="authenticatedUsername" />
        </div>

        <div @click="toggleLeftSidebarPopup" class="sidebarElement" :style="{display: 'flex', justifyContent: 'start',
        alignItems: 'center', marginLeft: '0.9em', position: 'absolute', top: '91%'}">
        <img class="iconToBeAdjustedForDarkMode" :src="moreIcon" :style="iconStyle('2.5em', '2.5em')" />
            <p v-if="!displayLeftSidebarPopup" :style="paragraphStyle">More</p>
            <p v-else :style="paragraphStyle">Less</p>
        </div>
    </div>
</template>

<script>
import createIcon from '@/assets/images/createIcon.png';
import exploreIcon from '@/assets/images/exploreIcon.png';
import homeIcon from '@/assets/images/homeIcon.png';
import messagesIcon from '@/assets/images/messagesIcon.png';
import moreIcon from '@/assets/images/moreIcon.png';
import notificationsIcon from '@/assets/images/notificationsIcon.png';
import reelsIcon from '@/assets/images/reelsIcon.png';
import searchIcon from '@/assets/images/searchIcon.png';
import shopIcon from '@/assets/images/shopIcon.png';
import LeftSidebarPopup from './LeftSidebarPopup.vue';

    export default {
        components: {
            LeftSidebarPopup
        },

        props: {
            authenticatedUsername: String
        },

        data() {
            return {
                createIcon,
                exploreIcon,
                homeIcon,
                messagesIcon,
                moreIcon,
                notificationsIcon,
                reelsIcon,
                searchIcon,
                shopIcon,
                profilePhotoString: null,
                displayLeftSidebarPopup: false
            }
        },

        methods: {
            takeUserHome() {
                window.location.href = "http://localhost:3100/"+ this.authenticatedUsername;
            },

            takeUserToSearch() {
                window.location.href = "http://localhost:8019/search/"+this.authenticatedUsername;
            },

            takeUserToOwnProfile() {
                window.location.href = "http://localhost:8019/profilePage/"+this.authenticatedUsername+"/"+this.authenticatedUsername;
            },

            takeUserToMessages() {
                window.location.href = "http://localhost:8011/directMessaging/"+this.authenticatedUsername;
            },

            takeUserToNotifications() {
                window.location.href = "http://localhost:8019/notifications/"+this.authenticatedUsername;
            },
            
            toggleLeftSidebarPopup() {
                this.displayLeftSidebarPopup = !this.displayLeftSidebarPopup;
            },
            async setProfilePhotoOfAuthUser() {
                const response = await fetch('http://localhost:8003/getProfilePhoto/'+this.authenticatedUsername);
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                let profilePhotoBlob = await response.blob();
                this.profilePhotoString = URL.createObjectURL(profilePhotoBlob);
            },
            sidebarElementStyle(marginLeft) {
                return {
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    marginLeft,
                };
            },
            iconStyle(height, width, marginRight = '0em') {
                return {
                    height,
                    width,
                    pointerEvents: 'none',
                    objectFit: 'contain',
                    marginRight,
                };
            }
        },

        computed: {
            headerStyle() {
                return {
                    fontFamily: 'Billabong',
                    fontSize: '1.9em',
                    marginLeft: '1em',
                    marginTop: '1em',
                    fontWeight: '100',
                };
            },
            paragraphStyle() {
                return {
                    fontSize: '1em',
                    marginLeft: '0.4em',
                };
            }
        },

        watch: {
            authenticatedUsername(newVal) {
                if(newVal.length>0) {
                   // this.setProfilePhotoOfAuthUser();
                }
            }
        }
    };
</script>

