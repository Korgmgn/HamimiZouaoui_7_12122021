<template>
    <Head />
    <div class="main-box">
        <router-link to="/">Connexion</router-link>
        <form @submit.prevent="handleSignup" class="signup-form" action="submit">
            <h2>Créez un compte:</h2>

            <div class="username-input">
                <label for="signup-username">
                    Nom d'utilisateur: <input id="signup-username" v-model="signupUsername" type="text" name="username" required>
                </label>
                <p v-if="usernameError">{{ usernameError }}</p>
                <p v-else>(3 à 12 caractères)</p>
            </div>
            <div class="email">
                <label for="signup-email">
                    Votre adresse mail: <input id="signup-email" v-model="signupEmail" type="text" name="email" required>
                </label>
                <p v-if="emailError">{{ emailError }}</p>
                <p v-else>(ex: hello@test.com)</p>
            </div>
            <div class="password">
                <label for="signup-password">
                    Mot de passe: <input id="signup-password" v-model="signupPassword" type="password" name="password" required>
                </label>
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
        //Vérifie les regex
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
        //Si la vérification regex est réussie, envoie la requête.
        async handleSignup() {
            if(this.checkFormInput(this.signupUsername, this.signupEmail, this.signupPassword) == true) {
                this.usernameError = null
                this.emailError = null
                this.passwordError = null
                
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