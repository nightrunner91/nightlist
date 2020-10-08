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

          div(
            class='modal__fields' 
            v-if='type == "games"')

            div(class='input')
              label(
                class='input__label' 
                for='title') Title
              input(
                class='input__field' 
                autocomplete='off' 
                v-model='gameData.title')

            app-dropdown(
              :label='"Status"'
              :currentValue='gameData.status'
              :defaultValue='gamesStatuses[0]')
              input(
                slot='dropdown-input' 
                v-model='gameData.status' 
                type='text')
              li(
                slot='dropdown-menu'
                class='dropdown__item'
                v-for='status in gamesStatuses'
                @click='setGameStatus(status)') {{status}}

        div(
          class='modal__footer')

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
        ownership: '',
        hours: '',
        hoursApproximate: '',
        rating: '',
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

    setGameStatus(status) {
      this.gameData.status = status;
    }
  },
  computed: {
    gamesStatuses() {return this.$store.state.gamesStatuses}
  },
  mounted() {
    document.addEventListener('click', (e) => {
      if(e.target == this.$refs.backdrop) this.close();
    });

    eventBus.$on('modalOpened', () => {
      this.assignGameData()
    });
  }
};
</script>