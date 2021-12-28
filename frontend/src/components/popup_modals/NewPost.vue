<template>
    <div class="backdrop">
        <div class="main-box">
            <div class="close-modal"  @click="closeModal">X</div>
            <h2>Votre nouveau message</h2>
            <form @submit.prevent="handleNewPost" action="submit" enctype="multipart/form-data">
                <textarea v-model="content" class="text-input" type="text" />
                <input type="file" @change="onFileSelect" accept="image/*">
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
            imagePreview: '',
            imageUrl: '',
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
        onFileSelect(event) {
                this.imageURL = event.target.files[0];
                console.log(this.imageURL)
                this.imagePreview = URL.createObjectURL(this.imageURL);
        },  

        async handleNewPost() {
            const formData = new FormData();
            formData.append("content", this.content);
            formData.append("image", this.imageURL);
            formData.append("userUuid", this.$store.state.userUuid)
            await axios.post('http://localhost:3000/posts/create', formData, {
                headers: {
                    'Content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${this.$store.state.token}`
                }
            })
                    console.log('Après la requête')
            this.content = ''
            this.imagePreview = ''
            this.imageURL = ''
            this.confirmNewpost = 'Message envoyé !'
            this.refreshPosts()
        }
    }
}
        /* 
        onFileSelect(event) {
            console.log(event)
            this.selectedFile = event.target.files[0]
        },
        
        async handleNewPost() {
            
            const formData = new FormData()
            formData.set('image', this.selectedFile)
            formData.set('content', this.content.toString())
            console.log('Form data ', formData)
            
            await axios.post('http://localhost:3000/posts/create', formData, {
                headers: {
                        Authorization: `Bearer ${this.$store.state.token}`
            }})
            this.content = ''
            this.confirmNewpost = 'Message envoyé !'
            this.refreshPosts()
        }
    }
*/
</script>

