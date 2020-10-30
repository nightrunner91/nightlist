<template lang='pug'>
  section(class='section')

    div(
      class='section__content'
      :class='{"section__content--blured" : modalState.visibility}')

      div(class='title title--main')
        h1(class='title__name') My {{$options.name}}
        span(class='title__badge badge badge--medium') {{totalFilms}}
        div(
          class='button button--films title__button'
          @click='addSlot()'
          v-ripple)
          svg(class='button__icon'): use(xlink:href='#add')
          span(class='button__text') Add New

      app-placeholder(
        v-if='totalFilms == 0'
        :text='"No data"'
        :icon='"no-data"')

</template>

<script>
export default {
  name: 'Films',
  computed: {
    films() {
      return this.$store.state.films
    },

    filmsCollection() {
      return this.$store.state.collection.filter(i => i.category == 'films')
    },

    totalFilms() {
      return this.filmsCollection.length
    },

    modalState() {
      return this.$store.state.modalState
    },
  },
}
</script>
