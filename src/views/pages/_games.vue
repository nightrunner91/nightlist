<template lang='pug'>
  section(class='section')

    div(class='title title--main')
      h1(class='title__name') My Games
      span(class='title__badge badge badge--medium') 150
      div(class='title__button title__button--games button button--main')
        div(class='button__icon button__icon--plus')
        span(class='button__text') Add New

    div(class='search')
      div(class='input')
        input(class='input__field' type='text' placeholder='Search')

    div(class='title title--secondary')
      svg(class='title__chevron'): use(xlink:href='#chevron-down')
      h2(class='title__name') Currently playing
      span(class='title__badge badge badge--medium') 10

    div(class='table')

      div(class='table__header')
        div(class='table__cell table__cell--3 table__cell--functional')
        div(class='table__cell table__cell--55 table__cell--functional') 
          span Title
          svg(class='table__chevron'): use(xlink:href='#chevron-down')
        div(class='table__cell table__cell--10 table__cell--functional') Favourite
        div(class='table__cell table__cell--17 table__cell--functional')  Rating
        div(class='table__cell table__cell--15 table__cell--functional') Hours

      div(class='table__body')
        div(class='table__item' v-for='(item, index) in games')
          div(class='table__cell table__cell--3') {{index + 1}}
          div(class='table__cell table__cell--55') 
            span {{item.title}}
            a(:href="item.link" target="_blank" class='table__link' v-if='item.link != undefined')
              svg(class='table__redirect'): use(xlink:href='#link')
          div(class='table__cell table__cell--10') 
            svg(class='table__favourite' v-if='item.favourite'): use(xlink:href='#favourite')
          div(class='table__cell table__cell--17')  
            div(class='table__rating' :class='"table__rating--" + item.rating')
          div(class='table__cell table__cell--15') 
            svg(class='table__tilda' v-if='item.hoursApproximate'): use(xlink:href='#tilda')
            span(v-if='item.hours != undefined') {{item.hours}}

</template>

<script>
export default {
  name: 'Games',
  computed: {
    games() {return this.$store.state.games}
  },
  methods : {
    randomNumber(max) {
      return Math.floor(Math.random() * max);
    }
  }
}
</script>
