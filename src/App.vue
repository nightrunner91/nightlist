<template lang='pug'>

  div(id='app' class='page')
    app-gradients(:current='currentPage')
    app-sidebar(:current='currentPage')
    app-indicator
    main(class='content' v-scrollbar)
      div(class='content__inner')
        transition(name='page' mode='out-in')
          router-view

</template>

<script>
import { eventBus } from "./main"
import { projectName } from "./main"

export default {
  name: 'App',
  data() {
    return {
      interval: null
    }
  },
  computed: {
    currentPage() {
      let rName = this.$route.name
      if (rName != null) return rName
      else return
    },

    syncInterval() {
      return this.$store.state.settings.syncInterval
    },

    binId() {
      return this.$store.state.settings.binId
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
      this.$store.commit('SAVE_WINDOW_PARAMS', {
        width: window.innerWidth,
        height: window.innerHeight
      })
    },

    openModal(purpose) {
      this.$store.commit('CHANGE_MODAL_STATE', {
        visibility: true,
        purpose: purpose
      })
      eventBus.$emit('modalOpened')
    },

    closeModal() {
      this.$store.commit('CHANGE_MODAL_STATE', {
        visibility: false
      })
      eventBus.$emit('modalClosed')
    },

    setDefaultContent() {
      this.$store.commit('CHANGE_CONTENT', this.$store.state[this.currentPage.toLowerCase()].default)
    },

    resetAutoSync() {
      clearInterval(this.interval)
    },

    setAutoSync() {
      if (this.binId.length > 0 && Object.keys(this.syncInterval).length > 0) {
        this.interval = setInterval(() => {
          this.$store.dispatch('sendBackup')
        }, this.syncInterval.ms)
      }
    }
  },
  mounted() {
    this.$store.dispatch('restoreCollection')
    this.$store.dispatch('restoreSettings')

    this.setAutoSync()

    eventBus.$on('forceAutoSync', () => {
      this.resetAutoSync()
      this.setAutoSync()
    })

    eventBus.$on('resetAutoSync', () => {
      this.resetAutoSync()
    })

    this.$router.push('/dashboard')

    eventBus.$on('openModal', purpose => {
      this.openModal(purpose)
    })
    
    eventBus.$on('closeModal', () => {
      this.closeModal()
      this.setDefaultContent()
    })
  }
}
</script>

<style lang="sass">
  // Fonts
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&Open+Sans:400,700&display=swap')
    
  // Core
  @import "styles/core/normalize"
  @import "styles/core/colors"
  @import "styles/core/varaibles"
  @import "styles/core/extends"
  @import "styles/core/grid"
  @import "styles/core/typography"
  @import "styles/core/mixins"

  // Blocks
  @import "styles/blocks/page"
  @import "styles/blocks/gradients"
  @import "styles/blocks/sidebar"
  @import "styles/blocks/settings"
  @import "styles/blocks/content"
  @import "styles/blocks/section"
  @import "styles/blocks/placeholder"
  @import "styles/blocks/indicator"
  @import "styles/blocks/badge"
  @import "styles/blocks/title"
  @import "styles/blocks/table"
  @import "styles/blocks/search"
  @import "styles/blocks/input"
  @import "styles/blocks/checkbox"
  @import "styles/blocks/dropdown"
  @import "styles/blocks/rating"
  @import "styles/blocks/favourite"
  @import "styles/blocks/selector"
  @import "styles/blocks/button"
  @import "styles/blocks/progress"
  @import "styles/blocks/tooltip"
  @import "styles/blocks/modal"

  // Plugins
  @import "styles/plugins/scrollbar"
  @import "styles/plugins/hamburgers/hamburgers"
</style>
