<template>
  <div :style="{width: '14%', position: 'fixed', top: '0%', left: '0%', height: '100%'}">
      <LeftSidebar v-if="displayLeftSidebar" :authenticatedUsername="authenticatedUsername"/>
  </div>
</template>

<script>
import LeftSidebar from './components/LeftSidebar.vue';
import './styles.css';

  export default {
    data() {
      return  {
        authenticatedUsername: "",
        displayLeftSidebar: true,
        numTimesRouteParamsWasWatched: 0
      };
    },

    components: {
      LeftSidebar
    },

    mounted() {
        document.title = "Shopping Cart";
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

          }
          else if(localStorage.getItem('defaultUsername')) {
              await this.authenticateUser(localStorage.getItem('defaultUsername'));
          }
        }
      }
  }
  }
</script>

