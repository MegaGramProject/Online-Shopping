<template>
    <div :style="{position:'absolute', top:'40%', left:'40%'}">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
    </div>
</template>


<script>
import './styles.css';

    export default {
        mounted() {
            document.title = "Not Found";
        }
    }
    
</script>