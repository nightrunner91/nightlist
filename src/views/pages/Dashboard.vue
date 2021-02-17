<template lang='pug'>

  section(class='section')

    games-modal(
      :purpose='modalState.purpose'
      v-show='modalState.visibility && modalState.type == "games"')

    tvshows-modal(
      :purpose='modalState.purpose'
      v-show='modalState.visibility && modalState.type == "tvshows"')

    anime-modal(
      :purpose='modalState.purpose'
      v-show='modalState.visibility && modalState.type == "anime"')

    div(
      class='section__content'
      :class='{"section__content--blured" : modalState.visibility}')

      div(class='title title--dashboard')
        h1(class='title__name') {{$options.pageTitle}}
        span(class='title__badge badge badge--medium') {{totalLength}}

      div(class='grid__col grid__col--mb-36')
        div(class='grid__row')

          app-plate(
            :type='"hours"'
            :icon='"clock"'
            :title='"Time Spent"'
            :inputData='platesData')

          app-plate(
            :type='"entries"'
            :icon='"entries"'
            :title='"Entries"'
            :inputData='platesData')

          app-plate(
            :type='"favourites"'
            :icon='"favourite"'
            :title='"Favourites"'
            :inputData='platesData')

      games-favourites
      tvshows-favourites
      anime-favourites

</template>

<script>
let reducer = (accumulator, currentValue) => accumulator + currentValue

export default {
  name: 'Dashboard',
  pageTitle: 'My Dashboard',
  data() {
    return {
      platesData: {
        total: {
          hours: 0,
          entries: 0,
          favourites: 0
        },
        summary: [
          {
            name: 'Games',
            id: 'games',
            hours: 0,
            hoursPercent: 0,
            entries: 0,
            entriesPercent: 0,
            favourites: 0,
            favouritesPercent: 0
          },
          {
            name: 'TV Shows',
            id: 'tvshows',
            hours: 0,
            hoursPercent: 0,
            entries: 0,
            entriesPercent: 0,
            favourites: 0,
            favouritesPercent: 0
          },
          {
            name: 'Films',
            id: 'films',
            hours: 0,
            hoursPercent: 0,
            entries: 0,
            entriesPercent: 0,
            favourites: 0,
            favouritesPercent: 0
          },
          {
            name: 'Anime',
            id: 'anime',
            hours: 0,
            hoursPercent: 0,
            entries: 0,
            entriesPercent: 0,
            favourites: 0,
            favouritesPercent: 0
          },
          {
            name: 'Books',
            id: 'books',
            hours: 0,
            hoursPercent: 0,
            entries: 0,
            entriesPercent: 0,
            favourites: 0,
            favouritesPercent: 0
          }
        ]
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

    collection() {
      return this.$store.state.collection
    },

    totalLength() {
      return this.$store.state.collection.length
    },

    modalState() {
      return this.$store.state.modalState
    }
  },
  watch: {
    collection(oldVal, newVal) {
      this.prepareData()
    }
  },
  methods: {
    prepareData() {
      // Store global varaible
      let summary = this.platesData.summary

      // Prepare data if there is some data
      if (this.$store.state.collection.length > 0) {

        // Scan each category
        for (let index = 0; index < summary.length; index++) {
          // Store collection and needed params
          let collection = this.$store.state.collection.filter(i => i.category == summary[index].id)
          let params = { hours: [], entries: [], favourites: [] }

          // Pish params object arrays with values from each category
          for (let index = 0; index < collection.length; index++) {
            params.hours.push(parseFloat(collection[index].hours))
          }
          params.entries.push(parseFloat(collection.length))
          params.favourites.push(parseFloat(collection.filter(i => i.favourite).length))

          // Store summ of each category in data()
          Object.keys(params).forEach(key => {
            if (params[key].length > 0) {
              summary[index][key] = parseFloat((params[key].reduce(reducer)).toFixed(0))
            } else {
              summary[index][key] = 0
            }
          })
        }

        // Calculate totals
        let totals = { hours: [], entries: [], favourites: [] }

        for (let index = 0; index < summary.length; index++) {
          totals.hours.push(parseFloat(summary[index].hours))
          totals.entries.push(parseFloat(summary[index].entries))
          totals.favourites.push(parseFloat(summary[index].favourites))
        }

        Object.keys(totals).forEach(key => {
          this.platesData.total[key] = parseFloat((totals[key].reduce(reducer)).toFixed(0))
        })

        // Calculate percentages
        function perc(value, total) {
          return parseFloat((value * 100 / total).toFixed(0))
        }

        for (let index = 0; index < summary.length; index++) {
          summary[index].hoursPercent = perc(summary[index].hours, this.platesData.total.hours)
          summary[index].entriesPercent = perc(summary[index].entries, this.platesData.total.entries)
          summary[index].favouritesPercent = perc(summary[index].favourites, this.platesData.total.favourites)
        }

      }
    }
  },
  mounted() {
    this.prepareData()
  }
}
</script>
