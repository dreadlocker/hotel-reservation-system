<template>
  <div><span>{{roomType}} - </span><span>{{count}}</span></div>
</template>

<script>
export default {
  name: 'RoomBooked',
  props: {
    count: {
      type: String,
      required: true,
    },
    roomType: {
      type: String,
      required: true,
    },
  },
}
</script>
