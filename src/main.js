// Core
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// Disable annoying messages in console
Vue.config.productionTip = false
Vue.config.devtools = true


// Create global event
export const eventBus = new Vue()


// Import and regitser local components
import appSidebar from "./views/components/global/_sidebar"
import appGradients from "./views/components/global/_gradients"

import modalGames from "./views/components/modals/_modal-games"

import tableGames from "./views/components/tables/_table-games"

import appDropdown from "./views/components/ui/_dropdown"
import appCheckbox from "./views/components/ui/_checkbox"
import appRating from "./views/components/ui/_rating"
import appFavourite from "./views/components/ui/_favourite"

Vue.component('app-sidebar', appSidebar)
Vue.component('app-gradients', appGradients)

Vue.component('modal-games', modalGames)

Vue.component('table-games', tableGames)

Vue.component('app-dropdown', appDropdown)
Vue.component('app-checkbox', appCheckbox)
Vue.component('app-rating', appRating)
Vue.component('app-favourite', appFavourite)


// Import and regitser external components
import VTooltip from 'v-tooltip'
import Vuebar from './directives/_scrollbar'
import Ripple from './directives/_ripple'
import {Vue2Storage} from 'vue2-storage'

Vue.use(VTooltip)
Vue.use(Vuebar)
Vue.directive('ripple', Ripple)
Vue.use(Vue2Storage, {
  prefix: 'nightlist_',
  driver: 'local',
  ttl: 0
})


// SVG Sprite
import sprite from './assets/sprite.svg'

fetch(sprite)
  .then(response => response.text())
  .then(svg => {
    let div = document.createElement('div')
    div.hidden = true
    div.insertAdjacentHTML('afterbegin', svg)
    document.body.insertBefore(div, document.body.childNodes[0])
  })


// Init app
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')