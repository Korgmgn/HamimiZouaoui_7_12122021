<template>
    <Head />
    <Navigation />
    <div class="main-box">
        <div class="text-box">
            <div class="text-bloc" v-if="!posts.length">
                <p>Aucun message !</p>
            </div>
            <div class="text-bloc" v-for="post in posts" :key="post.uuid" :data-post-uuid="post.uuid">
                <p>{{ username }} a posté: </p>
                <p class="text">{{ post.content }}</p>
            </div>
            <div class="text-bloc" v-for="comment in comments" :key="comment.uuid" :data-comment-uuid="comment.uuid">
                <p>{{ username }} a commenté: </p>
                <p class="text">{{ comment.content }}</p>
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
            username: null,
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
        async getUserPosts() {
            try {
                const response = await axios.get(`http://localhost:3000/posts/userposts/${this.$route.params.useruuid}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.state.token}`
                    }
                })
                console.log(response.data)
                this.username = response.data.username
                this.posts = response.data.posts
                this.comments = response.data.comments
            } catch (error) {
                console.log(error)
            }
        }
    },
    created(){
        console.log('Created !')
        this.getUserPosts()
    }
    
}
</script>

<style>

</style>