<template>
    <div class="backdrop">
        <div class="main-box">
            <h2>Modifiez votre commentaire:</h2>
            <form @submit.prevent="handleModifyComment" action="submit">
                <textarea v-model="content" class="text-input" type="text" maxlength="100" />
                <p>Limite de 100 caractères</p>
                <p v-if="confirmModifyComment">{{ confirmModifyComment }}</p>
                <p v-if="errorModifyComment">{{ errorModifyComment }}</p>
                <button>Envoyer</button>
            </form>
            <button class="close-button" @click="closeModal">Fermer</button>
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
        //Ces fonctions emmetent un event au component parent 
        //afin de fermer le popup ou relancer la requête GET du parent
        closeModal() {
            this.$emit('close')
        },
        refreshComments(){
            this.$emit('refresh')
        },
        //Requête permettant de modifier un commentaire
        async handleModifyComment() {
            if(this.content) {
                //Ici on ajoute dynamique à la requête l'uuid du commentaire, que l'API récupère sous req.params, ce qui permet à l'ORM de trouver le commentaire en question
                await axios.put(`http://localhost:3000/comments/modify/${this.commentUuid}`, {
                    content: this.content
                },
                {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }})
                this.content = ''
                this.confirmModifyComment = 'Commentaire modifié !'
                this.errorModifyComment = null
                this.refreshComments()
            } else {
                this.confirmModifyComment = null
                this.errorModifyComment = 'Ajoutez du texte !'
            }  
        }
    }
}
</script>

