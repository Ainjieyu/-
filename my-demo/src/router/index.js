import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'

const routes = [
    {path:'/home',component:Home},
    {path:'/user',component:User},
]

Vue.use(VueRouter)