<template lang="pug">

  transition(name='modal-fade')

    div(class='modal-backdrop')

      div(class='modal modal--films')

        div(
          class='modal__close'
          @click='closeModal(), changeConfirm(false)'
          v-ripple)
          svg(class='modal__cross'): use(xlink:href='#close')

        div(
          class='modal__content'
          v-scrollbar='{ preventParentScroll: true }')

          div(class='modal__fields')

            //- TITLE -//
            div(class='input')
              label(class='input__label') Title
              input(
                pattern='_[a-zA-Z0-9]+'
                minlength='3'
                maxlength='70'
                type='text'
                ref='title'
                class='input__field' 
                :class='{"input__field--invalid" : valid.title == false}'
                v-tooltip='{ content: "Title field is required", offset: 5, trigger: "manual", show: valid.title == false}'
                autocomplete='off' 
                @input='removeValidation("title")'
                v-if='titleVisible'
                v-model='current.title'
                required)

            //- STATUS -//
            app-dropdown(
              :label='"Status"'
              :category='"films"'
              :type='"statuses"'
              :current='current.status')
              input(
                slot='dropdown-input' 
                v-model='current.status' 
                type='text')
              li(
                slot='dropdown-menu'
                class='dropdown__item'
                v-for='status in films.statuses'
                @click='setStatus(status.id)') 
                svg(class='dropdown__icon'): use(:xlink:href="require('@/assets/sprite.svg')+ '#' + status.id")
                span {{status.name}}

            div(class='grid__row')
              //- RATING -//
              div(class='grid__col grid__col--lg-24 grid__col--md-24 grid__col--sm-24 grid__col--xs-24 grid__col--mb-26')
                app-rating(:currentRating='current.rating' :type='"films"')
              //- FAVOURITE -//
              div(class='grid__col grid__col--lg-12 grid__col--md-12 grid__col--sm-12 grid__col--xs-12 grid__col--mb-10 grid__col--right')
                app-favourite(:currentFavourite='current.favourite' :type='"films"')
            
              div(class='grid__col grid__col--mb-24')
                div(class='input input--dual')
                  label(class='input__label') Film Duration
                  div(class='input__pairs')
                    div(class='input__pair')
                      input(
                        id='durationHours'
                        type='number'
                        class='input__field input__field--left' 
                        autocomplete='off' 
                        min='0'
                        @input='convertToNumber("durationHours")'
                        onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
                        @wheel='changeNumberVal($event, "durationHours")'
                        v-model='current.durationHours')
                      label(class='input__prefix input__prefix--right' for='durationHours') h
                    div(class='input__separator input__separator--colon')
                    div(class='input__pair')
                      input(
                        id='durationMinutes'
                        type='number'
                        class='input__field input__field--left' 
                        autocomplete='off' 
                        min='0'
                        @input='convertToNumber("durationMinutes")'
                        onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
                        @wheel='changeNumberVal($event, "durationMinutes")'
                        v-model='current.durationMinutes')
                      label(class='input__prefix input__prefix--right' for='durationMinutes') min

              div(class='grid__col grid__col--mb-12')
                div(class='input input--dual')
                  label(class='input__label') Times Watched
                  div(class='input__pair')
                    label(class='input__prefix input__prefix--left' for='rewatch') ×
                    input(
                      id='rewatch'
                      type='number'
                      class='input__field input__field--right' 
                      autocomplete='off' 
                      min='0'
                      @input='convertToNumber("rewatchedCounter")'
                      onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
                      @wheel='changeNumberVal($event, "rewatchedCounter")'
                      v-model='current.rewatchedCounter')

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
import backUp from "../../../../backups/backup_21.08.2022.json"

export default {
  name: 'filmsModal',
  props: {
    purpose: String
  },
  data() {
    return {
      valid: {
        title: undefined,
        viewedSeasons: undefined
      },
      current: {},
      confirmActive: false,
      titleVisible: false
    }
  },
  methods: {
    closeModal() { 
      eventBus.$emit('closeModal', 'films') 
    },

    assignPayload() { 
      this.current = Object.assign({}, this.content)
    },

    changeConfirm(state) {
      this.confirmActive = state 
    },

    removeValidation(target) {
      if (target) {
        this.valid[target] = undefined
      } else {
        Object.keys(this.valid).forEach(key => {
          this.valid[key] = undefined
        })
      }
    },

    setDefaults() {
      let filmsData = this.$store.state["films"]

      if (this.purpose == 'add') {
        this.current.id = Math.floor(Math.random() * 10000000000)
      }

      if (this.current.status.length == 0) {
        let defaultStatus = filmsData.statuses.filter(i => i.default)[0]
        this.current.status = defaultStatus.name
        this.current.status = defaultStatus.id
      }
    },

    setHours() {
      this.current.hours = parseFloat(((this.current.durationHours + this.current.durationMinutes / 60) * this.current.rewatchedCounter).toFixed(1))
    },

    validateModal() {
      return new Promise(resolve => {
        if (this.current.title.length == 0) {
          this.valid.title = false
        }

        if (this.current.viewedSeasons > this.current.totalSeasons) {
          this.valid.viewedSeasons = false
        }

        let results = []

        Object.values(this.valid).forEach(value => {
          results.push(value)
        })

        if (results.some(el => el == false)) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    },

    slotExist(id) {
      if (this.filmsCollection.some(e => e.id == id)) {
        return true
      }
      return false
    },

    convertToNumber(key) {
      this.current[key] = parseFloat(this.current[key])
    },

    applySlot(id) {
      this.setDefaults()
      this.setHours()
      this.validateModal().then(result => {
        if (result) {
          this.current.refreshed = true
          this.$store.commit('APPLY_SLOT', { content: this.current, scenario: 'change' })
          this.$storage.set('slot_' + this.current.id, { key: this.current })
          this.closeModal()
          this.changeConfirm(false)
        }
      })
    },

    deleteSlot(id) {
      this.$store.commit('DELETE_SLOT', id)
      this.$storage.remove('slot_' + this.current.id)
    },

    changeNumberVal(event, prop) {
      event.preventDefault()

      this.removeValidation(prop)

      let target = event.target
      let interval = 1
      let prevVal = parseFloat(target.value)
      let newVal
      let min = 0

      if (event.deltaY < min) {
        newVal = prevVal + interval
      } else if (event.deltaY > min) {
        if (prevVal == min) { 
          newVal = min 
        } else { 
          newVal = prevVal - interval 
        }
      }

      this.current[prop] = parseFloat(newVal)
    },

    setStatus(id) {
      this.current.status = id
    },

    setRating(data) {
      this.current.rating = data 
    },

    setFavourite(data) {
      this.current.favourite = data 
    },

    focusTitle() {
      this.titleVisible = true
      this.$nextTick(() => {
        if (this.$refs.title != undefined) {
          this.$refs.title.focus()
        }
      })
    },

    restoreFromBackup() {
      // fire this only if localStorage is lost and you want
      // to restore data from your backup
      let films = backUp.collection.filter(n => n.category == 'films')

      for (let i = 0; i < films.length; i++) {
        this.$storage.set('slot_' + films[i].id, { key: films[i] })
      }
    }
  },
  computed: {
    films() {
      return this.$store.state.films 
    },

    content() {
      return this.$store.state.content 
    },

    filmsCollection() {
      return this.$store.state.collection.filter(i => i.category == 'films')
    }
  },
  mounted() {
    document.addEventListener('keyup', e => {
      if (e.key == "Escape" || e.key == "Esc" || e.keyCode == 27) this.closeModal()
    })

    eventBus.$on('openModal', () => {
      this.focusTitle()
    })

    eventBus.$on('modalOpened', () => {
      this.assignPayload()
    })

    eventBus.$on('modalClosed', () => {
      this.assignPayload()
      this.removeValidation()
    })

    eventBus.$on('rated', data => this.setRating(data))
    eventBus.$on('favourite', data => this.setFavourite(data))

    // this.restoreFromBackup()
  }
}
</script>