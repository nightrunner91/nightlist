// =============== //
// Core components //
// =============== //
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// ================= //
// Vue configuration //
// ================= //
Vue.config.productionTip = false
Vue.config.devtools = true


// =================== //
// Create global event //
// =================== //
export const eventBus = new Vue()


// =================== //
// Export project name //
// =================== //
export const projectName = 'nightlist_'

export const colors = {
  dashboard: '#28343A',
  games: '#741137',
  tvshows: '#701e67',
  films: '#3A365C',
  anime: '#7F0546',
  books: '#2A5A39'
}


// ===================================== //
// Import and regitser global components //
// ===================================== //

// main:
import appSidebar from "./views/components/global/_sidebar"
import appGradients from "./views/components/global/_gradients"
import appPlaceholder from "./views/components/global/_placeholder"
import appIndicator from "./views/components/global/_indicator"
import appPreloader from "./views/components/global/_preloader"
import appSettings from "./views/components/global/_settings"
import appPlate from "./views/components/global/_plate"
import appCard from "./views/components/global/_card"

Vue.component('app-sidebar', appSidebar)
Vue.component('app-gradients', appGradients)
Vue.component('app-placeholder', appPlaceholder)
Vue.component('app-indicator', appIndicator)
Vue.component('app-preloader', appPreloader)
Vue.component('app-settings', appSettings)
Vue.component('app-plate', appPlate)
Vue.component('app-card', appCard)

// UI:
import appDropdown from "./views/components/ui/_dropdown"
import appCheckbox from "./views/components/ui/_checkbox"
import appRating from "./views/components/ui/_rating"
import appFavourite from "./views/components/ui/_favourite"
import appProgress from "./views/components/ui/_progress"

Vue.component('app-dropdown', appDropdown)
Vue.component('app-checkbox', appCheckbox)
Vue.component('app-rating', appRating)
Vue.component('app-favourite', appFavourite)
Vue.component('app-progress', appProgress)

// modals:
import gamesModal from "./views/components/modals/_games-modal"
import tvshowsModal from "./views/components/modals/_tvshows-modal"
import filmsModal from "./views/components/modals/_films-modal"
import animeModal from "./views/components/modals/_anime-modal"
import booksModal from "./views/components/modals/_books-modal"

Vue.component('games-modal', gamesModal)
Vue.component('tvshows-modal', tvshowsModal)
Vue.component('films-modal', filmsModal)
Vue.component('anime-modal', animeModal)
Vue.component('books-modal', booksModal)

// tables:
import gamesData from "./views/components/tables/_games-data"
import tvshowsData from "./views/components/tables/_tvshows-data"
import filmsData from "./views/components/tables/_films-data"
import animeData from "./views/components/tables/_anime-data"
import booksData from "./views/components/tables/_books-data"

Vue.component('games-data', gamesData)
Vue.component('tvshows-data', tvshowsData)
Vue.component('films-data', filmsData)
Vue.component('anime-data', animeData)
Vue.component('books-data', booksData)

// search:
import favouritesSearch from "./views/components/search/_favourites-search"
import gamesSearch from "./views/components/search/_games-search"
import tvshowsSearch from "./views/components/search/_tvshows-search"
import filmsSearch from "./views/components/search/_films-search"
import animeSearch from "./views/components/search/_anime-search"
import booksSearch from "./views/components/search/_books-search"

Vue.component('favourites-search', favouritesSearch)
Vue.component('games-search', gamesSearch)
Vue.component('tvshows-search', tvshowsSearch)
Vue.component('films-search', filmsSearch)
Vue.component('anime-search', animeSearch)
Vue.component('books-search', booksSearch)

// favourites:
import gamesFavourites from "./views/components/favourites/_games-favourites"
import tvshowsFavourites from "./views/components/favourites/_tvshows-favourites"
import filmsFavourites from "./views/components/favourites/_films-favourites"
import animeFavourites from "./views/components/favourites/_anime-favourites"
import booksFavourites from "./views/components/favourites/_books-favourites"

Vue.component('games-favourites', gamesFavourites)
Vue.component('tvshows-favourites', tvshowsFavourites)
Vue.component('films-favourites', filmsFavourites)
Vue.component('anime-favourites', animeFavourites)
Vue.component('books-favourites', booksFavourites)


// ======================================= //
// Import and regitser external components //
// ======================================= //

import VTooltip from 'v-tooltip'
import Vuebar from './directives/_scrollbar'
import Ripple from './directives/_ripple'
import {Vue2Storage} from 'vue2-storage'
import velocityPlugin from 'velocity-vue'

Vue.use(VTooltip)
Vue.use(Vuebar)
Vue.directive('ripple', Ripple)
Vue.use(Vue2Storage, {prefix: projectName})
Vue.use(velocityPlugin)

// ========== //
// SVG Sprite //
// ========== //

import sprite from './assets/sprite.svg'

fetch(sprite)
  .then(response => response.text())
  .then(svg => {
    let div = document.createElement('div')
    div.hidden = true
    div.insertAdjacentHTML('afterbegin', svg)
    document.body.insertBefore(div, document.body.childNodes[0])
  })


// ======== //
// Init app //
// ======== //
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')