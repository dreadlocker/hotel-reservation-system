<template>
  <div>
    <h3>Available rooms:</h3>
    
    <div
      v-for="(roomCount, roomType) in availableRooms"
      :key="roomType"
    ><span>{{roomType}} - </span><span>{{roomCount}}</span></div>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'AvailableRoom',
  props: {
    availableRooms: {
      type: Object,
      required: true,
    },
  },
}
</script>
