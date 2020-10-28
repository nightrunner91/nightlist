<template lang='pug'>
  
  section(class='section')

    modal-games(
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

      table-games-search

      div(class='dataset' v-if='!searchState')
        table-games(:id='"currently_playing"')
        table-games(:id='"completed"')
        table-games(:id='"plan_to_play"')
        table-games(:id='"dropped"')

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
