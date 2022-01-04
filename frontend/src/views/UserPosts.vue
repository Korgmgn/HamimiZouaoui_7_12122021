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
                <span>Le {{ dateFormat(post.createdAt) }}</span>
                <span v-if="post.createdAt !== post.updatedAt">Modifié le {{ dateFormat(post.updatedAt) }}</span>
                <div class="upper-text-bloc" :data-user-uuid="userUuid">
                    <p class="username">{{ username }} a posté: </p>
                    <div class="post-buttons" v-if="currentUserStatus == 'admin' || currentUserUuid == userUuid">
                        <button class="modify-post" @click="showPostModificationModal">Modifier</button>
                        <button class="delete-post" @click="checkUserBeforeDelete">Supprimer</button>
                    </div>
                </div>
                <img :src="post.image" alt="Image envoyée par un utilisateur" v-if="post.image">
                <p class="text" v-if="post.content">{{ post.content }}</p>
            </div>
            <div class="text-bloc" v-for="comment in comments" :key="comment.uuid" :data-comment-uuid="comment.uuid">
                <span>Le {{ dateFormat(comment.createdAt) }}</span>
                <span v-if="comment.createdAt !== comment.updatedAt">Modifié le {{ dateFormat(comment.updatedAt) }}</span>
                <div class="upper-text-bloc" :data-user-uuid="userUuid">
                    <p class="username">{{ username }} a commenté: </p>
                    <div class="post-buttons" v-if="currentUserStatus == 'admin' || currentUserUuid == userUuid">
                        <button class="modify-post" @click="showCommentModificationModal">Modifier</button>
                        <button class="delete-post" @click="checkUserBeforeDelete">Supprimer</button>
                    </div>
                </div>
                <p class="text">{{comment.content}}</p>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios'
import moment from 'moment'
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
        //Les fonctions suivantes gèrent l'affichage des components et définissent des valeurs 
        //d'attributs data à transmettre au component qui va apparaître
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
        //Les fonctions suivantes, déclenchées au clic des boutons de suppression / modification, permettent ces actions  
        //selon qu'il s'agisse d'un post ou commentaire et vérifie si l'utilisateur en cours a créé ces derniers, ou s'il a le statut administrateur.
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
        //Cette fonction lancée lors du cycle created, récupère tous les posts et commentaires d'un utilisateur
        async getUserPosts() {
            try { 
                //Ici on récupère les paramètres d'url pour les envoyer à l'api en req.params, ce qui permet à l'ORM de trouver l'utilisateur en question
                const response = await axios.get(`http://localhost:3000/posts/userposts/${this.$route.params.useruuid}`, { 
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
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
        //Cette fonction est appelé après vérification du status de l'utilisateur en cours, 
        //et envoie la requête correspondante qui permet la suppression du post ou commentaire
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
        },
        //formate la date des posts ou commentaires
        dateFormat(date){
                if (date) {
                    return moment(String(date)).format('DD/MM/YYYY [à] HH:mm')
                }
        }
    },
    created(){
        this.moment = moment
        this.getUserPosts()
    }
    
}
</script>

<style>

</style>