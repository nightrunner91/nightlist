<template lang='pug'>

  div(id='app' class='page')
    app-gradients(:current='currentPage')
    div(class='page__blur' v-if='modalVisible')
    app-sidebar
    div(v-scrollbar)
      main(class='main main--custom')
        transition(name="page" mode="out-in")
          router-view

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
      let rName = this.$route.name
      if (rName != null) return rName.toLowerCase()
      else return 
    },

    modalVisible() { return this.$store.state.modalVisible }
  },
  methods: {
    
  },
  mounted() {
    
  }
}
</script>

<style lang="sass">
  @import "styles/styles"
</style>
