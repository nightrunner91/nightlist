<template lang='pug'>
  
  aside(
    class='sidebar'
    :class='{"sidebar--blured" : modalState.visibility}')

    div(class='sidebar__profile')
      img(src='img/avatar.png' alt='' class='sidebar__avatar')
      div(class='sidebar__username') 
        span Nightrunner
        svg(class='sidebar__share'): use(xlink:href='#share')

    div(class='sidebar__menu')
      router-link(to='/dashboard' class='sidebar__link sidebar__link--dashboard')
        div(class='sidebar__icon')
          svg(class='sidebar__bookmark sidebar__bookmark--passive'): use(xlink:href='#bookmark-passive')
          svg(class='sidebar__bookmark sidebar__bookmark--active'): use(xlink:href='#bookmark-active')
        span(class='sidebar__name') Dashboard
        span(class='sidebar__badge badge badge--small') 999
      router-link(to='/games' class='sidebar__link')
        div(class='sidebar__icon')
          svg(class='sidebar__bookmark sidebar__bookmark--passive'): use(xlink:href='#bookmark-passive')
          svg(class='sidebar__bookmark sidebar__bookmark--active'): use(xlink:href='#bookmark-active')
        span(class='sidebar__name') Games
        span(class='sidebar__badge badge badge--small') 124
      router-link(to='/tvshows' class='sidebar__link') 
        div(class='sidebar__icon')
          svg(class='sidebar__bookmark sidebar__bookmark--passive'): use(xlink:href='#bookmark-passive')
          svg(class='sidebar__bookmark sidebar__bookmark--active'): use(xlink:href='#bookmark-active')
        span TV Shows
        span(class='sidebar__badge badge badge--small') 43
      router-link(to='/films' class='sidebar__link') 
        div(class='sidebar__icon')
          svg(class='sidebar__bookmark sidebar__bookmark--passive'): use(xlink:href='#bookmark-passive')
          svg(class='sidebar__bookmark sidebar__bookmark--active'): use(xlink:href='#bookmark-active')
        span Films
        span(class='sidebar__badge badge badge--small') 364
      router-link(to='/anime' class='sidebar__link') 
        div(class='sidebar__icon')
          svg(class='sidebar__bookmark sidebar__bookmark--passive'): use(xlink:href='#bookmark-passive')
          svg(class='sidebar__bookmark sidebar__bookmark--active'): use(xlink:href='#bookmark-active')
        span Anime
        span(class='sidebar__badge badge badge--small') 77
      router-link(to='/books' class='sidebar__link') 
        div(class='sidebar__icon')
          svg(class='sidebar__bookmark sidebar__bookmark--passive'): use(xlink:href='#bookmark-passive')
          svg(class='sidebar__bookmark sidebar__bookmark--active'): use(xlink:href='#bookmark-active')
        span Books
        span(class='sidebar__badge badge badge--small') 18
      router-link(to='/hardware' class='sidebar__link') 
        div(class='sidebar__icon')
          svg(class='sidebar__bookmark sidebar__bookmark--passive'): use(xlink:href='#bookmark-passive')
          svg(class='sidebar__bookmark sidebar__bookmark--active'): use(xlink:href='#bookmark-active')
        span Hardware
        span(class='sidebar__badge badge badge--small') 3
</template>

<script>
import "../../../assets/avatar.png"

export default {
  name: 'Sidebar',
  props: {
    prop1: String,
    prop2: Boolean
  },
  data() {
    return {
      foo: 'foo'
    }
  },
  computed: {
    modalState() {return this.$store.state.modalState}
  },
  methods: {

  },
  mounted() {
    //console.log(this.prop1, this.prop2);
  }
}
</script>