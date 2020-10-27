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

    games: {
      statuses: [
        {
          name: "Currently playing",
          default: true,
          id: 'currently_playing',
          excludeFields: false
        },
        {
          name: "Completed",
          default: false,
          id: 'completed',
          excludeFields: false
        },
        {
          name: "Dropped",
          default: false,
          id: 'dropped',
          excludeFields: false
        },
        {
          name: "Plan to play",
          default: false,
          id: 'plan_to_play',
          excludeFields: true
        },
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
        {
          id: 4365367457,
          title: "Dishonored: Death of the Outsider",
          status: "Currently playing",
          statusId: "currently_playing",
          platform: "Steam",
          platformId: 'steam',
          hours: 18,
          hoursApproximate: false,
          rating: 4,
          favourite: false,
          priority: 0,
          link: "https://myvideogamelist.com/gameprofile/18573/Dishonored:_Death_of_the_Outsider",
          refreshed: false
        },
        {
          id: 3495367246,
          title: "Battlefield 1",
          status: "Currently playing",
          statusId: "currently_playing",
          platform: "Origin",
          platformId: 'origin',
          hours: 18,
          hoursApproximate: false,
          rating: 4,
          favourite: false,
          priority: 0,
          link: "",
          refreshed: false
        },
        {
          id: 6574434681,
          title: "Assassin's Creed: Unity",
          status: "Completed",
          statusId: "completed",
          platform: "Uplay",
          platformId: 'uplay',
          hours: 61,
          hoursApproximate: false,
          rating: 4,
          favourite: false,
          priority: 0,
          link: "",
          refreshed: false
        },
        {
          id: 3455546897,
          title: "Assassin's Creed: Syndicate",
          status: "Completed",
          statusId: "completed",
          platform: "Epic Games Store",
          platformId: 'egs',
          hours: 1,
          hoursApproximate: false,
          rating: 3,
          favourite: false,
          priority: 0,
          link: "",
          refreshed: false
        },
        {
          id: 2575488549,
          title: "Cyberpunk 2077",
          status: "Plan to play",
          statusId: "plan_to_play",
          platform: "Steam",
          platformId: 'steam',
          hours: 0,
          hoursApproximate: false,
          rating: 0,
          favourite: false,
          priority: 0,
          link: "",
          refreshed: false
        },
        {
          id: 2564576537,
          title: "Metro Exodus",
          status: "Currently playing",
          statusId: "currently_playing",
          platform: "Don't own game",
          platformId: 'pirate',
          hours: 4,
          hoursApproximate: true,
          rating: 0,
          favourite: false,
          priority: 0,
          link: "",
          refreshed: false
        },
        {
          id: 1234367895,
          title: "GWENT",
          status: "Completed",
          statusId: "completed",
          platform: "GOG.com",
          platformId: 'gog',
          hours: 65,
          hoursApproximate: false,
          rating: 3,
          favourite: false,
          priority: 0,
          link: "",
          refreshed: false
        },
        {
          id: 3574468557,
          title: "Subnautica",
          status: "Currently playing",
          statusId: "currently_playing",
          platform: "Steam",
          platformId: 'steam',
          hours: 27,
          hoursApproximate: false,
          rating: 5,
          favourite: true,
          priority: 0,
          link: "https://myvideogamelist.com/gameprofile/15610/Subnautica",
          refreshed: false
        },
        {
          id: 5356679205,
          title: "Warframe",
          status: "Currently playing",
          statusId: "currently_playing",
          platform: "Steam",
          platformId: 'steam',
          hours: 2934,
          hoursApproximate: false,
          rating: 4,
          favourite: true,
          priority: 0,
          link: "https://myvideogamelist.com/gameprofile/15610/Subnautica",
          refreshed: false
        },
        {
          id: 1757907546,
          title: "Dota 2",
          status: "Completed",
          statusId: "completed",
          platform: "Steam",
          platformId: 'steam',
          hours: 833,
          hoursApproximate: false,
          rating: 3,
          favourite: false,
          priority: 0,
          link: "https://myvideogamelist.com/gameprofile/15610/Subnautica",
          refreshed: false
        },
        {
          id: 6334542996,
          title: "Terraria",
          status: "Completed",
          statusId: "completed",
          platform: "Steam",
          platformId: 'steam',
          hours: 418,
          hoursApproximate: false,
          rating: 5,
          favourite: true,
          priority: 0,
          link: "https://myvideogamelist.com/gameprofile/15610/Subnautica",
          refreshed: false
        },
        {
          id: 9535744573,
          title: "A Plague Tale: Innocence",
          status: "Completed",
          statusId: "completed",
          platform: "Steam",
          platformId: 'steam',
          hours: 12,
          hoursApproximate: false,
          rating: 4,
          favourite: false,
          priority: 0,
          link: "https://myvideogamelist.com/gameprofile/25131/A_Plague_Tale:_Innocence",
          refreshed: false
        },
        {
          id: 4686647905,
          title: "The Elder Scrolls V: Skyrim",
          status: "Completed",
          statusId: "completed",
          platform: "Steam",
          platformId: 'steam',
          hours: 225,
          hoursApproximate: false,
          rating: 4,
          favourite: true,
          priority: 0,
          link: "https://myvideogamelist.com/gameprofile/25131/A_Plague_Tale:_Innocence",
          refreshed: false
        },
        {
          id: 7556863680,
          title: "Overwatch",
          status: "Completed",
          statusId: "completed",
          platform: "Battle.net",
          platformId: 'battlenet',
          hours: 470,
          hoursApproximate: true,
          rating: 4,
          favourite: false,
          priority: 0,
          link: "https://myvideogamelist.com/gameprofile/25131/A_Plague_Tale:_Innocence",
          refreshed: false
        },
        {
          id: 5426578641,
          title: "Batman: Arkham Knight",
          status: "Completed",
          statusId: "completed",
          platform: "Steam",
          platformId: 'steam',
          hours: 34,
          hoursApproximate: false,
          rating: 5,
          favourite: true,
          priority: 0,
          link: "https://myvideogamelist.com/gameprofile/7828/Batman:_Arkham_Knight",
          refreshed: false
        },
        {
          id: 3467890345,
          title: "BioShock Infinite",
          status: "Completed",
          statusId: "completed",
          platform: "Steam",
          platformId: 'steam',
          hours: 19,
          hoursApproximate: false,
          rating: 5,
          favourite: true,
          priority: 0,
          link: "https://myvideogamelist.com/gameprofile/970/BioShock_Infinite",
          refreshed: false
        },
        {
          id: 8763567546,
          title: "Batman: Arkham Origins",
          status: "Dropped",
          statusId: "dropped",
          platform: "Steam",
          platformId: 'steam',
          hours: 6,
          hoursApproximate: false,
          rating: 3,
          favourite: false,
          priority: 0,
          link: "https://myvideogamelist.com/gameprofile/970/BioShock_Infinite",
          refreshed: false
        },
        {
          id: 354445707,
          title: "Far Cry 2",
          status: "Dropped",
          statusId: "dropped",
          platform: "Steam",
          platformId: 'steam',
          hours: 3,
          hoursApproximate: false,
          rating: 1,
          favourite: false,
          priority: 0,
          link: "https://myvideogamelist.com/gameprofile/970/BioShock_Infinite",
          refreshed: false
        },
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
      }, 1000)
    },

    deleteSlot(state, { type, id }) {
      let target = state[type].collection.map(i => i.id).indexOf(id)
      state[type].collection.splice(target, 1)
    }

  },
  actions: {

    

  }
})
