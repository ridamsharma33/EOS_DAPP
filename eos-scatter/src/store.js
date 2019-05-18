import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    loggedOut: true
  },
  mutations: {
    loginStatus(state, status) {
      state.loggedIn = status;
      state.loggedOut = false;
    },
    logoutStatus(state, status){
      state.loggedOut = status;
      state.loggedIn = false;
    }
  },
  getters: {
    loggedIn: state => state.loggedIn
  },
  actions: {}
});
