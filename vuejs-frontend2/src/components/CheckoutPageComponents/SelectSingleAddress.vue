<template>
    <div :style="{width: '100%', display: 'flex', alignItems: 'center', gap: '1em'}">
        <input v-model="mutableIsSelected" type="checkbox">
        <div>
            <b>{{ fullName }}</b>
            <p :style="{fontSize:'0.9em', marginTop:'0.5em'}">{{ addressText }}</p>
            <p :style="{fontSize:'0.9em', marginTop:'-0.5em'}">Phone number: {{ phoneNumber }}</p>
            <div :style="{display: 'flex', alignItems: 'center', fontSize:'0.9em', marginTop:'-1em'}">
                <a :style="{color: '#2f6da3', cursor: 'pointer'}">Edit or Delete</a>
                <div class="vertical-line">
                </div>
                <a :style="{color: '#2f6da3', cursor: 'pointer'}">Add delivery instructions</a>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            index: Number,
            fullName: String,
            addressText: String,
            phoneNumber: String,
            isSelected: Boolean
        },

        data() {
            return {
                mutableIsSelected: this.isSelected
            }
        },

        watch: {
            isSelected(newVal) {
                this.mutableIsSelected = newVal;
            },

            mutableIsSelected(newVal) {
                if(newVal!==this.isSelected) {
                    this.$emit("toggleSelectSingleAddress", this.index);
                }
            }
        }
    }

</script>