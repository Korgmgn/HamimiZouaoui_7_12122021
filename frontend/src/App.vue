<template>
  <div id="main-page">
        <div id="nav"></div>
        <h1> {{ title }} </h1>
        <p>Welcome ...</p>
        <div v-if="showModal">
            <Modal theme="" @close="toggleModal">
                <template v-slot:links>
                    <a href="#">signup now</a>
                    <a href="#">more info</a>
                </template>
                <h1>Ninja Giveaway !</h1>
                <p>Grab your ninja loot for half the price !</p>
            </Modal>
        </div>
        <button @click="toggleModal">Open modal</button>
  </div>
</template>

<script>
import Modal from './components/Modal.vue'

export default {
    name: 'App',
    components: { 
        Modal
    },
    data(){
        return {
            title: 'My First Vue App :)',
            header: "Sign up for the Giveaway !",
            text: "Grab your ninja stuff for half price",
            showModal: false
        }
    },
    methods: {
        toggleModal() {
            this.showModal = !this.showModal
        }
    }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
