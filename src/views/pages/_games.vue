<template lang='pug'>
  section(class='section')

    div(
      class='section__content'
      :class='{"section__content--blured" : modalVisible}')

      div(class='title title--main')
        h1(class='title__name') My Games
        span(class='title__badge badge badge--medium') {{games.length}}
        div(
          class='title__button title__button--games button button--main'
          @click='addNewGame()')
          div(class='button__icon button__icon--plus')
          span(class='button__text') Add New

      div(class='search')
        div(class='input')
          input(class='input__field' type='text' placeholder='Search')

      div(class='title title--secondary')
        svg(class='title__chevron'): use(xlink:href='#chevron-down')
        h2(class='title__name') {{gamesStatuses[0]}}
        span(class='title__badge badge badge--medium') 10

      div(class='table')

        div(class='table__header')
          div(class='table__cell table__cell--3 table__cell--functional')
          div(class='table__cell table__cell--55 table__cell--functional') 
            span Title
            svg(class='table__chevron'): use(xlink:href='#chevron-down')
          div(class='table__cell table__cell--10 table__cell--functional') Favourite
          div(class='table__cell table__cell--17 table__cell--functional') Rating
          div(class='table__cell table__cell--12 table__cell--functional') Spent time
          div(class='table__cell table__cell--3')

        div(class='table__body')
          div(class='table__item' v-for='(item, index) in games')
            div(class='table__cell table__cell--3') {{index + 1}}
            div(class='table__cell table__cell--55') 
              span {{item.title}}
              a(:href="item.link" target="_blank" class='table__link' v-if='item.link != undefined')
                svg(class='table__redirect'): use(xlink:href='#link')
            div(class='table__cell table__cell--10') 
              svg(class='table__favourite' v-if='item.favourite'): use(xlink:href='#favourite')
            div(class='table__cell table__cell--17')  
              div(class='table__rating' :class='"table__rating--" + item.rating')
            div(class='table__cell table__cell--12') 
              svg(class='table__tilda' v-if='item.hoursApproximate'): use(xlink:href='#tilda')
              span(v-if='item.hours != undefined') {{item.hours}}
            div(class='table__cell table__cell--3')
              svg(class='table__edit'): use(xlink:href='#edit')

    app-modal(
      :type='"games"'
      :purpose='"edit"'
      v-show='modalVisible'
      @close='hideModal()')

</template>

<script>
export default {
  name: 'Games',
  data() {
    return {
      
    };
  },
  computed: {
    games() {return this.$store.state.games},
    gamesStatuses() {return this.$store.state.gamesStatuses},
    modalVisible() {return this.$store.state.modalVisible},
  },
  methods : {
    showModal() {
      this.$store.commit('changeModalState', true);
    },

    hideModal() {
      this.$store.commit('changeModalState', false);
    },

    addNewGame() {
      this.showModal();
    }
  }
}
</script>
