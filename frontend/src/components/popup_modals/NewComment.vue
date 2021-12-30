<template>
    <div class="backdrop">
        <div class="main-box">
            <div class="close-modal"  @click="closeModal">X</div>
            <h2>Commentaire:</h2>
            <form @submit.prevent="handleNewComment" action="submit">
                <input v-model="content" class="text-input" type="text">
                <p v-if="confirmNewcomment">{{ confirmNewcomment }}</p>
                <p v-if="errorNewcomment">{{ errorNewcomment }}</p>
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
            confirmNewcomment: null,
            errorNewcomment: null
        }
    },
    props: ['postUuid'],
    methods: {
        closeModal() {
            this.$emit('close')
        },
        refreshPosts(){
            this.$emit('refresh')
        },

        async handleNewComment() {
            if(this.content || this.imageURL) {
                console.log(this.postUuid)
                await axios.post(`http://localhost:3000/comments/create/${this.postUuid}`, {
                    content: this.content
                },
                {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }})
                this.content = ''
                this.confirmNewcomment = 'Commentaire envoyé !'
                this.refreshPosts()
            } else {
                this.errorNewcomment = "Commentaire vide !"
            }
        }
    }
}
</script>

