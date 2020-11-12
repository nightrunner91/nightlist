<template lang='pug'>
  div(class='indicator')
    svg(
      v-if='state.status == undefined || state.status == "loading"'
      class='indicator__loader'): use(xlink:href='#loader')
    div(
      class='indicator__tooltip'
      :class='[{"indicator__tooltip--active" : visibility}, "indicator__tooltip--" + state.status]') {{state.message}}
    
</template>

<script>
export default {
  name: 'Indicator',
  props: {
    state: Object
  },
  data() {
    return {
      duration: 2000,
      visibility: false
    }
  },
  watch: {
    state(newVal, oldVal) {
      if (newVal.status == 'success' || newVal.status == 'error') {
        this.visibility = true
        setTimeout(() => { this.visibility = false }, this.duration);
      }
    }
  },
  methods: {
    
  },
  mounted() {
    
  }
}
</script>