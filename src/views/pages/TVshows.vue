<template lang='pug'>
  
  section(class='section')

    tvshows-modal(
      :purpose='modalState.purpose'
      v-show='modalState.visibility')

    div(
      class='section__content'
      :class='{"section__content--blured" : modalState.visibility && windowParams.width > breakpoints.mb}')

      div(class='title title--main')
        h1(class='title__name') {{$options.pageTitle}}
        span(class='title__badge badge badge--medium') {{totalTvshows}}
        div(
          class='button button--tvshows title__button'
          :class='{"button--iconed button--rounded" : windowParams.width <= breakpoints.mb}'
          @click='addSlot()'
          v-ripple)
          svg(class='button__icon'): use(xlink:href='#add')
          span(
            class='button__text'
            v-if='windowParams.width > breakpoints.mb') Add New

      games-search(v-if='totalTvshows > 0')

      div(class='dataset' v-if='!searchState')
        tvshows-data(:id='"currently_watching"')
        tvshows-data(:id='"on_hold"')
        tvshows-data(:id='"plan_to_watch"')
        tvshows-data(:id='"completed"')
        tvshows-data(:id='"dropped"')

      app-placeholder(
        v-if='totalTvshows == 0'
        :status='placeholderStatus')

</template>

<script>
import { eventBus } from "../../main"

export default {
  name: 'TVShows',
  pageTitle: 'My TV Shows',
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
      this.$store.commit('CHANGE_CONTENT', this.tvshows.default)
      eventBus.$emit('openModal', 'add')
      eventBus.$emit('closeSettings')
    }
  },
  mounted() {
    
  }
}
</script>
