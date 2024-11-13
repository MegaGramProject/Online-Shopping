<template>
    <div @click="takeToPage" @mouseenter="toggleIsHoveringOnComponent" @mouseleave="toggleIsHoveringOnComponent"
        :style="{borderStyle: isHoveringOnComponent ? 'solid' : 'none', borderColor: 'white', cursor: 'pointer', display: 'flex',
        alignItems: 'start', gap: '0.4em', padding: '0.2em 0.4em'}">

            <b :style="{color: 'white'}">{{optionName}}</b>
    </div>

</template>

<script>
    export default {
        props: {
            optionName: String,
            optionURL: String
        },
        
        data() {
            return {
                isHoveringOnComponent: false
            }
        },
        
        methods: {
            takeToPage() {
                window.location.href = this.optionURL;
            },

            toggleIsHoveringOnComponent() {
                this.isHoveringOnComponent = !this.isHoveringOnComponent;
            }
        }
    };
</script>