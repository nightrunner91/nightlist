<template lang='pug'>

  div(id='app' class='page')
    app-gradients(:current='currentPage')
    div(class='page__blur' v-if='modalVisible')
    app-sidebar
    div(v-scrollbar)
      main(class='main main--custom')
        transition(name="fade" mode="out-in")
          router-view

</template>

<script>
import { eventBus } from "./main";

export default {
  name: 'Home',
  data() {
    return {
      foo: 'foo'
    }
  },
  computed: {
    currentPage() {
      let rName = this.$route.name
      if (rName != null) return rName.toLowerCase()
      else return 
    },

    modalVisible() {
      return this.$store.state.modalVisible
    }
  },
  mounted() {

    // how to receive and send events with eventBus

      eventBus.$on('recieve_simpleAction', () => {
        this.foo = 'another foo'
      });

      eventBus.$on('receive_dataAction', data => {
        this.foo1 = data.param1
        this.foo2 = data.param2
      });

      eventBus.$emit('emit_simpleAction');

      eventBus.$emit('emit_dataAction', {
        email: 'email@gmail.com',
        password: 'qwerty'
      });

    // how to trigger mutations in Vuex

      this.$store.commit('setSimpleFoo', 'data');

      this.$store.commit('setManyFoo', {
        param1: 'param1',
        param2: 'param2',
        param3: 'param3'
      });

    // how to trigger actions in Vuex

      this.$store.dispatch('DO_A_THING');

  }
}
</script>

<style lang="sass">
  @import "styles/styles"
</style>
