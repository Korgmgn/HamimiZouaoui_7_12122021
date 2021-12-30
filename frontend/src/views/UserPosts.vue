<template>
    <Head />
    <Navigation />
    <div class="main-box">
        <div class="text-box">
            <div class="text-bloc" v-if="!posts.length">
                <p>Aucun message !</p>
            </div>
            <div class="text-bloc" v-for="post in posts" :key="post.uuid" :data-post-uuid="post.uuid">
                <div class="upper-text-bloc" :data-user-uuid="userUuid">
                    <p class="username">{{ username }} a posté: </p>
                    <button class="delete-post" @click="checkUserBeforeDelete" v-if="currentUserUuid == userUuid || currentUserStatus == true">X</button>
                </div>
                <img :src="post.image" alt="Image envoyée par un utilisateur" v-if="post.image">
                <p class="text" v-if="post.content">{{ post.content }}</p>
            </div>
            <div class="text-bloc" v-for="comment in comments" :key="comment.uuid" :data-comment-uuid="comment.uuid">
                <div class="upper-text-bloc" :data-user-uuid="userUuid">
                    <p class="username">{{ username }} a commenté: </p>
                    <button class="delete-post" @click="checkUserBeforeDelete" v-if="currentUserUuid == userUuid || currentUserStatus == true">X</button>
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

export default {
    name: 'UserPosts',
    components: { Head, Navigation },
    data() {
        return {
            userUuid: null,
            username: null,
            currentUserUuid: null,
            currentUserStatus: null,
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
        checkUserBeforeDelete() {
            this.userUuid = event.target.closest('div.upper-text-bloc').getAttribute('data-user-uuid')
            if(this.userUuid == this.currentUserUuid || this.currentUserStatus == true) {
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