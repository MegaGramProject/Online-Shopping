<template>
    <div class="hoverableElement singleSearchResult" @click="takeUserToPageForResult"
    :style="{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.2em 0.4em',
    fontSize: '0.91em', zIndex: '10', backgroundColor: 'white'}">
        <p><b>{{result}}</b> <span v-if="showCategory && category.length>0" :style="{color: 'gray'}">in <span :style="{fontFamily: 'Roboto', fontSize: '1.2em'}">{{category}}</span></span></p>
        <img v-if="isDeletable" :src="thinGrayXIcon" @click="deletePastSearch" :style="{cursor: 'pointer', height: '1.5em', width: '1.5em'}"/>
    </div>

</template>

<script>
import thinGrayXIcon from '@/assets/images/thinGrayXIcon.png';

    export default {
        props: {
            index: Number,
            authenticatedUsername: String,
            result: String,
            category: String,
            showCategory: Boolean,
            isDeletable: Boolean
        },

        data() {
            return {
                thinGrayXIcon,
                categoryToPagePathSegmentMappings: {
                    '': 'shopAllItems',
                    'Arts & Crafts': 'shopArts&Crafts',
                    'Books': 'shopBooks',
                    'Cell Phones & Accessories': 'shopCellPhones&Accessories',
                    'Clothing & Shoes': 'shopFashion',
                    'Electronics': 'shopElectronics',
                    'Food': 'shopFood',
                    'Home & Kitchen': 'shopHome&Kitchen',
                    'Toys for Kids': 'shopToysForKids',
                    'Smart Home': 'shopSmartHomeProducts',
                    'Sports & Outdoors': 'shopSports&Outdoors'
                }
            }
        },

        methods: {
            async takeUserToPageForResult() {
                /*
                const response = await fetch(`http://localhost:8025/addShopSearch/${this.authenticatedUsername}`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        search: result,
                        searchCategory: category,
                        dateTime: (new Date()).toISOString()
                    })
                });
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                */
                window.location.href = `http://localhost:8024/${this.categoryToPagePathSegmentMappings[this.category]}/${this.result}`;
            },

            deletePastSearch(event) {
                event.stopPropagation();
                this.$emit("deletePastSearch", this.index);
            }
        }
    };

</script>