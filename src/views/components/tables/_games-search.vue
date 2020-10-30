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
          placeholder='Search' 
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
    //- TABLE -//
    //- ===== -//
    div(class='table' v-if='searchQuery.length > 0')

      //- ====== -//
      //- HEADER -//
      //- ====== -//
      div(class='table__header' v-if='searchQuery.length && resultsLength > 0')

        //- ORDER
        div(class='table__cell grid__col grid__col--lg-1')
        
        //- TITLE
        div(
          class='table__cell table__cell--functional grid__col grid__col--lg-16'
          :class='{"table__cell--active" : criteria == "title"}'
          @click='sortData("title", "switch")')
          span Title
          svg(
            v-if='criteria == "title"'
            class='table__chevron' 
            :class='chevronPosition'): use(xlink:href='#chevron-down')

        //- STATUS
        div(
          class='table__cell table__cell--functional grid__col grid__col--lg-3'
          :class='{"table__cell--active" : criteria == "statusId"}'
          @click='sortData("statusId", "switch")')
          span Status
          svg(
            v-if='criteria == "statusId"'
            class='table__chevron' 
            :class='chevronPosition'): use(xlink:href='#chevron-down')
        
        //- FAVOURITE
        div(
          class='table__cell table__cell--functional grid__col grid__col--lg-3'
          :class='{"table__cell--active" : criteria == "favourite"}'
          @click='sortData("favourite", "switch")')
          span Favourite
          svg(
            v-if='criteria == "favourite"'
            class='table__chevron' 
            :class='chevronPosition'): use(xlink:href='#chevron-down')
        
        //- RATING
        div(
          class='table__cell table__cell--functional grid__col grid__col--lg-6'
          :class='{"table__cell--active" : criteria == "rating"}'
          @click='sortData("rating", "switch")')
          span Rating
          svg(
            v-if='criteria == "rating"'
            class='table__chevron' 
            :class='chevronPosition'): use(xlink:href='#chevron-down')
        
        //- HOURS
        div(
          class='table__cell table__cell--functional grid__col grid__col--lg-4'
          :class='{"table__cell--active" : criteria == "hours"}'
          @click='sortData("hours", "switch")')
          span Hours played
          svg(
            v-if='criteria == "hours"'
            class='table__chevron' 
            :class='chevronPosition'): use(xlink:href='#chevron-down')
        
        //- PLATFORM
        div(
          class='table__cell table__cell--functional grid__col grid__col--lg-3 grid__col--right'
          :class='{"table__cell--active" : criteria == "platform"}'
          @click='sortData("platform", "switch")')
          span Platform
          svg(
            v-if='criteria == "platform"'
            class='table__chevron' 
            :class='chevronPosition'): use(xlink:href='#chevron-down')

      //- BODY
      div(class='table__body')
        div(
          class='table__item' 
          ref='tableItem'
          :key='item.title'
          :class='{"table__item--refreshed" : item.refreshed }'
          v-for='(item, index) in searchedData'
          @click='editSlot(item.id, $event)')
          
          //- ORDER
          div(class='table__cell grid__col grid__col--lg-1') {{index + 1}}
          
          //- TITLE
          div(class='table__cell grid__col grid__col--lg-16')
            span {{item.title}}
            a(
              :ref='"redirect"'
              rel='nofollow'
              :href='item.link'
              target='_blank"'
              class='table__link'
              v-if='item.link.length')
              svg(class='table__redirect'): use(xlink:href='#link')

          //- STATUS
          div(
            class='table__cell grid__col grid__col--lg-3')
            svg(
              class='table__status'
              v-tooltip='{ content: item.status, offset: 5}'): use(:xlink:href="require('@/assets/sprite.svg')+ '#' + item.statusId")
          
          //- FAVOURITE
          div(
            class='table__cell grid__col grid__col--lg-3')
            svg(class='table__favourite' v-if='item.favourite'): use(xlink:href='#favourite')
          
          //- RATING
          div(
            class='table__cell grid__col grid__col--lg-6')
            div(class='table__rating')
              svg(
                class='table__star table__star--active' 
                :class='"table__star--" + (index + 1)'
                v-for='(star, index) in item.rating'): use(xlink:href='#star-active-w')
              svg(
                class='table__star table__star--passive' 
                :class='"table__star--" + (index + 1)'
                v-for='(rating, index) in 5'): use(xlink:href='#star-passive-w')
          
          //- HOURS
          div(
            class='table__cell grid__col grid__col--lg-4')
            svg(class='table__tilda' v-if='item.hoursApproximate'): use(xlink:href='#tilda')
            span(v-if='item.hours != undefined') {{item.hours}}
          
          //- PLATFORM
          div(class='table__cell grid__col grid__col--lg-3 grid__col--right')
            svg(class='table__platform'): use(:xlink:href="require('@/assets/sprite.svg')+ '#' + item.platformId")

    app-placeholder(
      v-if='searchQuery.length && resultsLength == 0'
      :text='"Nothing found"'
      :icon='"no-search"')

</template>

<script>
import { eventBus } from "../../../main"

export default {
  name: 'gamesSearch',
  props: {
    
  },
  data() {
    return {
      searchQuery: '',
      searchActive: false,
      criteria: 'title',
      direction: true,
      stashedData: [],
      searchedData: []
    }
  },
  methods: {
    stashData() {
      this.stashedData = this.gamesCollection
    },

    searchData() {
      this.searchedData = this.stashedData.filter(i => {
        return i.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      })

      this.sortData(this.criteria)
      
      if (this.searchQuery.length > 0) {
        this.$store.commit('changeSearchState', true)
      } else {
        this.$store.commit('changeSearchState', false)
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
        this.criteria == 'statusId') {
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
        if (mutation.type == 'applySlot' || mutation.type == 'deleteSlot') {
          this.stashData()
          this.searchData()
          this.sortData(this.criteria)
        }
      })
    },

    editSlot(id, event) {
      if (event.target.className == 'table__link') return
      else {
        this.$store.commit('changePayload', this.gamesCollection.filter(i => i.id == id)[0])
        eventBus.$emit('openModal', 'edit')
      }
    }
  },
  computed: {
    games() {
      return this.$store.state.games
    },

    gamesCollection() {
      return this.$store.state.collection.filter(i => i.category == 'games')
    },

    chevronPosition() {
      if (this.direction) return 'table__chevron--ascending'
      else return 'table__chevron--descending'
    },

    resultsLength() {
      return this.searchedData.length
    }
  },
  mounted() {
    this.stashData()
    this.sortData(this.criteria, 'default')
    this.subscribeToChanges()
  }
}
</script>