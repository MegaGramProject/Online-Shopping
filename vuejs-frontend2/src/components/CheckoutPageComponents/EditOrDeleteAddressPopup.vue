<template>

    <div class="popup" :style="{backgroundColor: 'white', position: 'absolute', top: '7%', left: '31%', width: '42em',
    display: 'flex', flexDirection: 'column', borderRadius:'0.8em', paddingBottom:'3em', gap: '1em'}">
        
        <div class="popupHeader" :style="{backgroundColor: '#ededed', padding: '1.5em 1.5em', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderStyle: 'solid', borderColor: 'lightgray', borderRadius: '0.8em 0.8em 0em 0em',
        borderTop: 'none', borderLeft: 'none', borderRight: 'none'}">
            <b :style="{fontSize:'1.1em'}">Edit/Delete your address</b>
            <img @click="closePopup" :src="thinGrayXIcon" class="iconToBeAdjustedForDarkMode" :style="{cursor: 'pointer', height: '1.4em', width: '1.4em'}"/>
        </div>

        <div :style="{display: 'flex', flexDirection: 'column', paddingLeft:'3em', gap: '0.8em'}">
            <b :style="{fontSize:'0.95em'}">Country/Region</b>
            <select v-model="country" :style="{padding: '0.3em 0.3em', width: '85%'}">
                <option value="">Choose</option>
                <option value="the United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="India">India</option>
                <option value="Japan">Japan</option>
                <option value="China">China</option>
                <option value="Mexico">Mexico</option>
                <option value="Germany">Germany</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
            </select>

            <b :style="{fontSize:'0.95em', marginTop:'0.5em'}">Full Name (First and Last name)</b>
            <textarea v-model="fullName" :style="{width:'83%', paddingLeft:'0.5em', paddingTop:'0.5em', fontFamily: 'Arial',
            resize: 'none', fontSize:'0.85em'}"></textarea>

            <b :style="{fontSize:'0.95em', marginTop:'0.5em'}">House or Building Number</b>
            <textarea v-model="houseOrBuildingNumber" placeholder="Optional" :style="{width:'83%', paddingLeft:'0.5em', paddingTop:'0.5em', fontFamily: 'Arial',
            resize: 'none', fontSize:'0.85em'}"></textarea>

            <b :style="{fontSize:'0.95em', marginTop:'0.5em'}">Street Name</b>
            <textarea v-model="streetName" :style="{width:'83%', paddingLeft:'0.5em', paddingTop:'0.5em', fontFamily: 'Arial',
            resize: 'none', fontSize:'0.85em'}"></textarea>

            <b :style="{fontSize:'0.95em', marginTop:'0.5em'}">Apartment or Suite #</b>
            <textarea v-model="apartmentOrSuiteNumber" placeholder="Optional" :style="{width:'83%', paddingLeft:'0.5em', paddingTop:'0.5em', fontFamily: 'Arial',
            resize: 'none', fontSize:'0.85em'}"></textarea>

            <b :style="{fontSize:'0.95em', marginTop:'0.5em'}">Town or City</b>
            <textarea v-model="townOrCity" :style="{width:'83%', paddingLeft:'0.5em', paddingTop:'0.5em', fontFamily: 'Arial',
            resize: 'none', fontSize:'0.85em'}"></textarea>

            <b :style="{fontSize:'0.95em', marginTop:'0.5em'}">State or Province</b>
            <textarea v-model="stateOrProvince" placeholder="Optional" :style="{width:'83%', paddingLeft:'0.5em', paddingTop:'0.5em', fontFamily: 'Arial',
            resize: 'none', fontSize:'0.85em'}"></textarea>

            <b :style="{fontSize:'0.95em', marginTop:'0.5em'}">Zip-Code</b>
            <textarea v-model="zipCode" :style="{width:'83%', paddingLeft:'0.5em', paddingTop:'0.5em', fontFamily: 'Arial',
            resize: 'none', fontSize:'0.85em'}"></textarea>

            <b :style="{fontSize:'0.95em', marginTop:'0.5em'}">Phone number</b>
            <textarea v-model="phoneNumber" :style="{width:'83%', paddingLeft:'0.5em', paddingTop:'0.5em', fontFamily: 'Arial',
            resize: 'none', fontSize:'0.85em'}"></textarea>
            <small :style="{marginTop:'-0.5em', color: 'gray'}">May be used to assist delivery</small>

            <div :style="{display: 'flex', alignItems: 'center', gap: '0.5em'}">
                <input v-model="isSelected" type="checkbox">
                <p>Use as my default address.</p>
            </div>

            <p v-if="fieldsAreInvalid" :style="{color: '#b3071b', fontSize:'0.85em', marginTop:'0em', marginBottom:'0em'}">You must provide valid values for all of the required fields above</p>
            <button @click="saveEditsToThisAddress" :style="{border: 'none', padding: '0.7em 1.2em', cursor: 'pointer', borderRadius: '2em',
            backgroundColor:'#ffe359', width: '12em'}">Use this address</button>

            <a @click="deleteThisAddress" :style="{color: '#2f6da3', cursor: 'pointer', fontSize:'0.9em', marginTop:'0.5em'}">Delete</a>


        </div>

    </div>

</template>

<script>
import thinGrayXIcon from '@/assets/images/thinGrayXIcon.png';

    export default {

        props: {
            indexOfAddressToEditOrDelete: Number,
            propCountry: String,
            propFullName: String,
            propHouseOrBuildingNumber: String,
            propStreetName: String,
            propApartmentOrSuiteNumber: String,
            propTownOrCity: String,
            propStateOrProvince: String,
            propZipCode: String,
            propPhoneNumber: String,
            propIsSelected: Boolean
        },

        data() {
            return {
                thinGrayXIcon,
                country: this.propCountry || "",
                fullName: this.propFullName || "",
                houseOrBuildingNumber: this.propHouseOrBuildingNumber || "",
                streetName: this.propStreetName || "",
                apartmentOrSuiteNumber: this.propApartmentOrSuiteNumber || "",
                townOrCity: this.propTownOrCity || "",
                stateOrProvince: this.propStateOrProvince || "",
                zipCode: this.propZipCode || "",
                phoneNumber: this.propPhoneNumber || "",
                isSelected: this.propIsSelected || false,
                fieldsAreInvalid: false
            }
        },

        methods: {
            closePopup() {
                this.$emit("closePopup");
            },

            fieldsAreValidated() {
                if(this.country==="" || this.fullName==="" || this.streetName===""
                || this.townOrCity==="" || this.zipCode===""
                || this.phoneNumber==="") {
                    this.fieldsAreInvalid = true;
                }
                else {
                    this.fieldsAreInvalid = false;
                }

                return !this.fieldsAreInvalid;
            },

            async saveEditsToThisAddress() {
                if(!this.fieldsAreValidated()) {
                    return;
                }
                const changesMade = {};
                
                if(this.country!==this.propCountry) {
                    changesMade.country = this.country;
                }
                if(this.fullName!==this.propFullName) {
                    changesMade.fullName = this.fullName;
                }

                if(this.propHouseOrBuildingNumber==null && this.houseOrBuildingNumber.length>0) {
                    changesMade.houseOrBuildingNumber = this.houseOrBuildingNumber;
                }
                else if(this.propHouseOrBuildingNumber!==null && this.houseOrBuildingNumber.length==0) {
                    changesMade.houseOrBuildingNumber = null;
                }
                else if(this.propHouseOrBuildingNumber!==null && this.houseOrBuildingNumber.length>0 &&
                (this.propHouseOrBuildingNumber!==this.houseOrBuildingNumber)) {
                    changesMade.houseOrBuildingNumber = this.houseOrBuildingNumber;
                }

                if(this.streetName!==this.propStreetName) {
                    changesMade.streetName = this.streetName;
                }
                
                if(this.propApartmentOrSuiteNumber==null && this.apartmentOrSuiteNumber.length>0) {
                    changesMade.apartmentOrSuiteNumber = this.apartmentOrSuiteNumber;
                }
                else if(this.propApartmentOrSuiteNumber!==null && this.apartmentOrSuiteNumber.length==0) {
                    changesMade.apartmentOrSuiteNumber = null;
                }
                else if(this.propApartmentOrSuiteNumber!==null && this.apartmentOrSuiteNumber.length>0 &&
                (this.propApartmentOrSuiteNumber!==this.apartmentOrSuiteNumber)) {
                    changesMade.apartmentOrSuiteNumber = this.apartmentOrSuiteNumber;
                }

                if(this.townOrCity!==this.propTownOrCity) {
                    changesMade.townOrCity = this.townOrCity;
                }

                if(this.propStateOrProvince==null && this.stateOrProvince.length>0) {
                    changesMade.stateOrProvince = this.stateOrProvince;
                }
                else if(this.propStateOrProvince!==null && this.stateOrProvince.length==0) {
                    changesMade.stateOrProvince = null;
                }
                else if(this.propStateOrProvince!==null && this.stateOrProvince.length>0 &&
                (this.propStateOrProvince!==this.stateOrProvince)) {
                    changesMade.stateOrProvince = this.stateOrProvince;
                }

                if(this.zipCode!==this.propZipCode) {
                    changesMade.zipCode = this.zipCode;
                }
                if(this.phoneNumber!==this.propPhoneNumber) {
                    changesMade.phoneNumber = this.phoneNumber;
                }
                if(this.isSelected!==this.propIsSelected) {
                    changesMade.isSelected = this.isSelected;
                }

                this.$emit("saveEditsToThisAddress", changesMade);
            },

            deleteThisAddress() {
                this.$emit("deleteThisAddress");
            }
        },
    };

</script>