import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    modalState: {
      visibility: false,
      purpose: undefined
    },

    payload: {},

    searchState: false,

    games: {
      statuses: [
        {
          name: "Currently Playing",
          default: true,
          id: 'currently_playing',
          excludeFields: false
        },
        {
          name: "Continuously Playing",
          default: false,
          id: 'continuously_playing',
          excludeFields: false
        },
        {
          name: "On Hold",
          default: false,
          id: 'on_hold',
          excludeFields: false
        },
        {
          name: "Completed",
          default: false,
          id: 'completed',
          excludeFields: false
        },
        {
          name: "Plan to Play",
          default: false,
          id: 'plan_to_play',
          excludeFields: true
        },
        {
          name: "Dropped",
          default: false,
          id: 'dropped',
          excludeFields: false
        }
      ],
      platforms: [
        {
          name: "Don't own game",
          id: 'pirate',
          default: true
        },
        {
          name: "Steam",
          id: 'steam',
          default: false
        },
        {
          name: "Origin",
          id: 'origin',
          default: false
        },
        {
          name: "Uplay",
          id: 'uplay',
          default: false
        },
        {
          name: "Battle.net",
          id: 'battlenet',
          default: false
        },
        {
          name: "Epic Games Store",
          id: 'egs',
          default: false
        },
        {
          name: "GOG.com",
          id: 'gog',
          default: false
        },
      ],
      default: {
        id: 0,
        category: 'games',
        title: '',
        status: '',
        platform: '',
        platformId: '',
        hours: 0,
        hoursApproximate: false,
        rating: 0,
        favourite: false,
        priority: 0,
        link: '',
        refreshed: false
      },
      collection: [
        
      ]
    },
    tvshows: [
      {
        id: 335,
        title: 'Supernatural',
        status: 'watched',
        rating: 3,
        viewCount: 2,
        totalSeasons: 15,
        viewedSeasons: 9,
        totalEpisodes: 327,
        viewedEpisodes: 140,
        averageDuration: 45,
        favourite: false,
        link: 'https://www.imdb.com/title/tt0903747/'
      },
      {
        id: 335,
        title: 'Breaking Bad',
        status: 'watched',
        rating: 5,
        viewCount: 2,
        totalSeasons: 5,
        viewedSeasons: 5,
        totalEpisodes: 50,
        viewedEpisodes: 50,
        averageDuration: 45,
        favourite: true,
        link: 'https://www.imdb.com/title/tt0903747/'
      },
      {
        id: 335,
        title: 'House M.D.',
        status: 'watched',
        rating: 5,
        viewCount: 1,
        totalSeasons: 8,
        viewedSeasons: 8,
        totalEpisodes: 176,
        viewedEpisodes: 176,
        averageDuration: 40,
        favourite: true,
        link: 'https://www.imdb.com/title/tt0903747/'
      },
      {
        id: 335,
        title: 'Spartacus',
        status: 'watched',
        rating: 5,
        viewCount: 2,
        totalSeasons: 3,
        viewedSeasons: 3,
        totalEpisodes: 33,
        viewedEpisodes: 33,
        averageDuration: 40,
        favourite: true,
        link: 'https://www.imdb.com/title/tt0903747/'
      },
      {
        id: 335,
        title: 'Chernobyl',
        status: 'watched',
        rating: 5,
        viewCount: 3,
        totalSeasons: 1,
        viewedSeasons: 1,
        totalEpisodes: 5,
        viewedEpisodes: 5,
        averageDuration: 50,
        favourite: true,
        link: 'https://www.imdb.com/title/tt0903747/'
      },
      {
        id: 335,
        title: 'Dexter',
        status: 'watched',
        rating: 4,
        viewCount: 2,
        totalSeasons: 8,
        viewedSeasons: 8,
        totalEpisodes: 96,
        viewedEpisodes: 96,
        averageDuration: 40,
        favourite: true,
        link: 'https://www.imdb.com/title/tt0903747/'
      },
      {
        id: 335,
        title: 'The Boys',
        status: 'watched',
        rating: 5,
        viewCount: 2,
        totalSeasons: 2,
        viewedSeasons: 1,
        totalEpisodes: 20,
        viewedEpisodes: 10,
        averageDuration: 50,
        favourite: true,
        link: 'https://www.imdb.com/title/tt0903747/'
      },
      {
        id: 335,
        title: 'Prison Break',
        status: 'watched',
        rating: 3,
        viewCount: 2,
        totalSeasons: 5,
        viewedSeasons: 4,
        totalEpisodes: 91,
        viewedEpisodes: 80,
        averageDuration: 45,
        favourite: true,
        link: 'https://www.imdb.com/title/tt0903747/'
      },
      {
        id: 335,
        title: 'Breaking Bad',
        status: 'watched',
        rating: 5,
        viewCount: 2,
        totalSeasons: 1,
        viewedSeasons: 0,
        totalEpisodes: 50,
        viewedEpisodes: 50,
        averageDuration: 45,
        favourite: true,
        link: 'https://www.imdb.com/title/tt0903747/'
      },
      {
        id: 335,
        title: 'Breaking Bad',
        status: 'watched',
        rating: 5,
        viewCount: 2,
        totalSeasons: 2,
        viewedSeasons: 1,
        totalEpisodes: 50,
        viewedEpisodes: 50,
        averageDuration: 45,
        favourite: true,
        link: 'https://www.imdb.com/title/tt0903747/'
      },
    ],
    films: [
      {
        id: 536647,
        title: 'Cast Away',
        year: 2017,
        status: 'watched',
        viewCount: 3,
        duration: 101,
        rating: 5,
        favourite: true,
        link: 'https://letterboxd.com/film/the-babysitter-killer-queen/'
      },
      {
        id: 536647,
        title: 'Cast Away',
        year: 2017,
        status: 'watched',
        viewCount: 3,
        duration: 101,
        rating: 5,
        favourite: true,
        link: 'https://letterboxd.com/film/the-babysitter-killer-queen/'
      },
      {
        id: 536647,
        title: 'Cast Away',
        year: 2017,
        status: 'watched',
        viewCount: 3,
        duration: 101,
        rating: 5,
        favourite: true,
        link: 'https://letterboxd.com/film/the-babysitter-killer-queen/'
      },
      {
        id: 536647,
        title: 'Cast Away',
        year: 2017,
        status: 'watched',
        viewCount: 3,
        duration: 101,
        rating: 5,
        favourite: true,
        link: 'https://letterboxd.com/film/the-babysitter-killer-queen/'
      },
      {
        id: 536647,
        title: 'Cast Away',
        year: 2017,
        status: 'watched',
        viewCount: 3,
        duration: 101,
        rating: 5,
        favourite: true,
        link: 'https://letterboxd.com/film/the-babysitter-killer-queen/'
      },
      {
        id: 536647,
        title: 'Cast Away',
        year: 2017,
        status: 'watched',
        viewCount: 3,
        duration: 101,
        rating: 5,
        favourite: true,
        link: 'https://letterboxd.com/film/the-babysitter-killer-queen/'
      }
    ],
    anime: [
      {
        id: 335,
        title: 'Supernatural',
        status: 'watched',
        rating: 3,
        viewCount: 2,
        totalSeasons: 15,
        viewedSeasons: 9,
        totalEpisodes: 327,
        viewedEpisodes: 140,
        averageDuration: 45,
        favourite: false,
        link: 'https://www.imdb.com/title/tt0903747/'
      },
      {
        id: 335,
        title: 'Breaking Bad',
        status: 'watched',
        rating: 5,
        viewCount: 2,
        totalSeasons: 5,
        viewedSeasons: 5,
        totalEpisodes: 50,
        viewedEpisodes: 50,
        averageDuration: 45,
        favourite: true,
        link: 'https://www.imdb.com/title/tt0903747/'
      },
      {
        id: 335,
        title: 'House M.D.',
        status: 'watched',
        rating: 5,
        viewCount: 1,
        totalSeasons: 8,
        viewedSeasons: 8,
        totalEpisodes: 176,
        viewedEpisodes: 176,
        averageDuration: 40,
        favourite: true,
        link: 'https://www.imdb.com/title/tt0903747/'
      },
      {
        id: 335,
        title: 'Spartacus',
        status: 'watched',
        rating: 5,
        viewCount: 2,
        totalSeasons: 3,
        viewedSeasons: 3,
        totalEpisodes: 33,
        viewedEpisodes: 33,
        averageDuration: 40,
        favourite: true,
        link: 'https://www.imdb.com/title/tt0903747/'
      },
      {
        id: 335,
        title: 'Chernobyl',
        status: 'watched',
        rating: 5,
        viewCount: 3,
        totalSeasons: 1,
        viewedSeasons: 1,
        totalEpisodes: 5,
        viewedEpisodes: 5,
        averageDuration: 50,
        favourite: true,
        link: 'https://www.imdb.com/title/tt0903747/'
      },
      {
        id: 335,
        title: 'Dexter',
        status: 'watched',
        rating: 4,
        viewCount: 2,
        totalSeasons: 8,
        viewedSeasons: 8,
        totalEpisodes: 96,
        viewedEpisodes: 96,
        averageDuration: 40,
        favourite: true,
        link: 'https://www.imdb.com/title/tt0903747/'
      },
      {
        id: 335,
        title: 'The Boys',
        status: 'watched',
        rating: 5,
        viewCount: 2,
        totalSeasons: 2,
        viewedSeasons: 1,
        totalEpisodes: 20,
        viewedEpisodes: 10,
        averageDuration: 50,
        favourite: true,
        link: 'https://www.imdb.com/title/tt0903747/'
      },
      {
        id: 335,
        title: 'Prison Break',
        status: 'watched',
        rating: 3,
        viewCount: 2,
        totalSeasons: 5,
        viewedSeasons: 4,
        totalEpisodes: 91,
        viewedEpisodes: 80,
        averageDuration: 45,
        favourite: true,
        link: 'https://www.imdb.com/title/tt0903747/'
      },
      {
        id: 335,
        title: 'Breaking Bad',
        status: 'watched',
        rating: 5,
        viewCount: 2,
        totalSeasons: 1,
        viewedSeasons: 0,
        totalEpisodes: 50,
        viewedEpisodes: 50,
        averageDuration: 45,
        favourite: true,
        link: 'https://www.imdb.com/title/tt0903747/'
      },
      {
        id: 335,
        title: 'Breaking Bad',
        status: 'watched',
        rating: 5,
        viewCount: 2,
        totalSeasons: 2,
        viewedSeasons: 1,
        totalEpisodes: 50,
        viewedEpisodes: 50,
        averageDuration: 45,
        favourite: true,
        link: 'https://www.imdb.com/title/tt0903747/'
      },
    ],
    books: [
      {
        id: 32435,
        title: 'Цветы для Элджернона',
        author: 'Дэниел Киз',
        status: 'read',
        rating: 5,
        favourite: true,
        link: 'http://readly.ru/book/57621/'
      },
      {
        id: 32435,
        title: 'Цветы для Элджернона',
        author: 'Дэниел Киз',
        status: 'read',
        rating: 3,
        favourite: true,
        link: 'http://readly.ru/book/57621/'
      },
      {
        id: 32435,
        title: 'Цветы для Элджернона',
        author: 'Дэниел Киз',
        status: 'read',
        rating: 4,
        favourite: true,
        link: 'http://readly.ru/book/57621/'
      },
      {
        id: 32435,
        title: 'Цветы для Элджернона',
        author: 'Дэниел Киз',
        status: 'read',
        rating: 5,
        favourite: false,
        link: 'http://readly.ru/book/57621/'
      }
    ]
  },
  mutations: {

    changeModalState(state, { visibility, purpose }) {
      state.modalState.visibility = visibility
      if (purpose != undefined) state.modalState.purpose = purpose
    },

    changeConfirmState(state, data) {
      state.confirmVisible = data
    },

    changePayload(state, data) {
      state.payload = data
    },

    changeSearchState(state, data) {
      state.searchState = data
    },

    applySlot(state, {type, payload}) {
      let collection = state[type].collection
      let target = collection.filter(i => i.id == payload.id)[0]

      if (target != undefined) {
        Object.keys(payload).forEach(key => {
          Vue.set(target, key, payload[key])
        })
      } else {
        collection.push(payload)
      }

      setTimeout(() => {
        collection.filter(i => i.id == payload.id)[0].refreshed = false
      }, 1500)
    },

    deleteSlot(state, { type, id }) {
      let target = state[type].collection.map(i => i.id).indexOf(id)
      state[type].collection.splice(target, 1)
    }

  },
  actions: {

    

  }
})
