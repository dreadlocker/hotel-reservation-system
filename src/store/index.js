import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import * as types from "./types.js"

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    roomsInfo: [],
    reservations: [],
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
      const reservationsKeysSorted = state.reservations.map(reservation => Object.keys(reservation)[0]).sort((a, b) => Number(a) - Number(b));
      return reservationsKeysSorted.map(time => state.reservations.find(reservation => Object.keys(reservation)[0] === time));
    },
    bookedRooms: (state, getters) => {
      return getters.reservationsSorted.map(dayInfo => Object.values(dayInfo)[0].booked);
    },
    availableRooms: (state, getters) => {
      return getters.reservationsSorted.map(dayInfo => Object.values(dayInfo)[0].available);
    },
    roomsInfoBySeason: state => {
      const roomsInfo = []
      const stateRoomsInfo = state.roomsInfo
      const monthIndex = new Date().getMonth();
      // promotional price is set for months June, July, August
      const isSummer = monthIndex > 4 && monthIndex < 8

      return stateRoomsInfo.map(room => {
        const roomType = Object.keys(room)[0]
        const sortedRoomInfo = {}
        const roomInfo = Object.values(room)[0]
        for (const info in roomInfo) {
          if (isSummer) {
            if(info === "discountedPrice") continue
            if(info === "price") {
              sortedRoomInfo["price"] = roomInfo["discountedPrice"]
              continue
            }
            sortedRoomInfo[info] = roomInfo[info]
          } else {
            if(info !== "discountedPrice") sortedRoomInfo[info] = roomInfo[info]
          }
        }
        return {[roomType]: sortedRoomInfo}
      })
    },
  }
})
