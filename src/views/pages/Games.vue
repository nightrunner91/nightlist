<template lang='pug'>
  
  section(class='section')

    games-modal(
      :purpose='modalState.purpose'
      v-show='modalState.visibility')

    div(class='section__content')

      div(class='title title--main')
        h1(class='title__name') {{$options.pageTitle}}
        span(class='title__badge badge badge--medium') {{totalGames}}
        div(
          v-if="allowEdit"
          class='button button--games button--elevated title__button'
          :class='{"button--iconed button--rounded" : windowParams.width <= breakpoints.mb}'
          @click='addSlot()'
          v-ripple)
          svg(class='button__icon'): use(xlink:href='#add')
          span(
            class='button__text'
            v-if='windowParams.width > breakpoints.mb') Add New

      games-search(v-if='totalGames > 0')

      div(class='dataset' v-if='!searchState')
        games-data(:id='"currently_playing"')
        games-data(:id='"continuously_playing"')
        games-data(:id='"on_hold"')
        games-data(:id='"plan_to_play"')
        games-data(:id='"completed"')
        games-data(:id='"dropped"')

      app-placeholder(
        v-if='totalGames == 0'
        :status='placeholderStatus')

</template>

<script>
import { eventBus } from "../../main"

export default {
  name: 'Games',
  pageTitle: 'My Games',
  data() {
    return {
      
    }
  },
  computed: {
    allowEdit() {
      return this.$store.state.allowEdit
    },
    
    games() {
      return this.$store.state.games
    },

    windowParams() {
      return this.$store.state.windowParams
    },

    breakpoints() {
      return this.$store.state.breakpoints
    },

    gamesCollection() {
      return this.$store.state.collection.filter(i => i.category == 'games')
    },

    totalGames() {
      return this.gamesCollection.length
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
      this.$store.commit('CHANGE_CONTENT', this.games.default)
      eventBus.$emit('openModal', 'add')
      eventBus.$emit('closeSettings')
    }
  },
  mounted() {
    
  }
}
</script>
