<template>
    <Head />
    <Navigation />
    <NewPost v-if="modalNewPost" @close="showNewPost" @refresh="getAllPosts" />
    <ModifyPost :postUuid="postUuid" v-if="modalModifyPost" @close="showModificationModal" @refresh="getAllPosts" />
    <NewComment :postUuid="postUuid" v-if="modalNewComment" @close="showNewComment" @refresh="getAllPosts" />
    <div class="main-box">
        <button class="new-post_button" @click="showNewPost">Nouveau message</button>
        <div class="text-box">
            <div class="text-bloc" v-if="!posts.length">
                <p>Aucun message !</p>
            </div>
            <div class="text-bloc" v-for="post in posts" :key="post.uuid" :data-post-uuid="post.uuid">
                <span>Le {{ dateFormat(post.createdAt) }}</span>
                <span v-if="post.createdAt !== post.updatedAt">Modifié le {{ dateFormat(post.updatedAt) }}</span>
                <div class="upper-text-bloc" :data-user-uuid="post.user.uuid">
                    <span class="username">
                        <router-link :to="{ name: 'UserPosts', params: { useruuid: post.user.uuid } }" >
                            {{ post.user.username }}
                        </router-link>
                    </span>
                    <div class="post-buttons" v-if="currentUserStatus == 'admin' || currentUserUuid == post.user.uuid">
                        <button class="modify-post" @click="checkUserBeforeModify">Modifier</button>
                        <button class="delete-post" @click="checkUserBeforeDelete">Supprimer</button>
                    </div>
                </div>
                <img :src="post.image" :alt="'Image envoyée par ' + post.user.username" v-if="post.image">
                <p class="text" v-if="post.content">{{ post.content }}</p>
                <div class="comment-section">
                    <button @click="showNewComment">Commenter</button>
                    <router-link :to="{ name: 'Comments', params: { postUuid: post.uuid } }">
                        <button>Voir les commentaires</button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import Head from '../components/Head.vue'
import Navigation from '../components/Navigation.vue'
import NewPost from '../components/popup_modals/NewPost.vue'
import ModifyPost from '../components/popup_modals/ModifyPost.vue'
import NewComment from '../components/popup_modals/NewComment.vue'

export default {
    name: 'Home',
    components: { Head, Navigation, NewPost, NewComment, ModifyPost },
    data() {
        return {
            modalNewPost: false,
            modalNewComment: false,
            modalModifyPost: false,
            postUuid: null,
            currentUserUuid: null,
            currentUserStatus: null,
            posts: []
        }
    },
    methods: {
        showNewPost() {
            this.modalNewPost = !this.modalNewPost
        },
        showNewComment() {
            this.modalNewComment = !this.modalNewComment
            if(this.modalNewComment == true) {
                this.postUuid = event.target.closest('div.text-bloc').getAttribute('data-post-uuid')
            }
            console.log(this.postUuid)
        },
        showModificationModal(eventTarget) {
            this.modalModifyPost = !this.modalModifyPost
            if(this.modalModifyPost == true) {
                this.postUuid = event.target.closest('div.text-bloc').getAttribute('data-post-uuid')
            }
        },
        checkUserBeforeModify() {
            const postUserUuid = event.target.closest('div.upper-text-bloc').getAttribute('data-user-uuid')
            if(postUserUuid == this.currentUserUuid || this.currentUserStatus == "admin") {
                this.showModificationModal(event.target)
            } else {
                console.log('Vous ne pouvez pas modifier ce post !')
            }
        },
        checkUserBeforeDelete() {
            const postUserUuid = event.target.closest('div.upper-text-bloc').getAttribute('data-user-uuid')
            if(postUserUuid == this.currentUserUuid || this.currentUserStatus == 'admin') {
                this.deletePost(event.target)
            } else {
                console.log('Vous ne pouvez pas supprimer ce post !')
            }
        },
        async getAllPosts() {
            try {
                const response = await axios.get('http://localhost:3000/posts/allposts', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                this.posts = response.data
                this.currentUserUuid = localStorage.getItem('userUuid')
                this.currentUserStatus = localStorage.getItem('isAdmin')
                if(this.modalNewPost == true) { this.showNewPost() }
            } catch (error) {
                console.log(error)
            }
        },
        async deletePost(eventTarget) {
            const postUuid = event.target.closest('div.text-bloc').getAttribute('data-post-uuid')
            try {
                await axios.delete(`http://localhost:3000/posts/delete/${postUuid}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                this.getAllPosts()
            } catch (error) {
                console.log(error)
            }
        },
        dateFormat(date){
                if (date) {
                    return moment(String(date)).format('DD/MM/YYYY [à] HH:mm')
                }
        }
    },
    created() {
        this.moment = moment
        this.getAllPosts()
        
    }
}


</script>

<style scoped>
.comment-section {
    display: flex;
    justify-content: space-around;
}
.comment-section button, .new-post_button {    
    font-size: 15px;
    margin: 5px;
    padding: 8px;
}
.new-post_button {
    align-self: center;
}

</style>

