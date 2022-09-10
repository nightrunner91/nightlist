<template lang='pug'>
  div(class='indicator')
    transition(name='loader')
      svg(
        v-if='backupState.status == "loading"'
        class='indicator__loader'): use(xlink:href='#loader')
    div(class='indicator__tooltips')
      transition-group(name='tooltip')
        div(
          class='indicator__tooltip'
          v-for='tooltip in tooltips'
          :key='tooltip.id'
          :style='tooltipPosition(tooltip.order)'
          :class='"indicator__tooltip--" + tooltip.status') {{tooltip.message}}

</template>

<script>
export default {
  name: 'Indicator',
  props: {
    
  },
  data() {
    return {
      tooltips: [],
      duration: 2000,
      maxTooltips: 5,
      margin: 30
    }
  },
  computed: {
    backupState() {
      return this.$store.state.backupState
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
        if (mutation.type == 'CHANGE_BACKUP_STATE') {
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