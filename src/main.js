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

import VTooltip from 'v-tooltip';
import Vuebar from './directives/_scrollbar';

Vue.component('app-sidebar', appSidebar);
Vue.component('app-gradients', appGradients);

Vue.use(Vuebar);
Vue.use(VTooltip);

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
