<template lang="pug">

  div(class='data' v-if='data.length > 0')

    //- ===== -//
    //- TITLE -//
    //- ===== -//
    div(
      class='title title--secondary'
      @click='switchTable()')
      svg(
        class='title__icon'
        v-if='windowParams.width > breakpoints.mb'): use(:xlink:href="require('@/assets/sprite.svg')+ '#' + id")
      h2(class='title__name') {{tableName(id)}}
      span(class='title__badge badge badge--medium') {{tableLength(id)}}
      svg(
        class='title__chevron'
        :class='[{"title__chevron--closed" : !tableVisible}, {"title__chevron--notransition" : noTransition}]'): use(xlink:href='#chevron')

    //- ===== -//
    //- TABLE -//
    //- ===== -//
    div(
      class='table' 
      :style='tableHeight'
      :class='[{"table--hidden" : !tableVisible}, {"table--notransition" : noTransition}]')

      //- ====== -//
      //- HEADER -//
      //- ====== -//
      
      //- DESKTOP -//
      div(
        class='table__header'
        v-if='currentStructure == "desktop"')

        //- ORDER
        div(class='slot__cell grid__col grid__col--lg-1 grid__col--md-1 grid__col--sm-1')
        
        //- TITLE
        div(
          class='slot__cell slot__cell--functional grid__col grid__col--lg-23 grid__col--md-15 grid__col--sm-14'
          :class='{"slot__cell--active" : criteria == "title"}'
          @click='sortData("title", "switch")')
          span Title
          svg(
            v-if='criteria == "title"'
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
            v-for='(slot, index) in data'
            @click='editSlot(slot.id, $event)')
            
            //- ORDER
            div(class='slot__cell grid__col grid__col--lg-1 grid__col--md-1 grid__col--sm-1') {{index + 1}}
            
            //- TITLE
            div(class='slot__cell grid__col grid__col--lg-23 grid__col--md-15 grid__col--sm-14')
              span {{slot.title}}
              a(
                :ref='"redirect"'
                rel='nofollow'
                :href='slot.link'
                target='_blank'
                class='slot__link'
                v-if='slot.link.length')
                svg(class='slot__redirect'): use(xlink:href='#link')
            
            //- FAVOURITE
            div(
              class='slot__cell grid__col grid__col--lg-4 grid__col--md-4 grid__col--sm-4')
              svg(class='slot__favourite' v-if='slot.favourite'): use(xlink:href='#favourite')
            
            //- RATING
            div(class='slot__cell grid__col grid__col--lg-5 grid__col--md-5 grid__col--sm-5')
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
            div(class='slot__cell grid__col grid__col--lg-3 grid__col--md-3 grid__col--sm-3 grid__col--right') {{slot.hours}}

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
            v-for='(slot, index) in data'
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

            div(class='slot__middle')
              app-progress(
                :viewedSeasons='slot.viewedSeasons'
                :totalSeasons='slot.totalSeasons'
                :currentSeason='slot.currentSeason'
                :currentEpisode='slot.currentEpisode'
                :progress='slot.progress')

            div(
              class='slot__bottom'
              v-if='id != "plan_to_play"')

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

</template>

<script>
import { eventBus } from "../../../main"

export default {
  name: 'filmsData',
  props: {
    id: String
  },
  data() {
    return {
      criteria: 'title',
      tableVisibilityName: 'films_' + this.id + '_visible',
      direction: true,
      data: [],
      tableVisible: true,
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
    tableName(id) {
      return this.films.statuses.filter(i => i.id == id)[0].name
    },

    tableLength(id) {
      return this.data.length
    },

    stashData() {
      this.data = this.filmsCollection.filter(i => i.status == this.id)
    },

    switchTable(state) {
      if (state) {
        this.tableVisible = state
      } else {
        this.tableVisible = !this.tableVisible
      }
      this.$storage.set(this.tableVisibilityName, { key: this.tableVisible })
    },

    setDefaultTableState() {
      this.tableVisible = true
    },

    setTableState() {
      let storedState = this.$storage.get(this.tableVisibilityName, this.setDefaultTableState())
      if (storedState != null) {
        this.tableVisible = storedState.key
      }
    },

    removeNoTransition() {
      setTimeout(() => { this.noTransition = false }, 300)
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

      if (this.criteria == 'title') {
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

      result = this.data.sort((a, b) => {
        if (a[criteria] < b[criteria]) { return conditionOne }
        if (a[criteria] > b[criteria]) { return conditionTwo }
        return 0
      })

      this.data = result
    },

    subscribeToChanges() {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type == 'APPLY_SLOT' || mutation.type == 'DELETE_SLOT') {
          this.stashData()
          this.sortData(this.criteria)
          if (
            mutation.payload.scenario == 'change' && 
            mutation.payload.content.status == this.id) {
            this.switchTable(true)
          }
        }
      })
    },

    editSlot(id, event) {
      if (event.target.className == 'slot__link') return
      else {
        this.$store.commit('CHANGE_CONTENT', this.filmsCollection.filter(i => i.id == id)[0])
        eventBus.$emit('openModal', 'edit')
        eventBus.$emit('closeSettings')
      }
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
    films() {
      return this.$store.state.films
    },

    filmsCollection() {
      return this.$store.state.collection.filter(i => i.category == 'films')
    },

    chevronPosition() {
      if (this.direction) return 'table__chevron--ascending'
      else return 'table__chevron--descending'
    },

    tableHeight() {
      if (this.windowParams.width > this.breakpoints.sm) {
        return 'max-height: ' + (40 * this.data.length + 40) + 'px'
      }
    },

    windowParams() {
      return this.$store.state.windowParams
    },

    breakpoints() {
      return this.$store.state.breakpoints
    }
  },
  mounted() {
    this.stashData()
    this.sortData(this.criteria, 'default')
    this.setTableState()
    this.removeNoTransition()
    this.subscribeToChanges()
  }
}
</script>