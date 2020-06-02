<template>
  <div>
    <label :for="`${label}Date`">{{label}} date </label>
    <input
      v-model="inputValues[`${label}Date`]"
      :id="`${label}Date`"
      ref="date"
      type="date"
    >
  </div>
</template>

<script>

export default {
// TODO DA VALIDIRAM FROM DATE DALI NE E ZADNA DATA
// TODO DA VALIDIRAM TO DATE DALI NE E ZADNA DATA
  name: 'DateSelector',
  props: {
    label: {
      type: String,
      required: true,
    },
    inputValues: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.$refs.date.valueAsNumber = new Date();
  }
}
</script>
