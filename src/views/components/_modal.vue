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
          @click='close')
          svg(class='modal__cross'): use(xlink:href='#close')

        div(class='modal__content' v-scrollbar)

          div(
            class='modal__fields' 
            v-if='type == "games"')

            div(class='input')
              label(class='input__label' for='title') Title
              input(class='input__field' id='title' v-model='title')

            app-dropdown
              span(slot="toggler")
                span Status
              ul(slot="menu")
                li(
                  v-for='status in gamesStatuses'
                  @click='setCurrency(currency)')
                  span {{status}}

</template>

<script>
export default {
  name: 'modal',
  props: {
    id: Number,
    type: String,
    purpose: String,
    title: String,
    payload: []
  },
  data() {
    return {
      
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
  computed: {
    gamesStatuses() {return this.$store.state.gamesStatuses}
  },
  mounted() {
    document.addEventListener('click', (e) => {
      if(e.target == this.$refs.backdrop) this.close();
    })
  }
};
</script>