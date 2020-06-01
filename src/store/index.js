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
      const reservationsKeysSorted = (Object.keys(state.reservations).sort((a, b) => a - b));
      const reservationsSorted = []
      reservationsKeysSorted.forEach(time => {
        reservationsSorted.push({[time]: state.reservations[time]})
      });
      return reservationsSorted;
    },
    bookedDays: (state, getters) => {
      return getters.reservationsSorted.map(dayInfo => Object.values(dayInfo)[0].booked);
    },
    availableDays: (state, getters) => {
      return getters.reservationsSorted.map(dayInfo => Object.values(dayInfo)[0].available);
    },
  }
})
