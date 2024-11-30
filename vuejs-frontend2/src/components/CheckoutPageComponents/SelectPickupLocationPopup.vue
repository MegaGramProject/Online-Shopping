<template>
    <div class="popup" :style="{backgroundColor: 'white', position: 'absolute', top: '7%', left: '10%', width: '85em',
    display: 'flex', flexDirection: 'column', borderRadius:'0.8em', height: '40em', gap: '1em'}">

        <div class="popupHeader" :style="{backgroundColor: '#ededed', padding: '1.5em 1.5em', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderStyle: 'solid', borderColor: 'lightgray', borderRadius: '0.8em 0.8em 0em 0em',
        borderTop: 'none', borderLeft: 'none', borderRight: 'none'}">
            <b :style="{fontSize:'1.1em'}">Select a pickup location</b>
            <img @click="closePopup" :src="thinGrayXIcon" class="iconToBeAdjustedForDarkMode" :style="{cursor: 'pointer', height: '1.4em', width: '1.4em'}"/>
        </div>

        <div class="popup" :style="{backgroundColor: 'white', display: 'flex', alignItems: 'center', paddingBottom:'0.7em',
        paddingLeft: '1em', borderStyle: 'solid', borderColor: 'lightgray', borderTop: 'none', borderLeft: 'none', borderRight: 'none',
        borderWidth:'0.3em', gap: '4.5%'}">
            <div :style="{display: 'flex', flexDirection: 'column', gap:'0.3em', position: 'relative'}">
                <b :style="{fontSize:'0.87em'}">Find pickup locations near:</b>
                <textarea v-model="inputLocation" placeholder="Enter an address, zip-code, or landmark" :style="{fontSize:'0.88em', fontFamily: 'Arial', resize: 'none', width: '30em',
                paddingTop:'0.7em', paddingLeft:'0.5em'}"/>
                <img @click="fetchPickupLocationResults" :src="searchIcon" class="iconToBeAdjustedForDarkMode" :style="{position: 'absolute', top: '0%', left: '95%', height: '5em', width: '5em', objectFit: 'contain', cursor: 'pointer'}"/>
            </div>

            <div :style="{display: 'flex', flexDirection: 'column', gap:'0.3em'}">
                <b :style="{fontSize:'0.87em'}">Filter by :</b>
                <p :style="{fontSize:'0.95em'}">
                    <span @click="updatePickupLocationsCategory('Recommended')" :style="{textDecoration: pickupLocationsCategory==='Recommended' ? 'underline' : '', fontWeight: pickupLocationsCategory==='Recommended' ? 'bold' : '', marginRight:'1em', cursor: 'pointer'}">Recommended</span>
                    <span @click="updatePickupLocationsCategory('Nearest')" :style="{textDecoration: pickupLocationsCategory==='Nearest' ? 'underline' : '', fontWeight: pickupLocationsCategory==='Nearest' ? 'bold' : '', cursor: 'pointer'}">Nearest</span>
                </p>
            </div>
        </div>

        <div :style="{display: 'flex', width: '100%', height: '100%', marginTop:'-1.3em'}">

            <div class="popup" :style="{backgroundColor: 'white', height: '99.1%', width: '43%', display: 'flex', flexDirection: 'column',
            gap: '0em', overflowY: 'scroll', borderStyle: 'solid', borderLeft: 'none', borderRight: 'none', borderBottom: 'none',
            borderColor: 'lightgray', borderWidth: '0.3em'}">
                <SinglePickupLocationResult v-for="(result, index) in pickupLocationResults" :key="index"
                :index="index+1" :locationName="result.locationName" :distance="result.distance"
                :distanceUnit="distanceUnit" :openingHours="result.openingHours" :pickupLocationAddress="result.pickupLocationAddress"
                :pickupDirections="result.pickupDirections" @pickupHere="pickupHere"
                />
            </div>

            <img :src="sampleMapOfPickupLocations" :style="{height: '100%', width: '57%', cursor: 'pointer'}"/>

        </div>

    </div>

</template>

<script>
import thinGrayXIcon from '@/assets/images/thinGrayXIcon.png';
import searchIcon from '@/assets/images/searchIcon2.png';
import sampleMapOfPickupLocations from '@/assets/images/sampleMapOfPickupLocations.png';
import SinglePickupLocationResult from './SinglePickupLocationResult.vue';


    export default {

        props: {
            deliveryAreaCountry: String
        },

        components: {
            SinglePickupLocationResult
        },

        data() {
            return {
                thinGrayXIcon,
                searchIcon,
                sampleMapOfPickupLocations,
                pickupLocationsCategory: 'Recommended',
                pickupLocationResults: [],
                distanceUnit: this.deliveryAreaCountry==='the United States' ? 'mi' : 'km',
                inputLocation: ''
            }
        },

        methods: {
            closePopup() {
                this.$emit("closePopup");
            },

            updatePickupLocationsCategory(newCategory) {
                this.pickupLocationsCategory = newCategory;
                let pickupLocationResults = this.pickupLocationResults;

                if(this.pickupLocationsCategory==='Nearest') {
                    pickupLocationResults = pickupLocationResults.sort((a,b) => a.distance - b.distance);
                }
                else {
                    pickupLocationResults = pickupLocationResults.sort((a,b) => b.totalHoursOpenPerWeek/b.distance - a.totalHoursOpenPerWeek/a.distance);
                }
                this.pickupLocationResults = [...pickupLocationResults];
            },

            async fetchPickupLocationResults() {
                const response = await fetch('http://localhost:8027/api/getNearestPickupLocations', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        nearThisLocation: this.inputLocation,
                        limit: 7
                    })
                });
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                let pickupLocationResults = await response.json();
                
                if(this.pickupLocationsCategory==='Recommended') {
                    pickupLocationResults = pickupLocationResults.sort((a,b) => b.totalHoursOpenPerWeek/b.distance - a.totalHoursOpenPerWeek/a.distance);
                }

                this.pickupLocationResults = [...pickupLocationResults];

                if(this.distanceUnit==="km") {
                    this.convertDistancesFromOneUnitToAnother();
                }
            },

            pickupHere(indexOfPickupLocation) {
                const pickupLocation = this.pickupLocationResults[indexOfPickupLocation-1];
                this.$emit("setPickupLocation", {...pickupLocation, distanceUnit: this.distanceUnit});
            },

            convertDistancesFromOneUnitToAnother() {
                let conversionCoefficient = 1;
                if(this.distanceUnit==='km') {
                    conversionCoefficient*=1.60934;
                }
                else  {
                    conversionCoefficient*=0.62137;
                }

                for(let result of this.pickupLocationResults) {
                    result.distance*=conversionCoefficient;
                    result.distance=parseFloat(result.distance.toFixed(2));
                }
            }

        }

    };
</script>