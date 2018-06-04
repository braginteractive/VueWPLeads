import axios from 'axios'

const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';

const state = {
  isLoggedIn: !!localStorage.getItem('token')
}

const mutations = {
  LOGIN (state) {
    state.pending = true
  },
  LOGIN_SUCCESS (state) {
  	state.isLoggedIn = true;
    state.pending = false;
  },
  LOGOUT (state) {
  	state.isLoggedIn = false;
  }
}

const actions = {
	login ({ commit }, creds) {
    return new Promise((resolve, reject) => {
     commit(LOGIN); // show spinner
     axios.post('/wp-json/jwt-auth/v1/token/', { username: creds.username, password: creds.password })
      .then(response => {
      	localStorage.setItem('token', response.data.token)
      	commit(LOGIN_SUCCESS)
        resolve(response)
      })
        .catch(err => {
            localStorage.removeItem('token')
            reject(err)
        })
    })
   },
   logout ({ commit }) {
     localStorage.removeItem('token');
     commit(LOGOUT);
   }
}

const getters = {
  isLoggedIn: state => {
    return state.isLoggedIn
   }
}

const loginModule = {
  state,
  mutations,
  actions,
  getters
}

export default loginModule
