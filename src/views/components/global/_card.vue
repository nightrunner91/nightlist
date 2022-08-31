<template lang='pug'>
  div(
    class='card cursor-pointer'
    @click='editSlot(data.id)')

    div(class='card__plate')

      div(
        class='card__image'
        :style='`background-image: url(images/favourites/${data.category}/${data.id}.jpg)`')

      vg(class='slot__favourite card__favourite'): use(xlink:href='#favourite')

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