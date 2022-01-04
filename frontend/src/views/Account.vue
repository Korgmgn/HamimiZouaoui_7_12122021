<template>
    <Head />
    <Navigation />
    <div class="main-box">
        <h2>Gestion du compte</h2>
        <button ref="togglechange" class="account-button" @click="allowChanges">Changez vos infos</button> 
        <div class="account-info" v-if="!modifyAccount">
            <p v-if="userStatus == 'admin'">Ceci est un compte administrateur !</p>
            <p>Votre nom d'utilisateur: {{ user.username }}</p>
            <p>Votre email: {{ user.email }} </p>
        </div>
        <form class="login-form" @submit.prevent="handleAccountChange" action="submit" v-else>
            <label for="account-username">
                Nouveau nom d'utilisateur: <input id="account-username" v-model="username" class="post-form" name="username" type="text" required>
            </label>
            <p v-if="usernameError">{{ usernameError }}</p>

            <label for="account-email">
                Nouvel email: <input id="account-email" v-model="email" class="post-form" name="email" type="text" required>
            </label>
            <p v-if="emailError">{{ emailError }}</p>

            <label for="account-password">
                Confirmez ou changez votre mot de passe: <input id="account-password" v-model="password" class="post-form" name="password" type="password" required>
            </label>
            <p v-if="passwordError">{{ passwordError }}</p>

            <button>Soumettre</button>
            <p v-if="confirmChange">{{ confirmChange }}</p>
            <p v-if="errorChange">{{ errorChange }}</p>
        </form>
        <br>
        <button class="account-button" @click="handleAccountDelete">Supprimez le compte</button>
        <p v-if="errorDelete">{{ errorDelete }}</p>
    </div>
</template>

<script>
import axios from 'axios'
import Head from '../components/Head.vue'
import Navigation from '../components/Navigation.vue'

export default {
    name: 'Account',
    components: { Head, Navigation },
    data() {
        return {
            user: [],
            username: '',
            email: '',
            password: '',
            userStatus: '',
            modifyAccount: false,
            confirmChange: null,

            usernameError: null,
            emailError: null,
            passwordError: null,
            errorChange: null,
            errorDelete: null,
        }
    },
    methods: {
        //Déclenche l'affichage des inputs permettant 
        //les changements d'informations du compte
        allowChanges() {
            this.modifyAccount = !this.modifyAccount
        },
        //Vérifie les regex
        checkFormInput(usernameInput, emailInput, passwordInput) {
            if(usernameInput == '' || emailInput == '' || passwordInput =='') {
                this.signupError = 'Veuillez remplir tous les champs !'
            } else if(!this.usernameRegex(this.username)){
                this.usernameError = 'Lettres et espaces seulement !'
            } else if(!this.emailRegex(this.email)){
                this.emailError = 'Ce format n\'est pas reconnu !'
            } else if(!this.passwordRegex(this.password)){
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
        //Lancée lors du cycle createdEnvoie une requête pour obtenir l'utilisateur voulu.
        async getAccount() {
            const response = await axios.get('http://localhost:3000/users/account', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            this.user = response.data
            this.username = response.data.username
            this.email = response.data.email
            this.userStatus = response.data.admin
        },
        //Permet la suppression de l'utilisateur 
        async handleAccountDelete() {
            try {
                await axios.delete('http://localhost:3000/users/delete', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                this.$router.push('/')
            } catch (error) {
                this.errorDelete = 'Suppression échouée'
            }
        },
        //Envoie la requête de modification d'informations du compte
        async handleAccountChange() {
            if(this.checkFormInput(this.username, this.email, this.password) == true) {
                this.usernameError = null
                this.emailError = null
                this.passwordError = null

                await axios.put('http://localhost:3000/users/modify', {
                    username: this.username,
                    email: this.email,
                    password: this.password
                    },
                    {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }})
                this.username = ''
                this.email = ''
                this.password = ''
                this.confirmChange = 'Changements appliqués !'
                this.errorChange = null
            } else {
                this.confirmChange = null
                this.errorChange = 'Modification échouée !'
            }
        }
    },
    created(){
        this.getAccount()
    },
    mounted () {
        this.$refs.togglechange.focus();
    }
}
</script>

<style scoped>
button.account-button {
    align-self: center;
}
.account-info p {
    padding: 5px;
}
</style>