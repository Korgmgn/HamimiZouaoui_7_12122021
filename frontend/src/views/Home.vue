<template>
    <Head />
    <Navigation />
    <NewPost v-if="modalNewPost" @close="showNewPost" @refresh="getAllPosts" />
    <NewComment :postuuid="postuuid" v-if="modalNewComment" @close="showNewComment" @refresh="getAllPosts" />
    <PostComments :postuuid="postuuid" v-if="modalPostComments" @close="showPostComments" />
    <div class="main-box">
        <button class="new-post_button" @click="showNewPost">Nouveau message</button>
        <div class="text-box">
            <div class="text-bloc" v-if="!posts.length">
                <p>Aucun message !</p>
            </div>
            <div class="text-bloc" v-for="post in posts" :key="post.uuid" :data-post-uuid="post.uuid">
                <router-link :to="{ name: 'UserPosts', params: { useruuid: post.user.uuid } }" class="username">
                    <span>{{ post.user.username }}</span>
                </router-link>
                <p class="text">{{ post.content }}</p>
                <div class="comment-section">
                    <button @click="showNewComment">Commenter</button>
                    <button @click="showPostComments">Voir les commentaires</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Head from '../components/Head.vue'
import Navigation from '../components/Navigation.vue'
import NewPost from '../components/popup_modals/NewPost.vue'
import NewComment from '../components/popup_modals/NewComment.vue'
import PostComments from '../components/popup_modals/PostComments.vue'

export default {
    name: 'Home',
    components: { Head, Navigation, NewPost, NewComment, PostComments },
    data() {
        return {
            modalNewPost: false,
            modalNewComment: false,
            modalPostComments: false,
            postuuid: null,
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
                this.postuuid = event.target.closest('div.text-bloc').getAttribute('data-post-uuid')
            }
        },
        showPostComments() {
            this.modalPostComments = !this.modalPostComments
            if(this.modalPostComments == true) {
                this.postuuid = event.target.closest('div.text-bloc').getAttribute('data-post-uuid')
            }
        },
        async getAllPosts() {
            try {
                const response = await axios.get('http://localhost:3000/posts/allposts', {
                    headers: {
                        Authorization: `Bearer ${this.$store.state.token}`
                    }
                })
                console.log(response.data)
                this.posts = response.data
                if(this.modalNewPost == true) { this.showNewPost() }
            } catch (error) {
                console.log(error)
            }
        }
    },
    created() {
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

