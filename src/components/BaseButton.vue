<template>
  <button
    :type="type"
    :classes="classes"
    :name="name"
    class="btn"
  ><slot></slot></button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    type: {
      type: String,
      default: "button",
      validator: (val) => (/^button$|^submit$|^reset$/g).test(val)
    },
    classes: {
      type: String,
    },
    name: {
      type: String,
      validator: (val) => (/^[A-Za-z0-9]{1,30}$/g).test(val)
    },
  }
}
</script>

<style lang="sass" scoped>
.btn
  padding: 5px 10px
  &:active
    transform: scale(1.1)
</style>