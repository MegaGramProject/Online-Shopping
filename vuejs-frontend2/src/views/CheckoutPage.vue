<template>
    <TopSection :authenticatedUsername="authenticatedUsername" :hasPremium="hasPremium"/>
</template>

<script>
import TopSection from '@/components/CheckoutPageComponents/TopSection.vue';
import '../styles.css';

    export default {

        data() {
            return {
                numTimesRouteParamsWasWatched: 0,
                authenticatedUsername: "",
                hasPremium: true
            }
        },

        components: {
            TopSection
        },

        methods: {
            async authenticateUser(username) {
                /*
                const response = await fetch('http://localhost:8003/cookies/authenticateUser/'+username, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                const isAuth = await response.json();
                if(isAuth) {
                    localStorage.setItem('authenticatedUsername', username);
                    setAuthenticatedUsername(username);
                    return;
                }
                else {
                    const data = {'username':username};
                    const options = {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data),
                        credentials: 'include',
                    }
                    const response2 = await fetch('http://localhost:8003/cookies/updateAuthToken', options);
                    if(!response2.ok) {
                        throw new Error('Network response not ok');
                    }
                    const response2Data = await response2.text();
                    if(response2Data === "Cookie updated successfully") {
                        const response3 = await fetch('http://localhost:8003/cookies/authenticateUser/'+username, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            credentials: 'include'
                        });
                        if(!response3.ok) {
                            throw new Error('Network response not ok');
                        }
                        const isAuth = await response.json();
                        if(isAuth) {
                            localStorage.setItem('authenticatedUsername', username);
                            setAuthenticatedUsername(username);
                            return;
                        }
                    }

                }
                window.location.href = "http://location:8000/login";
                */
                localStorage.setItem('defaultUsername', username);
                this.authenticatedUsername = username;
            },

            async fetchRelevantDataAtStart() {

            }
        },

        watch: {
            '$route.params': {
                immediate: true,
                async handler(newParams) {
                    this.numTimesRouteParamsWasWatched++;
                    if(this.numTimesRouteParamsWasWatched<2) {
                        return;
                    }
                    if(typeof newParams.username !== 'undefined') {
                        await this.authenticateUser(newParams.username);
                        this.fetchRelevantDataAtStart();
                    }
                    else if(localStorage.getItem('defaultUsername')) {
                        await this.authenticateUser(localStorage.getItem('defaultUsername'));
                        this.fetchRelevantDataAtStart();
                    }
                    else {
                    //window.location.href = "http://location:8000/login";
                    }
                }
            },
        }
    }
</script>