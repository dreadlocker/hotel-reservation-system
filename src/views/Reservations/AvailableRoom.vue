<template>
  <div>
    <h3>Available rooms:</h3>
    
    <div
      v-for="(roomCount, roomType) in availableDays"
      :key="roomType"
    ><span>{{roomType}} - </span><span>{{roomCount}}</span></div>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'AvailableRoom',
  props: {
    availableDays: {
      type: Object,
      required: true,
    },
  },
}
</script>
