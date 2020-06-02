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
    breakfastPrice: 0,
    dinnerPrice: 0,
  },
  mutations: {
    [types.ROOMS_INFO]: (state, payload) => {
      state.roomsInfo = payload;
    },
    [types.RESERVATIONS]: (state, payload) => {
      state.reservations = payload;
    },
    [types.BREAKFAST_PRICE]: (state, payload) => {
      state.breakfastPrice = payload;
    },
    [types.DINNER_PRICE]: (state, payload) => {
      state.dinnerPrice = payload;
    },
  },
  actions: {
    [types.ACTION_ROOMS_INFO]({ commit }, payload) {
      commit(types.ROOMS_INFO, payload);
    },
    [types.ACTION_RESERVATIONS]({ commit }, payload) {
      commit(types.RESERVATIONS, payload);
    },
    [types.ACTION_BREAKFAST_PRICE]({ commit }, payload) {
      commit(types.BREAKFAST_PRICE, payload);
    },
    [types.ACTION_DINNER_PRICE]({ commit }, payload) {
      commit(types.DINNER_PRICE, payload);
    },
  },
  getters: {
    todayGetTime: () => {
      const date = new Date()
      const day = date.getDate()
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear()
      return new Date(`${day} ${month} ${year}`).getTime()
    },
    reservationsSorted: (state, getters) => {
      const reservationsKeysSorted = state.reservations
        .filter(reservation => Object.keys(reservation)[0] >= getters.todayGetTime)
        .map(reservation => Object.keys(reservation)[0]).sort((a, b) => Number(a) - Number(b));
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
    roomTypes: state => {
      return state.roomsInfo.map(room => Object.keys(room)[0])
    }
  }
})
