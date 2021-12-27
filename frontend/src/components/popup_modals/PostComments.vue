<template>
      <div class="backdrop">
        <div class="main-box">
            <div class="close-modal"  @click="closeModal">X</div>
            <h2>Commentaires:</h2>
            <div class="text-box">
                <div class="text-bloc" v-if="!comments.length">
                    <p>Aucun commentaire !</p>
                </div>
                <div class="text-bloc" v-for="comment in comments" :key="comment.uuid">
                    <span class="username">{{ comment.user.username }}</span>
                    <p class="text">{{comment.content}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ['postuuid'],
    data(){
        return {
            comments: []
        }
    },
    methods: {
        closeModal() {
            this.$emit('close')
        },
        async getPostComments() {
            try{
                const response = await axios.get(`http://localhost:3000/comments/allcomments/${this.postuuid}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.state.token}`
                    }
                })
                console.log(response.data.comments)
                this.comments = await response.data.comments
            } catch (error) {
                console.log(error)
            }
        }
    },
    created() {
        this.getPostComments()
    }
}
</script>

