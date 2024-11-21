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
                />
                <a :style="{color: '#2f6da3', cursor: 'pointer'}">Add a new delivery address</a>
            </div>

            <h3>Pickup locations</h3>
            <a :style="{color: '#2f6da3', cursor: 'pointer', fontSize:'0.9em'}">Find a pickup location nearby</a>
            <button @click="toggleIsMinimized" :style="{border: 'none', padding: '0.5em 1em', cursor: 'pointer', borderRadius: '2em',
            backgroundColor:'#ffe359', width: '13em', marginTop:'1em'}">Deliver to this address</button>
        </template>

        <template v-if="isMinimized">
            <div :style="{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}">
                <h3 v-if="addressesOfUser.length>0 && addressesOfUser[0].isSelected==true">Delivering to {{ addressesOfUser[0].fullName }}</h3>
                <h3 v-if="addressesOfUser.length==0 || addressesOfUser[0].isSelected==false">You haven't selected a delivery-address yet</h3>
                <a @click="toggleIsMinimized" :style="{color: '#2f6da3', cursor: 'pointer'}">Change</a>
            </div>
            <p v-if="addressesOfUser.length>0 && addressesOfUser[0].isSelected==true" :style="{fontSize:'1em', marginTop:'0.5em'}">{{ addressesOfUser[0].addressText }}</p>
            <a @click="toggleIsMinimized" v-if="addressesOfUser.length>0 && addressesOfUser[0].isSelected==true" :style="{color: '#2f6da3', cursor: 'pointer'}">Add delivery instructions</a>
        </template>
    </div>

</template>

<script>
import SelectSingleAddress from './SelectSingleAddress.vue';

    export default {
        props: {
            authenticatedUsername: String
        },

        components: {
            SelectSingleAddress
        },

        data() {
            return {
                isMinimized: true,
                addressesOfUser: [],
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
                        addressText: "369 Leffler Trafficway, Domitilachester, UT 35521-7510",
                        phoneNumber: "+16088613433",
                        isSelected: true
                    },
                    
                    {
                        id: 1,
                        fullName: "Rishav Ray",
                        addressText: "75165 Greenfelder Drive, South Nanceetown, WV 91793-8892",
                        phoneNumber: "+16098671431"
                    },
                    {
                        id: 2,
                        fullName: "Rishav Ray",
                        addressText: "Apt. 974 69127 Fritsch Ranch, Greenholtborough, MO 19198-9425",
                        phoneNumber: "+12088673421"
                    }
                ];
                this.addressesOfUser = addressesOfUser;
                this.$emit("notifyParentOfSelectedDeliveryAddress", this.addressesOfUser[0]);
            },

            toggleSelectSingleAddress(indexOfSingleAddressToToggle) {
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
            }
        },

        watch: {
            authenticatedUsername(newVal) {
                if(newVal.length>0) {
                    this.fetchAddressesOfUser();
                }
            }
        }
    }

</script>