<template>
    <Head />
    <Navigation />
    <ModifyComment :commentUuid="commentUuid" v-if="modalModifyComment" @close="showModificationModal" @refresh="getPostComments" />
        <div class="main-box">
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
                        <div v-if="currentUserStatus == true || currentUserUuid == comment.user.uuid">
                            <button class="modify-post" @click="showModificationModal">M</button>
                            <button class="delete-post" @click="checkUserBeforeDelete">X</button>
                        </div>  
                    </div>
                    <p class="text">{{comment.content}}</p>
                </div>
            </div>
        </div>
</template>

<script>
import axios from 'axios'
import Head from '../components/Head.vue'
import Navigation from '../components/Navigation.vue'
import ModifyComment from '../components/popup_modals/ModifyComment.vue'

export default {
    name: 'Comments',
    components: { Head, Navigation, ModifyComment },
    data(){
        return {
            currentUserUuid: null,
            currentUserStatus: null,
            modalModifyComment: false,
            commentUuid: null,
            comments: []
        }
    },
    methods: {
        showModificationModal() {
            this.modalModifyComment = !this.modalModifyComment
            if(this.modalModifyComment == true) {
                this.commentUuid = event.target.closest('div.text-bloc').getAttribute('data-comment-uuid')
            }
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
                const response = await axios.get(`http://localhost:3000/comments/allcomments/${this.$route.params.postUuid}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                this.comments = await response.data.comments
                this.currentUserUuid = localStorage.getItem('userUuid')
                this.currentUserStatus = localStorage.getItem('isAdmin')
                if(this.modalModifyComment == true) { this.showModificationModal() }
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

