<template lang='pug'>
  section(class='section')

    div(
      class='section__content'
      :class='{"section__content--blured" : modalState.visibility}')

      div(class='title title--main')
        h1(class='title__name') {{$options.pageTitle}}
        span(class='title__badge badge badge--medium') {{totalBooks}}
        div(
          v-if='serverState.status == "success"'
          class='button button--books title__button'
          @click='addSlot()'
          v-ripple)
          svg(class='button__icon'): use(xlink:href='#add')
          span(class='button__text') Add New

      app-placeholder(
        v-if='totalBooks == 0'
        :status='placeholderStatus')

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

    serverState() {
      return this.$store.state.serverState
    },

    placeholderStatus() {
      let data = {
        title: undefined,
        icon: undefined
      }

      switch (this.serverState.status) {
        case undefined: {
          data.title = 'Collection is empty'
          data.icon = 'no-data'
          break
        }

        case 'loading': {
          data.title = 'Loading your collection...'
          data.icon = 'loading'
          break
        }

        case 'error': {
          data.title = 'Oops! Something went wrong'
          data.icon = 'error'
          break
        }

        default: {
          data.title = 'Collection is empty'
          data.icon = 'no-data'
        }
      }

      return data
    }
  },
}
</script>
