<template lang='pug'>
  
  div(class='plate grid__col grid__col--lg-12 grid__col--md-12 grid__col--mb-36')

    div(class='plate__inner')

      div(class='grid__row')

        h3(class='plate__title grid__col grid__col--mb-36')
          svg(class='plate__icon'): use(:xlink:href="require('@/assets/sprite.svg')+ '#' + icon")
          span {{title}}
        
        ul(class='plate__list grid__col grid__col--lg-36 grid__col--md-36 grid__col--sm-14 grid__col--xs-16 grid__col--mb-36')
          li(
            class='plate__item'
            :class='{"plate__item--selected" : itemSelected(item.id) }'
            v-for='item in inputData.summary'
            :key="`plate-${item.id}`"
            @mouseover='hoverSeries(item.id)'
            @mouseleave='unhoverSeries(item.id)')
            div(
              class='plate__marker'
              :class='"plate__marker--" + item.id')
            div(class='plate__name')  {{item.name}}
            div(class='plate__hours' v-if='type == "hours"') {{item.hours}} h
            div(class='plate__hours' v-if='type == "entries"') {{item.entries}}
            div(class='plate__hours' v-if='type == "favourites"') {{item.favourites}}
          li(class='plate__item plate__item--total')
            div(class='plate__hours' v-if='type == "hours"') {{inputData.total.hours}} h
            div(class='plate__hours' v-if='type == "entries"') {{inputData.total.entries}}
            div(class='plate__hours' v-if='type == "favourites"') {{inputData.total.favourites}}

        ul(class='plate__chart grid__col grid__col--lg-36 grid__col--md-36 grid__col--sm-13 grid__col--offset-sm-5 grid__col--xs-16 grid__col--offset-xs-2 grid__col--mb-36')
          li(
            @mouseover='hoverItem(item.id)'
            @mouseleave='unHoverItem(item.id)'
            class='plate__bar'
            :class='{"plate__bar--selected" : itemSelected(item.id) }'
            v-for='item in inputData.summary')
            div(class='plate__percent' v-if='type == "hours"') {{item.hoursPercent}}%
            div(class='plate__percent' v-if='type == "entries"') {{item.entriesPercent}}%
            div(class='plate__percent' v-if='type == "favourites"') {{item.favouritesPercent}}%
            div(
              class='plate__series'
              :class='[{"plate__series--animated" : seriesAnimated }, "plate__series--" + item.id]'
              :style='barParams(item.id, type)')
    
</template>

<script>

export default {
  name: 'Plate',
  props: {
    type: String,
    icon: String,
    title: String,
    inputData: Object
  },
  data() {
    return {
      seriesAnimated: false,
      localData: [
        {
          id: 'games',
          selected: false,
          path: '/games'
        },
        {
          id: 'tvshows',
          selected: false,
          path: '/tvshows'
        },
        {
          id: 'films',
          selected: false,
          path: '/films'
        },
        {
          id: 'anime',
          selected: false,
          path: '/anime'
        },
        {
          id: 'books',
          selected: false,
          path: '/books'
        }
      ]
    }
  },
  computed: {
    
  },
  methods: {
    barParams(id, type) {
      return 'height:' + this.inputData.summary.filter(i => i.id == id)[0][type + 'Percent'] + '%'
    },

    hoverSeries(id) {
      this.localData.filter(i => i.id == id)[0].selected = true
    },

    unhoverSeries(id) {
      this.localData.filter(i => i.id == id)[0].selected = false
    },

    hoverItem(id) {
      this.localData.filter(i => i.id == id)[0].selected = true
    },

    unHoverItem(id) {
      this.localData.filter(i => i.id == id)[0].selected = false
    },

    itemSelected(id) {
      return this.localData.filter(i => i.id == id)[0].selected
    },

    animateSeries() {
      setTimeout(() => { this.seriesAnimated = true }, 100)
    }
  },
  mounted() {
    this.animateSeries()
  }
}
</script>