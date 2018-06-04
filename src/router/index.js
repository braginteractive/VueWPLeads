import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/PageHome'
import Login from '@/components/login/Login'
import LeadList from '@/components/lead/LeadList'
// import LeadItem from '@/pages/PageShowLead'
import LeadItem from '@/components/lead/LeadItem'
import store from '../store'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isLoggedIn) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isLoggedIn) {
    next()
    return
  }
  next('/login')
}

export default new Router({
	mode: 'history',
	routes: [
		{ path: '*',
		  component: Home },
		{
		  path: '/',
		  name: 'Home',
		  component: Home,
		  beforeEnter: ifAuthenticated
		},
		{
		  path: '/leads',
		  component: LeadList,
		  name: 'LeadList',
		  beforeEnter: ifAuthenticated
		},
		{
	      path: '/lead/:id',
	      name: 'LeadItem',
	      component: LeadItem,
	      props: true,
	      beforeEnter: ifAuthenticated
	    },
	    {
	      path: '/login',
	      component: Login,
		  name: 'Login',
		  beforeEnter: ifNotAuthenticated
	    }
	]
})
