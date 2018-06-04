// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import App from './App'
import store from './store'
import router from './router'

Vue.use(Vuetify)

Vue.config.productionTip = false

Vue.filter('phone', function (phone) {
    return phone.replace(/[^0-9]/g, '')
                .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
