<template>

    <div :style="{width: '50em', padding: '1em 1em', backgroundColor: 'white', display: 'flex',
    flexDirection: 'column'}">
        <template v-if="!isMinimized">
            <h3>Select a delivery address</h3>
            <div :style="{display: 'flex', flexDirection: 'column', borderStyle: 'solid', borderColor: 'lightgray',
            padding: '0.5em 1em', borderLeft: 'none', borderRight: 'none', gap: '1em'}">
                <h3>Delivery Addresses ({{ addressesOfUser.length }})</h3>
                <SelectSingleAddress v-for="(address, index) in addressesOfUser" :key="address.id" :index="index"
                :fullName="address.fullName" :addressText="address.addressText" :phoneNumber="address.phoneNumber"
                :isSelected="index==0 && address.isSelected==true" @toggleSelectSingleAddress="toggleSelectSingleAddress"
                @showEditOrDeleteAddressPopup="showEditOrDeleteAddressPopup"/>
                <a @click="showAddNewDeliveryAddressPopup" :style="{color: '#2f6da3', cursor: 'pointer'}">Add a new delivery address</a>
            </div>

            <h3>Pickup locations</h3>
            <template v-if="selectedPickupLocationOfUser!==null">
                <b>Currently Selected: Megagram Locker - {{selectedPickupLocationOfUser.locationName}} ({{selectedPickupLocationOfUser.distance + selectedPickupLocationOfUser.distanceUnit }})</b>
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
            newlySetPickupLocation: Object
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
                //make API-request to get addresses of user
                let addressesOfUser = [
                    {
                        id: 0,
                        fullName: "Rishav Ray",
                        country: "the United States",
                        houseOrBuildingNumber: "369",
                        streetName: "Leffler Trafficway",
                        apartmentOrSuiteNumber: null,
                        townOrCity: "Domitilachester",
                        stateOrProvince: "Utah",
                        zipCode: "35521",
                        addressText: "369 Leffler Trafficway, Domitilachester Utah 35521, the United States",
                        phoneNumber: "+16088613433",
                        isSelected: true
                    },
                    
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
                        phoneNumber: "+16098671431"
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
                        phoneNumber: "+12088673421"
                    }
                ];
                this.addressesOfUser = addressesOfUser;
                this.$emit("notifyParentOfSelectedDeliveryAddress", this.addressesOfUser[0]);
                this.$emit("notifyParentOfSelectedPickupLocation", null);
            },

            toggleSelectSingleAddress(indexOfSingleAddressToToggle) {
                this.selectedPickupLocationOfUser = null;
                this.$emit("notifyParentOfSelectedPickupLocation", null);
                if(indexOfSingleAddressToToggle==0) {
                    this.addressesOfUser[0].isSelected = !this.addressesOfUser[0].isSelected;
                    if(this.addressesOfUser[0].isSelected) {
                        this.$emit("notifyParentOfSelectedDeliveryAddress", this.addressesOfUser[0]);
                    }
                    else {
                        this.$emit("notifyParentOfSelectedDeliveryAddress", null);
                    }
                }
                else {
                    delete this.addressesOfUser[0].isSelected;
                    const newlySelectedAddress = this.addressesOfUser[indexOfSingleAddressToToggle];
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

            adjustmentsToAddressToEditOrDelete(newVal) {
                if(newVal==null) {
                    return;
                }
                const indexToEditOrDelete = newVal.index;
                if(newVal.delete==true) {
                    if(indexToEditOrDelete==0) {
                        if(this.addressesOfUser.length>1) {
                            this.addressesOfUser[1].isSelected = false;
                        }
                        this.$emit("notifyParentOfSelectedDeliveryAddress", null);
                    }
                    this.addressesOfUser.splice(indexToEditOrDelete, 1);
                }
                else {
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
                        delete this.addressesOfUser[0].isSelected;
                        this.addressesOfUser[indexToEditOrDelete].isSelected = true;
                        const newlySelectedAddress =  this.addressesOfUser[indexToEditOrDelete];
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

            newAddressToAdd(newVal) {
                if(newVal==null) {
                    return;
                }
                if(newVal.isSelected) {
                    delete this.addressesOfUser[0].isSelected;
                    this.addressesOfUser.splice(0,0,
                        {...newVal,
                            id: Math.floor(Math.random*5000)+1000,
                            addressText: this.getAddressText(newVal)
                        }
                    );
                }
                else {
                    this.addressesOfUser = [...this.addressesOfUser,
                        {...newVal,
                            id: Math.floor(Math.random*5000)+1000,
                            addressText: this.getAddressText(newVal)
                        }
                    ];
                }
            },

            newlySetPickupLocation(newVal) {
                this.selectedPickupLocationOfUser = newVal;
                if(this.addressesOfUser.length>0){
                    this.addressesOfUser[0].isSelected = false;
                    this.$emit("notifyParentOfSelectedDeliveryAddress", null);
                }
            }
        }
    }

</script>