import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store.js'

import NProgress from 'nprogress'

import Home from './views/pages/Home.vue'
import Dashboard from './views/pages/Dashboard.vue'
import Games from './views/pages/Games.vue'
import TVshows from './views/pages/TVshows.vue'
import Films from './views/pages/Films.vue'
import Anime from './views/pages/Anime.vue'
import Books from './views/pages/Books.vue'

Vue.use(VueRouter)
Vue.use(NProgress)

NProgress.configure({ 
  parent: '.preloader',
  showSpinner: false,
  easing: 'ease',
  speed: 500
})

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    id: 'home',
    mainMenu: false,
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    id: 'dashboard',
    mainMenu: true,
    component: Dashboard
  },
  {
    path: '/games',
    name: 'Games',
    id: 'games',
    mainMenu: true,
    component: Games
  },
  {
    path: '/tvshows',
    name: 'TV Shows',
    id: 'tvshows',
    mainMenu: true,
    component: TVshows
  },
  {
    path: '/films',
    name: 'Films',
    id: 'films',
    mainMenu: true,
    component: Films
  },
  {
    path: '/anime',
    name: 'Anime',
    id: 'anime',
    mainMenu: true,
    component: Anime
  },
  {
    path: '/books',
    name: 'Books',
    id: 'books',
    mainMenu: true,
    component: Books
  }
]

const router = new VueRouter({
  mode: 'abstract',
  base: '/nightlist-frontend/',
  linkActiveClass: '',
  linkExactActiveClass: 'sidebar__link--active',
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  store.commit('CHANGE_SEARCH_STATE', false)
  next()
})

router.afterEach(() => {
  setTimeout(() => NProgress.done(), 300)
})

export default router