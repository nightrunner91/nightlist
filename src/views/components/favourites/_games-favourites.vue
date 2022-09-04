<template lang="pug">

  div(class='data')

    //- ===== -//
    //- TITLE -//
    //- ===== -//
    div(
      class='title title--secondary'
      @click='switchTable()')
      svg(
        class='title__icon'
        v-if='windowParams.width > breakpoints.mb'): use(xlink:href='#bookmark-active-games')
      h2(class='title__name') Favourite Games
      span(class='title__badge badge badge--medium') {{favouritesLength}}
      svg(
        class='title__chevron'
        :class='[{"title__chevron--closed" : !cardsVisible}, {"title__chevron--notransition" : noTransition}]'): use(xlink:href='#chevron')

    //- ===== -//
    //- CARDS -//
    //- ===== -//
    div(
      ref="plates"
      v-if='favouritesLength > 0'
      class='plates'
      :class='{ "plates--hidden" : !cardsVisible }')

      div(
        class='grid__col grid__col--lg-6 grid__col--md-6 grid__col--sm-6 grid__col--xs-9 grid__col--mb-12'
        v-for='(card, index) in favouritesData')

        app-card(
          :data='card'
          :type='"games"')

    app-placeholder(
      v-if='favouritesLength == 0'
      :status='placeholderStatus')

</template>

<script>
export default {
  name: 'gamesFavourites',
  props: {
    
  },
  data() {
    return {
      criteria: 'title',
      tableVisibilityName: 'favourite_games_' + this.id + '_visible',
      direction: true,
      stashedData: [],
      favouritesData: [],
      cardsVisible: true,
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
      this.stashedData = this.gamesFavourites
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
        this.criteria == 'platform' ||
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

    statusName(id) {
      return this.$store.state['games'].statuses.filter(i => i.id == id)[0].name
    },

    setPlatesHeight() {
      this.$nextTick(() => {
        let target = this.$refs.plates
        let height = target.clientHeight

        target.style = `max-height: ${height}px`
      })
    },

    handleResize() {
      if (this.windowParams.width <= this.breakpoints.sm) {
        this.currentStructure = 'tablets'
      }

      if (this.windowParams.width > this.breakpoints.sm) {
        this.currentStructure = 'desktop'
      }
    }
  },
  computed: {
    games() {
      return this.$store.state.games
    },

    windowParams() {
      return this.$store.state.windowParams
    },

    breakpoints() {
      return this.$store.state.breakpoints
    },

    gamesFavourites() {
      return this.$store.state.collection.filter(i => i.category == 'games' && i.favourite)
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
    this.setPlatesHeight()
  }
}
</script>