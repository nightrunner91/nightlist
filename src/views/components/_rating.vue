<template lang='pug'>

  div(class='rating')
    div(class='rating__label') Rating
    div(
      class='rating__body'
      @mouseleave='removeHover()')
      div(class='rating__bar rating__bar--active')
        div(
          v-for='(rating, index) in currentRating'
          v-if='currentHover == undefined'
          class='rating__star--active'
          :class="starClass(rating, index)")
      div(class='rating__bar rating__bar--passive')
        div(
          v-for='(rating, index) in 5'
          class='rating__star--passive'
          :class="starClass(rating, index)"
          @mouseover='setHover(index + 1)'
          @click='setRating(rating)')

</template>

<script>
import { eventBus } from "../../main";

export default {
  name: "Rating",
  props: {
    currentRating: Number
  },
  data() {
    return {
      currentHover: undefined
    };
  },
  computed: {

  },
  methods: {
    setRating(rating) {
      if (this.currentRating != rating) {
        eventBus.$emit('rated', rating);
      } else {
        eventBus.$emit('rated', 0);
      }
    },

    starClass(rating, index) {
      let className= "rating__star ";

      className += 'rating__star--' + (index + 1);

      if (rating > this.currentHover) {
        className += " rating__star--excluded";
      }

      else if (rating <= this.currentHover) {
        className += " rating__star--included";
      }

      return className
    },

    setHover(index) {
      this.currentHover = index
    },

    removeHover() {
      this.currentHover = undefined
    }
  },
  created() {
    
  },
  destroyed() {
    
  }
};
</script>