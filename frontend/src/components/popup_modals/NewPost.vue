<template>
    <div class="backdrop">
        <div class="main-box">
            <div class="close-modal"  @click="closeModal">X</div>
            <h2>Votre nouveau message</h2>
            <form @submit.prevent="handleNewPost" action="submit" enctype="multipart/form-data">
                <textarea v-model="content" class="text-input" type="text" maxlength="160"/>
                <p>Limite de caractères: 2 à 160</p>
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
            console.log(this.content.length)
            if(this.content && this.content.length >= 2 || this.imageURL && this.content & this.content >= 2 || this.imageURL && !this.content) {
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

