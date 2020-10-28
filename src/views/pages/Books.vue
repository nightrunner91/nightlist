<template lang='pug'>
  section(class='section')

    div(
      class='section__content'
      :class='{"section__content--blured" : modalState.visibility}')

      div(class='title title--main')
        h1(class='title__name') My Books
        span(class='title__badge badge badge--medium') 53
        div(
          class='button button--games title__button'
          @click='addSlot()'
          v-ripple)
          svg(class='button__icon'): use(xlink:href='#add')
          span(class='button__text') Add New

</template>

<script>
export default {
  name: 'Books',
  computed: {
    books() {return this.$store.state.books},
    modalState() {return this.$store.state.modalState},
  },
}
</script>
