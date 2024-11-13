<template>
        <div class="popup" :style="{backgroundColor: 'white', maxHeight: '33em', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', overflowY: 'scroll',
        display: displaySearchResults ? 'flex' : 'none', flexDirection: 'column', zIndex: '10'}">
            <SingleSearchResult v-for="(result, index) in listOfSearchResults" :key="index" :index="index"
            :authenticatedUsername="authenticatedUsername" :result="result[0]" :category="result[1]"
            :isDeletable="search.length==0" :showCategory="searchCategory.length==0"
            @deletePastSearch="deletePastSearch"/>
        </div>

</template>

<script>
import SingleSearchResult from './SingleSearchResult.vue';
    export default {
        props: {
            displaySearchResults: Boolean,
            authenticatedUsername: String,
            allPastSearchesOfUser: Array,
            search: String,
            searchCategory: String
        },

        components: {
            SingleSearchResult
        },

        mounted() {
            if(this.allPastSearchesOfUser!==null) {
                this.receiveAllPastSearchesOfUser();
            }
        },

        data() {
            return  {
                listOfSearchResults: [],
                mutableAllPastSearchesOfUser: [],
                pastSearchesOfUserInCurrentSearchCategory: []
            }
        },

        methods: {
            async deletePastSearch(pastSearchIndex) {
                const pastSearchToDelete = this.listOfSearchResults[pastSearchIndex];
                /*
                const response = await fetch(`http://localhost:8025/deleteShopSearch/${this.authenticatedUsername}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        search: pastSearchToDelete[0],
                        searchCategory: pastSearchToDelete[1]
                    })
                });
                if (!response.ok) {
                    throw new Error('Network response not ok');
                }
                */

                this.mutableAllPastSearchesOfUser = this.mutableAllPastSearchesOfUser
                .filter(x=> {
                    if(x[0]===pastSearchToDelete[0] && x[1]===pastSearchToDelete[1]) {
                        return false;
                    }
                    return true;
                });
                let pastSearchesOfUserInCurrentSearchCategory = this.mutableAllPastSearchesOfUser;
                if(this.searchCategory.length>0) {
                    pastSearchesOfUserInCurrentSearchCategory = pastSearchesOfUserInCurrentSearchCategory.filter(x=>{
                        if(x[1]===this.searchCategory) {
                            return true;
                        }
                        return false;
                    });
                }
                this.pastSearchesOfUserInCurrentSearchCategory = pastSearchesOfUserInCurrentSearchCategory;
                if(this.search.length==0) {
                    this.listOfSearchResults = pastSearchesOfUserInCurrentSearchCategory;
                }
            },

            receiveAllPastSearchesOfUser() {
                this.mutableAllPastSearchesOfUser = this.allPastSearchesOfUser;
                let pastSearchesOfUserInCurrentSearchCategory = this.mutableAllPastSearchesOfUser;
                if(this.searchCategory.length>0) {
                    pastSearchesOfUserInCurrentSearchCategory = pastSearchesOfUserInCurrentSearchCategory.filter(x=>{
                        if(x[1]===this.searchCategory) {
                            return true;
                        }
                        return false;
                    });
                }
                this.pastSearchesOfUserInCurrentSearchCategory = pastSearchesOfUserInCurrentSearchCategory;
                if(this.search.length==0) {
                    this.listOfSearchResults = pastSearchesOfUserInCurrentSearchCategory;
                }
            },

            async updateSearchResults() {
                const response = await fetch("http://localhost:8025/getShopSearchResults", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        search: this.search,
                        searchCategory: this.searchCategory.length==0 ? "all" : this.searchCategory
                    })
                });
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                let searchResults = await response.json();

                const pastSearchesByAuthUserThatWorkHere = this.pastSearchesOfUserInCurrentSearchCategory.filter(x=>x[0].startsWith(this.search)
                && !searchResults.includes(x[0])).map(x=>x[0]);

                searchResults = [...pastSearchesByAuthUserThatWorkHere, ...searchResults];

                if(!searchResults.includes(this.search)) {
                    searchResults.splice(0, 0, this.search);
                }

                searchResults = searchResults.map(searchResult=> [searchResult, this.searchCategory]);
                this.listOfSearchResults = searchResults;
            }
        },

        watch: {
            allPastSearchesOfUser(newVal) {
                if(newVal!==null) {
                    this.receiveAllPastSearchesOfUser();
                }
            },

            search(newVal) {
                if(newVal.length==0) {
                    this.listOfSearchResults = this.pastSearchesOfUserInCurrentSearchCategory;
                }
                else {
                    this.updateSearchResults();
                }
            },

            searchCategory(newVal) {
                let pastSearchesOfUserInCurrentSearchCategory = this.mutableAllPastSearchesOfUser;
                if(this.searchCategory.length>0) {
                    pastSearchesOfUserInCurrentSearchCategory = pastSearchesOfUserInCurrentSearchCategory.filter(x=>{
                        if(x[1]===newVal) {
                            return true;
                        }
                        return false;
                    });
                }
                this.pastSearchesOfUserInCurrentSearchCategory = pastSearchesOfUserInCurrentSearchCategory;
                if(this.search.length==0) {
                    this.listOfSearchResults = pastSearchesOfUserInCurrentSearchCategory;
                }
                else {
                    this.updateSearchResults();
                }
            }
        }
    };
</script>