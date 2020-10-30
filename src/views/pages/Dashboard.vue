<template lang='pug'>

  section(class='section')

    div(
      class='section__content'
      :class='{"section__content--blured" : modalState.visibility}')

      div(class='title title--main')
        h1(class='title__name') {{$options.name}}
      
</template>

<script>
export default {
  name: 'Dashboard',
  computed: {
    games()    { return this.$store.state.games },
    tvshows()  { return this.$store.state.tvshows },
    films()    { return this.$store.state.films },
    anime()    { return this.$store.state.anime },
    books()    { return this.$store.state.books },

    modalState() {
      return this.$store.state.modalState
    }
  },
}
</script>
