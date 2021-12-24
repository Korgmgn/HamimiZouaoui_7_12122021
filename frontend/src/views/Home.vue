<template>
    <Head />
    <div class="main">
        <PostList />
    </div>
</template>

<script>
import Head from '../components/Head.vue'
import PostList from '../components/PostList.vue'

export default {
    name: 'Home',
    components: { 
        Head,
        PostList
    }
}
</script>

<style>

</style>

