<template>
      <nav>
        <router-link to="/home">
            <button>Accueil</button>
        </router-link>
        <router-link to="/account">
            <button>Compte</button>
        </router-link>
        <router-link to="/" @click="logout">
            <button>Deconnexion</button>
        </router-link>
    </nav>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$store.state.token = null,
            this.$store.state.userUuid = null,
            this.$store.state.userRole = null
            console.log(this.$store.state.token)
        }
    }
}
</script>

<style>

</style>