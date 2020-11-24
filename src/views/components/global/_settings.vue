<template lang='pug'>
  
  div(
    class='settings'
    ref='settings'
    :class='"settings--" + currentClass')

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
          required)

      app-selector

      div(class='input')
        label(class='input__label') Manual synchronization
        div(class='input__buttons')
          div(
            class='button' 
            :class='"button--" + currentClass'
            @click='getBackup()'
            v-ripple)
            svg(class='button__icon'): use(xlink:href='#backup-get')
            span(class='button__text') Restore
          div(
            class='button' 
            :class='"button--" + currentClass'
            @click='sendBackup()'
            v-ripple)
            svg(class='button__icon'): use(xlink:href='#backup-send')
            span(class='button__text') Upload

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
      binId: ''
    }
  },
  computed: {
    currentClass() {
      return this.$router.options.routes.filter(i => i.name == this.$route.name)[0].id
    },

    storedBin() {
      return this.$store.state.binId
    }
  },
  methods: {
    bindOutsideClick() {	
      document.addEventListener('keyup', e => {	
        if (e.key == "Escape" || e.key == "Esc" || e.keyCode == 27) this.closeSettings()
      })
    },

    closeSettings() {
      eventBus.$emit('closeSettings')
    },

    saveSettings() {
      this.$storage.set('binId', { key: this.binId })
      this.$store.commit('SAVE_BIN_ID', this.binId)

      eventBus.$emit('changeUsername', this.username)
      eventBus.$emit('changeAvatar', this.avatar)
    },

    saveSlot() {
      this.$store.dispatch('sendSlot')
    },

    restoreSettings() {
      if (this.storedBin.length > 0) this.binId = this.storedBin
    },

    getBackup() {
      eventBus.$emit('getBackup')
    },

    sendBackup() {
      eventBus.$emit('sendBackup')
    }
  },
  mounted() {
    this.restoreSettings()
    this.bindOutsideClick()
  }
}
</script>