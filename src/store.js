import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    games: [
      {
        id: 123,
        title: "Assassin's Creed",
        status: "completed",
        ownership: 'own',
        hours: undefined,
        hoursApproximate: false,
        rating: 4,
        favourite: true,
        priority: undefined,
        link: 'https://ru.wikipedia.org/wiki/Assassin%E2%80%99s_Creed'
      },
      {
        id: 123,
        title: "Assassin's Creed 2",
        status: "completed",
        ownership: 'own',
        hours: 78,
        hoursApproximate: false,
        rating: 4,
        favourite: false,
        priority: undefined,
        link: 'https://ru.wikipedia.org/wiki/Assassin%E2%80%99s_Creed'
      },
      {
        id: 123,
        title: "Assassin's Creed: Brotherhood",
        status: "completed",
        ownership: 'own',
        hours: 86,
        hoursApproximate: false,
        rating: 5,
        favourite: false,
        priority: undefined,
        link: undefined
      },
      {
        id: 123,
        title: "Some Game Title",
        status: "completed",
        ownership: 'own',
        hours: 26,
        hoursApproximate: true,
        rating: undefined,
        favourite: false,
        priority: undefined,
        link: undefined
      },
      {
        id: 123,
        title: "Some Game Title",
        status: "completed",
        ownership: 'own',
        hours: 26,
        hoursApproximate: true,
        rating: 4,
        favourite: true,
        priority: undefined,
        link: undefined
      },
      {
        id: 123,
        title: "Some Game Title",
        status: "completed",
        ownership: 'own',
        hours: 553,
        hoursApproximate: false,
        rating: 4,
        favourite: true,
        priority: undefined,
        link: 'https://ru.wikipedia.org/wiki/Assassin%E2%80%99s_Creed'
      },
      {
        id: 123,
        title: "Some Game Title",
        status: "completed",
        ownership: 'own',
        hours: 26,
        hoursApproximate: true,
        rating: 5,
        favourite: false,
        priority: undefined,
        link: 'https://ru.wikipedia.org/wiki/Assassin%E2%80%99s_Creed'
      },
      {
        id: 123,
        title: "Some Game Title",
        status: "completed",
        ownership: 'own',
        hours: 166,
        hoursApproximate: false,
        rating: 5,
        favourite: true,
        priority: undefined,
        link: undefined
      },
      {
        id: 123,
        title: "Some Game Title",
        status: "completed",
        ownership: 'own',
        hours: 26,
        hoursApproximate: true,
        rating: 3,
        favourite: false,
        priority: undefined,
        link: 'https://ru.wikipedia.org/wiki/Assassin%E2%80%99s_Creed'
      },
      {
        id: 123,
        title: "Some Game Title",
        status: "completed",
        ownership: 'own',
        hours: 26,
        hoursApproximate: true,
        rating: 3,
        favourite: false,
        priority: undefined,
        link: 'https://ru.wikipedia.org/wiki/Assassin%E2%80%99s_Creed'
      },
      {
        id: 123,
        title: "Some Game Title",
        status: "completed",
        ownership: 'own',
        hours: 26,
        hoursApproximate: true,
        rating: 3,
        favourite: false,
        priority: undefined,
        link: undefined
      },
    ],
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
  },
  mutations: {

    setSimpleFoo(state, data) {
      state.fooSimple = data;
    },

    setManyFoo(state, { param1, param2, param3 }) {
      state.foo1 = param1;
      state.foo2 = param2;
      state.foo3 = param3;
    }

  },
  actions: {

    DO_A_THING({commit, state}) {
      commit('setSimpleFoo', 'data');
      commit('setManyFoo', {
        param1: 'param1',
        param2: 'param2',
        param3: 'param3'
      });
      console.log(state);
    }

  }
})
