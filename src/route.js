import { createRouter, createWebHashHistory } from 'vue-router'
import PostList from './components/PostList.vue'
import Home from './components/views/Home.vue'
import Post from './components/views/Post.vue'
import Profile from './components/Profile.vue'
import Contact from './components/views/Contact.vue'

const routes = [
    {
        path: '/',
        components: {
            default: Home
        }
    },
    {
        path: '/posts/:id',
        components: {
            default: Post
        }
    },
    {
        path: '/contact',
        components: {
            default: Contact
        }
    }
]

const Router = createRouter({
    history: createWebHashHistory(),
    routes: routes
  })
  
  export default Router