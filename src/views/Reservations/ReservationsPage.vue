<template>
  <div>
    <Reservation
      v-for="(reservation, time) in reservationsSorted"
      :key="time"
      :reservation="reservation"
      :time="time"
    />
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import Reservation from './Reservation.vue';

export default {
  name: 'ReservationsPage',
  components: {
    Reservation,
  },
  computed: {
    ...mapGetters(["reservationsSorted"]),
  }
}
</script>
