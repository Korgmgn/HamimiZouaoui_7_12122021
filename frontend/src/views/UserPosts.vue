<template>
    <Head />
    <Navigation />
    <ModifyPost :postUuid="postUuid" v-if="modalModifyPost" @close="showPostModificationModal" @refresh="getUserPosts" />
    <ModifyComment :commentUuid="commentUuid" v-if="modalModifyComment" @close="showCommentModificationModal" @refresh="getUserPosts" />
    <div class="main-box">
        <div class="text-box">
            <div class="text-bloc" v-if="!posts.length">
                <p>Aucun message !</p>
            </div>
            <div class="text-bloc" v-for="post in posts" :key="post.uuid" :data-post-uuid="post.uuid">
                <div class="upper-text-bloc" :data-user-uuid="userUuid">
                    <p class="username">{{ username }} a posté: </p>
                    <div v-if="currentUserStatus == 'admin' || currentUserUuid == userUuid">
                        <button class="modify-post" @click="showPostModificationModal">M</button>
                        <button class="delete-post" @click="checkUserBeforeDelete">X</button>
                    </div>
                </div>
                <img :src="post.image" alt="Image envoyée par un utilisateur" v-if="post.image">
                <p class="text" v-if="post.content">{{ post.content }}</p>
            </div>
            <div class="text-bloc" v-for="comment in comments" :key="comment.uuid" :data-comment-uuid="comment.uuid">
                <div class="upper-text-bloc" :data-user-uuid="userUuid">
                    <p class="username">{{ username }} a commenté: </p>
                    <div v-if="currentUserStatus == 'admin' || currentUserUuid == userUuid">
                        <button class="modify-post" @click="showCommentModificationModal">M</button>
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
import ModifyPost from '../components/popup_modals/ModifyPost.vue'
import ModifyComment from '../components/popup_modals/ModifyComment.vue'


export default {
    name: 'UserPosts',
    components: { Head, Navigation, ModifyPost, ModifyComment },
    data() {
        return {
            userUuid: null,
            username: null,
            currentUserUuid: null,
            currentUserStatus: null,
            postUuid: null,
            commentUuid: null,
            modalModifyPost: false,
            modalModifyComment: false,
            posts: [],
            comments: [],
            userPosts: false,
            userComments: false
        }
    },
    methods: {
        showPosts() {
            this.userPosts = !this.userPosts
        },
        showComments() {
            this.userComments = !this.userComments
        },
        showPostModificationModal() {
            this.modalModifyPost = !this.modalModifyPost
            if(this.modalModifyPost == true) {
                this.postUuid = event.target.closest('div.text-bloc').getAttribute('data-post-uuid')
            }
        },
        showCommentModificationModal() {
            this.modalModifyComment = !this.modalModifyComment
            if(this.modalModifyComment == true) {
                this.commentUuid = event.target.closest('div.text-bloc').getAttribute('data-comment-uuid')
            }
        },
        checkUserBeforeModify() {
            const postUserUuid = event.target.closest('div.upper-text-bloc').getAttribute('data-user-uuid')
            const commentUserUuid = event.target.closest('div.upper-text-bloc').getAttribute('data-user-uuid')
            if(postUserUuid && !commentUserUuid) {
                if(postUserUuid == this.currentUserUuid || this.currentUserStatus == 'admin') {
                    this.showPostModificationModal(event.target)
                } else {
                    console.log('Vous ne pouvez pas modifier ce post !')
                }
            } else if (!postUserUuid && commentUserUuid) {
                if(commentUserUuid == this.currentUserUuid || this.currentUserStatus == 'admin') {
                    this.showCommentModificationModal(event.target)
                } else {
                    console.log('Vous ne pouvez pas modifier ce post !')
                }
            } else {
                console.log('Vous ne pouvez pas changer ou supprimer ce message !')
            }
        },
        checkUserBeforeDelete() {
            this.userUuid = event.target.closest('div.upper-text-bloc').getAttribute('data-user-uuid')
            if(this.userUuid == this.currentUserUuid || this.currentUserStatus == 'admin') {
                    this.deletePostOrComment(event.target)
            } else {
                console.log('Vous ne pouvez pas supprimer ce message !')
            }
        },
        async getUserPosts() {
            try {
                const response = await axios.get(`http://localhost:3000/posts/userposts/${this.$route.params.useruuid}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                console.log(response.data)
                this.username = response.data.username
                this.userUuid = response.data.uuid
                this.posts = response.data.posts
                this.comments = response.data.comments
                this.currentUserUuid = localStorage.getItem('userUuid')
                this.currentUserStatus = localStorage.getItem('isAdmin')
            } catch (error) {
                console.log(error)
            }
        },
        //Supprime le post OU le commentaire voulu.
        async deletePostOrComment(eventTarget) {
            const postUuid = event.target.closest('div.text-bloc').getAttribute('data-post-uuid')
            const commentUuid = event.target.closest('div.text-bloc').getAttribute('data-comment-uuid')
            if(postUuid && !commentUuid) {
                try {
                    await axios.delete(`http://localhost:3000/posts/delete/${postUuid}`, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                    this.getUserPosts()
                } catch (error) {
                    console.log(error)
                }
            } else if(!postUuid && commentUuid){
                try {
                    await axios.delete(`http://localhost:3000/comments/delete/${commentUuid}`, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                    this.getUserPosts()
                } catch (error) {
                    console.log(error)
                }
            } else {
                console.log('Une erreur est survenue')
            }
        }
    },
    created(){
        this.getUserPosts()
    }
    
}
</script>

<style>

</style>