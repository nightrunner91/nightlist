<template lang="pug">

  transition(name='modal-fade')

    div(class='modal-backdrop')

      div(class='modal modal--games')

        div(
          class='modal__close'
          @click='closeModal(), changeConfirm(false)'
          v-ripple)
          svg(class='modal__cross'): use(xlink:href='#close')

        div(class='modal__content')

          div(class='modal__fields')

            //- TITLE -//
            div(class='input')
              label(class='input__label') Title
              input(
                pattern='_[a-zA-Z0-9]+'
                minlength='3'
                maxlength='50'
                type='text'
                class='input__field' 
                :class='{"input__field--invalid" : valid == false }'
                autocomplete='off' 
                @input='removeValidation'
                v-model='current.title'
                required)

            //- STATUS -//
            app-dropdown(
              :label='"Status"'
              :currentValue='current.status'
              :currentId='getStatusId(current.status)'
              :defaultValue='games.statuses.filter(i => i.default)[0].name'
              :itemsCount='games.statuses.length')
              input(
                slot='dropdown-input' 
                v-model='current.status' 
                type='text')
              li(
                slot='dropdown-menu'
                class='dropdown__item'
                v-for='status in games.statuses'
                @click='setStatus(status.name, status.id)') 
                svg(class='dropdown__icon'): use(:xlink:href="require('@/assets/sprite.svg')+ '#' + status.id")
                span {{status.name}}

            div(class='grid__row' v-if='fieldsCondition()')
              //- RATING -//
              div(class='grid__col grid__col--lg-24')
                app-rating(:currentRating='current.rating')
              //- FAVOURITE -//
              div(class='grid__col grid__col--lg-12 grid__col--right')
                app-favourite(:currentFavourite='current.favourite')

            //- PLATFORM -//
            app-dropdown(
              :label='"Platform"'
              :currentValue='current.platform'
              :currentId='getPlatformId(current.platform)'
              :defaultValue='games.platforms.filter(i => i.default)[0].name'
              :itemsCount='games.platforms.length')
              input(
                slot='dropdown-input'
                v-model='current.platform'
                type='text')
              li(
                slot='dropdown-menu'
                class='dropdown__item'
                v-for='platform in games.platforms'
                @click='setPlatform(platform.name, platform.id)')
                svg(class='dropdown__icon'): use(:xlink:href="require('@/assets/sprite.svg')+ '#' + platform.id")
                span {{platform.name}}

            div(class='grid__row' v-if='fieldsCondition()')
              //- HOURS -//
              div(class='grid__col grid__col--lg-16')
                div(class='input')
                  label(class='input__label') Hours played
                  input(
                    type='number'
                    min='0'
                    class='input__field' 
                    autocomplete='off' 
                    v-model='current.hours'
                    onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
                    @wheel='changeNumberVal($event, "hours")')
              //- HOURS APPROXIMATE -//
              div(class='grid__col grid__col--lg-20 grid__col--right')
                app-checkbox(
                  :label='"Approximate value"'
                  :currentCheckbox='current.hoursApproximate'
                  :event='"hoursApproximate"')

            //- LINK -//
            div(class='input')
              label(class='input__label') Link #[sup (optional)]
              input(
                type='text'
                class='input__field' 
                autocomplete='off' 
                v-model='current.link')

        div(class='modal__footer')

          div(v-if='purpose == "edit"')

            div(
              class='button button--secondary'
              v-show='confirmActive == false'
              @click='changeConfirm(true)')
              svg(class='button__icon'): use(xlink:href='#delete')
              span(class='button__text') Delete

            div(
              v-show='confirmActive == true'
              class='modal__confirmation')

                div(
                  class='button button--secondary'
                  @click='deleteSlot(current.id), closeModal(), changeConfirm(false)')
                  svg(class='button__icon'): use(xlink:href='#confirm')
                  span(class='button__text') Confirm

                div(
                  class='button button--secondary button--iconed'
                  @click='changeConfirm(false)')
                  svg(class='button__icon'): use(xlink:href='#cancel')

          div(v-else-if='purpose == "add"')

            div(
              class='button button--secondary'
              @click='closeModal(), changeConfirm(false)')
              span(class='button__text') Cancel

          div(
            class='button button--main'
            @click='applySlot(current.id)'
            v-ripple)
            span(class='button__text' v-if='purpose == "edit"') Save
            span(class='button__text' v-else-if='purpose == "add"') Add

</template>

<script>
import { eventBus } from "../../../main"

export default {
  name: 'gamesModal',
  props: {
    purpose: String
  },
  data() {
    return {
      valid: undefined,
      current: {},
      confirmActive: false
    }
  },
  methods: {
    closeModal() { 
      eventBus.$emit('closeModal') 
    },

    assignPayload() { 
      this.current = Object.assign({}, this.payload)
    },

    changeConfirm(state) {
      this.confirmActive = state 
    },

    removeValidation() {
      this.valid = undefined
    },

    getPlatformId(name) {
      if (this.current.platform) {
        return this.games.platforms.filter(i => i.name == this.current.platform)[0].id
      } else { 
        return this.games.platforms.filter(i => i.default)[0].id
      }
    },

    getStatusId(name) {
      if (this.current.status) {
        return this.games.statuses.filter(i => i.name == this.current.status)[0].id
      } else { 
        return this.games.statuses.filter(i => i.default)[0].id
      }
    },

    validateModal() {
      return new Promise(resolve => {
        if (this.purpose == 'add') {
          this.current.id = Math.floor(Math.random() * 10000000000)
        }

        if (this.current.status.length == 0) {
          this.current.status = this.$store.state["games"].statuses.filter(i => i.default)[0].name
        }

        if (this.current.statusId == 'plan_to_play') {
          this.current.hours = this.$store.state["games"].default.hours
          this.current.hoursApproximate = this.$store.state["games"].default.hoursApproximate
          this.current.rating = this.$store.state["games"].default.rating
          this.current.favourite = this.$store.state["games"].default.favourite
          this.current.priority = this.$store.state["games"].default.priority
        }

        if (this.current.platform.length == 0) {
          let defaultPlatform = this.$store.state["games"].platforms.filter(i => i.default)[0]
          this.current.platform = defaultPlatform.name
          this.current.platformId = defaultPlatform.id
        }

        if (this.current.title.length == 0) {
          this.valid = false
        }

        if (this.valid == false) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    },

    applySlot(id) {
      this.validateModal().then(result => {
        if (result) {
          this.current.refreshed = true
          this.$store.commit('applySlot', { type: "games" , payload: this.current })
          this.$storage.set('games_' + this.current.id, { key: this.current })
          this.closeModal()
          this.changeConfirm(false)
        }
      })
    },

    deleteSlot(id) {
      this.$store.commit('deleteSlot', { type: "games", id: id })
      this.$storage.remove('games_' + id)
    },

    fieldsCondition() {
      if (
        this.current.status != undefined && 
        this.current.status == this.excludingCategory) {
          return false
        } else {
          return true
        }
    },

    changeNumberVal(event, prop) {
      event.preventDefault()

      let target = event.target
      let interval = 1
      let prevVal = Number(target.value)
      let newVal

      if (event.deltaY < 0) {
        newVal = prevVal + interval
      } else if (event.deltaY > 0) {
        if (prevVal == 0) { 
          newVal = 0 
        } else { 
          newVal = prevVal - interval 
        }
      }

      this.current[prop] = newVal
    },

    setStatus(name, id) { 
      this.current.status = name
      this.current.statusId = id
    },

    setPlatform(name, id) { 
      this.current.platform = name
      this.current.platformId = id
    },

    setRating(data) { 
      this.current.rating = data 
    },

    setFavourite(data) {
      this.current.favourite = data 
    },

    sethoursApproximate(data) {
      this.current.hoursApproximate = data
    }
  },
  computed: {
    games() { 
      return this.$store.state.games 
    },

    payload() { 
      return this.$store.state.payload 
    },

    excludingCategory() {
      return this.$store.state["games"].statuses.filter(i => i.excludeFields)[0].name
    }
  },
  mounted() {
    document.addEventListener('keyup', e => {
      if (e.key == "Escape" || e.key == "Esc" || e.keyCode == 27) this.closeModal()
    })

    eventBus.$on('modalOpened', () => this.assignPayload())
    eventBus.$on('modalClosed', () => {
      this.assignPayload()
      this.removeValidation()
    })

    eventBus.$on('rated', data => this.setRating(data))
    eventBus.$on('favourite', data => this.setFavourite(data))
    eventBus.$on('hoursApproximate', data => this.sethoursApproximate(data))
  }
}
</script>