import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://192.168.88.224:8008'

let errStyle = 'background: #b53e38; color: #ffffff; padding: 4px 10px; font-size: 14px; border-radius: 4px;'

export default new Vuex.Store({
  state: {
    collection: [],

    content: {},

    modalState: {
      visibility: false,
      purpose: undefined
    },

    serverState: {
      status: undefined,
      message: undefined
    },

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

    CHANGE_SERVER_STATE(state, data) {
      state.serverState = data
    },

    CHANGE_SEARCH_STATE(state, data) {
      state.searchState = data
    },

    CHANGE_CONFIRM_STATE(state, data) {
      state.confirmVisible = data
    },

    CHANGE_CONTENT(state, data) {
      state.content = data
    },

    APPLY_SLOT(state, {content, scenario} ) {
      let target = state.collection.filter(i => i.id == content.id)[0]

      if (scenario == 'start') { content.refreshed = false }

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

    addSlot({ commit }, content) {
      commit('CHANGE_SERVER_STATE', {
        status: 'loading',
        message: 'waiting for response'
      })

      axios
        .post('/mongo/add_slot', {
          "table": "slots",
          "item": content
        })

        .then(response => {
          commit('CHANGE_SERVER_STATE', {
            status: response.data.status,
            message: response.data.message
          })

          if (response.data.status == 'error') {
            console.log("%c" + response.data.message, errStyle)
          }
        })

        .catch(error => {
          console.log("%c" + error, errStyle)

          commit('CHANGE_SERVER_STATE', {
            status: 'error',
            message: 'server error'
          })
        })
    },

    editSlot({ commit }, content) {
      commit('CHANGE_SERVER_STATE', {
        status: 'loading',
        message: 'waiting for response'
      })

      axios
        .post('/mongo/edit_slot', {
          "table": "slots",
          "item": content
        })

        .then(response => {
          commit('CHANGE_SERVER_STATE', {
            status: response.data.status,
            message: response.data.message
          })

          if (response.data.status == 'error') {
            console.log("%c" + response.data.message, errStyle)
          }
        })

        .catch(error => {
          console.log("%c" + error, errStyle)

          commit('CHANGE_SERVER_STATE', {
            status: 'error',
            message: 'server error'
          })
        })
    },

    deleteSlot({commit, state}, id) {
      commit('CHANGE_SERVER_STATE', {
        status: 'loading',
        message: 'waiting for response'
      })

      axios
        .post('/mongo/delete_slot', {
          "table": "slots",
          "item": id
        })

        .then(response => {
          commit('CHANGE_SERVER_STATE', {
            status: response.data.status,
            message: response.data.message
          })

          if (response.data.status == 'error') {
            console.log("%c" + response.data.message, errStyle)
          }
        })

        .catch(error => {
          console.log("%c" + error, errStyle)

          commit('CHANGE_SERVER_STATE', {
            status: 'error',
            message: 'server error'
          })
        })
    },

    getSlots({ commit }) {
      commit('CHANGE_SERVER_STATE', {
        status: 'loading',
        message: 'loading data'
      })
      
      axios
        .post('/mongo/get_slots', {
          "table": "slots",
          "query": { 
            // offset: 10,
            // limit: 10
          }
        })

        .then(response => {
          commit('CHANGE_SERVER_STATE', {
            status: response.data.status,
            message: response.data.message
          })

          if (response.data.status == 'error') {
            console.log("%c" + response.data.message, errStyle)
          }

          let items = response.data.items

          if (items.length && Array.isArray(items)) {
            for (let index = 0; index < items.length; index++) {
              delete items[index]._id
              commit('APPLY_SLOT', { 
                content: items[index], 
                scenario: 'start' 
              })
            }
          }
        })

        .catch(error => {
          console.log("%c" + error, errStyle)

          commit('CHANGE_SERVER_STATE', {
            status: 'error',
            message: 'server error'
          })
        })
    }

  }
})