<template>

    <div class="miniSection" :style="{width: '50em', padding: '1em 1em', backgroundColor: 'white', display: 'flex',
    flexDirection: 'column'}">
        <template v-if="!isMinimized">
            <h3>Select a delivery address</h3>
            <div :style="{display: 'flex', flexDirection: 'column', borderStyle: 'solid', borderColor: 'lightgray',
            padding: '0.5em 1em', borderLeft: 'none', borderRight: 'none', gap: '1em'}">
                <h3>Delivery Addresses ({{ addressesOfUser.length }})</h3>
                <SelectSingleAddress v-for="(address, index) in addressesOfUser" :key="address.id" :index="index"
                :fullName="address.fullName" :addressText="address.addressText" :phoneNumber="address.phoneNumber"
                :isSelected="index==0 && address.isSelected==true" @toggleSelectSingleAddress="toggleSelectSingleAddress"
                @showEditOrDeleteAddressPopup="showEditOrDeleteAddressPopup" @showAddDeliveryInstructionsPopup="showAddDeliveryInstructionsPopup"
                />
                <a @click="showAddNewDeliveryAddressPopup" :style="{color: '#2f6da3', cursor: 'pointer'}">Add a new delivery address</a>
            </div>

            <h3>Pickup locations</h3>
            <template v-if="selectedPickupLocationOfUser!==null">
                <b>Currently Selected: Megagram Locker - {{selectedPickupLocationOfUser.locationName}} ({{selectedPickupLocationOfUser.distance + " " + selectedPickupLocationOfUser.distanceUnit }})</b>
                <p :style="{marginLeft: '3em', marginBottom:'0.5em'}">{{ selectedPickupLocationOfUser.pickupLocationAddress }}</p>
                <p :style="{marginLeft:'3em', marginBottom:'0.5em'}">{{ selectedPickupLocationOfUser.pickupDirections }}</p>
                <p v-for="weekDays in Object.keys(selectedPickupLocationOfUser.openingHours)" :style="{marginLeft: '3em', marginBottom: '-0.5em'}" :key="weekDays">{{ weekDays }}: {{ selectedPickupLocationOfUser.openingHours[weekDays] }}</p>
                <br/>
                <br/>
            </template>

            <a v-if="selectedPickupLocationOfUser!==null" @click="showSelectPickupLocationPopup" :style="{color: '#2f6da3', cursor: 'pointer', fontSize:'0.9em'}">Select a different pickup location</a>
            <a v-else @click="showSelectPickupLocationPopup" :style="{color: '#2f6da3', cursor: 'pointer', fontSize:'0.9em'}">Find a pickup location nearby</a>

            <button @click="toggleIsMinimized" :style="{border: 'none', padding: '0.5em 1em', cursor: 'pointer', borderRadius: '2em',
            backgroundColor:'#ffe359', width: '13em', marginTop:'1em'}">Deliver to this address</button>
        </template>

        <template v-if="isMinimized">
            <div :style="{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}">
                <h3 v-if="addressesOfUser.length>0 && addressesOfUser[0].isSelected==true">Delivering to {{ addressesOfUser[0].fullName }}</h3>
                <h3 v-if="selectedPickupLocationOfUser!==null">Delivering to Megagram Locker - {{ selectedPickupLocationOfUser.locationName }}</h3>
                <h3 v-if="(addressesOfUser.length==0 || addressesOfUser[0].isSelected==false) && selectedPickupLocationOfUser==null">You haven't selected a delivery-address or pickup-location yet</h3>
                <a @click="toggleIsMinimized" :style="{color: '#2f6da3', cursor: 'pointer'}">Change</a>
            </div>
            <p v-if="addressesOfUser.length>0 && addressesOfUser[0].isSelected==true" :style="{fontSize:'1em', marginTop:'0.5em'}">{{ addressesOfUser[0].addressText }}</p>
            <p v-if="selectedPickupLocationOfUser!==null" :style="{fontSize:'1em', marginTop:'0.5em'}">{{ selectedPickupLocationOfUser.pickupLocationAddress }}</p>
            <a v-else @click="toggleIsMinimized" :style="{color: '#2f6da3', cursor: 'pointer'}">Add delivery instructions</a>
        </template>
    </div>

</template>

<script>
import SelectSingleAddress from './SelectSingleAddress.vue';

    export default {
        props: {
            authenticatedUsername: String,
            adjustmentsToAddressToEditOrDelete: Object,
            newAddressToAdd: Object,
            newlySetPickupLocation: Object,
            addressWithUpdatedDeliveryInstructions: Object
        },

        components: {
            SelectSingleAddress
        },

        data() {
            return {
                isMinimized: false,
                addressesOfUser: [],
                selectedPickupLocationOfUser: null
            }
        },

        mounted() {
            if(this.authenticatedUsername.length>0) {
                this.fetchAddressesOfUser();
            }
        },

        methods: {
            toggleIsMinimized() {
                this.isMinimized = !this.isMinimized;
            },

            async fetchAddressesOfUser() {
                const response = await fetch(`http://localhost:8026/getAddressesOfUser/${this.authenticatedUsername}`);
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }

                let addressesOfUser = await response.json();
                for(let i=0; i<addressesOfUser.length; i++) {
                    const address = addressesOfUser[i];
                    const newAddress = {
                        id: address.id,
                        fullName: address.full_name,
                        country: address.country,
                        houseOrBuildingNumber: address.house_or_building_number,
                        streetName: address.street_name,
                        apartmentOrSuiteNumber: address.apartment_or_suite,
                        townOrCity: address.town_or_city,
                        stateOrProvince: address.state_or_province,
                        zipCode: address.zipcode,
                        phoneNumber: address.phone_number,
                        isSelected: address.is_selected,
                        deliveryInstructions: {
                            propertyType: 'Home',
                            whereToLeavePackage: 'Front door',
                            securityCode: null,
                            callBox: null,
                            keyOrFobIsRequired: null,
                            dogPresent: null,
                            additionalInstructions: null,
                            hoursOpenForDelivery: null,
                            availableOnFederalHolidays: null
                        }
                    };

                    newAddress.addressText = this.getAddressText(newAddress);
                    addressesOfUser[i] = newAddress;
                }

                /*
                let addressesOfUserExample = [
                    {
                        id: 1,
                        fullName: "Rishav Ray",
                        country: "the United States",
                        houseOrBuildingNumber: "75165",
                        streetName: "Greenfelder Drive",
                        apartmentOrSuiteNumber: null,
                        townOrCity: "South Nanceetown",
                        stateOrProvince: "West Virginia",
                        zipCode: "91793",
                        addressText: "75165 Greenfelder Drive, South Nanceetown West Virginia 91793, the United States",
                        phoneNumber: "+16098671431",
                        deliveryInstructions: {
                            propertyType: 'Townhome',
                            whereToLeavePackage: 'No preference',
                            securityCode: 'abc',
                            callBox: null,
                            keyOrFobIsRequired: false,
                            dogPresent: 'Yes',
                            additionalInstructions: 'Please don\'t ring or knock, or else I will let the dogs out!',
                            hoursOpenForDelivery: null,
                            availableOnFederalHolidays: null
                        }
                    },
                    {
                        id: 2,
                        fullName: "Rishav Ray",
                        country: "the United States",
                        houseOrBuildingNumber: "69127",
                        streetName: "Fritsch Ranch",
                        apartmentOrSuiteNumber: "Apt. 974",
                        townOrCity: "Greenholtborough",
                        stateOrProvince: "Missouri",
                        zipCode: "19198",
                        addressText: "69127 Fritsch Ranch, Apt. 974, Greenholtborough Missouri 19198, the United States",
                        phoneNumber: "+12088673421",
                        deliveryInstructions: {
                            propertyType: 'Business',
                            whereToLeavePackage: 'Property Staff',
                            securityCode: 'sxc',
                            callBox: 'def',
                            keyOrFobIsRequired: false,
                            additionalInstructions: null,
                            hoursOpenForDelivery: {
                                Monday: ['9:00AM', '5:00PM'],
                                Tuesday: ['9:00AM', '5:00PM'],
                                Wednesday: ['9:00AM', '5:00PM'],
                                Thursday: ['9:00AM', '5:00PM'],
                                Friday: ['9:00AM', '3:00PM'],
                                Saturday: ['', '11:00AM'],
                                Sunday: ['', ''],
                            },
                            availableOnFederalHolidays: 'Yes'
                        }
                    }
                ];
                */

                this.addressesOfUser = addressesOfUser;

                if(this.addressesOfUser.length>0 && this.addressesOfUser[0].isSelected==true) {
                    this.$emit("notifyParentOfSelectedDeliveryAddress", this.addressesOfUser[0]);
                }
                else {
                    this.$emit("notifyParentOfSelectedDeliveryAddress", null);
                }
                this.$emit("notifyParentOfSelectedPickupLocation", null);
            },

            async toggleSelectSingleAddress(indexOfSingleAddressToToggle) {
                this.selectedPickupLocationOfUser = null;
                this.$emit("notifyParentOfSelectedPickupLocation", null);
                if(indexOfSingleAddressToToggle==0) {
                    const response = await fetch(`http://localhost:8026/toggleSelectCustomerAddress/${this.addressesOfUser[0].id}`, {
                        method: 'PATCH'
                    });
                    if(!response.ok) {
                        throw new Error('Network response not ok');
                    }

                    this.addressesOfUser[0].isSelected = !this.addressesOfUser[0].isSelected;
                    if(this.addressesOfUser[0].isSelected) {
                        this.$emit("notifyParentOfSelectedDeliveryAddress", this.addressesOfUser[0]);
                    }
                    else {
                        this.$emit("notifyParentOfSelectedDeliveryAddress", null);
                    }
                }
                else {
                    if(this.addressesOfUser[0].isSelected==true) {
                        const response0 = await fetch(`http://localhost:8026/unselectSelectedAddressOfUser/${this.authenticatedUsername}`, {
                            method: 'PATCH'
                        });
                        if(!response0.ok) {
                            throw new Error('Network response not ok');
                        }
                        this.addressesOfUser[0].isSelected = false;
                    }

                    const newlySelectedAddress = this.addressesOfUser[indexOfSingleAddressToToggle];
                    const response = await fetch(`http://localhost:8026/toggleSelectCustomerAddress/${newlySelectedAddress.id}`, {
                        method: 'PATCH'
                    });
                    if(!response.ok) {
                        throw new Error('Network response not ok');
                    }
                    
                    newlySelectedAddress.isSelected = true;
                    this.addressesOfUser.splice(indexOfSingleAddressToToggle, 1);
                    this.addressesOfUser.splice(0, 0, newlySelectedAddress);
                    this.$emit("notifyParentOfSelectedDeliveryAddress", newlySelectedAddress);
                }
            },

            showEditOrDeleteAddressPopup(addressIndex) {
                this.$emit("showEditOrDeleteAddressPopup", {...this.addressesOfUser[addressIndex], index:addressIndex});
            },


            showAddNewDeliveryAddressPopup() {
                this.$emit("showAddNewDeliveryAddressPopup");
            },

            showAddDeliveryInstructionsPopup(addressIndex) {
                this.$emit("showAddDeliveryInstructionsPopup",
                    {
                        index:addressIndex,
                        addressText: this.addressesOfUser[addressIndex].addressText,
                        fullName: this.addressesOfUser[addressIndex].fullName,
                        deliveryInstructions: this.addressesOfUser[addressIndex].deliveryInstructions
                    }
                );
            },

            showSelectPickupLocationPopup() {
                this.$emit("showSelectPickupLocationPopup");
            },

            getAddressText(addressInfo) {
                let addressText = "";
                if(addressInfo.houseOrBuildingNumber!==null) {
                    addressText+=addressInfo.houseOrBuildingNumber+" ";
                }

                addressText+=addressInfo.streetName+", ";

                if(addressInfo.apartmentOrSuiteNumber!==null) {
                    addressText+=addressInfo.apartmentOrSuiteNumber+", ";
                }

                addressText+=addressInfo.townOrCity+" ";

                if(addressInfo.stateOrProvince!==null) {
                    addressText+=addressInfo.stateOrProvince+" ";
                }

                addressText+=addressInfo.zipCode+", "+addressInfo.country;

                return addressText;
            }
        },

        watch: {
            authenticatedUsername(newVal) {
                if(newVal.length>0) {
                    this.fetchAddressesOfUser();
                }
            },

            async adjustmentsToAddressToEditOrDelete(newVal) {
                if(newVal==null) {
                    return;
                }
                const indexToEditOrDelete = newVal.index;
                const idOfAddressToEditOrDelete = this.addressesOfUser[indexToEditOrDelete].id;
                if(newVal.delete==true) {
                    const response = await fetch(`http://localhost:8026/deleteCustomerAddress/${idOfAddressToEditOrDelete}`, {
                        method: 'DELETE'
                    });
                    if(!response.ok) {
                        throw new Error('Network response not ok');
                    }

                    if(indexToEditOrDelete==0) {
                        this.$emit("notifyParentOfSelectedDeliveryAddress", null);
                    }
                    this.addressesOfUser.splice(indexToEditOrDelete, 1);
                }
                else {
                    const patchRequestBody = {};
                    for(let key of Object.keys(newVal)) {
                        if(key==='fullName') {
                            patchRequestBody.full_name = newVal[key];
                        }
                        else if(key==='houseOrBuildingNumber') {
                            patchRequestBody.house_or_building_number = newVal[key];
                        }
                        else if(key==='streetName') {
                            patchRequestBody.street_name = newVal[key];
                        }
                        else if(key==='apartmentOrSuiteNumber') {
                            patchRequestBody.apartment_or_suite = newVal[key];
                        }
                        else if(key==='townOrCity') {
                            patchRequestBody.town_or_city = newVal[key];
                        }
                        else if(key==='stateOrProvince') {
                            patchRequestBody.state_or_province = newVal[key];
                        }
                        else if(key==='zipCode') {
                            patchRequestBody.zipcode = newVal[key];
                        }
                        else if(key==='phoneNumber') {
                            patchRequestBody.phone_number = newVal[key];
                        }
                        else if(key==='isSelected') {
                            patchRequestBody.is_selected = newVal[key];
                        }
                        else if(key!=='index') {
                            patchRequestBody[key] = newVal[key];
                        }
                    }
                    patchRequestBody.id = idOfAddressToEditOrDelete;

                    if(patchRequestBody.is_selected==true && this.addressesOfUser[0].isSelected==true) {
                        const response0 = await fetch(`http://localhost:8026/unselectSelectedAddressOfUser/${this.authenticatedUsername}`, {
                            method: 'PATCH'
                        });
                        if(!response0.ok) {
                            throw new Error('Network response not ok');
                        }
                    }
            
                    const response = await fetch('http://localhost:8026/editCustomerAddress', {
                        method: 'PATCH',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(patchRequestBody)
                    });
                    if(!response.ok) {
                        throw new Error('Network response not ok');
                    }

                    for(let key of Object.keys(newVal)) {
                        if(key==='index' || key==='isSelected') {
                            continue;
                        }
                        if(key==='houseOrBuildingNumber' && newVal[key]==='') {
                            this.addressesOfUser[indexToEditOrDelete].houseOrBuildingNumber = null;
                        }
                        else if(key==='apartmentOrSuiteNumber' && newVal[key]==='') {
                            this.addressesOfUser[indexToEditOrDelete].apartmentOrSuiteNumber = null;
                        }
                        else if(key==='stateOrProvince' && newVal[key]==='') {
                            this.addressesOfUser[indexToEditOrDelete].stateOrProvince = null;
                        }
                        else {
                            this.addressesOfUser[indexToEditOrDelete][key] = newVal[key];
                        }
                    }
                    this.addressesOfUser[indexToEditOrDelete].addressText = this.getAddressText(this.addressesOfUser[indexToEditOrDelete]);

                    if(newVal.isSelected==true) {
                        this.selectedPickupLocationOfUser = null;
                        this.$emit("notifyParentOfSelectedPickupLocation", null);
                        this.addressesOfUser[0].isSelected = false;
                        this.addressesOfUser[indexToEditOrDelete].isSelected = true;
                        const newlySelectedAddress = this.addressesOfUser[indexToEditOrDelete];
                        this.addressesOfUser.splice(indexToEditOrDelete, 1);
                        this.addressesOfUser.splice(0,0,newlySelectedAddress);
                        this.$emit("notifyParentOfSelectedDeliveryAddress", this.addressesOfUser[0]);
                    }
                    else if(newVal.isSelected==false) {
                        this.addressesOfUser[indexToEditOrDelete].isSelected = false;
                        this.$emit("notifyParentOfSelectedDeliveryAddress", null);
                    }
                }
            },

            async newAddressToAdd(newVal) {
                if(newVal==null) {
                    return;
                }

                if(newVal.isSelected && this.addressesOfUser.length>0 && this.addressesOfUser[0].isSelected) {
                    const response0 = await fetch(`http://localhost:8026/unselectSelectedAddressOfUser/${this.authenticatedUsername}`, {
                        method: 'PATCH'
                    });
                    if(!response0.ok) {
                        throw new Error('Network response not ok');
                    }
                }

                const response = await fetch('http://localhost:8026/addNewCustomerAddress', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        username: this.authenticatedUsername,
                        house_or_building_number: newVal.houseOrBuildingNumber,
                        street_name: newVal.streetName,
                        apartment_or_suite: newVal.apartmentOrSuiteNumber,
                        town_or_city: newVal.townOrCity,
                        state_or_province: newVal.stateOrProvince,
                        zipcode: newVal.zipCode,
                        country: newVal.country,
                        is_selected: newVal.isSelected,
                        full_name: newVal.fullName,
                        phone_number: newVal.phoneNumber
                    })
                });
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                const newlyAddedAddressId = await response.json();
                const newAddress =
                {
                    ...newVal,
                    id: newlyAddedAddressId,
                    addressText: this.getAddressText(newVal)
                };
                
                if(newVal.isSelected==true) {
                    if(this.addressesOfUser.length>0) {
                        this.addressesOfUser[0].isSelected = false;
                    }
                    this.addressesOfUser.splice(0,0, newAddress);
                }
                else {
                    this.addressesOfUser = [...this.addressesOfUser, newAddress];
                }
            },

            async newlySetPickupLocation(newVal) {
                this.selectedPickupLocationOfUser = newVal;
                if(this.addressesOfUser.length>0 && this.addressesOfUser[0].isSelected==true){
                    const response0 = await fetch(`http://localhost:8026/unselectSelectedAddressOfUser/${this.authenticatedUsername}`, {
                        method: 'PATCH'
                    });
                    if(!response0.ok) {
                        throw new Error('Network response not ok');
                    }
                    this.addressesOfUser[0].isSelected = false;
                    this.$emit("notifyParentOfSelectedDeliveryAddress", null);
                }
            },

            addressWithUpdatedDeliveryInstructions(newVal) {
                const addressIndex = newVal.index;
                const updatedDeliveryInstructions = newVal.deliveryInstructions;
                this.addressesOfUser[addressIndex].deliveryInstructions = updatedDeliveryInstructions;
            }
        }
    }

</script>