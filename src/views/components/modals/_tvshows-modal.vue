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
                maxlength='50'
                type='text'
                ref='title'
                class='input__field' 
                :class='{"input__field--invalid" : valid == false }'
                autocomplete='off' 
                @input='removeValidation'
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

            div(class='grid__row' v-if='fieldsCondition()')
              //- RATING -//
              div(class='grid__col grid__col--lg-24 grid__col--md-24 grid__col--sm-24 grid__col--xs-24 grid__col--mb-26')
                app-rating(:currentRating='current.rating')
              //- FAVOURITE -//
              div(class='grid__col grid__col--lg-12 grid__col--md-12 grid__col--sm-12 grid__col--xs-12 grid__col--mb-10 grid__col--right')
                app-favourite(:currentFavourite='current.favourite')

            div(class='grid__row' v-if='fieldsCondition()')
              //- CURRENT SEASON -//
              div(class='grid__col grid__col--lg-12 grid__col--md-12')
                div(class='input')
                  label(class='input__label') Watching Season
                  input(
                    type='number'
                    class='input__field' 
                    autocomplete='off' 
                    min='1'
                    onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
                    @wheel='changeNumberVal($event, "currentSeason")'
                    v-model='current.currentSeason')

              div(class='grid__col grid__col--lg-12 grid__col--md-12')
                div(class='number')
                  label(class='input__label') Watching Episode
                  input(
                    type='number'
                    class='input__field' 
                    autocomplete='off' 
                    min='1'
                    onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
                    @wheel='changeNumberVal($event, "currentEpisode")'
                    v-model='current.currentEpisode')

              div(class='grid__col grid__col--lg-12 grid__col--md-12')
                div(class='input')
                  label(class='input__label') Total Seasons
                  input(
                    type='number'
                    class='input__field' 
                    autocomplete='off' 
                    min='1'
                    onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
                    @wheel='changeNumberVal($event, "totalSeasons")'
                    v-model='current.totalSeasons')
            
              div(class='grid__col grid__col--lg-12 grid__col--md-12')
                div(class='input')
                  label(class='input__label') Episode Duration
                  input(
                    type='number'
                    class='input__field' 
                    autocomplete='off' 
                    min='1'
                    onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
                    @wheel='changeNumberVal($event, "episodeDuration")'
                    v-model='current.episodeDuration')

              div(class='grid__col grid__col--lg-12 grid__col--md-12')
                div(class='input')
                  label(class='input__label') Watched Episodes
                  input(
                    type='number'
                    class='input__field' 
                    autocomplete='off' 
                    min='1'
                    onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
                    @wheel='changeNumberVal($event, "episodesWatched")'
                    v-model='current.episodesWatched')

              div(class='grid__col grid__col--lg-12 grid__col--md-12')
                div(class='input')
                  label(class='input__label') Times Watched
                  input(
                    type='number'
                    class='input__field' 
                    autocomplete='off' 
                    min='1'
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

export default {
  name: 'tvshowsModal',
  props: {
    purpose: String
  },
  data() {
    return {
      valid: undefined,
      current: {},
      confirmActive: false,
      titleVisible: false
    }
  },
  methods: {
    closeModal() { 
      eventBus.$emit('closeModal') 
    },

    assignPayload() { 
      this.current = Object.assign({}, this.content)
    },

    changeConfirm(state) {
      this.confirmActive = state 
    },

    removeValidation() {
      this.valid = undefined
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

    validateModal() {
      return new Promise(resolve => {
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

    slotExist(id) {
      if (this.tvshowsCollection.some(e => e.id == id)) {
        return true
      }
      return false
    },

    applySlot(id) {
      this.setDefaults()
      this.validateModal().then(result => {
        if (result) {
          this.current.refreshed = true
          this.$store.commit('APPLY_SLOT', { content: this.current, scenario: 'change' })
          this.$storage.set('slot_' + this.current.id, { key: this.current })
          this.$store.dispatch('sendBackup')
          this.closeModal()
          this.changeConfirm(false)
        }
      })
    },

    deleteSlot(id) {
      this.$store.commit('DELETE_SLOT', id)
      this.$storage.remove('slot_' + this.current.id)
      this.$store.dispatch('sendBackup')
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

      if (event.deltaY < 1) {
        newVal = prevVal + interval
      } else if (event.deltaY > 1) {
        if (prevVal == 1) { 
          newVal = 1 
        } else { 
          newVal = prevVal - interval 
        }
      }

      this.current[prop] = Number(newVal)
    },

    setStatus(id) {
      this.current.status = id
    },

    setPlatform(id) {
      this.current.platform = id
    },

    setRating(data) {
      this.current.rating = data 
    },

    setFavourite(data) {
      this.current.favourite = data 
    },

    sethoursApproximate(data) {
      this.current.hoursApproximate = data
    },

    focusTitle() {
      this.titleVisible = true
      this.$nextTick(() => {
        if (this.$refs.title != undefined) {
          this.$refs.title.focus()
        }
      })
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
    },

    excludingCategory() {
      let exclude = this.$store.state["tvshows"].statuses.filter(i => i.excludeFields)[0]

      if (exclude) return exclude[0].id
      else return
    },
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
    eventBus.$on('hoursApproximate', data => this.sethoursApproximate(data))
  }
}
</script>