import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import ArCondicionado from '../views/ar-condicionado/ArCondicionado.vue'
import Fancoils from '../views/ar-condicionado/equipamentos/FanCoils.vue'
import Energia from '../views/energia/Energia.vue'
import Ventilacao from '../views/ventilacao/Ventilacao.vue'
import Manutencao from '../views/manutencao/Manutencao.vue'
import Incendio from '../views/incendio/Incendio.vue'
// import Subestacoes from '../views/energia/Subestacoes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/ar-condicionado',
    name: 'home'
  },
  {
    path: '/ar-condicionado',
    name: 'ar-condicionado',
    component: ArCondicionado
  },
  {
    path: '/ar-condicionado/fancoils',
    name: 'fancoils',
    component: Fancoils
  },
  {
    path: '/energia',
    name: 'energia',
    component: Energia
  },
  {
    path: '/incendio',
    name: 'incendio',
    component: Incendio
  },
  {
    path: '/ventilacao',
    name: 'ventilacao',
    component: Ventilacao
  },
  {
    path: '/manutencao',
    name: 'manutencao',
    component: Manutencao
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
