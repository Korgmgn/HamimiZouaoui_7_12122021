<template>
      <div class="backdrop">
        <div class="main-box">
            <div class="close-modal"  @click="closeModal">X</div>
            <h2>Commentaires:</h2>
            <div class="text-box">
                <div class="text-bloc" v-if="!comments.length">
                    <p>Aucun commentaire !</p>
                </div>
                <div class="text-bloc" v-for="comment in comments" :key="comment.uuid" :data-comment-uuid="comment.uuid">
                    <div class="upper-text-bloc" :data-user-uuid="comment.user.uuid">
                        <span class="username">
                            <router-link :to="{ name: 'UserPosts', params: { useruuid: comment.user.uuid } }">
                                {{ comment.user.username }}
                            </router-link>
                        </span>
                         <button class="delete-post" @click="checkUserBeforeDelete" v-if="currentUserUuid == comment.user.uuid || currentUserStatus == true">X</button>
                    </div>
                    <p class="text">{{comment.content}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ['postUuid'],
    data(){
        return {
            currentUserUuid: null,
            currentUserStatus: null,
            comments: []
        }
    },
    methods: {
        closeModal() {
            this.$emit('close')
        },
        checkUserBeforeDelete() {
            const commentUserUuid = event.target.closest('div.upper-text-bloc').getAttribute('data-user-uuid')
            if(commentUserUuid == this.currentUserUuid || this.currentUserStatus == true) {
                this.deleteComment(event.target)
            } else {
                console.log('Vous ne pouvez pas supprimer ce commentaire !')
            }
        },
        async getPostComments() {
            try{
                const response = await axios.get(`http://localhost:3000/comments/allcomments/${this.postUuid}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                this.comments = await response.data.comments
                this.currentUserUuid = localStorage.getItem('userUuid')
                this.currentUserStatus = localStorage.getItem('isAdmin')
            } catch (error) {
                console.log(error)
            }
        },
        async deleteComment(eventTarget) {
            const commentUuid = event.target.closest('div.text-bloc').getAttribute('data-comment-uuid')
            try {
                await axios.delete(`http://localhost:3000/comments/delete/${commentUuid}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                this.getPostComments()
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

