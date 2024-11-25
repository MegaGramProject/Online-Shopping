<template>
    <div :style="{backgroundColor: 'white', position: 'absolute', top: '7%', left: '10%', width: '85em',
    display: 'flex', flexDirection: 'column', borderRadius:'0.8em', height: '40em', gap: '1em'}">

        <div :style="{backgroundColor: '#ededed', padding: '1.5em 1.5em', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderStyle: 'solid', borderColor: 'lightgray', borderRadius: '0.8em 0.8em 0em 0em',
        borderTop: 'none', borderLeft: 'none', borderRight: 'none'}">
            <b :style="{fontSize:'1.1em'}">Select a pickup location</b>
            <img @click="closePopup" :src="thinGrayXIcon" :style="{cursor: 'pointer', height: '1.4em', width: '1.4em'}"/>
        </div>

        <div :style="{backgroundColor: 'white', display: 'flex', alignItems: 'center', paddingBottom:'0.7em',
        paddingLeft: '1em', borderStyle: 'solid', borderColor: 'lightgray', borderTop: 'none', borderLeft: 'none', borderRight: 'none',
        borderWidth:'0.3em', gap: '4.5%'}">
            <div :style="{display: 'flex', flexDirection: 'column', gap:'0.3em', position: 'relative'}">
                <b :style="{fontSize:'0.87em'}">Find pickup locations near:</b>
                <textarea placeholder="Enter an address, zip-code, or landmark" :style="{fontSize:'0.88em', fontFamily: 'Arial', resize: 'none', width: '30em',
                paddingTop:'0.7em', paddingLeft:'0.5em'}"/>
                <img @click="fetchPickupLocationResults" :src="searchIcon" :style="{position: 'absolute', top: '0%', left: '95%', height: '5em', width: '5em', objectFit: 'contain', cursor: 'pointer'}"/>
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

            <div :style="{backgroundColor: 'white', height: '99.1%', width: '43%', display: 'flex', flexDirection: 'column',
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
                distanceUnit: "mi"
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

            fetchPickupLocationResults() {
                //max results: 7
                let pickupLocationResults = [
                    {
                        locationName: "Central Park Pickup",
                        distance: 2.5,
                        totalHoursOpenPerWeek: 35,
                        openingHours: {
                        "Mon-Fri": "9am-6pm",
                        Sat: "10am-4pm",
                        },
                        pickupLocationAddress: "123 Central Park Ave, New York, NY 10019",
                        pickupDirections: "Enter through the main gate and look for the kiosk near the fountain."
                    },
                    {
                        locationName: "Downtown Hub",
                        distance: 5.0,
                        totalHoursOpenPerWeek: 82,
                        openingHours: {
                        "Mon-Fri": "8am-8pm",
                        Sat: "9am-6pm",
                        Sun: "10am-5pm"
                        },
                        pickupLocationAddress: "456 Downtown Blvd, New York, NY 10001",
                        pickupDirections: "Located in the parking lot opposite the main bus terminal."
                    },
                    {
                        locationName: "Harborview Station",
                        distance: 7.8,
                        totalHoursOpenPerWeek: 122,
                        openingHours: {
                        Mon: "7:30am-7pm",
                        Tue: "7:30am-7pm",
                        "Wed-Fri": "8am-6pm",
                        Sat: "9am-5pm"
                        },
                        pickupLocationAddress: "789 Harborview Rd, Brooklyn, NY 11201",
                        pickupDirections: "Find the stand next to the docks near Pier 5."
                    },
                    {
                        locationName: "Midtown Express",
                        distance: 1.2,
                        totalHoursOpenPerWeek: 120,
                        openingHours: {
                        "Mon-Sun": "24/7"
                        },
                        pickupLocationAddress: "101 Midtown St, New York, NY 10036",
                        pickupDirections: "Located inside the gas station next to the convenience store."
                    },
                    {
                        locationName: "East Village Stop",
                        distance: 4.3,
                        totalHoursOpenPerWeek: 88,
                        openingHours: {
                        Mon: "8am-5pm",
                        Tue: "8am-6pm",
                        Wed: "9am-6pm",
                        "Thu-Fri": "10am-7pm",
                        Sun: "12pm-4pm"
                        },
                        pickupLocationAddress: "202 East Village Ln, New York, NY 10009",
                        pickupDirections: "Across from the community center, near the basketball courts."
                    },
                    {
                        locationName: "Uptown Corner",
                        distance: 3.8,
                        totalHoursOpenPerWeek: 120,
                        openingHours: {
                        Mon: "9am-6pm",
                        Tue: "9am-6pm",
                        Wed: "9am-6pm",
                        Thu: "10am-5pm",
                        Fri: "10am-3pm",
                        Sat: "9am-1pm",
                        },
                        pickupLocationAddress: "303 Uptown Blvd, Bronx, NY 10451",
                        pickupDirections: "Next to the flower shop on the corner of Uptown Blvd and Main St."
                    },
                    {
                        locationName: "Chelsea Market Pickup",
                        distance: 2.9,
                        totalHoursOpenPerWeek: 122,
                        openingHours: {
                        "Mon-Sat": "8am-8pm",
                        Sun: "9am-5pm"
                        },
                        pickupLocationAddress: "404 Chelsea Market St, New York, NY 10011",
                        pickupDirections: "Located inside the market, near the central food court entrance."
                    }
                ];
                if(this.pickupLocationsCategory==='Nearest') {
                    pickupLocationResults = pickupLocationResults.sort((a,b) => a.distance - b.distance);
                }
                else {
                    pickupLocationResults = pickupLocationResults.sort((a,b) => b.totalHoursOpenPerWeek/b.distance - a.totalHoursOpenPerWeek/a.distance);
                }

                this.pickupLocationResults = [...pickupLocationResults];
            },

            pickupHere(indexOfPickupLocation) {
                const pickupLocation = this.pickupLocationResults[indexOfPickupLocation-1];
                this.$emit("setPickupLocation", {...pickupLocation, distanceUnit: this.distanceUnit});
            }

        }

    };
</script>