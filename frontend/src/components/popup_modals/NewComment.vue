<template>
    <div class="backdrop">
        <div class="main-box">
            <div class="close-modal"  @click="closeModal">X</div>
            <h2>Commentaire:</h2>
            <form @submit.prevent="handleNewComment" action="submit">
                <input v-model="content" class="text-input" type="text">
                <p v-if="confirmNewcomment">{{ confirmNewcomment }}</p>
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
            confirmNewcomment: null
        }
    },
    props: ['postuuid'],
    methods: {
        closeModal() {
            this.$emit('close')
        },
        refreshPosts(){
            this.$emit('refresh')
        },

        async handleNewComment() {
            await axios.post(`http://localhost:3000/comments/create/${this.postuuid}`, {
                content: this.content
            },
            {
            headers: {
                    Authorization: `Bearer ${this.$store.state.token}`
            }})
            this.content = ''
            this.confirmNewcomment = 'Commentaire envoyé !'
            this.refreshPosts()
        }
    }
}
</script>

