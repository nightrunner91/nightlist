<template lang='pug'>
  
  aside(
    class='sidebar'
    :class='[{"sidebar--blured" : modalState.visibility}, {"sidebar--collapsed" : sidebarCollapsed}, {"sidebar--opened" : !sidebarCollapsed && windowParams.width < breakpoints.lg}, {"sidebar--notransition" : noTransition}]')

    div(
      v-for='route in routes'
      v-if='route.mainMenu && windowParams.width > breakpoints.mb'
      class='sidebar__gradient'
      :class='["sidebar__gradient--" + route.id, {"sidebar__gradient--active" : gradientActive(route.name)}]')

    button(
      v-if='windowParams.width <= breakpoints.lg && windowParams.width > breakpoints.mb'
      class='sidebar__hamburger hamburger hamburger--arrowalt'
      :class='{ "is-active" : !sidebarCollapsed }'
      type='button'
      @click='toggleSidebar()')
      span(class='hamburger-box')
        span(class='hamburger-inner')

    svg(
      v-if='windowParams.width > breakpoints.mb'
      class='sidebar__settings'
      @click='openSettings()'): use(xlink:href='#settings')

    transition(name='settings-reveal' mode='out-in')
      app-settings(v-if='settingsOpened' :sidebarCollapsed='sidebarCollapsed')

    div(
      v-if='windowParams.width > breakpoints.mb'
      class='sidebar__profile'
      :class='{"sidebar__profile--collapsed" : sidebarCollapsed}')
      div(
        class='sidebar__avatar'
        :style='avatarStyles')
      div(class='sidebar__username') {{username}}

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
          class='sidebar__badge badge badge--small') {{totalLength()}}
        span(
          v-else
          class='sidebar__badge badge badge--small') {{categoryLength(route.id)}}

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
      settingsOpened: false,
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

    openSettings() {
      this.settingsOpened = true
    },

    closeSettings() {
      if (this.windowParams.width > this.breakpoints.mb) {
        this.settingsOpened = false
      } else {
        eventBus.$emit('closeSettings')
      }
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
    eventBus.$on('closeSettings', () => {
      this.closeSettings()
    })

    this.handleResize()
    this.collapseSidebar('start')
  }
}
</script>