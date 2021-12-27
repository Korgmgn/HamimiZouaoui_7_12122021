import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
      path: '/signup',
      name: 'Signup',
      component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue')
  },
  {
      path: '/home',
      name: 'Home',
      component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
      path: '/account',
      name: 'Account',
      component: () => import(/* webpackChunkName: "account" */ '../views/Account.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
