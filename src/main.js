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
import appSidebar from "./views/components/global/_sidebar"
import appGradients from "./views/components/global/_gradients"
import appPlaceholder from "./views/components/global/_placeholder"
import appIndicator from "./views/components/global/_indicator"
import appSettings from "./views/components/global/_settings"

Vue.component('app-sidebar', appSidebar)
Vue.component('app-gradients', appGradients)
Vue.component('app-placeholder', appPlaceholder)
Vue.component('app-indicator', appIndicator)
Vue.component('app-settings', appSettings)

// modals:
import gamesModal from "./views/components/modals/_games-modal"

Vue.component('games-modal', gamesModal)

// tables:
import gamesData from "./views/components/tables/_games-data"
import gamesSearch from "./views/components/tables/_games-search"

Vue.component('games-data', gamesData)
Vue.component('games-search', gamesSearch)

// UI:
import appDropdown from "./views/components/ui/_dropdown"
import appCheckbox from "./views/components/ui/_checkbox"
import appRating from "./views/components/ui/_rating"
import appFavourite from "./views/components/ui/_favourite"

Vue.component('app-dropdown', appDropdown)
Vue.component('app-checkbox', appCheckbox)
Vue.component('app-rating', appRating)
Vue.component('app-favourite', appFavourite)


// ======================================= //
// Import and regitser external components //
// ======================================= //

import VTooltip from 'v-tooltip'
import Vuebar from './directives/_scrollbar'
import Ripple from './directives/_ripple'
import {Vue2Storage} from 'vue2-storage'

Vue.use(VTooltip)
Vue.use(Vuebar)
Vue.directive('ripple', Ripple)
Vue.use(Vue2Storage, {prefix: 'nightlist_'})

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