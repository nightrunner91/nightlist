<template lang="pug">

  div(class='data' v-if='data.length > 0')

    //- ===== -//
    //- TITLE -//
    //- ===== -//
    div(
      class='title title--secondary'
      @click='switchTable()')
      svg(class='title__icon'): use(:xlink:href="require('@/assets/sprite.svg')+ '#' + id")
      h2(class='title__name') {{tableName(id)}}
      span(class='title__badge badge badge--medium') {{tableLength(id)}}
      svg(
        class='title__chevron'
        :class='[{"title__chevron--closed" : !tableVisible}, {"title__chevron--notransition" : noTransition}]'): use(xlink:href='#chevron-down')

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
      div(class='table__header')

        //- ORDER
        div(class='table__cell grid__col grid__col--lg-1 grid__col--md-1 grid__col--sm-1')
        
        //- TITLE
        div(
          class='table__cell table__cell--functional grid__col'
          :class='[{"table__cell--active" : criteria == "title"}, titleWidth]'
          @click='sortData("title", "switch")')
          span Title
          svg(
            v-if='criteria == "title"'
            class='table__chevron' 
            :class='chevronPosition'): use(xlink:href='#chevron-down')
        
        //- FAVOURITE
        div(
          v-if='id != "plan_to_play"'
          class='table__cell table__cell--functional grid__col grid__col--lg-4 grid__col--md-3 grid__col--sm-4'
          :class='{"table__cell--active" : criteria == "favourite"}'
          @click='sortData("favourite", "switch")')
          span Favourite
          svg(
            v-if='criteria == "favourite"'
            class='table__chevron' 
            :class='chevronPosition'): use(xlink:href='#chevron-down')
        
        //- RATING
        div(
          v-if='id != "plan_to_play"'
          class='table__cell table__cell--functional grid__col grid__col--lg-7 grid__col--md-7 grid__col--sm-8'
          :class='{"table__cell--active" : criteria == "rating"}'
          @click='sortData("rating", "switch")')
          span Rating
          svg(
            v-if='criteria == "rating"'
            class='table__chevron' 
            :class='chevronPosition'): use(xlink:href='#chevron-down')
        
        //- HOURS
        div(
          v-if='id != "plan_to_play"'
          class='table__cell table__cell--functional grid__col grid__col--lg-3 grid__col--md-3 grid__col--sm-3'
          :class='{"table__cell--active" : criteria == "hours"}'
          @click='sortData("hours", "switch")')
          span Hours
          svg(
            v-if='criteria == "hours"'
            class='table__chevron' 
            :class='chevronPosition'): use(xlink:href='#chevron-down')
        
        //- PLATFORM
        div(
          class='table__cell table__cell--functional grid__col grid__col--lg-3 grid__col--md-3 grid__col--sm-3 grid__col--right'
          :class='{"table__cell--active" : criteria == "platform"}'
          @click='sortData("platform", "switch")')
          span Platform
          svg(
            v-if='criteria == "platform"'
            class='table__chevron' 
            :class='chevronPosition'): use(xlink:href='#chevron-down')

      //- BODY
      div(class='table__body')

        transition-group

          div(
            class='table__item' 
            ref='tableItem'
            :key='item.id'
            :class='{"table__item--refreshed" : item.refreshed }'
            v-for='(item, index) in data'
            @click='editSlot(item.id, $event)')
            
            //- ORDER
            div(class='table__cell grid__col grid__col--lg-1 grid__col--md-1 grid__col--sm-1') {{index + 1}}
            
            //- TITLE
            div(
              class='table__cell grid__col'
              :class='titleWidth')
              span {{item.title}}
              a(
                :ref='"redirect"'
                rel='nofollow'
                :href='item.link'
                target='_blank"'
                class='table__link'
                v-if='item.link.length')
                svg(class='table__redirect'): use(xlink:href='#link')
            
            //- FAVOURITE
            div(
              v-if='id != "plan_to_play"'
              class='table__cell grid__col grid__col--lg-4 grid__col--md-3 grid__col--sm-4')
              svg(class='table__favourite' v-if='item.favourite'): use(xlink:href='#favourite')
            
            //- RATING
            div(
              v-if='id != "plan_to_play"'
              class='table__cell grid__col grid__col--lg-7 grid__col--md-6 grid__col--sm-8')
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
              v-if='id != "plan_to_play"'
              class='table__cell grid__col grid__col--lg-3 grid__col--md-3 grid__col--sm-3')
              svg(class='table__tilda' v-if='item.hoursApproximate'): use(xlink:href='#tilda')
              span(v-if='item.hours != undefined') {{item.hours}}
            
            //- PLATFORM
            div(class='table__cell grid__col grid__col--lg-3 grid__col--md-3 grid__col--sm-3 grid__col--right')
              svg(class='table__platform'): use(:xlink:href="require('@/assets/sprite.svg')+ '#' + item.platform")

</template>

<script>
import { eventBus } from "../../../main"

export default {
  name: 'gamesData',
  props: {
    id: String
  },
  data() {
    return {
      criteria: 'title',
      tableVisibilityName: 'games_' + this.id + '_visible',
      direction: true,
      data: [],
      tableVisible: true,
      noTransition: true
    }
  },
  methods: {
    tableName(id) {
      return this.games.statuses.filter(i => i.id == id)[0].name
    },

    tableLength(id) {
      return this.data.length
    },

    stashData() {
      this.data = this.gamesCollection.filter(i => i.status == this.id)
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

      if (
        this.criteria == 'title' || 
        this.criteria == 'platform') {
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
      if (event.target.className == 'table__link') return
      else {
        this.$store.commit('CHANGE_CONTENT', this.gamesCollection.filter(i => i.id == id)[0])
        eventBus.$emit('openModal', 'edit')
        eventBus.$emit('closeSettings')
      }
    },
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

    tableHeight() {
      return 'max-height: ' + (40 * this.data.length + 40) + 'px'
    },

    titleWidth() {
      if (this.id != 'plan_to_play') {
        return 'grid__col--lg-18 grid__col--md-20 grid__col--sm-17'
      } else {
        return 'grid__col--lg-32 grid__col--md-32 grid__col--sm-32'
      }
    },
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