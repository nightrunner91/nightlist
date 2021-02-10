<template lang='pug'>

  div(class='preloader' :class='"preloader--" + className')

</template>

<script>
export default {
  name: 'Preloader',
  props: {
    current: String
  },
  computed: {
    className() {
      if (this.current == undefined) {
        return 'dashboard'
      } else {
        return this.current.toLowerCase()
      }
    }
  }
}
</script>