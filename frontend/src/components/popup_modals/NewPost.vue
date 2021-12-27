<template>
    <div class="backdrop">
        <div class="main-box">
            <div class="close-modal"  @click="closeModal">X</div>
            <h2>Votre nouveau message</h2>
            <form @submit.prevent="handleNewPost" action="submit">
                <input v-model="content" class="text-input" type="text">
                <input type="file">
                <p v-if="confirmNewpost">{{ confirmNewpost }}</p>
                <button>Envoyer</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            content: '',
            confirmNewpost: null
        }
    },
    methods: {
        closeModal() {
            this.$emit('close')
        },
        refreshPosts(){
            this.$emit('refresh')
        },

        async handleNewPost() {
            await axios.post('http://localhost:3000/posts/create', {
                content: this.content
            },
            {
            headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
            }})
            this.content = ''
            this.confirmNewpost = 'Message envoyé !'
            this.refreshPosts()
        }
    }
}
</script>
