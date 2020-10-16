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
          @click='addSlot()'
          v-ripple)
          div(class='button__icon button__icon--plus')
          span(class='button__text') Add New

      div(class='search')
        div(class='input')
          svg(class='input__icon'): use(xlink:href='#search')
          input(class='input__field' type='text' placeholder='Search')

      div(class='title title--secondary')
        svg(class='title__chevron'): use(xlink:href='#chevron-down')
        h2(class='title__name') {{games.statuses.filter(i => i.default)[0].name}}
        span(class='title__badge badge badge--medium') 10

      div(class='table')

        div(class='table__header')
          div(class='table__cell grid__col grid__col--3 table__cell--functional')
          div(class='table__cell grid__col grid__col--55 table__cell--functional') 
            span Title
            svg(class='table__chevron'): use(xlink:href='#chevron-down')
          div(class='table__cell grid__col grid__col--10 table__cell--functional') Favourite
          div(class='table__cell grid__col grid__col--17 table__cell--functional') Rating
          div(class='table__cell grid__col grid__col--12 table__cell--functional') Spent time
          div(class='table__cell grid__col grid__col--3')

        div(class='table__body')
          div(class='table__item' v-for='(item, index) in games.collection')
            div(class='table__cell grid__col grid__col--3') {{index + 1}}
            div(class='table__cell grid__col grid__col--55') 
              span {{item.title}}
              a(:href="item.link" target="_blank" class='table__link' v-if='item.link != undefined')
                svg(class='table__redirect'): use(xlink:href='#link')
            div(class='table__cell grid__col grid__col--10') 
              svg(class='table__favourite' v-if='item.favourite'): use(xlink:href='#favourite')
            div(class='table__cell grid__col grid__col--17')
              div(class='table__rating')
                svg(
                  class='table__star table__star--active' 
                  :class='"table__star--" + (index + 1)'
                  v-for='(star, index) in item.rating'): use(xlink:href='#star-active-w')
                svg(
                  class='table__star table__star--passive' 
                  :class='"table__star--" + (index + 1)'
                  v-for='(rating, index) in 5'): use(xlink:href='#star-passive-w')
            div(class='table__cell grid__col grid__col--12') 
              svg(class='table__tilda' v-if='item.hoursApproximate'): use(xlink:href='#tilda')
              span(v-if='item.hours != undefined') {{item.hours}}
            div(class='table__cell grid__col grid__col--3')
              svg(
                class='table__edit'
                @click='editSlot(item.id)'): use(xlink:href='#edit')

</template>

<script>
import { eventBus } from "../../main";

export default {
  name: 'Games',
  data() {
    return {
      
    };
  },
  computed: {
    games() {return this.$store.state.games},
    payload()  { return this.$store.state.payload },
    modalVisible() {return this.$store.state.modalVisible},
  },
  methods: {
    addSlot() {
      this.$store.commit('changePayload', {});
      eventBus.$emit('openModal');
    },

    editSlot(id) {
      this.$store.commit('changePayload', this.games.collection.filter(i => i.id == id)[0]);
      eventBus.$emit('openModal');
    },

    updateData() {
      console.log('send to backend');
    }
  },
  mounted() {
    
  }
}
</script>
