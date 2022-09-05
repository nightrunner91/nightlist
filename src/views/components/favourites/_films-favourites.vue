<template lang="pug">

  div(class='data')

    //- ===== -//
    //- TITLE -//
    //- ===== -//
    div(class='title title--static')
      svg(
        class='title__icon'
        v-if='windowParams.width > breakpoints.mb'): use(xlink:href='#bookmark-active-films')
      h2(class='title__name') Favourite Films
      span(class='title__badge badge badge--medium') {{favouritesLength}}

    //- ===== -//
    //- CARDS -//
    //- ===== -//
    div(
      ref="plates"
      v-if='favouritesLength > 0'
      class='plates'
      :style=' cardsVisible ? "max-height: 100000px" : ""'
      :class='{ "plates--hidden" : !cardsVisible }')

      div(
        class='grid__col grid__col--lg-6 grid__col--md-6 grid__col--sm-6 grid__col--xs-9 grid__col--mb-12'
        v-for='(card, index) in favouritesData')

        app-card(
          :data='card'
          :type='"films"')

    div(class='expand')
      div(
        v-if='!cardsVisible'
        class='button button--ghosted'
        @click='toggleCards()')
        span(class='button__text') View More
        svg(class='expand__chevron'): use(xlink:href='#chevron')

      div(
        v-else
        class='button button--ghosted'
        @click='viewAll()')
        span(class='button__text') View All Films
        svg(class='expand__chevron rotate-minus-90'): use(xlink:href='#chevron')

    app-placeholder(
      v-if='favouritesLength == 0'
      :status='placeholderStatus')

</template>

<script>
import { eventBus } from "../../../main"

export default {
  name: 'filmsFavourites',
  props: {
    
  },
  data() {
    return {
      criteria: 'title',
      tableVisibilityName: 'favourite_films_' + this.id + '_visible',
      direction: true,
      stashedData: [],
      favouritesData: [],
      cardsVisible: false,
      noTransition: true,
      currentStructure: undefined
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    stashData() {
      this.stashedData = this.filmsFavourites
    },

    sortData(criteria, situation) {
      let result
      let conditionOne
      let conditionTwo

      if (this.criteria == criteria && situation == 'switch') {
        this.direction = !this.direction 
      }

      if (this.criteria != criteria) {
        this.direction = true
      }

      this.criteria = criteria

      if (
        this.criteria == 'title' || 
        this.criteria == 'status') {
        // ascending
        if (this.direction) {
          conditionOne = -1
          conditionTwo = 1
        } 
        // descending
        else {
          conditionOne = 1
          conditionTwo = -1
        }
      }

      if (
        this.criteria == 'favourite' || 
        this.criteria == 'rating' || 
        this.criteria == 'hours') {
        // descending
        if (this.direction) {
          conditionOne = 1
          conditionTwo = -1
        } 
        // ascending
        else {
          conditionOne = -1
          conditionTwo = 1
        }
      }

      result = this.stashedData.sort((a, b) => {
        if (a[criteria] < b[criteria]) { return conditionOne }
        if (a[criteria] > b[criteria]) { return conditionTwo }
        return 0
      })

      this.favouritesData = result
    },

    switchTable(state) {
      if (state) {
        this.cardsVisible = state
      } else {
        this.cardsVisible = !this.cardsVisible
      }
      this.$storage.set(this.tableVisibilityName, { key: this.cardsVisible })
    },

    setDefaultTableState() {
      this.cardsVisible = true
    },

    removeNoTransition() {
      setTimeout(() => { this.noTransition = false }, 300)
    },

    subscribeToChanges() {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type == 'APPLY_SLOT' || mutation.type == 'DELETE_SLOT') {
          this.stashData()
          this.sortData(this.criteria)
        }
      })
    },

    toggleCards() {
      this.cardsVisible = !this.cardsVisible
    },

    viewAll() {
      this.$router.push( { name: 'Films' } )
    },

    statusName(id) {
      return this.$store.state['films'].statuses.filter(i => i.id == id)[0].name
    },

    handleResize() {
      if (this.windowParams.width <= this.breakpoints.sm) {
        this.currentStructure = 'tablets'
      }

      if (this.windowParams.width > this.breakpoints.sm) {
        this.currentStructure = 'desktop'
      }
    },
  },
  computed: {
    films() {
      return this.$store.state.films
    },

    windowParams() {
      return this.$store.state.windowParams
    },

    breakpoints() {
      return this.$store.state.breakpoints
    },

    filmsFavourites() {
      return this.$store.state.collection.filter(i => i.category == 'films' && i.favourite)
    },

    chevronPosition() {
      if (this.direction) return 'table__chevron--ascending'
      else return 'table__chevron--descending'
    },

    favouritesLength() {
      return this.favouritesData.length
    },

    placeholderStatus() {
      return {
        title: 'No favourites yet',
        icon: 'no-data'
      }
    }
  },
  mounted() {
    this.stashData()
    this.sortData(this.criteria, 'default')
    this.removeNoTransition()
    this.subscribeToChanges()
  }
}
</script>