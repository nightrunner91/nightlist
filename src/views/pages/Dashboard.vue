<template lang='pug'>

  section(class='section')

    div(
      class='section__content'
      :class='{"section__content--blured" : modalState.visibility}')

      div(class='title title--main')
        h1(class='title__name') {{$options.pageTitle}}
        span(class='title__badge badge badge--medium') {{totalLength}}

      div(class='grid__col grid__col--mb-36')
      
        div(class='grid__row')

          div(class='plate grid__col grid__col--lg-12 grid__col--md-12 grid__col--sm-18 grid__col--xs-18 grid__col--mb-36')
            div(class='plate__inner')

              h2(class='plate__title')
                svg(class='plate__icon'): use(xlink:href='#clock')
                span Spent Time
              
              ul(class='plate__list')
                li(
                  class='plate__item'
                  :class='{"plate__item--selected" : item.selected }'
                  v-for='item in spentTime'
                  @mouseover='hoverSeries(item.id)'
                  @mouseleave='unhoverSeries(item.id)')
                  div(
                    class='plate__marker'
                    :class='"plate__marker--" + item.id')
                  div(class='plate__name')  {{item.name}}
                  div(class='plate__hours') {{item.value}} h
                li(class='plate__item plate__item--total')
                  div(class='plate__hours') {{totalSpent}} h

              ul(class='plate__chart')
                li(
                  @mouseover='hoverItem(item.id)'
                  @mouseleave='unHoverItem(item.id)'
                  class='plate__bar'
                  :class='{"plate__bar--selected" : item.selected }'
                  v-for='item in spentTime')
                  div(class='plate__percent') {{item.percent}}%
                  div(
                    class='plate__series'
                    :class='"plate__series--" + item.id'
                    :style='barParams(item.id)')

</template>

<script>
let reducer = (accumulator, currentValue) => accumulator + currentValue

export default {
  name: 'Dashboard',
  pageTitle: 'My Dashboard',
  data() {
    return {
      totalSpent: 0,
      spentTime: [
        {
          name: 'Games',
          id: 'games',
          value: 0,
          percent: 0,
          selected: false
        },
        {
          name: 'TV Shows',
          id: 'tvshows',
          value: 0,
          percent: 0,
          selected: false
        },
        {
          name: 'Films',
          id: 'films',
          value: 0,
          percent: 0,
          selected: false
        },
        {
          name: 'Anime',
          id: 'anime',
          value: 0,
          percent: 0,
          selected: false
        },
        {
          name: 'Books',
          id: 'books',
          value: 0,
          percent: 0,
          selected: false
        }
      ]
    }
  },
  computed: {
    games() { 
      return this.$store.state.games 
    },

    tvshows() { 
      return this.$store.state.tvshows 
    },

    films() { 
      return this.$store.state.films 
    },

    anime() { 
      return this.$store.state.anime 
    },

    books() { 
      return this.$store.state.books 
    },

    gamesCollection() {
      return this.$store.state.collection.filter(i => i.category == 'games')
    },

    tvshowsCollection() {
      return this.$store.state.collection.filter(i => i.category == 'tvshows')
    },

    filmsCollection() {
      return this.$store.state.collection.filter(i => i.category == 'films')
    },

    animeCollection() {
      return this.$store.state.collection.filter(i => i.category == 'anime')
    },

    booksCollection() {
      return this.$store.state.collection.filter(i => i.category == 'books')
    },

    totalLength() {
      return this.$store.state.collection.length
    },

    modalState() {
      return this.$store.state.modalState
    }
  },
  methods: {
    calculateTime() {
      for (let index = 0; index < this.spentTime.length; index++) {
        let collection = this.$store.state.collection.filter(i => i.category == this.spentTime[index].id)
        let hours = []

        for (let index = 0; index < collection.length; index++) {
          hours.push(parseFloat(collection[index].hours))
        }

        this.spentTime[index].value = (hours.reduce(reducer)).toFixed(0)
      }

      let total = []

      for (let index = 0; index < this.spentTime.length; index++) {
        total.push(parseFloat(this.spentTime[index].value))
      }

      this.totalSpent = (total.reduce(reducer)).toFixed(0)

      for (let index = 0; index < this.spentTime.length; index++) {
        this.spentTime[index].percent = (this.spentTime[index].value * 100 / this.totalSpent).toFixed(0)
      }
    },

    barParams(id) {
      return 'height:' + this.spentTime.filter(i => i.id == id)[0].percent + '%'
    },

    hoverSeries(id) {
      this.spentTime.filter(i => i.id == id)[0].selected = true
    },

    unhoverSeries(id) {
      this.spentTime.filter(i => i.id == id)[0].selected = false
    },

    hoverItem(id) {
      this.spentTime.filter(i => i.id == id)[0].selected = true
    },

    unHoverItem(id) {
      this.spentTime.filter(i => i.id == id)[0].selected = false
    },

    tooltipVisible(id) {
      return this.spentTime.filter(i => i.id == id)[0].selected
    }
  },
  mounted() {
    this.calculateTime()
  }
}
</script>
