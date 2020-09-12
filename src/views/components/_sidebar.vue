<template lang='pug'>
  aside(class='sidebar')

    div(class='sidebar__profile')
      img(src='img/avatar.png' alt='' class='sidebar__avatar')
      div(class='sidebar__username') 
        span Nightrunner
        i(class='sidebar__share') 

    div(class='sidebar__menu')
      router-link(to='/' class='sidebar__link sidebar__link--dashboard')
        i(class='sidebar__icon sidebar__icon--dashboard')
        span(class='sidebar__name') Dashboard
        span(class='sidebar__badge badge badge--small') 999
      router-link(to='/games' class='sidebar__link')
        i(class='sidebar__icon sidebar__icon--bookmark')
        span(class='sidebar__name') Games
        span(class='sidebar__badge badge badge--small') 124
      router-link(to='/tvshows' class='sidebar__link') 
        i(class='sidebar__icon sidebar__icon--bookmark')
        span TV Shows
        span(class='sidebar__badge badge badge--small') 43
      router-link(to='/films' class='sidebar__link') 
        i(class='sidebar__icon sidebar__icon--bookmark')
        span Films
        span(class='sidebar__badge badge badge--small') 364
      router-link(to='/anime' class='sidebar__link') 
        i(class='sidebar__icon sidebar__icon--bookmark')
        span Anime
        span(class='sidebar__badge badge badge--small') 77
      router-link(to='/books' class='sidebar__link') 
        i(class='sidebar__icon sidebar__icon--bookmark')
        span Books
        span(class='sidebar__badge badge badge--small') 18
      router-link(to='/hardware' class='sidebar__link') 
        i(class='sidebar__icon sidebar__icon--bookmark')
        span Hardware
        span(class='sidebar__badge badge badge--small') 3
</template>

<script>
import avatar from "../../assets/avatar.png"

export default {
  name: 'Sidebar',
  components: [avatar],
  props: {
    prop1: String,
    prop2: Boolean
  },
  data() {
    return {
      foo: 'foo'
    }
  },
  methods: {

  },
  mounted() {
    //console.log(this.prop1, this.prop2);
  }
}
</script>