<template>
    <Account v-if="modalAccount" @close="showAccount" />
    <NewPost v-if="modalNewPost" @close="showNewPost" />
    <NewComment :postuuid="postuuid" v-if="modalNewComment" @close="showNewComment" />
    <PostComments :postuuid="postuuid" v-if="modalPostComments" @close="showPostComments" />
        <h2>Liste des messages</h2>
        <div class="posts-window">
            <div class="menu">
                <span @click="showAccount">Compte</span>
                <span @click="showNewPost">Nouveau message</span>
                <span @click="logout">Deconnexion</span>
            </div>
            <div class="posts-box">
                <div class="post-bloc" v-for="post in posts" :key="post.uuid" :data-post-uuid="post.uuid">
                    <span class="username" :data-user-uuid="post.user.uuid" @click="showUserPosts">{{ post.user.username }}</span>
                    <p class="post">{{ post.content }}</p>
                    <div class="comment-section">
                        <span class="new-comment" @click="showNewComment">Commenter</span>
                        <span class="show-comments" @click="showPostComments">Voir les commentaires</span>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import axios from 'axios'
import NewPost from './popup_modals/NewPost.vue'
import NewComment from './popup_modals/NewComment.vue'
import PostComments from './popup_modals/PostComments.vue'
import Account from './popup_modals/Account.vue'


export default {
    components: { NewPost, NewComment, PostComments, Account },
    data() {
        return {
            modalNewPost: false,
            modalAccount: false,
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
                this.postuuid = event.target.closest('div.post-bloc').getAttribute('data-post-uuid')
            }
        },
        showPostComments() {
            this.modalPostComments = !this.modalPostComments
            if(this.modalPostComments == true) {
                this.postuuid = event.target.closest('div.post-bloc').getAttribute('data-post-uuid')
            }
        },
        showAccount() {
            this.modalAccount = !this.modalAccount
        },
        logout() {
            localStorage.removeItem('token')
            this.$router.push('/')
        },
        showUserPosts() {
            
        }
    },
    created() {
        const getAllPosts = async () => {
            try{
                const response = await axios.get('http://localhost:3000/posts/allposts', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                console.log(response.data)
                this.posts = await response.data
            } catch (error) {
                console.log(error)
            }
        }
        getAllPosts()
    }

}
</script>

<style scoped>
h2 {
    font-size: 25px;
    margin: 20px 0 20px 0;
}
.post-bloc {
    margin: 15px 0 15px 0;
}
.posts-window {
    width: 90%;
    max-width: 1024px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    background: rgb(255,255,255);
    background: linear-gradient(180deg, rgb(0, 240, 255) 0%, rgba(135,206,250,1) 75%);
    border-radius: 25px;
    box-shadow: 5px 5px 10px lightgrey;
    padding: 10px 5px 20px 5px;
}
.posts-box{
    max-height: 600px;
    overflow-y: scroll;
}
.post {
    display: inline-block;
    width: 90%;
    background: white;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0 10px 0;
    align-self: center;
    overflow-wrap: break-word;
}
.post-bloc {
    display: flex;
    flex-direction: column;
}
.menu {
    padding-top: 10px;
}
.menu span, .comment-section span, .username {
    color: blue;
    cursor: pointer;
}
.comment-section, .menu {
    display: flex;
    justify-content: space-around;
}

</style>

