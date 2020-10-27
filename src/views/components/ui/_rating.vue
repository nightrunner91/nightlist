<template lang='pug'>

  div(class='rating')
    div(class='rating__label') Rating
    div(class='rating__body')
      div(
        v-for='(rating, index) in 5'
        class='rating__star'
        :class="starClass(rating, index)"
        @mouseover='setHover(index + 1)'
        @mouseleave='removeHover()'
        @click='setRating(rating)')

</template>

<script>
import { eventBus } from "../../../main"

export default {
  name: "Rating",
  props: {
    currentRating: Number
  },
  data() {
    return {
      currentHover: undefined,
      justRated: false
    }
  },
  computed: {

  },
  methods: {
    setRating(rating) {
      this.justRated = !this.justRated
      
      if (this.currentRating != rating) {
        eventBus.$emit('rated', rating)
      } else {
        eventBus.$emit('rated', 0)
      }
    },

    starClass(rating, index) {
      let className = ''

      className += 'rating__star--' + (index + 1)

      if (rating > this.currentHover) {
        className += " rating__star--excluded"
      }

      else if (rating <= this.currentHover) {
        className += " rating__star--included"
      }

      if (rating <= this.currentRating) {
        className += " rating__star--active"
      }

      if (this.currentHover != undefined && this.justRated == false) {
        className = className.replace('rating__star--active', '')
      }

      return className
    },

    setHover(index) {
      this.currentHover = index
    },

    removeHover() {
      this.currentHover = undefined
      this.justRated = false
    }
  },
  created() {
    
  },
  destroyed() {
    
  }
}
</script>