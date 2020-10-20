<template lang='pug'>

  div(
    id='app'
    class='page')

    app-gradients(:current='currentPage')

    app-sidebar()

    main(
      class='content' 
      v-scrollbar)

      div(class='content__inner')

        transition(
          name='page'
          mode='out-in')
          
          router-view

    app-modal(
      :type='currentPage'
      :purpose='modalState.purpose'
      v-show='modalState.visibility')

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
    currentPage() {
      let rName = this.$route.name;
      if (rName != null) return rName.toLowerCase();
      else return
    },

    modalState()   { return this.$store.state.modalState }
  },
  methods: {
    openModal(purpose) {
      this.$store.commit('changeModalState', {
        visibility: true,
        purpose: purpose
      });
      eventBus.$emit('modalOpened');
    },

    closeModal() {
      this.$store.commit('changeModalState', {
        visibility: false
      });
      eventBus.$emit('modalClosed');
    },

    setDefaultPayload() {
      this.$store.commit('changePayload', this.$store.state[this.currentPage].default);
    }
  },
  mounted() {
    eventBus.$on('openModal',  purpose => this.openModal(purpose));
    eventBus.$on('closeModal', () => { 
      this.closeModal();
      this.setDefaultPayload();
    });
  }
}
</script>

<style lang="sass">
  @import "styles/styles"
</style>
