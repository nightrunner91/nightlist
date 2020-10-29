<template lang='pug'>
  
  section(class='section')

    games-modal(
      :purpose='modalState.purpose'
      v-show='modalState.visibility')

    div(
      class='section__content'
      :class='{"section__content--blured" : modalState.visibility}')

      div(class='title title--main')
        h1(class='title__name') My Games
        span(class='title__badge badge badge--medium') {{totalGames}}
        div(
          class='button button--games title__button'
          @click='addSlot()'
          v-ripple)
          svg(class='button__icon'): use(xlink:href='#add')
          span(class='button__text') Add New

      games-search

      div(class='dataset' v-if='!searchState')
        games-data(:id='"currently_playing"')
        games-data(:id='"continuously_playing"')
        games-data(:id='"on_hold"')
        games-data(:id='"completed"')
        games-data(:id='"plan_to_play"')
        games-data(:id='"dropped"')

</template>

<script>
import { eventBus } from "../../main";

export default {
  name: 'Games',
  data() {
    return {
      
    };
  },
  computed: {
    games() {
      return this.$store.state.games
    },

    totalGames() {
      return this.games.collection.length
    },

    modalState() {
      return this.$store.state.modalState
    },

    searchState() {
      return this.$store.state.searchState
    }
  },
  methods: {
    addSlot() {
      this.$store.commit('changePayload', this.games.default);
      eventBus.$emit('openModal', 'add');
    }
  },
  mounted() {
    
  }
}
</script>
