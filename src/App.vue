<template lang='pug'>

  div(id='app' class='page')
    app-gradients(:current='currentPage')
    app-header
    main(class='content' v-scrollbar)
      div(class='content__inner')
        transition(name='page' mode='out-in')
          router-view
    app-sidebar(:current='currentPage')
    app-indicator

</template>

<script>
import { eventBus } from "./main"

export default {
  name: 'App',
  data() {
    return {
      
    }
  },
  computed: {
    currentPage() {
      let rName = this.$route.name
      if (rName != null) return rName
      else return
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
    }
  },
  mounted() {
    this.$store.dispatch('getBackup')

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

  //  1.  $varaibles
  //  2.  @mixins
  //  3.  @extends
  //  4.  @includes
  //  5.  { styles } ↴
  //      1. Positions (relative, absolute, fixed...)
  //      2. Display (block, inline, flex...)
  //      3. Coordinates (top, right, bottom, left)
  //      4. z-index
  //      5. Dimensions (width, height)
  //      6. Margins
  //      7. Paddings
  //      8. Styles of element (background, border, outline, shadow, radius, opacity...)
  //      9. Styles of text (font-size, color, line-height...)
  //      10. Transitions and @keyframes
  //  6.  &__elements {}
  //  7.  &--modificators {}
  //  8.  &:first-child, &:last-child, &:nth-child
  //  9.  &:before, &:after
  //  10. &:hover, &:focus
  //  11. @media
  //  12. @keyframes

  
  // Fonts
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&Open+Sans:400,700&display=swap')
    
  // Core
  @import "styles/core/normalize"
  @import "styles/core/colors"
  @import "styles/core/varaibles"
  @import "styles/core/grid"
  @import "styles/core/typography"
  @import "styles/core/mixins"

  // Blocks
  @import "styles/blocks/badge"
  @import "styles/blocks/button"
  @import "styles/blocks/checkbox"
  @import "styles/blocks/content"
  @import "styles/blocks/dropdown"
  @import "styles/blocks/favourite"
  @import "styles/blocks/gradients"
  @import "styles/blocks/header"
  @import "styles/blocks/indicator"
  @import "styles/blocks/input"
  @import "styles/blocks/modal"
  @import "styles/blocks/page"
  @import "styles/blocks/placeholder"
  @import "styles/blocks/progress"
  @import "styles/blocks/rating"
  @import "styles/blocks/search"
  @import "styles/blocks/section"
  @import "styles/blocks/settings"
  @import "styles/blocks/sidebar"
  @import "styles/blocks/slot"
  @import "styles/blocks/table"
  @import "styles/blocks/title"
  
  // Plugins
  @import "styles/plugins/tooltip"
  @import "styles/plugins/scrollbar"
  @import "styles/plugins/hamburgers/hamburgers"
</style>
