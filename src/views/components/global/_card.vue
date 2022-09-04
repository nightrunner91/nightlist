<template lang='pug'>
  div(
    class='card'
    :class='[{ "cursor-pointer" : allowEdit }, `card--${data.category}`]'
    @click='editSlot(data.id)')

    div(class='card__plate')

      div(class='card__overlay')
        div(class='card__subtitle')
          svg(class='card__clock'): use(xlink:href="#clock")
          span Hours
        div(class='card__time')
          div(class='card__hours')
            svg(class='card__tilda' v-if='data.hoursApproximate'): use(xlink:href='#tilda')
            span(v-if='data.hours != undefined') {{data.hours}}

        div(class='card__rating slot__rating')
          svg(
            class='slot__star slot__star--active' 
            :class='"slot__star--" + (index + 1)'
            v-for='(star, index) in data.rating'): use(xlink:href='#star-active-w')
          svg(
            class='slot__star slot__star--passive' 
            :class='"slot__star--" + (index + 1)'
            v-for='(rating, index) in 5'): use(xlink:href='#star-passive-w')

      div(
        class='card__image'
        :style='`background-image: url(images/favourites/${data.category}/${data.id}.jpg)`')

    div(class='card__body')
      div(class='card__title small') {{ data.title }}
    
</template>

<script>
import { eventBus } from "../../../main"

export default {
  name: 'Card',
  props: {
    data: Object,
    type: String,
  },
  data() {
    return {
      
    }
  },
  computed: {
    favourites() {
      return this.$store.state.collection.filter(i => i.category == this.type && i.favourite)
    },

    allowEdit() {
      return this.$store.state.allowEdit
    },
  },
  methods: {
    editSlot(id) {
      if (this.allowEdit) {
        this.$store.commit('CHANGE_CONTENT', this.favourites.filter(i => i.id == id)[0])
        eventBus.$emit('openModal', 'edit', this.type)
      }
    },
  },
  mounted() {
    
  }
}
</script>