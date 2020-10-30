<template lang='pug'>
  section(class='section')

    div(
      class='section__content'
      :class='{"section__content--blured" : modalState.visibility}')

      div(class='title title--main')
        h1(class='title__name') {{$options.pageTitle}}
        span(class='title__badge badge badge--medium') {{totalBooks}}
        div(
          class='button button--books title__button'
          @click='addSlot()'
          v-ripple)
          svg(class='button__icon'): use(xlink:href='#add')
          span(class='button__text') Add New

      app-placeholder(
        v-if='totalBooks == 0'
        :text='"No data"'
        :icon='"no-data"')

</template>

<script>
export default {
  name: 'Books',
  pageTitle: 'My Books',
  computed: {
    books() {
      return this.$store.state.books
    },

    booksCollection() {
      return this.$store.state.collection.filter(i => i.category == 'books')
    },

    totalBooks() {
      return this.booksCollection.length
    },

    modalState() {
      return this.$store.state.modalState
    },
  },
}
</script>
