import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import * as types from "./types.js"

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    roomsInfo: {},
    reservations: {},
  },
  mutations: {
    [types.ROOMS_INFO]: (state, payload) => {
      state.roomsInfo = payload;
    },
    [types.RESERVATIONS]: (state, payload) => {
      state.reservations = payload;
    },
  },
  actions: {
    [types.ACTION_ROOMS_INFO]({ commit }, payload) {
      commit(types.ROOMS_INFO, payload);
    },
    [types.ACTION_RESERVATIONS]({ commit }, payload) {
      commit(types.RESERVATIONS, payload);
    },
  },
  getters: {
    reservationsSorted: state => {
      const reservationsKeysSorted = (Object.keys(state.reservations).sort((a, b) => Number(a) - Number(b)));
      const reservationsSorted = {}
      reservationsKeysSorted.forEach(time => {
        reservationsSorted[time] = state.reservations[time]
      });
      return reservationsSorted;
    },
  }
})
