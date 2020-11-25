<template lang='pug'>

  div(
    class='selector'
    :class='"selector--" + currentClass')
    div(class='selector__label') Auto synchronization
    div(class='selector__body')
      div(
        class='selector__item'
        :style='itemStyle'
        :class='{ "selector__item--active" : option.selected }'
        v-for='option in options'
        @click='setOption(option.id)'
        v-ripple) {{option.name}}

</template>

<script>
import { eventBus } from "../../../main"

export default {
  name: "Selector",
  props: {
    
  },
  data() {
    return {
      options: [
        {
          name: '30 sec',
          id: '30sec',
          selected: false,
          ms: 30000
        },
        {
          name: '1 min',
          id: '1min',
          selected: false,
          ms: 60000
        },
        {
          name: '5 min',
          id: '5min',
          selected: false,
          ms: 300000
        },
        {
          name: '10 min',
          id: '10min',
          selected: false,
          ms: 600000
        }
      ]
    }
  },
  computed: {
    currentClass() {
      return this.$router.options.routes.filter(i => i.name == this.$route.name)[0].id
    },

    itemStyle() {
      return 'width: ' + 100 / this.options.length + '%'
    },

    syncInterval() {
      return this.$store.state.settings.syncInterval
    }
  },
  methods: {
    setOption(id) {
      let target = this.options.filter(i => i.id == id)[0]
      let others = this.options.filter(i => i.id != id)

      target.selected = !target.selected

      for (let index = 0; index < others.length; index++) {
        others[index].selected = false
      }

      if (target.selected) {
        this.$store.commit('SAVE_SYNC_INTERVAL', target)
        this.$storage.set('syncInterval', { key: target })
        eventBus.$emit('forceAutoSync')
      } else {
        this.$store.commit('SAVE_SYNC_INTERVAL', {})
        this.$storage.remove('syncInterval')
        eventBus.$emit('resetAutoSync')
      }
    },

    restoreSettings() {
      if (
        Object.keys(this.syncInterval).length > 0 && 
        typeof this.syncInterval == "object") {
        this.options.filter(i => i.id == this.syncInterval.id)[0].selected = true
      }
    }
  },
  created() {
    
  },
  mounted() {
    this.restoreSettings()
  }
}
</script>