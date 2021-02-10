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


// ===================================== //
// Import and regitser global components //
// ===================================== //

// main:
import appHeader from "./views/components/global/_header"
import appSidebar from "./views/components/global/_sidebar"
import appGradients from "./views/components/global/_gradients"
import appPlaceholder from "./views/components/global/_placeholder"
import appIndicator from "./views/components/global/_indicator"
import appPreloader from "./views/components/global/_preloader"
import appSettings from "./views/components/global/_settings"

Vue.component('app-header', appHeader)
Vue.component('app-sidebar', appSidebar)
Vue.component('app-gradients', appGradients)
Vue.component('app-placeholder', appPlaceholder)
Vue.component('app-indicator', appIndicator)
Vue.component('app-preloader', appPreloader)
Vue.component('app-settings', appSettings)

// modals:
import gamesModal from "./views/components/modals/_games-modal"
import tvshowsModal from "./views/components/modals/_tvshows-modal"
import filmsModal from "./views/components/modals/_films-modal"
import animeModal from "./views/components/modals/_anime-modal"

Vue.component('games-modal', gamesModal)
Vue.component('tvshows-modal', tvshowsModal)
Vue.component('films-modal', filmsModal)
Vue.component('anime-modal', animeModal)

// tables:
import gamesData from "./views/components/tables/_games-data"
import gamesSearch from "./views/components/tables/_games-search"
import tvshowsData from "./views/components/tables/_tvshows-data"
import tvshowsSearch from "./views/components/tables/_tvshows-search"
import filmsData from "./views/components/tables/_films-data"
import filmsSearch from "./views/components/tables/_films-search"
import animeData from "./views/components/tables/_anime-data"
import animeSearch from "./views/components/tables/_anime-search"

Vue.component('games-data', gamesData)
Vue.component('games-search', gamesSearch)
Vue.component('tvshows-data', tvshowsData)
Vue.component('tvshows-search', tvshowsSearch)
Vue.component('films-data', filmsData)
Vue.component('films-search', filmsSearch)
Vue.component('anime-data', animeData)
Vue.component('anime-search', animeSearch)

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