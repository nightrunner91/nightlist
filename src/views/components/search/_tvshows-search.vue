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
          placeholder='Find a TV Show...' 
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
          class='slot__cell slot__cell--functional grid__col grid__col grid__col--lg-12 grid__col--md-12 grid__col--sm-11'
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

        //- PROGRESS
        div(
          class='slot__cell slot__cell--functional grid__col grid__col--lg-8 grid__col--md-8 grid__col--sm-9'
          :class='{"slot__cell--active" : criteria == "progress"}'
          @click='sortData("progress", "switch")')
          span Progress
          svg(
            v-if='criteria == "progress"'
            class='table__chevron' 
            :class='chevronPosition'): use(xlink:href='#chevron')
        
        //- FAVOURITE
        div(
          class='slot__cell slot__cell--functional grid__col grid__col--lg-4 grid__col--md-4 grid__col--sm-4'
          :class='{"slot__cell--active" : criteria == "favourite"}'
          @click='sortData("favourite", "switch")')
          span Favourite
          svg(
            v-if='criteria == "favourite"'
            class='table__chevron' 
            :class='chevronPosition'): use(xlink:href='#chevron')
        
        //- RATING
        div(
          class='slot__cell slot__cell--functional grid__col grid__col--lg-5 grid__col--md-5 grid__col--sm-5'
          :class='{"slot__cell--active" : criteria == "rating"}'
          @click='sortData("rating", "switch")')
          span Rating
          svg(
            v-if='criteria == "rating"'
            class='table__chevron' 
            :class='chevronPosition'): use(xlink:href='#chevron')
        
        //- HOURS
        div(
          class='slot__cell slot__cell--functional grid__col grid__col--lg-3 grid__col--md-3 grid__col--sm-3 grid__col--right'
          :class='{"slot__cell--active" : criteria == "hours"}'
          @click='sortData("hours", "switch")')
          span Hours
          svg(
            v-if='criteria == "hours"'
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
              class='slot__cell grid__col grid__col grid__col--lg-12 grid__col--md-12 grid__col--sm-11')
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

            //- PROGRESS
            div(class='slot__cell grid__col grid__col--lg-8 grid__col--md-8 grid__col--sm-9')
              app-progress(
                :viewedSeasons='slot.viewedSeasons'
                :totalSeasons='slot.totalSeasons'
                :currentSeason='slot.currentSeason'
                :currentEpisode='slot.currentEpisode'
                :progress='slot.progress')
            
            //- FAVOURITE
            div(
              class='slot__cell grid__col grid__col--lg-4 grid__col--md-3 grid__col--sm-4')
              svg(class='slot__favourite' v-if='slot.favourite'): use(xlink:href='#favourite')
            
            //- RATING
            div(
              class='slot__cell grid__col grid__col--lg-5 grid__col--md-5 grid__col--sm-5')
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
              class='slot__cell grid__col grid__col--lg-3 grid__col--md-3 grid__col--sm-3 grid__col--right')
              svg(class='slot__tilda' v-if='slot.hoursApproximate'): use(xlink:href='#tilda')
              span(v-if='slot.hours != undefined') {{slot.hours}}

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

            div(class='slot__middle')
              app-progress(
                :viewedSeasons='slot.viewedSeasons'
                :totalSeasons='slot.totalSeasons'
                :currentSeason='slot.currentSeason'
                :currentEpisode='slot.currentEpisode'
                :progress='slot.progress')

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
  name: 'tvshowsSearch',
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
      this.stashedData = this.tvshowsCollection
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
        this.criteria == 'hours' ||
        this.criteria == 'progress') {
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
      if (this.allowEdit) {
        if (event.target.className == 'slot__link') return
        else {
          this.$store.commit('CHANGE_CONTENT', this.tvshowsCollection.filter(i => i.id == id)[0])
          eventBus.$emit('openModal', 'edit')
          eventBus.$emit('closeSettings')
        }
      }
    },

    statusName(id) {
      return this.$store.state['tvshows'].statuses.filter(i => i.id == id)[0].name
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
    tvshows() {
      return this.$store.state.tvshows
    },

    windowParams() {
      return this.$store.state.windowParams
    },

    breakpoints() {
      return this.$store.state.breakpoints
    },

    tvshowsCollection() {
      return this.$store.state.collection.filter(i => i.category == 'tvshows')
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