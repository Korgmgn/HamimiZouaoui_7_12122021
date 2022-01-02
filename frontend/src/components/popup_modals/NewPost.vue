<template>
    <div class="backdrop">
        <div class="main-box">
            <div class="close-modal"  @click="closeModal">X</div>
            <h2>Votre nouveau message</h2>
            <form @submit.prevent="handleNewPost" action="submit" enctype="multipart/form-data">
                <textarea v-model="content" class="text-input" type="text" maxlength="160"/>
                <p>Limite de 160 caractères</p>
                <input type="file" @change="onFileSelect" accept="image/*">
                <p v-if="confirmNewpost">{{ confirmNewpost }}</p>
                <p v-if="errorNewpost">{{ errorNewpost }}</p>
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
            imageUrl: '',
            confirmNewpost: null,
            errorNewpost: null
        }
    },
    methods: {
        closeModal() {
            this.$emit('close')
        },
        refreshPosts(){
            this.$emit('refresh')
        },
        onFileSelect(event) {
                this.imageURL = event.target.files[0];
        },  

        async handleNewPost() {
            if(this.content || this.imageURL) {
                const formData = new FormData();
                formData.append("content", this.content);
                formData.append("image", this.imageURL);
                formData.append("userUuid", localStorage.getItem('userUuid'))
                await axios.post('http://localhost:3000/posts/create', formData, {
                    headers: {
                        'Content-type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                this.content = ''
                this.imageURL = ''
                this.confirmNewpost = 'Message envoyé !'
                this.errorNewpost = null
                this.refreshPosts()
            } else {
                this.confirmNewpost = null
                this.errorNewpost = 'Ajouter du texte, ou une image !'
            }
        }
    }
}
</script>

