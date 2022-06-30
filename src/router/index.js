import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'
import ArCondicionado from '../views/ar-condicionado/ArCondicionado.vue'
import DocumentosAC from '../views/ar-condicionado/equipamentos/Documentos.vue'
import DocumentosEN from '../views/energia/equipamentos/Documentos.vue'
import Energia from '../views/energia/Energia.vue'
import Ventilacao from '../views/ventilacao/Ventilacao.vue'
import Manutencao from '../views/manutencao/Manutencao.vue'
import Incendio from '../views/incendio/Incendio.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/crud/ar-condicionado',
    name: 'home'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/crud/ar-condicionado',
    name: 'ar-condicionado',
    component: ArCondicionado
  },
  {
    path: '/crud/ar-condicionado/fancoils',
    name: 'fancoils',
    component: DocumentosAC
  },
  {
    path: '/crud/ar-condicionado/chillers',
    name: 'chillers',
    component: DocumentosAC
  },
  {
    path: '/crud/ar-condicionado/torres',
    name: 'torres',
    component: DocumentosAC
  },
  {
    path: '/crud/ar-condicionado/bombas',
    name: 'bombas',
    component: DocumentosAC
  },
  {
    path: '/crud/ar-condicionado/splits',
    name: 'splits',
    component: DocumentosAC
  },
  {
    path: '/crud/ar-condicionado/selfs',
    name: 'selfs',
    component: DocumentosAC
  },
  {
    path: '/crud/ar-condicionado/vrfconds',
    name: 'vrfconds',
    component: DocumentosAC
  },
  {
    path: '/crud/ar-condicionado/vrfevaps',
    name: 'vrfevaps',
    component: DocumentosAC
  },
  {
    path: '/crud/energia',
    name: 'energia',
    component: Energia
  },
  {
    path: '/crud/energia/geradores',
    name: 'geradores',
    component: DocumentosEN
  },
  {
    path: '/crud/energia/ctas',
    name: 'ctas',
    component: DocumentosEN
  },
  {
    path: '/crud/energia/ups',
    name: 'ups',
    component: DocumentosEN
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

router.beforeEach((to, from, next) => {
  setTimeout(() => {
    if (to.name !== 'login' && !store.getters.getIsAuthenticated){
      next({name: 'login'})
    }
    else if (store.getters.getIsAuthenticated && to.name === 'login') {
      next({name: 'ar-condicionado'})
    }
    else next()
}, 1)
});

export default router
