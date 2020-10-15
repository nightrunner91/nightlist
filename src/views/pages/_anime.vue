<template lang='pug'>
  section(class='section')

    div(
      class='section__content'
      :class='{"section__content--blured" : modalVisible}')

      div(class='title title--main')
        h1(class='title__name') My Anime
        span(class='title__badge badge badge--medium') 150
        div(class='title__button title__button--anime button button--main')
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
          div(class='table__cell grid__col grid__col--37 table__cell--functional') 
            span Title
            svg(class='table__chevron'): use(xlink:href='#chevron-down')
          div(class='table__cell grid__col grid__col--20 table__cell--functional') Progress
          div(class='table__cell grid__col grid__col--8 table__cell--functional') Favourite
          div(class='table__cell grid__col grid__col--17 table__cell--functional') Rating
          div(class='table__cell grid__col grid__col--15 table__cell--functional') Spent time
          div(class='table__cell grid__col grid__col--3')

        div(class='table__body')
          div(class='table__item' v-for='(item, index) in anime')
            div(class='table__cell grid__col grid__col--3') {{index + 1}}
            div(class='table__cell grid__col grid__col--37') 
              span {{item.title}}
              a(:href="item.link" target="_blank" class='table__link' v-if='item.link != undefined')
                svg(class='table__redirect'): use(xlink:href='#link')
            div(class='table__cell grid__col grid__col--20 table__cell--functional')
              div(
                class='progress'
                :class='{"progress--completed" : item.totalSeasons == item.viewedSeasons }'
                v-tooltip='{ content: "Watched " + item.viewedSeasons + " of " + item.totalSeasons + " seasons", offset: 5}')
                div(class='progress__bar')
                  div(
                    class='progress__item progress__item--total' 
                    v-for='season in item.totalSeasons'
                    :style="'width: ' + 100 / item.totalSeasons + '%'")
                div(class='progress__bar')
                  div(
                    class='progress__item progress__item--watched' 
                    v-for='season in item.viewedSeasons'
                    :style="'width: ' + 100 / item.totalSeasons + '%'")
            div(class='table__cell grid__col grid__col--8') 
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
            div(class='table__cell grid__col grid__col--15') 
              svg(class='table__tilda' v-if='item.hoursApproximate'): use(xlink:href='#tilda')
              span(v-if='item.totalEpisodes != undefined && item.averageDuration != undefined') {{Math.floor((item.averageDuration * item.totalEpisodes) / 60)}}
            div(class='table__cell grid__col grid__col--3 table__cell--functional')
              svg(class='table__edit'): use(xlink:href='#edit')

</template>

<script>
export default {
  name: 'Anime',
  computed: {
    anime() {return this.$store.state.anime}
  },
}
</script>
