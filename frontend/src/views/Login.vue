<template>
    <Head />
    <div class="main-box">
        <router-link to="/signup">Inscription</router-link>
        <form @submit.prevent="handleLogin" class="login-form" action="submit">
            <h2>Connexion</h2>
            <div class="username-input">
                <label for="username">Nom d'utilisateur: </label>
                <input v-model="loginUsername" type="text" name="username" required>
            </div>
            <div class="password">
                <label for="password">Mot de passe: </label>
                <input v-model="loginPassword" type="text" name="password" required>
            </div>
            <button>Se connecter</button>
            <p v-if="loginError">{{ loginError }}</p>
      </form>
    </div>
</template>

<script>
import axios from 'axios'
import Head from '../components/Head.vue'
//import { mapActions } from 'vuex'

export default {
    name: 'Login',
    components: { Head },
    data() {
        return {
            loginUsername : '',
            loginPassword : '',
            loginError: null
        }
    },
    methods: {
        async handleLogin() {
            try{
                const response = await axios.post('http://localhost:3000/users/login', {
                    username: this.loginUsername,
                    password: this.loginPassword
                })
                
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userUuid', response.data.userUuid);
                localStorage.setItem('isAdmin', response.data.isAdmin);

                // this.$store.state.token = response.data.token
                // this.$store.state.isAdmin = response.data.isAdmin
                // this.$store.state.userUuid = response.data.userUuid
                // console.log('Le token: ', this.$store.state.token, 'Statut: ', this.$store.state.isAdmin)
                this.$router.push('/home')
            
            } catch (error) {
                this.loginError = 'Connexion échouée !'
            }
        }
    }
}

</script>

<style scoped>
input {
    box-sizing: border-box;
    margin-top: 8px;
    border: none;
    border-bottom: 2px solid darkgray;
    background: transparent;
}
</style>