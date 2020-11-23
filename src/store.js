import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {projectName} from "./main"

Vue.use(Vuex)

axios.defaults.baseURL = 'https://api.jsonbin.io/'

let errStyle = 'background: #b53e38; color: #ffffff; padding: 4px 10px; font-size: 14px; border-radius: 4px;'

function isJson(item) {
  item = typeof item !== "string"
    ? JSON.stringify(item)
    : item

  try {
    item = JSON.parse(item)
  } catch (e) {
    return false
  }

  if (typeof item === "object" && item !== null) {
    return true
  }

  return false
}

function removeArrEl(arr, value) {
  let i = 0
  while (i < arr.length) {
    if (arr[i] == value) {
      arr.splice(i, 1)
    } else {
      ++i
    }
  }
  return arr
}

export default new Vuex.Store({
  state: {
    binId: '',
    secretKey: '$2b$10$bbXKUoQc/wme3lYj.elAGeqve216dZN6LrXNQQTOw8jnNK1SexviO',
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
        lastUpdated: '',
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

    SAVE_BIN_ID(state, data) {
      state.binId = data
    },

    APPLY_SLOT(state, { content, scenario }) {
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

    restoreLocalCollection({ commit }) {
      Object.values(localStorage).forEach(item => {
        if (isJson(item)) {
          let parsed = JSON.parse(item)
          if (parsed.value) {
            if (parsed.value.key) {
              if (parsed.value.key.id != undefined && 
                parsed.value.key.category != undefined) {
                commit('APPLY_SLOT', { content: parsed.value.key, scenario: 'start' })
              }
            }
          }
        }
      })
    },

    restoreBinId({ commit }, payload) {
      if (payload != null) {
        commit('SAVE_BIN_ID', payload.key)
      }
    },

    sendBackup({state, commit}) {
      commit('CHANGE_SERVER_STATE', {
        status: 'loading',
        message: 'waiting for response'
      })

      axios
        
        .put('/b/' + state.binId, state.collection, {
          headers: {
            "Content-Type": "application/json",
            "secret-key": state.secretKey,
            "versioning": false
          }
        })

        .then(() => {
          commit('CHANGE_SERVER_STATE', {
            status: 'success',
            message: 'collection saved'
          })
        })

        .catch(error => {
          console.log("%c" + error, errStyle)

          commit('CHANGE_SERVER_STATE', {
            status: 'error',
            message: 'failed to save collection!'
          })
        })
    },

    getBackup({ state, commit }) {
      commit('CHANGE_SERVER_STATE', {
        status: 'loading',
        message: 'loading collection...'
      })
      
      axios
        .get('/b/' + state.binId + '/latest', {
          headers: {
            "secret-key": state.secretKey
          }
        })

        .then(response => {
          commit('CHANGE_SERVER_STATE', {
            status: 'success',
            message: 'collection loaded'
          })

          let storage = this._vm.$storage
          let items = response.data
          let storedItems = storage.keys().filter(i => i.includes(projectName + 'slot_'))

          for (let index = 0; index < storedItems.length; index++) {
            storedItems[index] = storedItems[index].replace(projectName, '')
          }

          if (items.length && Array.isArray(items)) {
            state.collection = []
            for (let index = 0; index < items.length; index++) {
              removeArrEl(storedItems, 'slot_' + items[index].id)
              storage.set('slot_' + items[index].id, { key: items[index] })
              commit('APPLY_SLOT', {
                content: items[index], 
                scenario: 'start'
              })
            }
          }

          if (storedItems.length && Array.isArray(storedItems)) {
            for (let index = 0; index < storedItems.length; index++) {
              storage.remove(storedItems[index])
            }
          }
        })

        .catch(error => {
          console.log("%c" + error.message, errStyle)

          commit('CHANGE_SERVER_STATE', {
            status: 'error',
            message: 'failed to load collection!'
          })
        })
    }

  }
})