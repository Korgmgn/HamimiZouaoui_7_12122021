<template>
    <Head />
    <div class="main">
        <Login />
    </div>
</template>

<script>
import Head from '../components/Head.vue'
import Login from '../components/Login.vue'

export default {
    name: 'LoginPage',
    components: { 
        Head,
        Login
    }
}
</script>

<style>


</style>