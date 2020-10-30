<template lang='pug'>
  
  aside(
    class='sidebar'
    :class='{"sidebar--blured" : modalState.visibility}')

    div(class='sidebar__profile')
      img(src='img/avatar.png' class='sidebar__avatar' alt='')
      div(class='sidebar__username')
        span Nightrunner
        svg(class='sidebar__share'): use(xlink:href='#share')

    div(class='sidebar__menu')
      router-link(
        v-for='route in routes'
        v-if='route.mainMenu'
        :to='route.path'
        class='sidebar__link'
        :key='route.id')
        div(
          class='sidebar__icon'
          v-if='route.id == "dashboard"')
          svg(class='sidebar__bookmark sidebar__bookmark--passive'): use(xlink:href='#dashboard-passive')
          svg(class='sidebar__bookmark sidebar__bookmark--active'): use(xlink:href='#dashboard-active')
        div(
          class='sidebar__icon'
          v-else)
          svg(class='sidebar__bookmark sidebar__bookmark--passive'): use(xlink:href='#bookmark-passive')
          svg(class='sidebar__bookmark sidebar__bookmark--active'): use(xlink:href='#bookmark-active')
        span(class='sidebar__name') {{route.name}}
        span(
          v-if='route.id == "dashboard"'
          class='sidebar__badge badge badge--small') {{totalLength()}}
        span(
          v-else
          class='sidebar__badge badge badge--small') {{categoryLength(route.id)}}

</template>

<script>
import "../../../assets/avatar.png"

export default {
  name: 'Sidebar',
  props: {
    
  },
  data() {
    return {
      
    }
  },
  computed: {
    modalState() {
      return this.$store.state.modalState
    },

    routes() {
      return this.$router.options.routes
    }
  },
  methods: {
    categoryLength(id) {
      return this.$store.state.collection.filter(i => i.category == id).length
    },

    totalLength() {
      return this.$store.state.collection.length
    }
  },
  mounted() {
    
  }
}
</script>