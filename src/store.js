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
          default: true
        },
        {
          name: "Steam",
          default: false
        },
        {
          name: "Origin",
          default: false
        },
        {
          name: "Uplay",
          default: false
        },
        {
          name: "Battle.net",
          default: false
        },
        {
          name: "Epic Games Store",
          default: false
        },
        {
          name: "GOG.com",
          default: false
        },
      ],
      default: {
        id: 0,
        title: "",
        status: "",
        platform: "",
        hours: 0,
        hoursApproximate: false,
        rating: 0,
        favourite: false,
        priority: 0,
        link: ""
      },
      collection: [
        {
          id: 4365367457,
          title: "Dishonored: Death of the Outsider",
          status: "Currently playing",
          platform: "Steam",
          hours: 18,
          hoursApproximate: false,
          rating: 4,
          favourite: false,
          priority: 0,
          link: "https://myvideogamelist.com/gameprofile/18573/Dishonored:_Death_of_the_Outsider"
        },
        {
          id: 2564576537,
          title: "Metro Exodus",
          status: "Currently playing",
          platform: "Don't own game",
          hours: 4,
          hoursApproximate: true,
          rating: 0,
          favourite: false,
          priority: 0,
          link: ""
        },
        {
          id: 3574468557,
          title: "Subnautica",
          status: "Currently playing",
          platform: "Steam",
          hours: 27,
          hoursApproximate: false,
          rating: 5,
          favourite: true,
          priority: 0,
          link: "https://myvideogamelist.com/gameprofile/15610/Subnautica"
        },
        {
          id: 9535744573,
          title: "A Plague Tale: Innocence",
          status: "Completed",
          platform: "Steam",
          hours: 12,
          hoursApproximate: false,
          rating: 4,
          favourite: false,
          priority: 0,
          link: "https://myvideogamelist.com/gameprofile/25131/A_Plague_Tale:_Innocence"
        },
        {
          id: 5426578641,
          title: "Batman: Arkham Knight",
          status: "Completed",
          platform: "Steam",
          hours: 34,
          hoursApproximate: false,
          rating: 5,
          favourite: true,
          priority: 0,
          link: "https://myvideogamelist.com/gameprofile/7828/Batman:_Arkham_Knight"
        },
        {
          id: 3467890345,
          title: "BioShock Infinite",
          status: "Completed",
          platform: "Steam",
          hours: 19,
          hoursApproximate: false,
          rating: 5,
          favourite: true,
          priority: 0,
          link: "https://myvideogamelist.com/gameprofile/970/BioShock_Infinite"
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
      state.modalState.visibility = visibility;
      if (purpose != undefined) state.modalState.purpose = purpose;
    },

    changeConfirmState(state, data) {
      state.confirmVisible = data;
    },

    changePayload(state, data) {
      state.payload = data;
    },

    applySlot(state, {type, payload}) {
      let collection = state[type].collection;
      let target = collection.filter(i => i.id == payload.id)[0];

      if (target != undefined) Object.assign(target, payload);
      else collection.push(payload);
    },

    deleteSlot(state, { type, id }) {
      let target = state[type].collection.map(i => i.id).indexOf(id);
      state[type].collection.splice(target, 1);
    }

  },
  actions: {

    

  }
})
