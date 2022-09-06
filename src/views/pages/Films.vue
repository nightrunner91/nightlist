<template lang='pug'>
  
  section(class='section')

    films-modal(
      :purpose='modalState.purpose'
      v-show='modalState.visibility')

    div(
      class='section__content'
      :class='{"section__content--blured" : modalState.visibility && windowParams.width > breakpoints.mb}')

      div(class='title title--main')
        h1(class='title__name') {{$options.pageTitle}}
        span(class='title__badge badge badge--medium') {{totalFilms}}
        div(
          v-if="allowEdit"
          class='button button--films button--elevated title__button'
          :class='{"button--iconed button--rounded" : windowParams.width <= breakpoints.mb}'
          @click='addSlot()'
          v-ripple)
          svg(class='button__icon'): use(xlink:href='#add')
          span(
            class='button__text'
            v-if='windowParams.width > breakpoints.mb') Add New

      films-search(v-if='totalFilms > 0')

      div(class='dataset' v-if='!searchState')
        films-data(:id='"plan_to_watch"')
        films-data(:id='"completed"')
        films-data(:id='"dropped"')

      app-placeholder(
        v-if='totalFilms == 0'
        :status='placeholderStatus')

</template>

<script>
import { eventBus } from "../../main"

export default {
  name: 'Films',
  pageTitle: 'My Films',
  computed: {
    allowEdit() {
      return this.$store.state.allowEdit
    },
    
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
      this.$store.commit('CHANGE_CONTENT', this.films.default)
      eventBus.$emit('openModal', 'add')
      eventBus.$emit('closeSettings')
    }
  }
}
</script>
