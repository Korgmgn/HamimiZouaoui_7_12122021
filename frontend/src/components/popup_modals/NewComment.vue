<template>
    <div class="backdrop">
        <div class="main-box">
            <h2>Commentaire:</h2>
            <form @submit.prevent="handleNewComment" action="submit">
                <textarea ref="textinput" v-model="content" class="text-input" type="text" maxlength="100" />
                <p>Limite de caractères: 2 à 100</p>
                <p v-if="confirmNewcomment">{{ confirmNewcomment }}</p>
                <p v-if="errorNewcomment">{{ errorNewcomment }}</p>
                <button>Envoyer</button>
            </form>
            <button class="close-button" @click="closeModal">Fermer</button>
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
        //Ces fonctions emmetent un event au component parent 
        //afin de fermer le popup ou relancer la requête GET du parent
        closeModal() {
            this.$emit('close')
        },
        refreshPosts(){
            this.$emit('refresh')
        },
        //Requête permettant de créer un nouveau commentaire
        async handleNewComment() {
            if(this.content && this.content.length >= 2) {
                //Ici on ajoute dynamique à la requête l'uuid du post, que l'API récupère sous req.params, ce qui permet à l'ORM de trouver le post dans lequel on créé le commentaire
                await axios.post(`http://localhost:3000/comments/create/${this.postUuid}`, {
                    content: this.content
                },
                {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }})
                this.content = ''
                this.confirmNewcomment = 'Commentaire envoyé !'
                this.errorNewcomment = null
                this.refreshPosts()
            } else {
                this.confirmNewcomment = null
                this.errorNewcomment = "Commentaire trop court !"
            }
        }
    },
    mounted() {
        this.$refs.textinput.focus();
    }
}
</script>



