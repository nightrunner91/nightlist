<template lang='pug'>
  
  aside(
    class='sidebar'
    :class='[{"sidebar--blured" : modalState.visibility}, {"sidebar--collapsed" : sidebarCollapsed}, {"sidebar--opened" : !sidebarCollapsed}, {"sidebar--notransition" : noTransition}]')

    button(
      class='sidebar__hamburger hamburger hamburger--arrowalt'
      :class='{ "is-active" : !sidebarCollapsed }'
      type='button'
      @click='toggleSidebar()')
      span(class='hamburger-box')
        span(class='hamburger-inner')

    div(class='sidebar__menu')
      router-link(
        v-for='route in routes'
        v-if='route.mainMenu'
        :to='route.path'
        class='sidebar__link'
        @click.native='collapseSidebar()'
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
      sidebarCollapsed: true,
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
      this.collapseSidebar()
    },

    collapseSidebar() {
      this.sidebarCollapsed = true
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
  },
  mounted() {
    eventBus.$on('openSettings', () => {
      this.openSettings()
    })

    this.handleResize()
  }
}
</script>