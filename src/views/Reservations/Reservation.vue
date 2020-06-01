<template>
  <div>
    <h3>{{date}}</h3>
    <RoomBooked
      v-for="(count, roomType) in reservation"
      :key="roomType"
      :count="count"
      :roomType="roomType"
    />
  </div>
</template>

<script>
import RoomBooked from './RoomBooked.vue';

export default {
  name: 'Reservation',
  components: {
    RoomBooked,
  },
  props: {
    reservation: {
      type: Object,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  computed: {
    date() {
      const date = new Date(Number(this.time))
      const day = date.getDate()
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear()      
      return `${day} ${month} ${year}`
    },
  }
}
</script>
