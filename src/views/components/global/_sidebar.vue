<template lang='pug'>
  
  aside(
    class='sidebar'
    :class='{"sidebar--blured" : modalState.visibility}')

    div(class='sidebar__profile')
      div(
        class='sidebar__avatar'
        :style='avatarStyles')
      div(class='sidebar__username') {{username}}

    div(class='sidebar__menu')
      router-link(
        v-for='route in routes'
        v-if='route.mainMenu'
        :to='route.path'
        class='sidebar__link'
        @click.native='closeSettings()'
        :key='route.id')
        div(
          class='sidebar__icon'
          v-if='route.id == "dashboard"')
          svg(class='sidebar__bookmark sidebar__bookmark--passive'): use(xlink:href='#dashboard-passive')
          svg(class='sidebar__bookmark sidebar__bookmark--active'): use(xlink:href='#dashboard-active')
        div(
          class='sidebar__icon'
          v-else)
          svg(class='sidebar__bookmark sidebar__bookmark--passive'): use(xlink:href='#bookmark-passive')
          svg(class='sidebar__bookmark sidebar__bookmark--active'): use(xlink:href='#bookmark-active')
        span(class='sidebar__name') {{route.name}}
        span(
          v-if='route.id == "dashboard"'
          class='sidebar__badge badge badge--small') {{totalLength()}}
        span(
          v-else
          class='sidebar__badge badge badge--small') {{categoryLength(route.id)}}

    svg(
      v-if='!settingsOpened'
      class='sidebar__settings'
      @click='openSettings()'): use(xlink:href='#settings')

    transition(name='settings-reveal' mode='out-in')
      app-settings(v-if='settingsOpened')

</template>

<script>
import { eventBus } from "../../../main"

export default {
  name: 'Sidebar',
  props: {
    
  },
  data() {
    return {
      settingsOpened: false,
      tempUsername: '',
      tempAvatar: 'img/default-avatar.svg'
    }
  },
  computed: {
    modalState() {
      return this.$store.state.modalState
    },

    username() {
      return this.$store.state.username
    },

    avatarStyles() {
      if (this.$store.state.avatar.length > 0) {
        return 'background-image: url(' + this.$store.state.avatar + ')'
      } else {
        return 'background-image: url()'
      }
    },

    routes() {
      return this.$router.options.routes
    },

    currentPage() {
      let rName = this.$route.name
      if (rName != null) return rName
      else return
    },

    storedBinId() {
      return this.$store.state.binId
    },

    storedUsername() {
      let storedUsername = this.$storage.get('username')

      if (
        storedUsername != null && 
        storedUsername.key.length > 0 &&
        this.tempUsername.length == 0) return storedUsername.key
      else return this.tempUsername
    },

    storedAvatar() {
      let storedAvatar = this.$storage.get('avatar')

      if (storedAvatar != null && storedAvatar.key.length > 0) return storedAvatar.key
      else return this.tempAvatar
    },
  },
  methods: {
    categoryLength(id) {
      return this.$store.state.collection.filter(i => i.category == id).length
    },

    totalLength() {
      return this.$store.state.collection.length
    },

    openSettings() {
      this.settingsOpened = true
    },

    closeSettings() {
      this.settingsOpened = false
    },

    getBackup() {
      this.$store.dispatch('getBackup')
    },

    sendBackup() {
      this.$store.dispatch('sendBackup')
    }
  },
  mounted() {
    eventBus.$on('closeSettings', () => {
      this.closeSettings()
    })

    eventBus.$on('getBackup', () => {
      this.getBackup()
    })

    eventBus.$on('sendBackup', () => {
      this.sendBackup()
    })
  }
}
</script>