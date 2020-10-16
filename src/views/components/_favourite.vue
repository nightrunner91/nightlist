<template lang='pug'>

  div(class='favourite')
    div(class='favourite__label') Favourite
    div(
      class='favourite__icon'
      :class='[{"favourite__icon--active" : currentFavourite == true},{"favourite__icon--passive" : currentFavourite == false}]'
      @click='currentFavourite = !currentFavourite')

</template>

<script>
import { eventBus } from "../../main";

export default {
  name: "Favourite",
  props: {
    currentFavourite: Boolean
  },
  data() {
    return {
      
    };
  },
  computed: {

  },
  methods: {
    changeFavourite() {
      this.currentFavourite = !this.currentFavourite
    }
  },
  created() {
    
  },
  destroyed() {
    
  }
};
</script>