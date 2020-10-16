<template lang="pug">

  transition(name='modal-fade')

    div(class='modal-backdrop' ref='backdrop')

      div(class='modal' :class='"modal--" + type')

        div(
          class='modal__close'
          @click='closeModal()'
          v-ripple)
          svg(class='modal__cross'): use(xlink:href='#close')

        div(class='modal__content' v-scrollbar)

          //- ===== //
          //- GAMES //
          //- ===== //
          div(class='modal__fields' v-if='type == "games"')

            div(class='input')
              label(
                class='input__label' 
                for='title') Title
              input(
                class='input__field' 
                autocomplete='off' 
                v-model='current.title')

            div(class='grid__row')
              div(class='grid__col grid__col--60')
                app-rating(:currentRating='current.rating')
              div(class='grid__col grid__col--40 grid__col--right')
                app-favourite()

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
                @click='setGameStatus(status.name)') {{status.name}}

            app-dropdown(
              :label='"Status"'
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
                @click='setGamePlatform(platform.name)') {{platform.name}}

        div(class='modal__footer')

          div(
            class='button button--secondary'
            @click='closeModal()')
            span(class='button__text') Cancel

          div(
            class='button button--main'
            v-ripple)
            span(class='button__text') Save

</template>

<script>
import { eventBus } from "../../main";

export default {
  name: 'modal',
  props: {
    type: String
  },
  data() {
    return {
      current: {}
    }
  },
  methods: {
    closeModal() { eventBus.$emit('closeModal') },
    assignPayload() { this.current = Object.assign({}, this.payload); },

    // Games
    setGameStatus(status)     { this.current.status = status; },
    setGamePlatform(platform) { this.current.platform = platform; },
    setGameRating(rating)     { this.current.rating = rating; }
  },
  computed: {
    games()    { return this.$store.state.games },
    tvshows()  { return this.$store.state.tvshows },
    films()    { return this.$store.state.films },
    anime()    { return this.$store.state.anime },
    books()    { return this.$store.state.books },
    hardware() { return this.$store.state.hardware },

    payload()  { return this.$store.state.payload }
  },
  mounted() {
    document.addEventListener('click', e => {
      if (e.target == this.$refs.backdrop) this.closeModal();
    });

    document.addEventListener('keyup', e => {
      if (e.key == "Escape" || e.key == "Esc" || e.keyCode == 27) this.closeModal();
    });

    eventBus.$on('modalOpened', () => { this.assignPayload() });
    eventBus.$on('modalClosed', () => { this.assignPayload() });
    eventBus.$on('rated', rating => { this.setGameRating(rating); });
  }
};
</script>