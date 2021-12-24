<template>
      <div class="backdrop">
        <div class="comment-popup">
            <div class="close-modal"  @click="closeModal">X</div>
            <h2>Commentaires:</h2>
            <div class="posts-box">
                <div class="post-bloc" v-for="post in post" :key="post.comments.uuid">
                    <span class="username">{{ comment.user.username }}</span>
                    <p class="post">{{ comment }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ['postuuid', 'username'],
    data(){
        return {
            post: []
        }
    },
    methods: {
        closeModal() {
            this.$emit('close')
        }
    },
    created() {
        const getPostComments = async () => {
            try{
                const response = await axios.get(`http://localhost:3000/comments/allcomments/${this.postuuid}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                console.log(response.data)
                this.post = await response.data
            } catch (error) {
                console.log(error)
            }
        }
        getPostComments()
    }
}
</script>

<style scoped>
h2 {
    font-size: 18px;
    margin: 20px 0 20px 0;
}
.backdrop {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(128, 128, 128, 0.233);
}
.comment-popup {
    width: 90%;
    max-width: 1024px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    background: cyan;
    border: solid 1px black;
    border-radius: 25px;
    box-shadow: 5px 5px 10px gray;
    padding: 10px 5px 20px 5px;
}
.close-modal {
    height: 20px;
    width: 20px;
    position: relative;
    right: 15px;
    top: 0px;
    margin-left: auto;
    border: solid 1px black;
    border-radius: 5px;
    cursor: pointer;
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

</style>