import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    modalState: {
      visibility: false,
      purpose: undefined
    },

    payload: {},

    searchState: false,

    collection: [],

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
        statusId: '',
        platform: '',
        platformId: '',
        hours: 0,
        hoursApproximate: false,
        rating: 0,
        favourite: false,
        link: '',
        refreshed: false
      }
    }
  },
  mutations: {

    CHANGE_MODAL_STATE(state, { visibility, purpose }) {
      state.modalState.visibility = visibility
      if (purpose != undefined) state.modalState.purpose = purpose
    },

    CHANGE_CONFIRM_STATE(state, data) {
      state.confirmVisible = data
    },

    CHANGE_CONTENT(state, data) {
      state.payload = data
    },

    CHANGE_SEARCH_STATE(state, data) {
      state.searchState = data
    },

    APPLY_SLOT(state, {content, scenario} ) {
      let target = state.collection.filter(i => i.id == content.id)[0]

      if (target != undefined) {
        Object.keys(content).forEach(key => {
          Vue.set(target, key, content[key])
        })
      } else {
        state.collection.push(content)
      }

      setTimeout(() => {
        state.collection.filter(i => i.id == content.id)[0].refreshed = false
      }, 1500)
    },

    DELETE_SLOT(state, id) {
      let target = state.collection.map(i => i.id).indexOf(id)
      state.collection.splice(target, 1)
    }

  },
  actions: {

    addSlot({commit, state}, payload) {
      axios
        .post('http://localhost:8008/mongo/add_slot', {
          "table": "slots",
          "item": payload
        })

        .then(response => {
          console.log(response)
        })
    },

    editSlot({commit, state}, payload) {
      axios
        .post('http://localhost:8008/mongo/edit_slot', {
          "table": "slots",
          "item": payload
        })

        .then(response => {
          console.log(response)
        })
    },

    deleteSlot({commit, state}, id) {
      axios
        .post('http://localhost:8008/mongo/delete_slot', {
          "table": "slots",
          "item": id
        })

        .then(response => {
          console.log(response)
        })
    }

  }
})
