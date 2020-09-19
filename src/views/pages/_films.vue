<template lang='pug'>
  section(class='section')

    div(class='title title--main')
      h1(class='title__name') My Films
      span(class='title__badge badge badge--medium') 150
      div(class='title__button title__button--films button button--main')
        div(class='button__icon button__icon--plus')
        span(class='button__text') Add New

    div(class='search')
      div(class='input')
        input(class='input__field' type='text' placeholder='Search')

    div(class='title title--secondary')
      svg(class='title__chevron'): use(xlink:href='#chevron-down')
      h2(class='title__name') Watched
      span(class='title__badge badge badge--medium') 10

    div(class='table')

      div(class='table__header')
        div(class='table__cell table__cell--3 table__cell--functional')
        div(class='table__cell table__cell--60 table__cell--functional') 
          span Title
          svg(class='table__chevron'): use(xlink:href='#chevron-down')
        div(class='table__cell table__cell--8 table__cell--functional') Favourite
        div(class='table__cell table__cell--17 table__cell--functional') Rating
        div(class='table__cell table__cell--15 table__cell--functional') Spent time

      div(class='table__body')
        div(class='table__item' v-for='(item, index) in films')
          div(class='table__cell table__cell--3') {{index + 1}}
          div(class='table__cell table__cell--60') 
            span {{item.title}}
            a(:href="item.link" target="_blank" class='table__link' v-if='item.link != undefined')
              svg(class='table__redirect'): use(xlink:href='#link')
          div(class='table__cell table__cell--8') 
            svg(class='table__favourite' v-if='item.favourite'): use(xlink:href='#favourite')
          div(class='table__cell table__cell--17')  
            div(class='table__rating' :class='"table__rating--" + item.rating')
          div(class='table__cell table__cell--15')
            span(v-if='item.viewCount != undefined && item.duration != undefined') {{Math.floor((item.duration * item.viewCount) / 60)}}

</template>

<script>
export default {
  name: 'Films',
  computed: {
    films() {return this.$store.state.films}
  },
}
</script>
