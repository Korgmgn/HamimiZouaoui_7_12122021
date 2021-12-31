<template>
    <div class="backdrop">
        <div class="main-box">
            <div class="close-modal"  @click="closeModal">X</div>
            <h2>Modifier le message:</h2>
            <form @submit.prevent="handleModifyPost" action="submit" enctype="multipart/form-data">
                <textarea v-model="content" class="text-input" type="text" />
                <input type="file" @change="onFileSelect" accept="image/*">
                <p v-if="confirmModifyPost">{{ confirmModifyPost }}</p>
                <p v-if="errorModifyPost">{{ errorModifyPost }}</p>
                <button>Modifier</button>
            </form>
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
            imagePreview: '',
            imageUrl: '',
            confirmModifyPost: null,
            errorModifyPost: null
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
            console.log(this.imageURL)
            this.imagePreview = URL.createObjectURL(this.imageURL);
        },  

        async handleModifyPost() {
            console.log(this.postUuid)
            if(this.content || this.imageURL) {
                const formData = new FormData();
                formData.append("content", this.content);
                formData.append("image", this.imageURL);
                formData.append("userUuid", localStorage.getItem('userUuid'))
                formData.append("isAdmin", localStorage.getItem('isAdmin'))
                await axios.put(`http://localhost:3000/posts/modify/${this.postUuid}`, formData, {
                    headers: {
                        'Content-type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                this.content = ''
                this.imagePreview = ''
                this.imageURL = ''
                this.confirmModifyPost = 'Message modifié !'
                this.refreshPosts()
            } else {
                this.errorModifyPost = 'Ajoutez du texte, ou une image !'
            }
        }
    }
}

</script>

<style>

</style>