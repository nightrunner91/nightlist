<template lang='pug'>

  div(class='favourite')
    div(class='favourite__label') Favourite
    div(
      class='favourite__icon'
      :class='[{"favourite__icon--active" : isFavourite == true},{"favourite__icon--passive" : isFavourite == false}]'
      @click='isFavourite = !isFavourite')

</template>

<script>
import { eventBus } from "../../main";

export default {
  name: "Favourite",
  props: {
    currentFavourite: false
  },
  data() {
    return {
      isFavourite: false
    };
  },
  computed: {

  },
  methods: {
    changeFavourite() {
      
    }
  },
  created() {
    
  },
  destroyed() {
    
  }
};
</script>