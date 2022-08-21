<template lang="pug">

  transition(name='modal-fade')

    div(class='modal-backdrop')

      div(class='modal modal--tvshows')

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
              :category='"tvshows"'
              :type='"statuses"'
              :current='current.status')
              input(
                slot='dropdown-input' 
                v-model='current.status' 
                type='text')
              li(
                slot='dropdown-menu'
                class='dropdown__item'
                v-for='status in tvshows.statuses'
                @click='setStatus(status.id)') 
                svg(class='dropdown__icon'): use(:xlink:href="require('@/assets/sprite.svg')+ '#' + status.id")
                span {{status.name}}

            div(class='grid__row')
              //- RATING -//
              div(class='grid__col grid__col--lg-24 grid__col--md-24 grid__col--sm-24 grid__col--xs-24 grid__col--mb-26')
                app-rating(:currentRating='current.rating' :type='"tvshows"')
              //- FAVOURITE -//
              div(class='grid__col grid__col--lg-12 grid__col--md-12 grid__col--sm-12 grid__col--xs-12 grid__col--mb-10 grid__col--right')
                app-favourite(:currentFavourite='current.favourite' :type='"tvshows"')

            div(class='grid__row')
              //- LAST EPISODE -//
              div(class='grid__col grid__col--lg-18 grid__col--md-18 grid__col--sm-18 grid__col--xs-18 grid__col--mb-36')
                div(class='input input--dual')
                  label(class='input__label') Last Watched Episode
                  div(class='input__pairs')
                    div(class='input__pair')
                      label(class='input__prefix input__prefix--left' for='season') s
                      input(
                        id='season'
                        type='number'
                        class='input__field input__field--right' 
                        autocomplete='off' 
                        min='1'
                        @input='convertToNumber("currentSeason")'
                        onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
                        @wheel='changeNumberVal($event, "currentSeason")'
                        v-model='current.currentSeason')
                    div(class='input__separator input__separator--cross')
                    div(class='input__pair')
                      label(class='input__prefix input__prefix--left' for='episode') e
                      input(
                        id='episode'
                        type='number'
                        class='input__field input__field--right' 
                        autocomplete='off' 
                        min='1'
                        @input='convertToNumber("currentEpisode")'
                        onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
                        @wheel='changeNumberVal($event, "currentEpisode")'
                        v-model='current.currentEpisode')

              //- SEASONS PROGRESS -//
              div(class='grid__col grid__col--lg-18 grid__col--md-18 grid__col--sm-18 grid__col--xs-18 grid__col--mb-36')
                div(class='input input--dual')
                  label(class='input__label') Seasons Progress
                  div(class='input__pairs')
                    input(
                      type='number'
                      class='input__field'
                      :class='{"input__field--invalid" : valid.viewedSeasons == false}'
                      autocomplete='off' 
                      min='0'
                      v-tooltip='{ content: "Viewed Seasons cannot be greater than Total Seasons", offset: 5, trigger: "manual", show: valid.viewedSeasons == false}'
                      onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
                      @wheel='changeNumberVal($event, "viewedSeasons"), removeValidation("viewedSeasons")'
                      @input='removeValidation("viewedSeasons"), convertToNumber("viewedSeasons")'
                      v-model='current.viewedSeasons')
                    div(class='input__separator input__separator--slash')
                    input(
                      type='number'
                      class='input__field' 
                      autocomplete='off' 
                      min='1'
                      onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
                      @wheel='changeNumberVal($event, "totalSeasons"), removeValidation("viewedSeasons")'
                      @input='removeValidation("viewedSeasons"), convertToNumber("totalSeasons")'
                      v-model='current.totalSeasons')
            
              div(class='grid__col grid__col--lg-12 grid__col--md-12 grid__col--sm-12 grid__col--xs-12 grid__col--mb-12')
                div(class='input input--dual')
                  label(class='input__label') Episode Duration
                  div(class='input__pair')
                    input(
                      id='duration'
                      type='number'
                      class='input__field input__field--left' 
                      autocomplete='off' 
                      min='1'
                      @input='convertToNumber("episodeDuration")'
                      onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
                      @wheel='changeNumberVal($event, "episodeDuration")'
                      v-model='current.episodeDuration')
                    label(class='input__prefix input__prefix--right' for='duration') min

              div(class='grid__col grid__col--lg-12 grid__col--md-12 grid__col--sm-12 grid__col--xs-12 grid__col--mb-12')
                div(class='input')
                  label(class='input__label') Watched Episodes
                  input(
                    type='number'
                    class='input__field' 
                    autocomplete='off' 
                    min='1'
                    @input='convertToNumber("episodesWatched")'
                    onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
                    @wheel='changeNumberVal($event, "episodesWatched")'
                    v-model='current.episodesWatched')

              div(class='grid__col grid__col--lg-12 grid__col--md-12 grid__col--sm-12 grid__col--xs-12 grid__col--mb-12')
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
  name: 'tvshowsModal',
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
      eventBus.$emit('closeModal', 'tvshows') 
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
      let tvshowsData = this.$store.state["tvshows"]

      if (this.purpose == 'add') {
        this.current.id = Math.floor(Math.random() * 10000000000)
      }

      if (this.current.status.length == 0) {
        let defaultStatus = tvshowsData.statuses.filter(i => i.default)[0]
        this.current.status = defaultStatus.name
        this.current.status = defaultStatus.id
      }
    },

    setProgress() {
      if (this.current.viewedSeasons <= this.current.totalSeasons) {
        this.current.progress = parseFloat((((this.current.viewedSeasons * 100) / this.current.totalSeasons)).toFixed(0))
      } else {
        this.current.progress = 100
      }
    },

    setHours() {
      this.current.hours = parseFloat(((this.current.episodeDuration * this.current.episodesWatched * this.current.rewatchedCounter) / 60).toFixed(0))
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
      if (this.tvshowsCollection.some(e => e.id == id)) {
        return true
      }
      return false
    },

    convertToNumber(key) {
      this.current[key] = parseFloat(this.current[key])
    },

    applySlot(id) {
      this.setDefaults()
      this.setProgress()
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
      let min

      if (prop == 'totalSeasons') {
        min = 1
      } else {
        min = 0
      }

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
      let tvshows = backUp.collection.filter(n => n.category == 'tvshows')

      for (let i = 0; i < tvshows.length; i++) {
        this.$storage.set('slot_' + tvshows[i].id, { key: tvshows[i] })
      }
    }
  },
  computed: {
    tvshows() {
      return this.$store.state.tvshows 
    },

    content() {
      return this.$store.state.content 
    },

    tvshowsCollection() {
      return this.$store.state.collection.filter(i => i.category == 'tvshows')
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