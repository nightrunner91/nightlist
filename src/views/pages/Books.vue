<template lang='pug'>
  section(class='section')

    books-modal(
      :purpose='modalState.purpose'
      v-show='modalState.visibility')

    div(
      class='section__content'
      :class='{"section__content--blured" : modalState.visibility && windowParams.width > breakpoints.mb}')

      div(class='title title--main')
        h1(class='title__name') {{$options.pageTitle}}
        span(class='title__badge badge badge--medium') {{totalBooks}}
        div(
          class='button button--books title__button'
          :class='{"button--iconed button--rounded" : windowParams.width <= breakpoints.mb}'
          @click='addSlot()'
          v-ripple)
          svg(class='button__icon'): use(xlink:href='#add')
          span(
            class='button__text'
            v-if='windowParams.width > breakpoints.mb') Add New

      books-search(v-if='totalBooks > 0')

      div(class='dataset' v-if='!searchState')
        books-data(:id='"currently_reading"')
        books-data(:id='"plan_to_read"')
        books-data(:id='"completed"')
        books-data(:id='"dropped"')

      app-placeholder(
        v-if='totalBooks == 0'
        :status='placeholderStatus')

</template>

<script>
import { eventBus } from "../../main"

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

    searchState() {
      return this.$store.state.searchState
    },

    serverState() {
      return this.$store.state.serverState
    },

    placeholderStatus() {
      return {
        title: 'Collection is empty',
        icon: 'no-data'
      }
    },

    windowParams() {
      return this.$store.state.windowParams
    },

    breakpoints() {
      return this.$store.state.breakpoints
    },
  },
  methods: {
    addSlot() {
      this.$store.commit('CHANGE_CONTENT', this.books.default)
      eventBus.$emit('openModal', 'add')
      eventBus.$emit('closeSettings')
    }
  }
}
</script>
