<template lang='pug'>

  div(
    class='progress'
    v-tooltip='{ content: tooltipText, offset: 5}')
    div(class='progress__bar')
      div(
        class='progress__item progress__item--total' 
        v-for='season in totalSeasons'
        :style="'width: ' + 100 / totalSeasons + '%'")
    div(class='progress__bar')
      div(
        class='progress__item progress__item--watched' 
        :class='{"progress__item--not-last" : totalSeasons > viewedSeasons}'
        v-for='season in viewedSeasons'
        :style="'width: ' + 100 / totalSeasons + '%'")
      div(
        class='progress__item progress__item--in-progress'
        v-if='seasonInProgress'
        :style="'width: ' + 100 / totalSeasons + '%'")
    div(class='progress__percentage') 
      svg(
        v-if='seasonInProgress'
        class='progress__more'): use(xlink:href='#chevron')
      span {{progress}}%

</template>

<script>
export default {
  name: "Progress",
  props: {
    viewedSeasons: Number,
    totalSeasons: Number,
    currentSeason: Number,
    currentEpisode: Number,
    progress: Number
  },
  data() {
    return {
      
    }
  },
  computed: {
    seasonInProgress() {
      if (this.currentSeason > this.viewedSeasons && this.currentEpisode > 0) {
        return true
      } 
      return false
    },

    tooltipText() {
      if (this.seasonInProgress) {
        return 'Started to watch season ' + this.currentSeason + ' of ' + this.totalSeasons
      } 
      
      else if (this.viewedSeasons <= this.totalSeasons && this.viewedSeasons > 0) {
        return 'Completely watched ' + this.viewedSeasons + ' of ' + this.totalSeasons + ' seasons'
      }

      else if (this.viewedSeasons == 0) {
        return "Haven't started watching yet"
      }
    }
  },
  methods: {
    
  },
  created() {
    
  },
  destroyed() {
    
  }
}
</script>