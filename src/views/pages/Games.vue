<template lang='pug'>
  
  section(class='section')

    games-modal(
      :purpose='modalState.purpose'
      v-show='modalState.visibility')

    div(
      class='section__content'
      :class='{"section__content--blured" : modalState.visibility}')

      div(class='title title--main')
        h1(class='title__name') {{$options.pageTitle}}
        span(class='title__badge badge badge--medium') {{totalGames}}
        div(
          v-if='serverState.status != "error"'
          class='button button--games title__button'
          @click='addSlot()'
          v-ripple)
          svg(class='button__icon'): use(xlink:href='#add')
          span(class='button__text') Add New

      games-search(v-if='totalGames > 0')

      div(class='dataset' v-if='!searchState')
        games-data(:id='"currently_playing"')
        games-data(:id='"continuously_playing"')
        games-data(:id='"on_hold"')
        games-data(:id='"completed"')
        games-data(:id='"plan_to_play"')
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
    games() {
      return this.$store.state.games
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
  methods: {
    addSlot() {
      this.$store.commit('CHANGE_CONTENT', this.games.default)
      eventBus.$emit('openModal', 'add')
    }
  },
  mounted() {
    
  }
}
</script>
