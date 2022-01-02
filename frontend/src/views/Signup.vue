<template>
    <Head />
    <div class="main-box">
        <router-link to="/">Connexion</router-link>
        <form @submit.prevent="handleSignup" class="signup-form" action="submit">
            <h2>Créez un compte:</h2>

            <div class="username-input">
                <label for="username">Nom d'utilisateur: </label>
                <input v-model="signupUsername" type="text" name="username" required>
                <p v-if="usernameError">{{ usernameError }}</p>
                <p v-else>(3 à 12 caractères)</p>
            </div>
            <div class="email">
                <label for="email">Votre adresse mail: </label>
                <input v-model="signupEmail" type="text" name="email" required>
                <p v-if="emailError">{{ emailError }}</p>
                <p v-else>(ex: hello@test.com)</p>
            </div>
            <div class="password">
                <label for="password">Mot de passe: </label>
                <input v-model="signupPassword" type="password" name="password" required>
                <p v-if="passwordError">{{ passwordError }}</p>
                <p v-else>(5 à 12 caractères)</p>
            </div>
            <button>S'inscrire</button>
            <p v-if="signupSuccess">{{ signupSuccess }}</p>
            <p v-if="signupError">{{ signupError }}</p>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import Head from '../components/Head.vue'

export default {
    name: 'Signup',
    components: { Head },
    data() {
        return {
            signupUsername : '',
            signupEmail : '',
            signupPassword : '',
            usernameError: null,
            emailError: null,
            passwordError: null,
            signupSuccess: null,
            signupError: null
        }
    },
    methods: {
        checkFormInput(usernameInput, emailInput, passwordInput) {
            if(usernameInput == '' || emailInput == '' || passwordInput =='') {
                this.signupError = 'Veuillez remplir tous les champs !'
            } else if(!this.usernameRegex(this.signupUsername)){
                this.usernameError = 'Lettres et espaces seulement !'
            } else if(!this.emailRegex(this.signupEmail)){
                this.emailError = 'Ce format n\'est pas reconnu !'
            } else if(!this.passwordRegex(this.signupPassword)){
                this.passwordError = 'Lettres et chiffres seulement !'
            } else {
                return true
            }
        },
        usernameRegex(usernameInput){
            return /^[A-Z-a-z\s]{3,12}$/.test(usernameInput)
        },       
        emailRegex(emailInput){
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput)
        },
        passwordRegex(passwordInput){
            return /^[A-Za-z0-9]{5,12}$/.test(passwordInput)
        },
        async handleSignup() {
            if(this.checkFormInput(this.signupUsername, this.signupEmail, this.signupPassword) == true) {
                const response = await axios.post('http://localhost:3000/users/signup', {
                    username: this.signupUsername,
                    email: this.signupEmail,
                    password: this.signupPassword
                })
                this.signupUsername = ''
                this.signupEmail = ''
                this.signupPassword = ''
                this.signupSuccess = 'Compte créé !'
                this.signupError = null
            } else {
                this.signupSuccess = null
                this.signupError = 'Une erreur est survenue'
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