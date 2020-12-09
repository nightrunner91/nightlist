<template lang='pug'>
  
  header(
    class='header'
    :class='{"header--active" : settingsOpened}'
    v-if='windowParams.width < breakpoints.mb')

    div(
      class='header__avatar'
      :style='avatarStyles')

    svg(
      class='header__settings'
      @click='openSettings()'): use(xlink:href='#settings')

    transition(name='settings-reveal' mode='out-in')
      app-settings(v-if='settingsOpened' :sidebarCollapsed='sidebarCollapsed')

</template>

<script>
import { eventBus } from "../../../main"

export default {
  name: 'Header',
  props: {
    sidebarCollapsed: true
  },
  data() {
    return {
      settingsOpened: false
    }
  },
  computed: {
    windowParams() {
      return this.$store.state.windowParams
    },

    breakpoints() {
      return this.$store.state.breakpoints
    },

    modalState() {
      return this.$store.state.modalState
    },

    username() {
      return this.$store.state.settings.username
    },

    avatarStyles() {
      let storedAvatar = this.$store.state.settings.avatar

      if (storedAvatar.length > 0) {
        return 'background-image: url(' + storedAvatar + ')'
      } else {
        return 'background-image: url()'
      }
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      if (this.windowParams.width > this.breakpoints.lg && this.sidebarCollapsed) {
        
      } else {
        
      }
    },

    openSettings() {
      this.settingsOpened = true
    },

    closeSettings() {
      this.settingsOpened = false
    },
  },
  mounted() {
    eventBus.$on('closeSettings', () => {
      this.closeSettings()
    })

    this.handleResize()
  }
}
</script>