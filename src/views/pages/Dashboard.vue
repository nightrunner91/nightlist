<template lang='pug'>

  section(class='section')

    div(
      class='section__content'
      :class='{"section__content--blured" : modalState.visibility}')

      div(class='title title--main')
        h1(class='title__name') {{$options.pageTitle}}
        span(class='title__badge badge badge--medium') {{totalLength}}
      
</template>

<script>
export default {
  name: 'Dashboard',
  pageTitle: 'My Dashboard',
  computed: {
    games()    { return this.$store.state.games },
    tvshows()  { return this.$store.state.tvshows },
    films()    { return this.$store.state.films },
    anime()    { return this.$store.state.anime },
    books()    { return this.$store.state.books },

    totalLength() {
      return this.$store.state.collection.length
    },

    modalState() {
      return this.$store.state.modalState
    }
  },
}
</script>
