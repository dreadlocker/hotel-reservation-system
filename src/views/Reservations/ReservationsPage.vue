<template>
  <div>
    <Reservation
      v-for="(dayInfo, index) in reservationsSorted"
      :key="Object.keys(dayInfo)[0]"
      :dayInfo="dayInfo"
      :bookedRooms="bookedRooms[index]"
      :availableRooms="availableRooms[index]"
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
    ...mapGetters(["reservationsSorted", "bookedRooms", "availableRooms"]),
  },
}
</script>
