<template lang='pug'>

  div(id='app' class='page')
    app-gradients(:current='currentPage')
    div(class='page__blur' v-if='modalVisible')
    app-sidebar
    div(v-scrollbar)
      main(class='main main--custom')
        transition(name="page" mode="out-in")
          router-view
    app-modal(
      :type='currentPage'
      v-show='modalVisible')

</template>

<script>
import { eventBus } from "./main";

export default {
  name: 'Home',
  data() {
    return {
      
    }
  },
  computed: {
    games()    { return this.$store.state.games },
    tvshows()  { return this.$store.state.tvshows },
    films()    { return this.$store.state.films },
    anime()    { return this.$store.state.anime },
    books()    { return this.$store.state.books },
    hardware() { return this.$store.state.hardware },

    currentPage() {
      let rName = this.$route.name;
      if (rName != null) return rName.toLowerCase();
      else return
    },

    modalVisible() { return this.$store.state.modalVisible }
  },
  methods: {
    showModal() {
      this.$store.commit('changeModalState', true);
      eventBus.$emit('modalOpened');
    },

    closeModal() {
      this.$store.commit('changeModalState', false);
      this.$store.commit('changePayload', this.games.default);
      eventBus.$emit('modalClosed');
    }
  },
  mounted() {
    eventBus.$on('openModal', () => { this.showModal() });
    eventBus.$on('closeModal', () => { this.closeModal() });
  }
}
</script>

<style lang="sass">
  @import "styles/styles"
</style>
