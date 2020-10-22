<template lang='pug'>
  
  section(class='section')

    div(
      class='section__content'
      :class='{"section__content--blured" : modalState.visibility}')

      div(class='title title--main')
        h1(class='title__name') My Games
        span(class='title__badge badge badge--medium') {{totalGames()}}
        div(
          class='title__button title__button--games button button--main'
          @click='addSlot()'
          v-ripple)
          svg(class='button__icon'): use(xlink:href='#add')
          span(class='button__text') Add New

      div(class='search' :class='{"search--active" : searchQuery.length || searchActive}' )
        div(class='input')
          svg(class='input__icon'): use(xlink:href='#search')
          input(class='input__field' type='text' placeholder='Search' v-model='searchQuery' @focus='searchActive = true' @blur='searchActive = false')

      div(class='title title--secondary')
        svg(class='title__chevron'): use(xlink:href='#chevron-down')
        h2(class='title__name') {{categoryName('currently_playing')}}
        span(class='title__badge badge badge--medium') {{categoryLength('currently_playing')}}

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
            v-for='(item, index) in sortedGames("currently_playing")'
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

      div(class='title title--secondary')
        svg(class='title__chevron'): use(xlink:href='#chevron-down')
        h2(class='title__name') {{categoryName('completed')}}
        span(class='title__badge badge badge--medium') {{categoryLength('completed')}}

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
            v-for='(item, index) in sortedGames("completed")'
            @click='editSlot(item.id, $event)')
            div(class='table__cell grid__col grid__col--lg-1') {{index + 1}}
            div(class='table__cell grid__col grid__col--lg-19') 
              span {{item.title}}
              a(
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

      div(class='title title--secondary')
        svg(class='title__chevron'): use(xlink:href='#chevron-down')
        h2(class='title__name') {{categoryName('dropped')}}
        span(class='title__badge badge badge--medium') {{categoryLength('dropped')}}

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
            v-for='(item, index) in sortedGames("dropped")'
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

      div(class='title title--secondary')
        svg(class='title__chevron'): use(xlink:href='#chevron-down')
        h2(class='title__name') {{categoryName('plan_to_play')}}
        span(class='title__badge badge badge--medium') {{categoryLength('plan_to_play')}}

      div(class='table')

        div(class='table__header')
          div(class='table__cell grid__col grid__col--lg-1 table__cell--functional')
          div(class='table__cell grid__col grid__col--lg-32 table__cell--functional') 
            span Title
            svg(class='table__chevron'): use(xlink:href='#chevron-down')
          div(class='table__cell grid__col grid__col--lg-3 grid__col--right table__cell--functional') Platform

        div(class='table__body')
          div(
            class='table__item' 
            :class='{"table__item--refreshed" : item.refreshed }'
            v-for='(item, index) in sortedGames("plan_to_play")'
            @click='editSlot(item.id, $event)')
            div(class='table__cell grid__col grid__col--lg-1') {{index + 1}}
            div(class='table__cell grid__col grid__col--lg-32') 
              span {{item.title}}
              a(
                :ref='"redirect"'
                rel='nofollow'
                :href='item.link'
                target='_blank"'
                class='table__link'
                v-if='item.link.length')
                svg(class='table__redirect'): use(xlink:href='#link')
            div(class='table__cell grid__col grid__col--lg-3 grid__col--right')
              svg(class='table__platform'): use(:xlink:href="require('@/assets/sprite.svg')+ '#' + item.platformId")

</template>

<script>
import { eventBus } from "../../main";

export default {
  name: 'Games',
  data() {
    return {
      searchQuery: '',
      searchActive: false
    };
  },
  computed: {
    games() {return this.$store.state.games},
    modalState() {return this.$store.state.modalState},
  },
  methods: {
    totalGames() {
      return this.games.collection.length
    },

    categoryName(id) { 
      return this.games.statuses.filter(i => i.id == id)[0].name 
    },

    categoryLength(id) {
      return this.games.collection.filter(i => i.status == this.categoryName(id)).length 
    },

    sortedGames(id) {
      return this.games.collection.filter(i => i.status == this.categoryName(id))
    },

    addSlot() {
      this.$store.commit('changePayload', this.games.default);
      eventBus.$emit('openModal', 'add');
    },

    editSlot(id, event) {
      if (event.target.className == 'table__link') return
      else {
        this.$store.commit('changePayload', this.games.collection.filter(i => i.id == id)[0]);
        eventBus.$emit('openModal', 'edit');
      }
    },
  },
  mounted() {

  }
}
</script>
