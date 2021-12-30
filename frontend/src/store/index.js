import { createStore } from 'vuex'
//import createPersistedState from "vuex-persistedstate"

export default createStore({
    //plugins: [createPersistedState()]
    state: {
        token: null,
        isAdmin: null,
        userUuid: null,
        userName: null
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    },
})
