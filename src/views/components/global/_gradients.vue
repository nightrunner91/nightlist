<template lang='pug'>

  div(class='gradients')
    div(
      v-for='route in routes'
      v-if='route.mainMenu'
      class='gradients__item'
      :class='["gradients__item--" + route.id, {"gradients__item--active" : gradientActive(route.name)}]')

</template>

<script>
export default {
  name: 'Gradients',
  props: {
    current: String
  },
  data() {
    return {
      
    }
  },
  computed: {
    routes() {
      return this.$router.options.routes
    }
  },
  methods: {
    gradientActive(name) {
      if (this.current == name) return true
      return false
    }
  },
  mounted() {
    
  }
}
</script>