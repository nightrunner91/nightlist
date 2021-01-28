<template lang='pug'>

  div(
    class='progress'
    :class='{"progress--completed" : total == viewed }'
    v-tooltip='{ content: "Watched " + viewed + " of " + total + " seasons", offset: 5}')
    div(class='progress__bar')
      div(
        class='progress__item progress__item--total' 
        v-for='season in total'
        :style="'width: ' + 100 / total + '%'")
    div(class='progress__bar')
      div(
        class='progress__item progress__item--watched' 
        :class='{"progress__item--first-only" : total == viewed == 1}'
        v-for='season in viewed'
        :style="'width: ' + 100 / total + '%'")
    div(class='progress__percentage') {{progress}}%

</template>

<script>
export default {
  name: "Progress",
  props: {
    viewed: Number,
    total: Number,
    progress: Number
  },
  data() {
    return {
      
    }
  },
  computed: {
    
  },
  methods: {
    
  },
  created() {
    
  },
  destroyed() {
    
  }
}
</script>