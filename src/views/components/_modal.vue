<template lang="pug">

  transition(name='modal-fade')

    div(
      class='modal-backdrop' 
      ref='backdrop')

      div(
        class='modal'
        :class='"modal--" + type')

        div(
          class='modal__close'
          @click='close'
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
                v-model='gameData.title')

            div(class='grid__row')
              div(class='grid__col grid__col--60')
                app-rating(:currentRating='gameData.rating')
              div(class='grid__col grid__col--40 grid__col--right')
                app-favourite()

            app-dropdown(
              :label='"Status"'
              :currentValue='gameData.status'
              :defaultValue='gamesStatuses[0]'
              :itemsCount='gamesStatuses.length')
              input(
                slot='dropdown-input' 
                v-model='gameData.status' 
                type='text')
              li(
                slot='dropdown-menu'
                class='dropdown__item'
                v-for='status in gamesStatuses'
                @click='setGameStatus(status)') {{status}}

            app-dropdown(
              :label='"Platform"'
              :currentValue='gameData.platform'
              :defaultValue='gamesPlatforms[0]'
              :itemsCount='gamesPlatforms.length')
              input(
                slot='dropdown-input' 
                v-model='gameData.platform' 
                type='text')
              li(
                slot='dropdown-menu'
                class='dropdown__item'
                v-for='platform in gamesPlatforms'
                @click='setGamePlatform(platform)') {{platform}}

        div(class='modal__footer')

          div(
            class='button button--secondary'
            @click='close')
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
    type: String,
    payload: Object
  },
  data() {
    return {
      gameData: {
        id: '',
        title: '',
        status: '',
        platform: '',
        hours: '',
        hoursApproximate: '',
        rating: 0,
        favourite: '',
        priority: '',
        link: ''
      }
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },

    assignGameData() {
      let importedData = Object.assign(this.gameData, this.payload);

      this.gameData = importedData;
    },

    setGameStatus(status) { this.gameData.status = status; },
    setGamePlatform(platform) { this.gameData.platform = platform; },
    setGameRating(rating) { this.gameData.rating = rating; }
  },
  computed: {
    gamesStatuses() {return this.$store.state.gamesStatuses},
    gamesPlatforms() {return this.$store.state.gamesPlatforms},
  },
  mounted() {
    document.addEventListener('click', (e) => {
      if(e.target == this.$refs.backdrop) this.close();
    });

    eventBus.$on('modalOpened', () => {
      this.assignGameData()
    });

    eventBus.$on('rated', rating => {
      this.setGameRating(rating)
    })
  }
};
</script>