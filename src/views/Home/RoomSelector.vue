<template>
  <div>
    <label for="roomType">Room type </label>
    <select v-model="inputValues.roomType" id="roomType">
      <option
        v-for="roomType in roomTypes"
        :key="roomType"
      >{{roomType}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'RoomSelector',
  props: {
    roomTypes: {
      type: Array,
      required: true,
    },
    inputValues: {
      type: Object,
      required: true,
    },
  }
}
</script>
