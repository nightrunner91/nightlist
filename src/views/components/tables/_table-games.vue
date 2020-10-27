<template lang="pug">

  div(class='data')

    div(class='title title--secondary')
      svg(class='title__chevron'): use(xlink:href='#chevron-down')
      h2(class='title__name') {{categoryName(id)}}
      span(class='title__badge badge badge--medium') {{categoryLength(id)}}

    div(class='table')

      div(class='table__header')
        div(class='table__cell grid__col grid__col--lg-1 table__cell--functional')
        div(class='table__cell grid__col grid__col--lg-19 table__cell--functional') 
          span Title
          svg(class='table__chevron'): use(xlink:href='#chevron-down')
        div(class='table__cell grid__col grid__col--lg-3 table__cell--functional') Favourite
        div(class='table__cell grid__col grid__col--lg-6 table__cell--functional') Rating 
        div(class='table__cell grid__col grid__col--lg-4 table__cell--functional') Hours played
        div(class='table__cell grid__col grid__col--lg-3 grid__col--right table__cell--functional') Platform

      div(class='table__body')
        div(
          class='table__item' 
          :class='{"table__item--refreshed" : item.refreshed }'
          v-for='(item, index) in sortedGames(id)'
          @click='editSlot(item.id, $event)')
          
          div(class='table__cell grid__col grid__col--lg-1') {{index + 1}}
          
          div(class='table__cell grid__col grid__col--lg-19')
            span {{item.title}}
            a(
              :ref='"redirect"'
              rel='nofollow'
              :href='item.link'
              target='_blank"'
              class='table__link'
              v-if='item.link.length')
              svg(class='table__redirect'): use(xlink:href='#link')
          
          div(class='table__cell grid__col grid__col--lg-3')
            svg(class='table__favourite' v-if='item.favourite'): use(xlink:href='#favourite')
          
          div(class='table__cell grid__col grid__col--lg-6')
            div(class='table__rating')
              svg(
                class='table__star table__star--active' 
                :class='"table__star--" + (index + 1)'
                v-for='(star, index) in item.rating'): use(xlink:href='#star-active-w')
              svg(
                class='table__star table__star--passive' 
                :class='"table__star--" + (index + 1)'
                v-for='(rating, index) in 5'): use(xlink:href='#star-passive-w')
          
          div(class='table__cell grid__col grid__col--lg-4')
            svg(class='table__tilda' v-if='item.hoursApproximate'): use(xlink:href='#tilda')
            span(v-if='item.hours != undefined') {{item.hours}}
          
          div(class='table__cell grid__col grid__col--lg-3 grid__col--right')
            svg(class='table__platform'): use(:xlink:href="require('@/assets/sprite.svg')+ '#' + item.platformId")

</template>

<script>
import { eventBus } from "../../../main";

export default {
  name: 'datatable',
  props: {
    id: String
  },
  data() {
    return {
      
    }
  },
  methods: {
    categoryName(id) { 
      return this.games.statuses.filter(i => i.id == id)[0].name 
    },

    categoryLength(id) {
      return this.games.collection.filter(i => i.status == this.categoryName(id)).length 
    },

    sortedGames(id) {
      return this.games.collection.filter(i => i.status == this.categoryName(id))
    },

    editSlot(id, event) {
      eventBus.$emit('editSlot', { id: id, event: event })
    }
  },
  computed: {
    games() {
      return this.$store.state.games
    }
  },
  mounted() {
    
  }
};
</script>