<template lang='pug'>
  section(class='section')

    div(
      class='section__content'
      :class='{"section__content--blured" : modalState.visibility}')

      div(class='title title--main')
        h1(class='title__name') {{$options.pageTitle}}
        span(class='title__badge badge badge--medium') {{totalAnime}}
        div(
          class='button button--anime title__button'
          @click='addSlot()'
          v-ripple)
          svg(class='button__icon'): use(xlink:href='#add')
          span(class='button__text') Add New

      app-placeholder(
        v-if='totalAnime == 0'
        :text='"No data"'
        :icon='"no-data"')

</template>

<script>
export default {
  name: 'Anime',
  pageTitle: 'My Anime',
  computed: {
    anime() {
      return this.$store.state.anime
    },

    animeCollection() {
      return this.$store.state.collection.filter(i => i.category == 'anime')
    },

    totalAnime() {
      return this.animeCollection.length
    },

    modalState() {
      return this.$store.state.modalState
    },
  },
}
</script>
