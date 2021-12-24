<template>
    <div class="backdrop">
        <div class="post-popup">
            <div class="close-modal"  @click="closeModal">X</div>
            <h2>Votre nouveau message</h2>
            <form @submit.prevent="handleNewPost" action="submit">
                <input v-model="content" class="post-form" type="text">
                <input type="file">
                <p v-if="confirmNewpost">{{ confirmNewpost }}</p>
                <button>Envoyer</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            content: '',
            confirmNewpost: null
        }
    },
    methods: {
        closeModal() {
            this.$emit('close')
        },

        async handleNewPost() {
            await axios.post('http://localhost:3000/posts/create', {
                content: this.content
            },
            {
            headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
            }})
            this.content = ''
            this.confirmNewpost = 'Message envoyé !'
        }
    }
}
</script>

<style scoped>
h2 {
    font-size: 18px;
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
.post-popup {
    width: 90%;
    height: 350px;
    max-width: 1024px;
    background: cyan;
    border: solid 1px black;
    border-radius: 25px;
    box-shadow: 5px 5px 10px gray;
    padding: 20px 0 20px 0;
}
.close-modal {
    height: 20px;
    width: 20px;
    position: relative;
    right: 25px;
    top: 10px;
    margin-left: auto;
    border: solid 1px black;
    border-radius: 5px;
    cursor: pointer;
}
form {
    height: 85%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin-top: 15px;
}
.post-form {
    width: 90%;
    height: 30%;
    background: white;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0 10px 0;
    text-align: left;
    overflow-wrap: break-word;
}
button {
    background: lightskyblue;
    border: 0;
    padding: 10px 20px;
    color: white;
    border-radius: 20px;
    box-shadow: 2px 2px 5px lightgrey;
    cursor: pointer;
}
button:active {
    transform: scale(0.9);
}

</style>