require('./bootstrap');

// Import modules...
import Vue from 'vue';
import { App as InertiaApp, plugin as InertiaPlugin } from '@inertiajs/inertia-vue';
import PortalVue from 'portal-vue';

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

// import colors from 'vuetify/lib/util/colors'

Vue.mixin({ methods: { route } });
Vue.use(InertiaPlugin);
Vue.use(PortalVue);
//also add this line
Vue.use(Vuetify);

const Swal = require('sweetalert2')

window.Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

import { InertiaProgress } from '@inertiajs/progress'
InertiaProgress.init({
    color: '#49FF74',
})

import VueShowdown from 'vue-showdown'

// the second parameter of Vue.use() is optional
Vue.use(VueShowdown, {
  // set default flavor of showdown
  flavor: 'github',
  // set default options of showdown (will override the flavor options)
  options: {
    emoji: true,
  },
})


Vue.prototype.thrott1le = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};


const app = document.getElementById('app');

new Vue({
    vuetify: new Vuetify({
      theme: { dark: true ,themes:{
        dark:{
          //background: colors.indigo.base,
          //primary: colors.red.darken1, // #E53935
          //secondary: colors.red.lighten4, // #FFCDD2
          //accent: colors.indigo.base, // #3F51B5
        }
      }},
    }),
    render: (h) =>
        h(InertiaApp, {
            props: {
                initialPage: JSON.parse(app.dataset.page),
                resolveComponent: (name) => require(`./Pages/${name}`).default,
            },
        }),
}).$mount(app);
