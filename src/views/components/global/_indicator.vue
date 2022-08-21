<template lang='pug'>
  div(class='indicator')
    transition(name='loader')
      svg(
        v-if='backupIsRestoring'
        class='indicator__loader'): use(xlink:href='#loader')
    
</template>

<script>
export default {
  name: 'Indicator',
  props: {
    
  },
  data() {
    return {
      
    }
  },
  computed: {
    backupIsRestoring() {
      return this.$store.state.backupIsRestoring
    }
  },
  methods: {
    addTooltip(payload) {
      if (this.tooltips.length < this.maxTooltips) {
        let id = Math.floor(Math.random() * 10000000000)
        payload.id = id
        payload.order = this.tooltips.length
        this.tooltips.push(payload)
        setTimeout(() => { this.removeTooltip(id) }, this.duration);
      }
    },

    removeTooltip(id) {
      let target = this.tooltips.map(i => id).indexOf(id)
      this.tooltips.splice(target, 1)
    },

    tooltipPosition(order) {
      return 'bottom: ' + this.margin * order + 'px'
    },

    watchForNotifications() {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type == 'CHANGE_SERVER_STATE') {
          if (mutation.payload.status == 'success' || mutation.payload.status == 'error') {
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