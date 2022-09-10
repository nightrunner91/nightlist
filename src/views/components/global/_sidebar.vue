<template lang='pug'>
  
  aside(
    class='sidebar'
    :class='[{"sidebar--blured" : modalState.visibility}, {"sidebar--collapsed" : sidebarCollapsed}, {"sidebar--opened" : !sidebarCollapsed && windowParams.width < breakpoints.lg}, {"sidebar--notransition" : noTransition}]')

    button(
      v-if='windowParams.width <= breakpoints.lg && windowParams.width > breakpoints.mb'
      class='sidebar__hamburger hamburger hamburger--arrowalt'
      :class='{ "is-active" : !sidebarCollapsed }'
      type='button'
      @click='toggleSidebar()')
      span(class='hamburger-box')
        span(class='hamburger-inner')

    div(
      v-if='windowParams.width > breakpoints.mb'
      class='sidebar__profile'
      :class='{"sidebar__profile--collapsed" : sidebarCollapsed}')
      img(
        class='sidebar__avatar'
        :src='require(`../../../assets/avatar.jpg`)')
      h2(class='sidebar__title') Hi. I'm #[span Nikita].
      p(class='sidebar__desc') And this is everything I've ever <br />played, watched and read.

    div(class='sidebar__menu')
      router-link(
        v-for='route in routes'
        v-if='route.mainMenu'
        :to='route.path'
        class='sidebar__link'
        @click.native='closeSettings(), collapseSidebar()'
        :key='route.id')
        div(
          class='sidebar__icon'
          v-if='route.id == "dashboard"')
          svg(class='sidebar__bookmark sidebar__bookmark--passive'): use(xlink:href='#dashboard-passive')
          svg(class='sidebar__bookmark sidebar__bookmark--active'): use(xlink:href='#dashboard-active')
        div(
          class='sidebar__icon'
          v-else)
          svg(class='sidebar__bookmark sidebar__bookmark--passive'): use(:xlink:href="'#bookmark-passive-' + route.id")
          svg(class='sidebar__bookmark sidebar__bookmark--active'): use(:xlink:href="'#bookmark-active-' + route.id")
        span(class='sidebar__name') {{route.name}}
        span(
          v-if='route.id == "dashboard"'
          class='sidebar__badge badge badge--small') {{favouritesLength()}}
        span(
          v-else
          class='sidebar__badge badge badge--small') {{categoryLength(route.id)}}

    div(class='sidebar__separator')

    div(class='d-flex align-items-center sidebar__social')
      a(
        v-for='social in socials'
        :key='social.id'
        :href="social.href"
        v-tooltip='{ content: social.tooltip, offset: 5}'
        class='sidebar__soclink'
        target='_blank')
        svg(class='sidebar__socicon'): use(:xlink:href='`#social-${social.id}`')

</template>

<script>
import { eventBus } from "../../../main"

export default {
  name: 'Sidebar',
  props: {
    current: String
  },
  data() {
    return {
      sidebarCollapsed: false,
      noTransition: false
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

    socials() {
      return this.$store.state.socials
    },

    routes() {
      return this.$router.options.routes
    },

    currentPage() {
      let rName = this.$route.name
      if (rName != null) return rName
      else return
    },
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
        this.openSidebar()
      } else {
        this.collapseSidebar()
      }
    },

    categoryLength(id) {
      return this.$store.state.collection.filter(i => i.category == id).length
    },

    totalLength() {
      return this.$store.state.collection.length
    },

    favouritesLength() {
      return this.$store.state.collection.filter(i => i.favourite).length
    },

    gradientActive(name) {
      if (this.current == name) return true
      return false
    },

    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },

    openSidebar() {
      this.sidebarCollapsed = false
    },

    collapseSidebar(scenario) {
      if (this.windowParams.width <= this.breakpoints.lg) {
        if (scenario == 'start') {
          this.noTransition = true
          setTimeout(() => this.noTransition = false, 300)
        }
        this.sidebarCollapsed = true
      }
    }
  },
  mounted() {
    eventBus.$on('openSettings', () => {
      this.openSettings()
    })

    eventBus.$on('closeSettings', () => {
      this.closeSettings()
    })

    this.handleResize()
    this.collapseSidebar('start')
  }
}
</script>