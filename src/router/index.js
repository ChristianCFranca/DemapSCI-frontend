import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import FanCoils from '../views/equipamentos/FanCoils.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/ar-condicionado/agua-gelada/fancoils',
    name: 'fancoils',
    component: FanCoils
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
