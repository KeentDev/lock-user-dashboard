import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user_name: '',
    id_num: '',
    baseFee: '',
    perHourFee: '',
    server_base_url: 'localhost',
    server_port: 2000
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://localhost:2000/login', data: user, method: 'POST' })
          .then(resp => {
            let response = resp.data;
            if(response.success){
              const data = response.data;
              const token = data.token
              const user = data.user
              localStorage.setItem('token', token)
              // Add the following line:
              axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
              commit('auth_success', token, user)
              resolve(resp);
            }else {
              commit('logout')
              commit('auth_error')
              localStorage.removeItem('token')
              reject()
            }
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
  },
  getters: {
    token: state => state.token,
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    serverUrl: (state) => {
      return `http://${state.server_base_url}:${state.server_port}`;
    }
  } 
})
