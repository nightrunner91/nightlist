// Core
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Disable annoying messages in console
Vue.config.productionTip = false;
Vue.config.devtools = true;

// Create global event
export const eventBus = new Vue();

// Import and regitser components
import appSidebar from "./views/components/_sidebar";
import appGradients from "./views/components/_gradients";
import appModal from "./views/components/_modal";
import appDropdown from "./views/components/_dropdown";
import appRating from "./views/components/_rating";
import appFavourite from "./views/components/_favourite";

import VTooltip from 'v-tooltip';
import Vuebar from './directives/_scrollbar';
import Ripple from './directives/_ripple';

Vue.component('app-sidebar', appSidebar);
Vue.component('app-gradients', appGradients);
Vue.component('app-modal', appModal);
Vue.component('app-dropdown', appDropdown);
Vue.component('app-rating', appRating);
Vue.component('app-favourite', appFavourite);

Vue.use(VTooltip);
Vue.use(Vuebar);
Vue.directive('ripple', Ripple);

// SVG Sprite
import sprite from './assets/sprite.svg';

fetch(sprite)
  .then(response => response.text())
  .then(svg => {
    let div = document.createElement('div');
    div.hidden = true;
    div.insertAdjacentHTML('afterbegin', svg);
    document.body.insertBefore(div, document.body.childNodes[0]);
  });

// Init app
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
