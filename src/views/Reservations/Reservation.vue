<template>
  <div>
    <h3><u>{{date}}</u></h3>

    <BookedRooms
      :bookedDays="bookedDays"
    />

    <AvailableRoom
      :availableDays="availableDays"
    />
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import BookedRooms from './BookedRooms.vue';
import AvailableRoom from './AvailableRoom.vue';

export default {
  name: 'Reservation',
  components: {
    BookedRooms,
    AvailableRoom,
  },
  props: {
    dayInfo: {
      type: Object,
      required: true,
    },
    bookedDays: {
      type: Object,
      required: true,
    },
    availableDays: {
      type: Object,
      required: true,
    },
  },
  computed: {
    date() {
      const time = Number(Object.keys(this.dayInfo)[0])
      const date = new Date(time)
      const day = date.getDate()
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear()      
      return `${day} ${month} ${year}`
    },
  }
}
</script>
