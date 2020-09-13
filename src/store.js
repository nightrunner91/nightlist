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
        link: 'https://ru.wikipedia.org/wiki/Assassin%E2%80%99s_Creed'
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
        rating: 3,
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
        link: 'https://ru.wikipedia.org/wiki/Assassin%E2%80%99s_Creed'
      },
    ]
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
