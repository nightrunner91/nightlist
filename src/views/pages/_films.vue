<template lang='pug'>
  section(class='section')

    div(
      class='section__content'
      :class='{"section__content--blured" : modalVisible}')

      div(class='title title--main')
        h1(class='title__name') My Films
        span(class='title__badge badge badge--medium') 150
        div(class='title__button title__button--films button button--main')
          div(class='button__icon button__icon--plus')
          span(class='button__text') Add New

      div(class='search')
        div(class='input')
          svg(class='input__icon'): use(xlink:href='#search')
          input(class='input__field' type='text' placeholder='Search')

      div(class='title title--secondary')
        svg(class='title__chevron'): use(xlink:href='#chevron-down')
        h2(class='title__name') Watched
        span(class='title__badge badge badge--medium') 10

      div(class='table')

        div(class='table__header')
          div(class='table__cell grid__col grid__col--3 table__cell--functional')
          div(class='table__cell grid__col grid__col--55 table__cell--functional') 
            span Title
            svg(class='table__chevron'): use(xlink:href='#chevron-down')
          div(class='table__cell grid__col grid__col--10 table__cell--functional') Favourite
          div(class='table__cell grid__col grid__col--17 table__cell--functional') Rating
          div(class='table__cell grid__col grid__col--12 table__cell--functional') Spent time
          div(class='table__cell grid__col grid__col--3')

        div(class='table__body')
          div(class='table__item' v-for='(item, index) in films')
            div(class='table__cell grid__col grid__col--3') {{index + 1}}
            div(class='table__cell grid__col grid__col--55') 
              span {{item.title}}
              a(:href="item.link" target="_blank" class='table__link' v-if='item.link != undefined')
                svg(class='table__redirect'): use(xlink:href='#link')
            div(class='table__cell grid__col grid__col--10') 
              svg(class='table__favourite' v-if='item.favourite'): use(xlink:href='#favourite')
            div(class='table__cell grid__col grid__col--17')  
              div(class='table__rating')
                svg(
                  class='table__star table__star--active' 
                  :class='"table__star--" + (index + 1)'
                  v-for='(star, index) in item.rating'): use(xlink:href='#star-active-w')
                svg(
                  class='table__star table__star--passive' 
                  :class='"table__star--" + (index + 1)'
                  v-for='(rating, index) in 5'): use(xlink:href='#star-passive-w')
            div(class='table__cell grid__col grid__col--12')
              span(v-if='item.viewCount != undefined && item.duration != undefined') {{Math.floor((item.duration * item.viewCount) / 60)}}
            div(class='table__cell grid__col grid__col--3')
              svg(class='table__edit'): use(xlink:href='#edit')

</template>

<script>
export default {
  name: 'Films',
  computed: {
    films() {return this.$store.state.films}
  },
}
</script>
