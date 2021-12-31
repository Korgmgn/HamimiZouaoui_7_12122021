<template>
    <div class="backdrop">
        <div class="main-box">
            <div class="close-modal"  @click="closeModal">X</div>
            <h2>Commentaire:</h2>
            <form @submit.prevent="handleModifyComment" action="submit">
                <input v-model="content" class="text-input" type="text">
                <p v-if="confirmModifyComment">{{ confirmModifyComment }}</p>
                <p v-if="errorModifyComment">{{ errorModifyComment }}</p>
                <button>Envoyer</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ['commentUuid'],
    data() {
        return {
            content: '',
            confirmModifyComment: null,
            errorModifyComment: null
        }
    },
    methods: {
        closeModal() {
            this.$emit('close')
        },
        refreshComments(){
            this.$emit('refresh')
        },

        async handleModifyComment() {
            if(this.content) {
                await axios.put(`http://localhost:3000/comments/modify/${this.commentUuid}`, {
                    content: this.content
                },
                {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }})
                this.content = ''
                this.confirmModifyComment = 'Commentaire modifié !'
                this.refreshComments()
            } else {
                this.errorModifyComment = 'Ajoutez du texte !'
            }  
        }
    }
}
</script>

