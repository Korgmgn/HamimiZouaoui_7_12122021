<template>
    <Head />
    <div class="main-box">
        <router-link to="/">Connexion</router-link>
        <form @submit.prevent="handleSignup" class="signup-form" action="submit">
            <h2>Créez un compte:</h2>

            <div class="username">
                <label for="username">Nom d'utilisateur: </label>
                <input v-model="signupUsername" type="text" name="username" required>
            </div>
            <div class="email">
                <label for="email">Votre adresse mail: </label>
                <input v-model="signupEmail" type="text" name="email" required>
            </div>
            <div class="password">
                <label for="password">Mot de passe: </label>
                <input v-model="signupPassword" type="text" name="password" required>
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
            signupSuccess: null,
            signupError: null
        }
    },
    methods: {
        async handleSignup() {
            try {
                const response = await axios.post('http://localhost:3000/users/signup', {
                    username: this.signupUsername,
                    email: this.signupEmail,
                    password: this.signupPassword
                })
                this.signupUsername = ''
                this.signupEmail = ''
                this.signupPassword = ''
                this.signupSuccess = 'Compte créé !'

            } catch (error) {
                this.signupError = 'Un erreur est survenu'
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