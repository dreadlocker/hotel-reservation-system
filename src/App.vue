<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/reservations">Reservations</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {
  ACTION_ROOMS_INFO,
  ACTION_RESERVATIONS,
  ACTION_BREAKFAST_PRICE,
  ACTION_DINNER_PRICE,
} from "@/store/types.js";

export default {
  name: 'App',
  methods: {
    ...mapActions({
      action_rooms_info: ACTION_ROOMS_INFO,
      action_reservations: ACTION_RESERVATIONS,
      action_breakfast_price: ACTION_BREAKFAST_PRICE,
      action_dinner_price: ACTION_DINNER_PRICE,
    })
  },
  mounted() {
    const hotelInfo = require("@/assets/db/hotelInfo.json")
    this.action_reservations(require("@/assets/db/reservations.json").reservations)
    this.action_rooms_info(hotelInfo.roomsInfo)
    this.action_breakfast_price(hotelInfo.breakfastPrice)
    this.action_dinner_price(hotelInfo.dinnerPrice)
  }
}
</script>

<style lang="sass">
body
  margin: 0
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
#nav
  padding: 30px
  a
    font-weight: bold
    color: #2c3e50
    &.router-link-exact-active
      color: #42b983
</style>
