<template>
    <Head />
    <Navigation />
    <div class="main-box">
        <h2>Gestion du compte</h2>
        <form @submit.prevent="handleAccountChange" action="submit">
            <label for="username">Nouveau nom d'utilisateur: </label>
            <input v-model="username" class="post-form" name="username" type="text" required>
            <label for="email">Nouvel email: </label>
            <input v-model="email" class="post-form" name="email" type="text" required>
            <label for="password">Nouveau mot de passe: </label>
            <input v-model="password" class="post-form" name="password" type="text" required>
            <button>Soumettre</button>
            <p v-if="confirmChange">{{ confirmChange }}</p>
            <p v-if="errorChange">{{ errorChange }}</p>
        </form>
        <button class="delete-button" @click="handleAccountDelete">Supprimer le compte</button>
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
            username: '',
            email: '',
            password: '',
            confirmChange: null,
            errorChange: null,
            errorDelete: null,
        }
    },
    methods: {
        async handleAccountDelete() {
            try {
                await axios.delete('http://localhost:3000/users/delete', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                this.$router.push('/')
            } catch (error) {
                this.errorDelete = 'Suppresion échouée'
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
    }
}
</script>

<style scoped>
button.delete-button {
    align-self: center;
}
</style>