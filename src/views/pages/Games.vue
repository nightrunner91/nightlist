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
        span(class='title__badge badge badge--medium') {{totalGames()}}
        div(
          class='button button--games title__button'
          @click='addSlot()'
          v-ripple)
          svg(class='button__icon'): use(xlink:href='#add')
          span(class='button__text') Add New

      div(class='search' :class='{"search--active" : searchQuery.length || searchActive}' )
        div(class='input')
          svg(class='input__icon'): use(xlink:href='#search')
          input(class='input__field' type='text' placeholder='Search' v-model='searchQuery' @focus='searchActive = true' @blur='searchActive = false')

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
      searchQuery: '',
      searchActive: false
    };
  },
  computed: {
    games() {
      return this.$store.state.games
    },

    modalState() {
      return this.$store.state.modalState
    }
  },
  methods: {
    totalGames() {
      return this.games.collection.length
    },

    addSlot() {
      this.$store.commit('changePayload', this.games.default);
      eventBus.$emit('openModal', 'add');
    },

    editSlot(id, event) {
      if (event.target.className == 'table__link') return
      else {
        this.$store.commit('changePayload', this.games.collection.filter(i => i.id == id)[0]);
        eventBus.$emit('openModal', 'edit');
      }
    },
  },
  mounted() {
    eventBus.$on('editSlot', data => this.editSlot(data.id, data.event));
  }
}
</script>
