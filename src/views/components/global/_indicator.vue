<template lang='pug'>
  div(class='indicator')
    svg(
      v-if='serverState.status == undefined || serverState.status == "loading"'
      class='indicator__loader'): use(xlink:href='#loader')
    transition-group(name='tooltip')
      div(
        class='indicator__tooltip'
        v-for='tooltip in tooltips'
        :key='tooltip.id'
        :class='[{"indicator__tooltip--active" : tooltip.order == tooltips.length}, "indicator__tooltip--" + tooltip.status]') {{tooltip.message}}
    
</template>

<script>
export default {
  name: 'Indicator',
  props: {
    
  },
  data() {
    return {
      duration: 2500,
      tooltips: []
    }
  },
  computed: {
    serverState() {
      return this.$store.state.serverState
    }
  },
  methods: {
    addTooltip(payload) {
      let id = Math.floor(Math.random() * 10000000000)
      payload.id = id
      payload.order = this.tooltips.length + 1
      this.tooltips.push(payload)
      setTimeout(() => { this.removeTooltip(id) }, this.duration);
    },

    removeTooltip(id) {
      let target = this.tooltips.map(i => id).indexOf(id)
      this.tooltips.splice(target, 1)
    },

    clearTooltips() {
      this.tooltips = []
    },

    watchForNotifications() {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type == 'CHANGE_SERVER_STATE') {
          if (mutation.payload.status == 'success' || mutation.payload.status == 'error') {
            //this.clearTooltips()
            this.addTooltip(mutation.payload)
          }
        }
      })
    }
  },
  mounted() {
    this.watchForNotifications()
  }
}
</script>