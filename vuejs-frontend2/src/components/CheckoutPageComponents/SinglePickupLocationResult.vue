<template>
    <div @mouseenter="setIsHoveredToTrue" @mouseleave="setIsHoveredToFalse" :style="{width: '93%', padding: '0.5em 1em', borderStyle: 'solid', borderColor: 'lightgray',
    display: 'flex', gap: '1.6em', borderWidth:'0.3em', borderLeftColor: isHovered ? 'orange' : 'white',
    borderTop: 'none'}">

        <div :style="{position: 'relative', height: '1.8em', width: '1.65em'}">
            <img :src="orangeMapPin" :style="{height: '100%', width: '100%', pointerEvents: 'none'}"/>
            <p :style="{fontSize:'0.85em', position: 'absolute', top: '-40%', left: '36%'}">{{ index }}</p>
        </div>

        <div :style="{display: 'flex', flexDirection: 'column', marginTop:'-1em', width: '100%'}">
            <div :style="{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center'}">
                <h4>Megagram Locker - {{ locationName }}</h4>
                <p>{{ distance }} {{ distanceUnit }}</p>
            </div>

            <p>{{ pickupLocationAddress }}</p>
            <div :style="{display: 'flex', flexDirection: 'column', marginTop:'-0.5em', borderStyle: 'solid',
            borderColor: 'lightgray', borderWidth:'0.09em', borderLeft: 'none', borderRight: 'none', borderBottom: 'none',
            marginBottom:'2em'}">
                <p v-for="weekDays in Object.keys(openingHours)" :key="weekDays" :style="{marginBottom: '-0.5em'}">{{ weekDays }}: {{ openingHours[weekDays] }}</p>
            </div>

            <b v-if="!detailsAreHidden">Directions</b>
            <p v-if="!detailsAreHidden" :style="{marginTop:'0.5em', fontSize:'0.95em'}">{{ pickupDirections }}</p>
            <a v-if="!detailsAreHidden" @click="toggleDetailsAreHidden" :style="{color: '#2f6da3', cursor: 'pointer', textDecoration: 'underline'}">Hide details</a>

            <a v-if="detailsAreHidden" @click="toggleDetailsAreHidden" :style="{color: '#2f6da3', cursor: 'pointer', textDecoration: 'underline'}">Show details</a>
            
            <button @click="pickupHere" :style="{border: 'none', padding: '0.7em 1.2em', cursor: 'pointer', borderRadius: '2em',
            backgroundColor:'#ffe359', marginTop: '1.5em'}">
                Pick up here
            </button>

        </div>

    </div>

</template>

<script>
import orangeMapPin from '@/assets/images/orangeMapPin.png';

    export default {

        props: {
            index: Number,
            locationName: String,
            distance: Number,
            distanceUnit: String,
            openingHours: Object,
            pickupLocationAddress: String,
            pickupDirections: String,
        },

        data() {
            return {
                orangeMapPin,
                detailsAreHidden: true,
                isHovered: false
            }
        },

        methods:  {
            toggleDetailsAreHidden() {
                this.detailsAreHidden = !this.detailsAreHidden;
            },

            setIsHoveredToTrue() {
                this.isHovered = true;
            },

            setIsHoveredToFalse() {
                this.isHovered = false;
            },

            pickupHere() {
                this.$emit("pickupHere", this.index);
            }
        }

    };
</script>