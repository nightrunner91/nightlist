<template lang='pug'>
  section(class='section')

    div(
      class='section__content'
      :class='{"section__content--blured" : modalState.visibility}')

      div(class='title title--main')
        h1(class='title__name') My Films
        span(class='title__badge badge badge--medium') 150
        div(
          class='button button--games title__button'
          @click='addSlot()'
          v-ripple)
          svg(class='button__icon'): use(xlink:href='#add')
          span(class='button__text') Add New

      div(class='search')
        div(class='input')
          svg(class='input__icon'): use(xlink:href='#search')
          input(class='input__field' type='text' placeholder='Search')

</template>

<script>
export default {
  name: 'Films',
  computed: {
    films() {return this.$store.state.films},
    modalState() {return this.$store.state.modalState},
  },
}
</script>
