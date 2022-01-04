<template>
    <Head />
    <div class="main-box">
        <router-link to="/signup">Inscription</router-link>
        <form @submit.prevent="handleLogin" class="login-form" action="submit">
            <h2>Connexion</h2>
            <div class="username-input">
                <label for="login-username">
                    Nom d'utilisateur: <input id ="login-username" v-model="loginUsername" type="text" name="username" required>
                </label>
                <p v-if="usernameError">{{ usernameError }}</p>
            </div>
            <div class="password">
                <label for="login-password">
                    Mot de passe: <input id="login-password" v-model="loginPassword" type="password" name="password" required>
                </label>
                <p v-if="passwordError">{{ passwordError }}</p>
            </div>
            <button>Se connecter</button>
            <p v-if="loginError">{{ loginError }}</p>
      </form>
    </div>
</template>

<script>
import axios from 'axios'
import Head from '../components/Head.vue'

export default {
    name: 'Login',
    components: { Head },
    data() {
        return {
            loginUsername : '',
            loginPassword : '',

            usernameError: null,
            passwordError: null,
            loginError: null
        }
    },
    methods: {
        //Vérifie les regex
        checkFormInput(usernameInput, passwordInput) {
            if(usernameInput == '' || passwordInput =='') {
                this.loginError = 'Veuillez remplir tous les champs !'
            } else if(!this.usernameRegex(this.loginUsername)){
                this.usernameError = 'Lettres et espaces seulement !'
            } else if(!this.passwordRegex(this.loginPassword)){
                this.passwordError = 'Lettres et chiffres seulement !'
            } else {
                return true
            }
        },
        usernameRegex(usernameInput){
            return /^[A-Z-a-z\s]{3,12}$/.test(usernameInput)
        },       
        passwordRegex(passwordInput){
            return /^[A-Za-z0-9]{5,12}$/.test(passwordInput)
        },
        //Si la vérification regex est réussie, envoie la requête.
        async handleLogin() {
            try {
                if(this.checkFormInput(this.loginUsername, this.loginPassword) == true) {
                    const response = await axios.post('http://localhost:3000/users/login', {
                        username: this.loginUsername,
                        password: this.loginPassword
                    })
                    
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userUuid', response.data.userUuid);
                    localStorage.setItem('isAdmin', response.data.isAdmin);

                    this.$router.push('/home')
                }
            } catch (error) {
                this.loginError = error.response.data.error
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