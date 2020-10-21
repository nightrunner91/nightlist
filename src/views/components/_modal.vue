<template lang="pug">

  transition(name='modal-fade')

    div(class='modal-backdrop')

      div(
        class='modal' 
        :class='"modal--" + type')

        div(
          class='modal__close'
          @click='closeModal(), changeConfirm(false)'
          v-ripple)
          svg(class='modal__cross'): use(xlink:href='#close')

        div(class='modal__content')

          //- ===== //
          //- GAMES //
          //- ===== //
          div(class='modal__fields' v-if='type == "games"')

            div(class='input')
              label(class='input__label') Title
              input(
                type='text'
                class='input__field' 
                autocomplete='off' 
                v-model='current.title')

            app-dropdown(
              :label='"Status"'
              :currentValue='current.status'
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
                @click='setStatus(status.name)') {{status.name}}

            div(class='grid__row' v-if='fieldsCondition()')
              div(class='grid__col grid__col--60')
                app-rating(:currentRating='current.rating')
              div(class='grid__col grid__col--40 grid__col--right')
                app-favourite(:currentFavourite='current.favourite')

            app-dropdown(
              v-if='fieldsCondition()'
              :label='"Platform"'
              :currentValue='current.platform'
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
                @click='setPlatform(platform.name)') {{platform.name}}

            div(class='grid__row' v-if='fieldsCondition()')
              div(class='grid__col grid__col--45')
                div(class='input')
                  label(class='input__label') Hours played
                  input(
                    type='number'
                    min='0'
                    class='input__field' 
                    autocomplete='off' 
                    v-model='current.hours'
                    onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
                    @wheel='changeVal($event, "hours")')
              div(class='grid__col grid__col--55 grid__col--right')
                app-checkbox(
                  :label='"Approximate value"'
                  :currentCheckbox='current.hoursApproximate'
                  :event='"hoursApproximate"')

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
                  @click='deleteSlot(type, current.id), closeModal(), changeConfirm(false)')
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
            @click='applySlot(type, current.id), closeModal(), changeConfirm(false)'
            v-ripple)
            span(class='button__text' v-if='purpose == "edit"') Save
            span(class='button__text' v-else-if='purpose == "add"') Add

</template>

<script>
import { eventBus } from "../../main";

export default {
  name: 'modal',
  props: {
    type: String,
    purpose: String
  },
  data() {
    return {
      current: {},
      confirmActive: false
    }
  },
  methods: {
    closeModal()    { eventBus.$emit('closeModal') },
    assignPayload() { this.current = Object.assign({}, this.payload) },

    changeConfirm(state) { this.confirmActive = state },
    applySlot(type, id)  {
      if (this.purpose == 'add') this.current.id = Math.floor(Math.random() * 10000000000);
      this.$store.commit('applySlot', { type: type , payload: this.current }) 
    },
    deleteSlot(type, id) { this.$store.commit('deleteSlot', { type: type, id: id }); },

    fieldsCondition() {
      if (
        this.current.status != undefined && 
        this.current.status == this.excludingCategory) return false
      else return true
    },

    changeVal(event, prop) {
      event.preventDefault();
      let target = event.target;
      let interval = 1;
      let prevVal = Number(target.value);
      let newVal;
      if (event.deltaY < 0) {
        newVal = prevVal + interval
      } else if (event.deltaY > 0) {
        if (prevVal == 0) { newVal = 0 }
        else { newVal = prevVal - interval }
      }
      this.current[prop] = newVal
    },

    setStatus(data)           { this.current.status = data },
    setPlatform(data)         { this.current.platform = data },
    setRating(data)           { this.current.rating = data },
    setFavourite(data)        { this.current.favourite = data },
    sethoursApproximate(data) { this.current.hoursApproximate = data }
  },
  computed: {
    games()    { return this.$store.state.games },
    tvshows()  { return this.$store.state.tvshows },
    films()    { return this.$store.state.films },
    anime()    { return this.$store.state.anime },
    books()    { return this.$store.state.books },
    hardware() { return this.$store.state.hardware },

    payload()  { return this.$store.state.payload },
    excludingCategory() { return this.$store.state[this.type].statuses.filter(i => i.excludeFields)[0].name; }
  },
  mounted() {
    document.addEventListener('keyup', e => {
      if (e.key == "Escape" || e.key == "Esc" || e.keyCode == 27) this.closeModal();
    });

    eventBus.$on('modalOpened', () => this.assignPayload());
    eventBus.$on('modalClosed', () => this.assignPayload());

    eventBus.$on('rated',            data => this.setRating(data));
    eventBus.$on('favourite',        data => this.setFavourite(data));
    eventBus.$on('hoursApproximate', data => this.sethoursApproximate(data));
  }
};
</script>