<template>

    <div :style="{backgroundColor: 'white', position: 'absolute', top: '7%', left: '31%', width: '42em',
    display: 'flex', flexDirection: 'column', borderRadius:'0.8em', paddingBottom:'3em', gap: '1em'}">
        
        <div :style="{backgroundColor: '#ededed', padding: '1.5em 1.5em', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderStyle: 'solid', borderColor: 'lightgray', borderRadius: '0.8em 0.8em 0em 0em',
        borderTop: 'none', borderLeft: 'none', borderRight: 'none'}">
            <b :style="{fontSize:'1.1em'}">Add an address</b>
            <img @click="closePopup" :src="thinGrayXIcon" :style="{cursor: 'pointer', height: '1.4em', width: '1.4em'}"/>
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
            <button @click="addNewAddress" :style="{border: 'none', padding: '0.7em 1.2em', cursor: 'pointer', borderRadius: '2em',
            backgroundColor:'#ffe359', width: '12em'}">Use this address</button>


        </div>

    </div>

</template>

<script>
import thinGrayXIcon from '@/assets/images/thinGrayXIcon.png';

    export default {

        data() {
            return {
                thinGrayXIcon,
                country: "",
                fullName: "",
                houseOrBuildingNumber: "",
                streetName: "",
                apartmentOrSuiteNumber: "",
                townOrCity: "",
                stateOrProvince: "",
                zipCode: "",
                phoneNumber: "",
                isSelected: false,
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

            addNewAddress() {
                if(!this.fieldsAreValidated()) {
                    return;
                }
                this.$emit("addNewAddress",
                    {
                        country: this.country,
                        fullName: this.fullName,
                        houseOrBuildingNumber: this.houseOrBuildingNumber.length>0 ? this.houseOrBuildingNumber : null,
                        streetName: this.streetName,
                        apartmentOrSuiteNumber: this.apartmentOrSuiteNumber.length>0 ? this.apartmentOrSuiteNumber : null,
                        townOrCity: this.townOrCity,
                        stateOrProvince: this.stateOrProvince.length>0 ? this.stateOrProvince : null,
                        zipCode: this.zipCode,
                        phoneNumber: this.phoneNumber,
                        isSelected: this.isSelected,
                        deliveryInstructions: {
                            propertyType: 'Home',
                            whereToLeavePackage: 'Front door',
                            securityCode: null,
                            callBox: null,
                            keyOrFobRequired: null,
                            dogPresent: null,
                            additionalInstructions: null,
                        }
                    }
                );
            }
        },
    };

</script>