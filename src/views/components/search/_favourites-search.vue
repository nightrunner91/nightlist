<template lang="pug">

  div(class='data')

    //- ====== -//
    //- SEARCH -//
    //- ====== -//
    div(
      class='search' 
      :class='{"search--active" : searchQuery.length || searchActive}' )
      div(class='input')
        svg(class='input__icon'): use(xlink:href='#search')
        input(
          class='input__field' 
          type='text' 
          placeholder='Search in my favourites...' 
          v-model='searchQuery'
          @input='searchData()'
          @focus='searchActive = true' 
          @blur='searchActive = false')

    //- ===== -//
    //- TITLE -//
    //- ===== -//
    div(class='title title--secondary title--inactive' v-if='searchQuery.length')
      h2(class='title__name') Search results
      span(class='title__badge badge badge--medium') {{resultsLength}}

    //- ===== -//
    //- CARDS -//
    //- ===== -//
    div(
      ref="plates"
      v-if='searchQuery.length > 0'
      class='plates'
      :class='{ "plates--hidden" : !cardsVisible }')

      div(
        class='grid__col grid__col--lg-6 grid__col--md-6 grid__col--sm-6 grid__col--xs-9 grid__col--mb-12'
        v-for='(card, index) in searchedData')

        app-card(
          :data='card'
          :type='card.category')

    app-placeholder(
      v-if='searchQuery.length && resultsLength == 0'
      :status='placeholderStatus')

</template>

<script>
import { eventBus } from "../../../main"

export default {
  name: 'favouritesSearch',
  props: {
    
  },
  data() {
    return {
      searchQuery: '',
      searchActive: false,
      criteria: 'title',
      direction: true,
      stashedData: [],
      cardsVisible: true,
      searchedData: [],
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
      this.stashedData = this.favouritesCollection
    },

    searchData() {
      this.searchedData = this.stashedData.filter(i => {
        return i.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      })

      this.sortData(this.criteria)
      
      if (this.searchQuery.length > 0) {
        this.$store.commit('CHANGE_SEARCH_STATE', true)
      } else {
        this.$store.commit('CHANGE_SEARCH_STATE', false)
      }
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

      result = this.searchedData.sort((a, b) => {
        if (a[criteria] < b[criteria]) { return conditionOne }
        if (a[criteria] > b[criteria]) { return conditionTwo }
        return 0
      })

      this.searchedData = result
    },

    subscribeToChanges() {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type == 'APPLY_SLOT' || mutation.type == 'DELETE_SLOT') {
          this.stashData()
          this.searchData()
          this.sortData(this.criteria)
        }
      })
    },

    editSlot(id, event) {
      if (event.target.className == 'slot__link') return
      else {
        this.$store.commit('CHANGE_CONTENT', this.favouritesCollection.filter(i => i.id == id)[0])
        eventBus.$emit('openModal', 'edit')
      }
    },

    statusName(id) {
      return this.$store.state['games'].statuses.filter(i => i.id == id)[0].name
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
    windowParams() {
      return this.$store.state.windowParams
    },

    breakpoints() {
      return this.$store.state.breakpoints
    },

    favouritesCollection() {
      return this.$store.state.collection.filter(i => i.favourite)
    },

    chevronPosition() {
      if (this.direction) return 'table__chevron--ascending'
      else return 'table__chevron--descending'
    },

    resultsLength() {
      return this.searchedData.length
    },

    placeholderStatus() {
      return {
        title: 'Nothing found',
        icon: 'no-search'
      }
    }
  },
  mounted() {
    this.stashData()
    this.sortData(this.criteria, 'default')
    this.subscribeToChanges()
  }
}
</script>