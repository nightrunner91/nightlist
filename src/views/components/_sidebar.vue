<template lang='pug'>
  aside(class='sidebar')
    router-link(to='/games' class='sidebar__link')
      i(class='sidebar__icon')
      span Games
    router-link(to='/tvshows' class='sidebar__link') 
      i(class='sidebar__icon')
      span TV Shows
    router-link(to='/films' class='sidebar__link') 
      i(class='sidebar__icon')
      span Films
    router-link(to='/anime' class='sidebar__link') 
      i(class='sidebar__icon')
      span Anime
    router-link(to='/books' class='sidebar__link') 
      i(class='sidebar__icon')
      span Books
    router-link(to='/hardware' class='sidebar__link') 
      i(class='sidebar__icon')
      span Hardware
</template>

<script>
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
  methods: {

  },
  mounted() {
    //console.log(this.prop1, this.prop2);
  }
}
</script>