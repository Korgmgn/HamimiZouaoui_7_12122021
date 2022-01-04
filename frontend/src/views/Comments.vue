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
                    <span>Le {{ dateFormat(comment.createdAt) }}</span>
                    <span v-if="comment.createdAt !== comment.updatedAt">Modifié le {{ dateFormat(comment.updatedAt) }}</span>
                    <div class="upper-text-bloc" :data-user-uuid="comment.user.uuid">
                        <span class="username">
                            <router-link :to="{ name: 'UserPosts', params: { useruuid: comment.user.uuid } }">
                                {{ comment.user.username }}
                            </router-link>
                        </span>
                        <div class="post-buttons" v-if="currentUserStatus == 'admin' || currentUserUuid == comment.user.uuid">
                            <button class="modify-post" @click="checkUserBeforeModify">Modifier</button>
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
        //Gère l'affichage des components et définissent des valeurs 
        //d'attributs data à transmettre au component qui va apparaître
        showModificationModal(eventTarget) {
            this.modalModifyComment = !this.modalModifyComment
            if(this.modalModifyComment == true) {
                this.commentUuid = event.target.closest('div.text-bloc').getAttribute('data-comment-uuid')
            }
        },
        //Les fonctions suivantes, déclenchées au clic des boutons de suppression / modification, permettent ces actions
        //selon si l'utilisateur en cours a créé ces derniers, ou s'il a le statut administrateur.
        checkUserBeforeModify() {
            const commentUserUuid = event.target.closest('div.upper-text-bloc').getAttribute('data-user-uuid')
            if(commentUserUuid == this.currentUserUuid || this.currentUserStatus == 'admin') {
                this.showModificationModal(event.target)
            } else {
                console.log('Vous ne pouvez pas modifier ce post !')
            }
        },
        checkUserBeforeDelete() {
            const commentUserUuid = event.target.closest('div.upper-text-bloc').getAttribute('data-user-uuid')
            if(commentUserUuid == this.currentUserUuid || this.currentUserStatus == 'admin') {
                this.deleteComment(event.target)
            } else {
                console.log('Vous ne pouvez pas supprimer ce commentaire !')
            }
        },
        //Cette fonction lancée lors du cycle created, récupère tous les commentaires
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
        //Cette fonction est appelé après vérification du status de l'utilisateur en cours, 
        //et envoie la requête qui permet la suppression d'un commentaire
        async deleteComment(eventTarget) {
            const commentUuid = event.target.closest('div.text-bloc').getAttribute('data-comment-uuid')
            try {
                //Ici on ajoute dynamique à la requête l'uuid du commentaire, que l'API récupère sous req.params, ce qui permet à l'ORM de trouver le commentaire en question
                await axios.delete(`http://localhost:3000/comments/delete/${commentUuid}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                this.getPostComments()
            } catch (error) {
                console.log(error)
            }
        },
        //Formatage du timestamp des commentaires
        dateFormat(date){
                if (date) {
                    return moment(String(date)).format('DD/MM/YYYY [à] HH:mm')
                }
        }
    },
    created() {
        this.moment = moment
        this.getPostComments()
    }
}
</script>

