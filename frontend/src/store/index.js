import { createStore } from 'vuex'

export default createStore({
    //namespaced: true,
    state: {
        token: null,
        isAdmin: null,
        userUuid: null,
        userName: null
    },
    mutations: {
    },
    actions: {
/* 
        async login ({ dispatch }, credentials) {
            let response = await axios.post('http://localhost:3000/users/login', credentials)

            console.log(response.data)
        }
*/    
    },
    modules: {
    }
})
