import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './views/pages/_home.vue'
import Games from './views/pages/_games.vue'
import TVshows from './views/pages/_tvshows.vue'
import Films from './views/pages/_films.vue'
import Anime from './views/pages/_anime.vue'
import Books from './views/pages/_books.vue'
import Hardware from './views/pages/_hardware.vue'
import Dashboard from './views/pages/_dashboard.vue'

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
  base: process.env.BASE_URL,
  linkActiveClass: 'sidebar__link--active',
  linkExactActiveClass: 'sidebar__link--exact',
  routes
})

export default router
