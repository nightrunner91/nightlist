<template lang='pug'>
  
  section(class='section')

    anime-modal(
      :purpose='modalState.purpose'
      v-show='modalState.visibility')

    div(
      class='section__content'
      :class='{"section__content--blured" : modalState.visibility && windowParams.width > breakpoints.mb}')

      div(class='title title--main')
        h1(class='title__name') {{$options.pageTitle}}
        span(class='title__badge badge badge--medium') {{totalAnime}}
        div(
          v-if="allowEdit"
          class='button button--anime button--elevated title__button'
          :class='{"button--iconed button--rounded" : windowParams.width <= breakpoints.mb}'
          @click='addSlot()'
          v-ripple)
          svg(class='button__icon'): use(xlink:href='#add')
          span(
            class='button__text'
            v-if='windowParams.width > breakpoints.mb') Add New

      anime-search(v-if='totalAnime > 0')

      div(class='dataset' v-if='!searchState')
        anime-data(:id='"currently_watching"')
        anime-data(:id='"on_hold"')
        anime-data(:id='"plan_to_watch"')
        anime-data(:id='"completed"')
        anime-data(:id='"dropped"')

      app-placeholder(
        v-if='totalAnime == 0'
        :status='placeholderStatus')

</template>

<script>
import { eventBus } from "../../main"

export default {
  name: 'Anime',
  pageTitle: 'My Anime',
  computed: {
    allowEdit() {
      return this.$store.state.allowEdit
    },
    
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
      this.$store.commit('CHANGE_CONTENT', this.anime.default)
      eventBus.$emit('openModal', 'add')
      eventBus.$emit('closeSettings')
    }
  },
  mounted() {
    
  }
}
</script>
