<template>
  <div>
    <h3>Booked rooms:</h3>

    <div
      v-for="(roomCount, roomType) in bookedRooms"
      :key="roomType"
    ><span>{{roomType}} - </span><span>{{roomCount}}</span></div>
  </div>
</template>

<script>
export default {
  name: 'BookedRooms',
  props: {
    bookedRooms: {
      type: Object,
      required: true,
    },
  },
}
</script>
