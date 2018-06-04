import Vue from 'vue'
import axios from 'axios'

// const token = localStorage.getItem('token')
// const header = 'Bearer ' + token

// const LOADING = 'LOADING';
// const LOADING_SUCCESS = 'LOADING_SUCCESS';

const state = {
  leadItems: [],
  newLead: '',
  loading: false
}

const mutations = {
  LOADING (state) {
    state.loading = true
  },
  LOADING_SUCCESS (state) {
    state.loading = false;
  },
  ADD_LEAD (state, payload) {
    state.leadItems.unshift(payload)
  },
  UPDATE_LEAD_ITEMS (state, payload) {
    state.leadItems = payload
  },

  EDIT_LEAD (state, payload) {
      var leadItems = state.leadItems
      var findIndex = leadItems.findIndex(x => x.id === payload.id)
      Vue.set(leadItems, findIndex, payload)
  }
}

const actions = {
  newLeadItem ({ commit }, {firstName, lastName, phone, email, type, referral, leadStatus, notes}) {
    const token = localStorage.getItem('token')
    const header = 'Bearer ' + token
    commit('LOADING') // show spinner
    var payload = {
      'status': 'publish',
      'content': firstName + lastName + phone + email + type + referral + notes + leadStatus,
      'title': firstName + ' ' + lastName,
      'details': {
        '_subject': 'New Lead',
        '_from': firstName,
        '_from_name': firstName + ' ' + lastName,
        '_field_first-name': firstName,
        '_field_last-name': lastName,
        '_field_type': type,
        '_field_tel-879': phone,
        '_from_email': email,
        '_field_notes': notes,
        '_field_referral': referral,
        '_field_lead_status': leadStatus
      }
    }
    axios.post('/wp-json/wp/v2/flamingo_inbound', payload, { headers: { Authorization: header } }).then((response) => {
      commit('ADD_LEAD', response.data)
      commit('LOADING_SUCCESS')
    }, (err) => {
        console.log(err)
      });
  },
  getLeadItems ({ commit }) {
    const token = localStorage.getItem('token')
    const header = 'Bearer ' + token
    commit('LOADING') // show spinner
    axios.get('/wp-json/wp/v2/flamingo_inbound?status=any&per_page=100', { headers: { Authorization: header } }).then((response) => {
      commit('UPDATE_LEAD_ITEMS', response.data)
      commit('LOADING_SUCCESS')
    }, (err) => {
        console.log(err)
      });
  },

  updateLeadItem ({ state, commit }, {date, firstName, lastName, phone, email, type, referral, leadStatus, comments, id, status, notes}) {
    const token = localStorage.getItem('token')
    const header = 'Bearer ' + token
    commit('LOADING') // show spinner
    var payload = {
      'date': date,
      'status': status,
      'content': firstName + lastName + phone + email + notes + comments + type + referral + leadStatus,
      'details': {
        '_field_first-name': firstName,
        '_field_last-name': lastName,
        '_field_your-message': comments,
        '_field_tel-879': phone,
        '_from_email': email,
        '_field_notes': notes,
        '_field_type': type,
        '_field_referral': referral,
        '_field_lead_status': leadStatus
      }
    }
    axios.post('/wp-json/wp/v2/flamingo_inbound/' + id, payload, { headers: { Authorization: header } }).then((response) => {
      // const lead = id
      commit('EDIT_LEAD', response.data)
      commit('LOADING_SUCCESS')
    });
  },
  removeLeadItem ({ commit }, leadItem) {
    const token = localStorage.getItem('token')
    const header = 'Bearer ' + token
    axios.delete('/wp-json/wp/v2/flamingo_inbound/' + leadItem.id, { headers: { Authorization: header } }).then((response) => {
      commit('EDIT_LEAD', response.data)
    });
  },

  searchLeads ({ commit }, query) {
    const token = localStorage.getItem('token')
    const header = 'Bearer ' + token
    axios.get('/wp-json/wp/v2/flamingo_inbound?status=any&per_page=100&search=' + query.query, { headers: { Authorization: header } }).then((response) => {
      commit('UPDATE_LEAD_ITEMS', response.data)
    });
  }
}

const getters = {
  newLead: state => state.newLead,
  leadItems: state => state.leadItems,
  leadItemFromId: (state) => (id) => {
    return state.leadItems.find(leadItem => leadItem.id === id)
  },
  loading: state => state.loading
}

const leadModule = {
  state,
  mutations,
  actions,
  getters
}

export default leadModule
