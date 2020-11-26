<template lang='pug'>

  div(
    class='favourite'
    :class='"favourite--" + currentClass')
    div(class='favourite__label') Favourite
    div(
      class='favourite__icon'
      :class='[{"favourite__icon--active" : currentFavourite == true},{"favourite__icon--passive" : currentFavourite == false}]'
      @click='changeFavourite()')

</template>

<script>
import { eventBus } from "../../../main"

export default {
  name: "Favourite",
  props: {
    currentFavourite: Boolean
  },
  data() {
    return {
      
    }
  },
  computed: {
    currentClass() {
      return this.$router.options.routes.filter(i => i.name == this.$route.name)[0].id
    }
  },
  methods: {
    changeFavourite() {
      if (this.currentFavourite) {
        eventBus.$emit('favourite', false)
      } else {
        eventBus.$emit('favourite', true)
      }
    }
  },
  created() {
    
  },
  destroyed() {
    
  }
}
</script>