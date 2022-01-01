<template>
    <Head />
    <Navigation />
    <div class="main-box">
        <h2>Gestion du compte</h2>
        <div class="account-info" v-if="!modifyAccount">
            <p v-if="userStatus == 'admin'">Ceci est un compte administrateur !</p>
            <p>Votre nom d'utilisateur: {{ user.username }}</p>
            <p>Votre email: {{ user.email }} </p>
        </div>
        <form class="login-form" @submit.prevent="handleAccountChange" action="submit" v-else>
            <label for="username">Nouveau nom d'utilisateur: </label>
            <input v-model="username" class="post-form" name="username" type="text" required>
            <label for="email">Nouvel email: </label>
            <input v-model="email" class="post-form" name="email" type="text" required>
            <label for="password">Confirmez ou changez votre mot de passe: </label>
            <input v-model="password" class="post-form" name="password" type="password" required>
            <button>Soumettre</button>
            <p v-if="confirmChange">{{ confirmChange }}</p>
            <p v-if="errorChange">{{ errorChange }}</p>
        </form>
        <button class="account-button" @click="allowChanges">Changez vos infos</button>
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
            errorChange: null,
            errorDelete: null,
        }
    },
    methods: {
        allowChanges() {
            this.modifyAccount = !this.modifyAccount
        },
        async getAccount() {
            const response = await axios.get('http://localhost:3000/users/account', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            console.log(response.data)
            this.user = response.data
            this.username = response.data.username
            this.email = response.data.email
            this.userStatus = response.data.admin
        },

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

        async handleAccountChange() {
            try {
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
            } catch (error) {
                this.errorChange = 'Modification échouée !'
            }
        }
    },
    created(){
        this.getAccount()
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