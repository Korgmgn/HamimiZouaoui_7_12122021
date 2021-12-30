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
            localStorage.clear()
        }
    }
}
</script>

<style>

</style>