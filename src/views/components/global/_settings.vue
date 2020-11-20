<template lang='pug'>
  
  div(
    class='settings'
    :class='"settings--" + currentClass')

    div(class='settings__content')

      div(class='input')
        label(class='input__label') Username
        input(
          pattern='_[a-zA-Z0-9]+'
          minlength='3'
          maxlength='50'
          type='text'
          class='input__field' 
          autocomplete='off' 
          v-model='username'
          required)

      div(class='input')
        label(class='input__label') Avatar (link to image)
        input(
          type='text'
          class='input__field' 
          autocomplete='off' 
          v-model='avatar'
          required)

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
          required)

    div(class='settings__footer')

      div(
        class='button button--secondary'
        @click='closeSettings()')
        span(class='button__text') Cancel

      div(
        class='button button--main'
        @click='saveSettings(), closeSettings()'
        v-ripple)
        span(class='button__text') Save

</template>

<script>
import { eventBus } from "../../../main"

export default {
  name: 'Settings',
  props: {
    
  },
  data() {
    return {
      username: '',
      avatar: '',
      binId: ''
    }
  },
  computed: {
    currentClass() {
      return this.$router.options.routes.filter(i => i.name == this.$route.name)[0].id
    }
  },
  methods: {
    closeSettings() {
      eventBus.$emit('closeSettings')
    },

    saveSettings() {
      this.$storage.set('username', { key: this.username })
      this.$storage.set('avatar', { key: this.avatar })
      this.$storage.set('binId', { key: this.binId })
      this.$store.commit('SAVE_BIN_ID', this.binId)

      eventBus.$emit('changeUsername', this.username)
      eventBus.$emit('changeAvatar', this.avatar)
    },

    saveSlot() {
      this.$store.dispatch('sendSlot')
    },

    restoreSettings() {
      let storedId = this.$storage.get('binId')
      let storedUsername = this.$storage.get('username')
      let storedAvatar = this.$storage.get('avatar')

      if (storedId != null) this.binId = storedId.key
      if (storedUsername != null) this.username = storedUsername.key
      if (storedAvatar != null) this.avatar = storedAvatar.key
    }
  },
  mounted() {
    this.restoreSettings()
  }
}
</script>