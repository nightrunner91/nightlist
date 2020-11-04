<template lang='pug'>

  div(id='app' class='page')
    app-gradients(:current='currentPage')
    app-sidebar
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
      
    }
  },
  computed: {
    currentPage() {
      let rName = this.$route.name
      if (rName != null) return rName
      else return
    },

    modalState() { 
      return this.$store.state.modalState
    }
  },
  methods: {
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

    isJson(item) {
      item = typeof item !== "string"
        ? JSON.stringify(item)
        : item

      try {
        item = JSON.parse(item)
      } catch (e) {
        return false
      }

      if (typeof item === "object" && item !== null) {
        return true
      }

      return false
    },

    importLocalStorage() {
      Object.values(localStorage).forEach(item => {
        if (this.isJson(item)) {
          let parsedItem = JSON.parse(item)

          if (parsedItem.value) {
            if (parsedItem.value.key) {
              if (
                parsedItem.value.key.id != undefined && 
                parsedItem.value.key.category != undefined) {
                this.$store.commit('APPLY_SLOT', { content: parsedItem.value.key, scenario: 'start' })
              }
            }
          }
        }
      })
    }
  },
  mounted() {
    this.importLocalStorage()

    eventBus.$on('openModal',  purpose => this.openModal(purpose))
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
  @import "styles/core/scrollbar"

  // Blocks
  @import "styles/blocks/page"
  @import "styles/blocks/gradients"
  @import "styles/blocks/sidebar"
  @import "styles/blocks/content"
  @import "styles/blocks/section"
  @import "styles/blocks/placeholder"

  // Elements
  @import "styles/elements/badge"
  @import "styles/elements/data"
  @import "styles/elements/title"
  @import "styles/elements/table"
  @import "styles/elements/item"
  @import "styles/elements/search"
  @import "styles/elements/input"
  @import "styles/elements/checkbox"
  @import "styles/elements/dropdown"
  @import "styles/elements/rating"
  @import "styles/elements/favourite"
  @import "styles/elements/button"
  @import "styles/elements/progress"
  @import "styles/elements/tooltip"
  @import "styles/elements/modal"

  // Plugins
  

  // Animations
  @import "styles/animations/animation"
</style>
