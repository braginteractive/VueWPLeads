import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import lead from './modules/lead'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
  	login,
    lead
  }
})
