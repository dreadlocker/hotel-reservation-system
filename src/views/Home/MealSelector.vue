<template>
  <div>
    <label :for="label">Include {{label}} </label>
    <input
      :id="label"
      v-model="inputValues[label]"
      type="checkbox"
    >
  </div>
</template>

<script>

export default {
  name: 'MealSelector',
  props: {
    label: {
      type: String,
      required: true,
    },
    inputValues: {
      type: Object,
      required: true,
    },
  }
}
</script>
