<template>
    <div class="backdrop">
        <div class="main-box">
            <h2>Modifier le message:</h2>
            <form @submit.prevent="handleModifyPost" action="submit" enctype="multipart/form-data">
                <textarea v-model="content" class="text-input" type="text" maxlength="160"/>
                <p>Limite de caractères: 2 à 160</p>
                <input class="file-input" type="file" @change="onFileSelect" accept="image/*">
                <p v-if="confirmModifyPost">{{ confirmModifyPost }}</p>
                <p v-if="errorModifyPost">{{ errorModifyPost }}</p>
                <button>Modifier</button>
            </form>
            <button class="close-button" @click="closeModal">Fermer</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ['postUuid'],
    data() {
        return {
            content: '',
            imageUrl: '',
            confirmModifyPost: null,
            errorModifyPost: null
        }
    },
    methods: {
        //Ces fonctions emmetent un event au component parent 
        //afin de fermer le popup ou relancer la requête GET du parent
        closeModal() {
            this.$emit('close')
        },
        refreshPosts(){
            this.$emit('refresh')
        },
        onFileSelect(event) {
            this.imageURL = event.target.files[0];
        },  
        //Requête permettant de modifier un post
        async handleModifyPost() {
            if(this.content && this.content.length >= 2 || this.imageURL && this.content & this.content >= 2 || this.imageURL && !this.content) {
                const formData = new FormData();
                formData.append("content", this.content);
                formData.append("image", this.imageURL);
                formData.append("userUuid", localStorage.getItem('userUuid'))
                formData.append("isAdmin", localStorage.getItem('isAdmin'))
                //Ici on ajoute dynamique à la requête l'uuid du post, que l'API récupère sous req.params, ce qui permet à l'ORM de trouver le post en question
                await axios.put(`http://localhost:3000/posts/modify/${this.postUuid}`, formData, {
                    headers: {
                        'Content-type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                this.content = ''
                this.imageURL = ''
                this.confirmModifyPost = 'Message modifié !'
                this.errorModifyPost = null
                this.refreshPosts()
            } else {
                this.confirmModifyPost = null
                this.errorModifyPost = 'Ajoutez du texte, ou une image !'
            }
        }
    }
}
</script>