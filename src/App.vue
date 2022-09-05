<template lang='pug'>

  div(id='app' class='page')
    app-preloader(:current='currentPage')
    app-gradients(:current='currentPage')
    app-header
    main(class='content' v-if="" v-scrollbar)
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
    allowEdit() {
      return this.$store.state.allowEdit
    },
    
    currentPage() {
      let rName = this.$route.name
      if (rName != null) return rName.replace(/\s/g, '')
      else return
    },

    binId() {
      return this.$store.state.settings.binId
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.saveAllowState()
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

    openModal(purpose, type) {
      this.$store.commit('CHANGE_MODAL_STATE', {
        visibility: true,
        purpose: purpose,
        type: type
      })
      eventBus.$emit('modalOpened')
    },

    closeModal() {
      this.$store.commit('CHANGE_MODAL_STATE', {
        visibility: false
      })
      eventBus.$emit('modalClosed')
    },

    setDefaultContent(type) {
      this.$store.commit('CHANGE_CONTENT', this.$store.state[type].default)
    },

    saveAllowState() {
      this.$store.commit('SAVE_ALLOW_STATE', process.env.NODE_ENV)
    }
  },
  mounted() {
    this.$router.push('/dashboard')

    this.$store.dispatch('getBackup')

    eventBus.$on('openModal', (purpose, type) => {
      this.openModal(purpose, type)
    })
    
    eventBus.$on('closeModal', type => {
      this.closeModal()
      this.setDefaultContent(type)
    })

    console.log(localStorage)
  }
}
</script>

<style lang="sass">

  // @extend
  // @include
  // { CSS свойства }
  // &--модификаторы
  // &::псевдоэлементы
  // &:псевдоклассы
  // @медиазапросы
  // &__элементы
  // .блоки

  // Положение объекта (position, top, left, right, bottom, float, z-index)
  // Тип объекта (display)
  // Размеры и отступы объекта (width, height, margin, padding)
  // Стили границ объекта (border, outline, border-radius, overflow)
  // Внешний вид объекта (background, opacity, box-shadow)
  // Стили текста внутри объекта (font, color, line-height, font-size, text-shadow)
  // Дополнительные стили (cursor, transition, transform, animation)

  
  // Fonts
  @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&Open+Sans:400,700&display=swap')
    
  // Core
  @import "styles/core/colors"
  @import "styles/core/varaibles"
  @import "styles/core/normalize"
  @import "styles/core/grid"
  @import "styles/core/typography"
  @import "styles/core/mixins"
  @import "styles/core/rotations"

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
  @import "styles/blocks/expand"
  @import "styles/blocks/input"
  @import "styles/blocks/modal"
  @import "styles/blocks/page"
  @import "styles/blocks/placeholder"
  @import "styles/blocks/plate"
  @import "styles/blocks/progress"
  @import "styles/blocks/rating"
  @import "styles/blocks/search"
  @import "styles/blocks/section"
  @import "styles/blocks/settings"
  @import "styles/blocks/sidebar"
  @import "styles/blocks/slot"
  @import "styles/blocks/table"
  @import "styles/blocks/card"
  @import "styles/blocks/title"
  
  // Plugins
  @import "styles/plugins/tooltip"
  @import "styles/plugins/scrollbar"
  @import "styles/plugins/hamburgers/hamburgers"
  @import "styles/plugins/nprogress"

</style>
