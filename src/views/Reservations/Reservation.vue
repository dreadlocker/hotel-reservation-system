<template>
  <div>
    <h3><u>{{date}}</u></h3>

    <BookedRooms
      :bookedRooms="bookedRooms"
    />

    <AvailableRoom
      :availableRooms="availableRooms"
    />
  </div>
</template>

<script>
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
    bookedRooms: {
      type: Object,
      required: true,
    },
    availableRooms: {
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
