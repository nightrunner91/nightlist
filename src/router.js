import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './views/pages/Home.vue'
import Dashboard from './views/pages/Dashboard.vue'
import Games from './views/pages/Games.vue'
import TVshows from './views/pages/TVshows.vue'
import Films from './views/pages/Films.vue'
import Anime from './views/pages/Anime.vue'
import Books from './views/pages/Books.vue'
import Hardware from './views/pages/Hardware.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/games',
    name: 'Games',
    component: Games
  },
  {
    path: '/tvshows',
    name: 'TVshows',
    component: TVshows
  },
  {
    path: '/films',
    name: 'Films',
    component: Films
  },
  {
    path: '/anime',
    name: 'Anime',
    component: Anime
  },
  {
    path: '/books',
    name: 'Books',
    component: Books
  },
  {
    path: '/hardware',
    name: 'Hardware',
    component: Hardware
  }
]

const router = new VueRouter({
  mode: 'history',
  //base: '/nightlist/',
  linkActiveClass: '',
  linkExactActiveClass: 'sidebar__link--active',
  routes
})

export default router
