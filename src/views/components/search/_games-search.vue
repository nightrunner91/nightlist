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
    div(
      class='table' 
      v-if='searchQuery.length > 0')

      //- ====== -//
      //- HEADER -//
      //- ====== -//
      
      //- DESKTOP -//
      div(
        class='table__header'
        v-if='currentStructure == "desktop" && searchQuery.length > 0 && resultsLength > 0')

        //- ORDER
        div(class='slot__cell grid__col grid__col--lg-1 grid__col--md-1 grid__col--sm-1')
        
        //- TITLE
        div(
          class='slot__cell slot__cell--functional grid__col grid__col grid__col--lg-16 grid__col--md-16 grid__col--sm-15'
          :class='[{"slot__cell--active" : criteria == "title"}]'
          @click='sortData("title", "switch")')
          span Title
          svg(
            v-if='criteria == "title"'
            class='table__chevron' 
            :class='chevronPosition'): use(xlink:href='#chevron')

        //- STATUS
        div(
          class='slot__cell slot__cell--functional grid__col grid__col--lg-3 grid__col--md-3 grid__col--sm-3'
          :class='{"slot__cell--active" : criteria == "status"}'
          @click='sortData("status", "switch")')
          span Status
          svg(
            v-if='criteria == "status"'
            class='table__chevron' 
            :class='chevronPosition'): use(xlink:href='#chevron')
        
        //- FAVOURITE
        div(
          class='slot__cell slot__cell--functional grid__col grid__col--lg-4 grid__col--md-3 grid__col--sm-4'
          :class='{"slot__cell--active" : criteria == "favourite"}'
          @click='sortData("favourite", "switch")')
          span Favourite
          svg(
            v-if='criteria == "favourite"'
            class='table__chevron' 
            :class='chevronPosition'): use(xlink:href='#chevron')
        
        //- RATING
        div(
          class='slot__cell slot__cell--functional grid__col grid__col--lg-6 grid__col--md-6 grid__col--sm-7'
          :class='{"slot__cell--active" : criteria == "rating"}'
          @click='sortData("rating", "switch")')
          span Rating
          svg(
            v-if='criteria == "rating"'
            class='table__chevron' 
            :class='chevronPosition'): use(xlink:href='#chevron')
        
        //- HOURS
        div(
          class='slot__cell slot__cell--functional grid__col grid__col--lg-3 grid__col--md-3 grid__col--sm-3'
          :class='{"slot__cell--active" : criteria == "hours"}'
          @click='sortData("hours", "switch")')
          span Hours
          svg(
            v-if='criteria == "hours"'
            class='table__chevron' 
            :class='chevronPosition'): use(xlink:href='#chevron')
        
        //- PLATFORM
        div(
          class='slot__cell slot__cell--functional grid__col grid__col--lg-3 grid__col--md-3 grid__col--sm-3 grid__col--right'
          :class='{"slot__cell--active" : criteria == "platform"}'
          @click='sortData("platform", "switch")')
          span Platform
          svg(
            v-if='criteria == "platform"'
            class='table__chevron' 
            :class='chevronPosition'): use(xlink:href='#chevron')

      //- ==== -//
      //- BODY -//
      //- ==== -//

      //- DESKTOP -//
      div(
        class='table__body'
        v-if='currentStructure == "desktop"')

        transition-group

          div(
            class='slot' 
            ref='slot'
            :key='slot.id'
            :class='{"slot--refreshed" : slot.refreshed }'
            v-for='(slot, index) in searchedData'
            @click='editSlot(slot.id, $event)')
            
            //- ORDER
            div(class='slot__cell grid__col grid__col--lg-1 grid__col--md-1 grid__col--sm-1') {{index + 1}}
            
            //- TITLE
            div(
              class='slot__cell grid__col grid__col grid__col--lg-16 grid__col--md-16 grid__col--sm-15')
              span {{slot.title}}
              a(
                :ref='"redirect"'
                rel='nofollow'
                :href='slot.link'
                target='_blank'
                class='slot__link'
                v-if='slot.link.length')
                svg(class='slot__redirect'): use(xlink:href='#link')

            //- STATUS
            div(
              class='slot__cell grid__col grid__col--lg-3 grid__col--md-3 grid__col--sm-3')
              svg(
                class='slot__status'
                v-tooltip='{ content: statusName(slot.status), offset: 5}'): use(:xlink:href="require('@/assets/sprite.svg')+ '#' + slot.status")
            
            //- FAVOURITE
            div(
              class='slot__cell grid__col grid__col--lg-4 grid__col--md-3 grid__col--sm-4')
              svg(class='slot__favourite' v-if='slot.favourite'): use(xlink:href='#favourite')
            
            //- RATING
            div(
              class='slot__cell grid__col grid__col--lg-6 grid__col--md-6 grid__col--sm-7')
              div(class='slot__rating')
                svg(
                  class='slot__star slot__star--active' 
                  :class='"slot__star--" + (index + 1)'
                  v-for='(star, index) in slot.rating'): use(xlink:href='#star-active-w')
                svg(
                  class='slot__star slot__star--passive' 
                  :class='"slot__star--" + (index + 1)'
                  v-for='(rating, index) in 5'): use(xlink:href='#star-passive-w')
            
            //- HOURS
            div(
              class='slot__cell grid__col grid__col--lg-3 grid__col--md-3 grid__col--sm-3')
              svg(class='slot__tilda' v-if='slot.hoursApproximate'): use(xlink:href='#tilda')
              span(v-if='slot.hours != undefined') {{slot.hours}}
            
            //- PLATFORM
            div(class='slot__cell grid__col grid__col--lg-3 grid__col--md-3 grid__col--sm-3 grid__col--right')
              svg(class='slot__platform'): use(:xlink:href="require('@/assets/sprite.svg')+ '#' + slot.platform")

      //- TABLETS & MOBILE -//
      div(
        class='table__body'
        v-if='currentStructure == "tablets"')

        transition-group

          div(
            class='slot' 
            ref='slot'
            :key='slot.id'
            :class='{"slot--refreshed" : slot.refreshed }'
            v-for='(slot, index) in searchedData'
            @click='editSlot(slot.id, $event)')

            //- header
            div(class='slot__header')

              div(class='slot__index') {{ index + 1 }}
              div(class='slot__title')
                span {{slot.title}}
                a(
                  :ref='"redirect"'
                  rel='nofollow'
                  :href='slot.link'
                  target='_blank'
                  class='slot__link'
                  v-if='slot.link.length')
                  svg(class='slot__redirect'): use(xlink:href='#link')
              svg(class='slot__platform'): use(:xlink:href="require('@/assets/sprite.svg')+ '#' + slot.platform")

            div(class='slot__bottom')

              div(class='slot__rating')
                svg(
                  class='slot__star slot__star--active' 
                  :class='"slot__star--" + (index + 1)'
                  v-for='(star, index) in slot.rating'): use(xlink:href='#star-active-w')
                svg(
                  class='slot__star slot__star--passive' 
                  :class='"slot__star--" + (index + 1)'
                  v-for='(rating, index) in 5'): use(xlink:href='#star-passive-w')

              svg(class='slot__favourite' v-if='slot.favourite'): use(xlink:href='#favourite')

              div(class='slot__hours')
                svg(class='slot__tilda' v-if='slot.hoursApproximate'): use(xlink:href='#tilda')
                span(v-if='slot.hours != undefined') {{slot.hours}}
                svg(class='slot__clock'): use(xlink:href='#clock')

    app-placeholder(
      v-if='searchQuery.length && resultsLength == 0'
      :status='placeholderStatus')

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
      this.stashedData = this.gamesCollection
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
        this.$store.commit('CHANGE_CONTENT', this.gamesCollection.filter(i => i.id == id)[0])
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
    games() {
      return this.$store.state.games
    },

    windowParams() {
      return this.$store.state.windowParams
    },

    breakpoints() {
      return this.$store.state.breakpoints
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