<template>
    <div class="backdrop">
        <div class="account-popup">
            <div class="close-modal"  @click="closeModal">X</div>
            <h2>Gestion du compte</h2>
            <form @submit.prevent="handleAccountChange" action="submit">
                <label for="username">Nouveau nom d'utilisateur: </label>
                <input v-model="username" class="post-form" name="username" type="text" required>
                <label for="email">Nouvel email: </label>
                <input v-model="email" class="post-form" name="email" type="text" required>
                <label for="password">Nouveau mot de passe: </label>
                <input v-model="password" class="post-form" name="password" type="text" required>
                <button>Soumettre les nouvelles informations</button>
                <p v-if="confirmChange">{{ confirmChange }}</p>
                <p v-if="errorChange">{{ errorChange }}</p>
            </form>
            <span @click="handleAccountDelete">Supprimer le compte</span>
            <p v-if="errorDelete">{{ errorDelete }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
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
        closeModal() {
            this.$emit('close')
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
h2 {
    font-size: 18px;
}
.backdrop {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(128, 128, 128, 0.233);
}
.account-popup {
    width: 90%;
    height: 500px;
    max-width: 500px;
    background: cyan;
    border: solid 1px black;
    border-radius: 25px;
    box-shadow: 5px 5px 10px gray;
    padding: 10px 0 10px 0;
}
.close-modal {
    height: 20px;
    width: 20px;
    position: relative;
    right: 15px;
    top: 10px;
    margin-left: auto;
    border: solid 1px black;
    border-radius: 5px;
    cursor: pointer;
}
form {
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
}
.post-form {
    width: 70%;
    height: 10px;
    padding-left: 5px;
    background: white;
    border-radius: 5px;
    padding: 10px 0 10px 0;
    margin: 10px 0 10px 0;
    text-align: left;
}
button {
    background: lightskyblue;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    color: white;
    border-radius: 20px;
    box-shadow: 2px 2px 5px lightgrey;
    cursor: pointer;
}
button:active {
    transform: scale(0.9);
}
span {
    color: blue;
    cursor: pointer;
}
</style>