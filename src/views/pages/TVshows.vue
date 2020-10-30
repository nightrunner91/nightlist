<template lang='pug'>
  section(class='section')

    div(
      class='section__content'
      :class='{"section__content--blured" : modalState.visibility}')

      div(class='title title--main')
        h1(class='title__name') My {{$options.name}}
        span(class='title__badge badge badge--medium') {{totalTvshows}}
        div(
          class='button button--tvshows title__button'
          @click='addSlot()'
          v-ripple)
          svg(class='button__icon'): use(xlink:href='#add')
          span(class='button__text') Add New

      app-placeholder(
        v-if='totalTvshows == 0'
        :text='"No data"'
        :icon='"no-data"')

</template>

<script>
export default {
  name: 'TV Shows',
  computed: {
    tvshows() {
      return this.$store.state.tvshows
    },

    tvshowsCollection() {
      return this.$store.state.collection.filter(i => i.category == 'tvshows')
    },

    totalTvshows() {
      return this.tvshowsCollection.length
    },

    modalState() {
      return this.$store.state.modalState
    },
  },
}
</script>
