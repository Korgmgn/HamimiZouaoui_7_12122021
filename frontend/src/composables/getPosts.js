import axios from 'axios'
import { ref } from 'vue'

const getPosts = () => {
    const posts = ref([])
    const error = ref(null)

    const load = async () => {
        try{
            let response = await axios.get('http://localhost:3000/posts/allposts', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            console.log(response.data)
            posts.value = await response.data
        } catch (error) {
            error.value = error.message
            console.log(error.value)
        }
            
    }
    return { posts, error, load }
}

export default getPosts