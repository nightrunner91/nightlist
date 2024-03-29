import Vue from 'vue'
import Vuex from 'vuex'
import { projectName, eventBus } from "./main"
import backUp from "../backup.json"

Vue.use(Vuex)

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
    allowEdit: false,
    storageType: 'backup', // local | backup
    collection: [],
    socials: {
      github: {
        id: 'github',
        href: 'https://github.com/nightrunner91',
        tooltip: 'See my other projects on GitHub'
      },
      steam: {
        id: 'steam',
        href: 'https://steamcommunity.com/id/nightrunner91/',
        tooltip: 'Check out my Steam'
      },
      telegram: {
        id: 'telegram',
        href: 'https://t.me/nightrunner91',
        tooltip: 'Contact with me via Telegram'
      },
    },
    preparedBackup: {},
    content: {},
    windowParams: {
      width: undefined,
      height: undefined
    },
    breakpoints: {
      mb: 480,
      xs: 768,
      sm: 960,
      md: 1280,
      lg: 1367
    },
    modalState: {
      visibility: false,
      purpose: undefined
    },
    searchState: false,
    backupState: {
      status: undefined,
      message: undefined
    },
    games: {
      statuses: [
        {
          name: "Currently Playing",
          default: false,
          id: 'currently_playing'
        },
        {
          name: "Continuously Playing",
          default: false,
          id: 'continuously_playing'
        },
        {
          name: "On Hold",
          default: false,
          id: 'on_hold'
        },
        {
          name: "Plan to Play",
          default: false,
          id: 'plan_to_play'
        },
        {
          name: "Completed",
          default: true,
          id: 'completed'
        },
        {
          name: "Dropped",
          default: false,
          id: 'dropped'
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
        platform: '',
        hours: 0,
        hoursApproximate: false,
        rating: 0,
        favourite: false,
        link: '',
        refreshed: false
      }
    },
    tvshows: {
      statuses: [
        {
          name: "Currently Watching",
          default: false,
          id: 'currently_watching'
        },
        {
          name: "On Hold",
          default: false,
          id: 'on_hold'
        },
        {
          name: "Plan to Watch",
          default: false,
          id: 'plan_to_watch'
        },
        {
          name: "Watched All",
          default: true,
          id: 'completed'
        },
        {
          name: "Dropped",
          default: false,
          id: 'dropped'
        }
      ],
      default: {
        category: 'tvshows',
        title: '',
        status: '',
        currentSeason: 0,
        currentEpisode: 0,
        viewedSeasons: 0,
        totalSeasons: 1,
        progress: 0,
        episodeDuration: 0,
        episodesWatched: 0,
        rewatchedCounter: 1,
        hours: 0,
        rating: 0,
        favourite: false,
        link: '',
        refreshed: false
      }
    },
    films: {
      statuses: [
        {
          name: "Plan to Watch",
          default: false,
          id: 'plan_to_watch'
        },
        {
          name: "Watched",
          default: true,
          id: 'completed'
        },
        {
          name: "Dropped",
          default: false,
          id: 'dropped'
        }
      ],
      default: {
        category: 'films',
        title: '',
        status: '',
        durationHours: 0,
        durationMinutes: 0,
        rewatchedCounter: 1,
        rating: 0,
        hours: 0,
        favourite: false,
        link: '',
        refreshed: false
      }
    },
    anime: {
      statuses: [
        {
          name: "Currently Watching",
          default: false,
          id: 'currently_watching'
        },
        {
          name: "On Hold",
          default: false,
          id: 'on_hold'
        },
        {
          name: "Plan to Watch",
          default: false,
          id: 'plan_to_watch'
        },
        {
          name: "Watched All",
          default: true,
          id: 'completed'
        },
        {
          name: "Dropped",
          default: false,
          id: 'dropped'
        }
      ],
      default: {
        category: 'anime',
        title: '',
        status: '',
        currentSeason: 0,
        currentEpisode: 0,
        viewedSeasons: 0,
        totalSeasons: 1,
        progress: 0,
        episodeDuration: 0,
        episodesWatched: 0,
        rewatchedCounter: 1,
        hours: 0,
        rating: 0,
        favourite: false,
        link: '',
        refreshed: false
      }
    },
    books: {
      statuses: [
        {
          name: "Currently Reading",
          default: false,
          id: 'currently_reading'
        },
        {
          name: "Plan to Read",
          default: false,
          id: 'plan_to_read'
        },
        {
          name: "Read All",
          default: true,
          id: 'completed'
        },
        {
          name: "Dropped",
          default: false,
          id: 'dropped'
        }
      ],
      default: {
        category: 'books',
        title: '',
        author: '',
        status: '',
        durationHours: 0,
        durationMinutes: 0,
        rereadCounter: 1,
        rating: 0,
        hours: 0,
        favourite: false,
        link: '',
        refreshed: false
      }
    }
  },
  mutations: {

    SAVE_WINDOW_PARAMS(state, { width, height }) {
      state.windowParams.width = width
      state.windowParams.height = height
    },

    CHANGE_MODAL_STATE(state, { visibility, purpose, type }) {
      state.modalState.visibility = visibility
      if (purpose != undefined) state.modalState.purpose = purpose
      if (type != undefined) state.modalState.type = type
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
      }, 1000)
    },

    DELETE_SLOT(state, id) {
      let target = state.collection.map(i => i.id).indexOf(id)
      state.collection.splice(target, 1)
    },

    CHANGE_BACKUP_STATE(state, data) {
      state.backupState = data
    },

    SAVE_ALLOW_STATE(state, process) {
      state.allowEdit = process == 'development' ? true : false
    },
  },
  actions: {

    restoreFromLocalStorage({ commit }) {
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

    getBackup({ dispatch, state, commit }) {
      commit('CHANGE_BACKUP_STATE', {
        status: 'loading',
        message: 'loading collection...'
      })
      
      // Backup file storage system
      if (process.env.NODE_ENV === 'production') {
        let storedItems = backUp

        this._vm.$storage.clear({ force: true })

        if (storedItems.length && Array.isArray(storedItems)) {
          state.collection = []
          for (let n = 0; n < storedItems.length; n++) {
            if (storedItems[n].id != undefined) {
              commit('APPLY_SLOT', {
                content: storedItems[n], 
                scenario: 'start'
              })
            }
          }
        }

        commit('CHANGE_BACKUP_STATE', {
          status: 'success',
          message: 'updated'
        })
      }

      // localStorage storage system
      else if (process.env.NODE_ENV === 'development') {
        dispatch('restoreFromLocalStorage')

        commit('CHANGE_BACKUP_STATE', {
          status: 'success',
          message: 'updated'
        })
      }

      else {
        commit('CHANGE_BACKUP_STATE', {
          status: 'error',
          message: 'failed to restore collection!'
        })
      }
    }

  }
})