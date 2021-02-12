<template lang='pug'>

  section(class='section')

    div(
      class='section__content'
      :class='{"section__content--blured" : modalState.visibility}')

      div(class='title title--main')
        h1(class='title__name') {{$options.pageTitle}}
        span(class='title__badge badge badge--medium') {{totalLength}}

      div(class='plate grid__col grid__col--lg-36')
        div(class='plate__inner')
          div(class='grid__row')
            div(class='plate__data grid__col grid__col--lg-18')
              div(class='grid__row')
                h2(class='plate__title grid__col grid__col--mb-36')
                  svg(class='plate__icon'): use(xlink:href='#clock')
                  span Spent Time
                div(class='grid__col grid__col--mb-36')
                  ul(class='plate__list')
                    li(
                      class='plate__item'
                      v-for='item in spentTime') 
                      div(
                        class='plate__marker'
                        :class='"plate__marker--" + item.id')
                      div(class='plate__name')  {{item.name}}
                      div(class='plate__hours') {{item.value}} h
                    li(class='plate__item plate__item--total')
                      div(class='plate__hours') {{totalSpent}} h

            div(class='plate__chart grid__col grid__col--lg-18')
              v-chart(:options="chartOptions" style='width: 300px; height: 300px')

</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/pie'

import { colors } from "../../main"

export default {
  name: 'Dashboard',
  pageTitle: 'My Dashboard',
  components: {
    'v-chart': ECharts
  },
  data() {
    return {
      totalSpent: 0,
      spentTime: [
        {
          name: 'Games',
          id: 'games',
          value: 0,
          percent: 0,
          itemStyle: {
            color: colors.games
          }
        },
        {
          name: 'TV Shows',
          id: 'tvshows',
          value: 0,
          percent: 0,
          itemStyle: {
            color: colors.tvshows
          }
        },
        {
          name: 'Films',
          id: 'films',
          value: 0,
          percent: 0,
          itemStyle: {
            color: colors.films
          }
        },
        {
          name: 'Anime',
          id: 'anime',
          value: 0,
          percent: 0,
          itemStyle: {
            color: colors.anime
          }
        },
        {
          name: 'Books',
          id: 'books',
          value: 0,
          percent: 0,
          itemStyle: {
            color: colors.books
          }
        }
      ],
      chartOptions: {
        tooltip: {
          trigger: 'item'
        },
        series: [{
          type: 'pie',
          radius: ['30%', '90%'],
          avoidLabelOverlap: true,
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: false
            }
          },
          labelLine: {
            show: false
          },
          itemStyle: {
            borderRadius: 6,
            borderColor: colors.dashboard,
            borderWidth: 1
          },
          data: []
        }]
      }
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
      let reducer = (accumulator, currentValue) => accumulator + currentValue

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

      this.chartOptions.series[0].data = this.spentTime
    }
  },
  mounted() {
    this.calculateTime()
  }
}
</script>
