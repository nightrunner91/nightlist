<template lang='pug'>
  
  div(
    class='settings'
    ref='settings'
    :class='["settings--" + settingsPosition, "settings--" + currentClass]')

    div(
      class='settings__close'
      @click='closeSettings()'
      v-ripple)
      svg(class='settings__cross'): use(xlink:href='#close')

    div(class='settings__content')

      div(class='input')
        label(class='input__label') Cloud ID
        input(
          pattern='_[a-zA-Z0-9]+'
          minlength='3'
          maxlength='50'
          type='text'
          class='input__field' 
          autocomplete='off' 
          v-model='binId'
          @input='saveBinId(), getBackup()'
          required)

      div(
        class='input'
        v-if='binId.length > 0')
        label(class='input__label') Username
        input(
          pattern='_[a-zA-Z0-9]+'
          minlength='3'
          maxlength='20'
          type='text'
          class='input__field' 
          autocomplete='off' 
          v-model='username'
          @input='saveUsername()')

      div(
        class='input'
        v-if='binId.length > 0')
        label(class='input__label') 
          span Avatar
          sup (link)
        input(
          pattern='_[a-zA-Z0-9]+'
          type='text'
          class='input__field' 
          autocomplete='off' 
          v-model='avatar'
          @input='saveAvatar()')

</template>

<script>
import { eventBus } from "../../../main"

export default {
  name: 'Settings',
  props: {
    sidebarCollapsed: Boolean
  },
  data() {
    return {
      binId: '',
      username: '',
      avatar: ''
    }
  },
  computed: {
    currentClass() {
      return this.$router.options.routes.filter(i => i.name == this.$route.name)[0].id
    },

    storedBin() {
      return this.$store.state.settings.binId
    },

    storedUsername() {
      return this.$store.state.settings.username
    },

    storedAvatar() {
      return this.$store.state.settings.avatar
    },

    settingsPosition() {
      if (this.sidebarCollapsed) {
        return 'outside'
      } else {
        return 'inside'
      }
    }
  },
  watch: {
    storedBin() { this.restoreSettings() },
    storedUsername() { this.restoreSettings() },
    storedAvatar() { this.restoreSettings() }
  },
  methods: {
    closeSettings() {
      eventBus.$emit('closeSettings')
    },

    saveBinId() {
      this.$storage.set('binId', { key: this.binId })
      this.$store.commit('SAVE_BIN_ID', this.binId)
    },

    saveUsername() {
      this.$storage.set('username', { key: this.username })
      this.$store.commit('SAVE_USERNAME', this.username)
    },

    saveAvatar() {
      this.$storage.set('avatar', { key: this.avatar })
      this.$store.commit('SAVE_AVATAR', this.avatar)
    },

    restoreSettings() {
      if (this.storedBin.length > 0) this.binId = this.storedBin
      if (this.storedUsername.length > 0) this.username = this.storedUsername
      if (this.storedAvatar.length > 0) this.avatar = this.storedAvatar
    },

    getBackup() {
      this.$store.dispatch('getBackup')
    }
  },
  mounted() {
    this.restoreSettings()
  }
}
</script>